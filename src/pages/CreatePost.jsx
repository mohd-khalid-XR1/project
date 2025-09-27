import React, { useEffect, useState } from 'react'
import { fireStoreDB } from '../firebase/Configuration'
import { collection, addDoc, serverTimestamp, getDoc } from 'firebase/firestore'
import { useSelector } from 'react-redux'
import { collectionNames } from '../constant'
import JoditEditor from 'jodit-react';
import { useDispatch } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { getPost, updatePost } from '../lib/posts'
import { popupFailedReducer, popupSuccessReducer } from '../redux/features/booleanSlice'
const config = {
    readonly: false,
    placeholder: "Enter your content in my app"
}
import { supabase } from '../supabase/configuration'


const CreatePost = ({ isUpdate }) => {

    const { id } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const userData = useSelector((state) => state.authSlice.userData)
    const [content, setContent] = useState('')
    const [title, setTitle] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isPublished, setIsPublished] = useState(null)

    const submit = async (e) => {

        console.log('click');
        setIsSubmitting(true)
        e.preventDefault()
        const formData = new FormData(e.target)
        const title = formData.get("title")
        const content = formData.get("content")
        const image = formData.get("image")
        let isPublished = formData.get("isPublished")
        isPublished = isPublished === 'public' ? true : false
        // console.log(image);



        try {
            if (isUpdate) {
                // console.log(title);
                // console.log(isPublished);
                // console.log(content);
                const response = await updatePost(id, {
                    title,
                    content,
                    isPublished,  
                })
                dispatch(popupSuccessReducer({
                    popupState: {
                        success: true,
                        message: response.message
                    }
                }))
                navigate(`/view-post/${id}`)
            } else {

                const { data, error } = await supabase.storage.from("posts").upload(`${Date.now()}-${image.name}`, image)
                console.log(data);
                const path = data.path
                if (error) throw new Error("Image is not uploaded")

                const filePath = data.path
                const { data: x } = supabase.storage.from("posts").getPublicUrl(filePath);
                // console.log(x);
                const publicURL = x.publicUrl
                // console.log(publicURL);

                const response = await addDoc(collection(fireStoreDB, collectionNames.posts), {
                    author: {
                        username: userData.username,
                        uid: userData.uid
                    },
                    title: title,
                    content: content,
                    heart: 0,
                    createdAt: serverTimestamp(),
                    image: {
                        public_url: publicURL,
                        path: path
                    },
                    isPublished: isPublished
                })
                // console.log(response);

                const document = await getDoc(response)

                if (document.exists()) {
                    // console.log(document.data());
                    dispatch(popupSuccessReducer({
                        popupState: {
                            success: true,
                            message: 'Post Created'
                        }
                    }))
                    navigate(`/view-post/${id}`)
                } else {
                    console.log("there is no found");
                }


            }
            setIsSubmitting(false)
        } catch (error) {
            setIsSubmitting(false)
        }




        // console.log(title);
        // console.log(content);
        // console.log(image);
    }

    const x = async (id) => {
        const data = await getPost(id)

        if (data.success) {
            setTitle(data.payload.title)
            setContent(data.payload.content)
            setIsPublished(data.payload.isPublished ? "public" : "private")
        } else {
            setPost(null)
            dispatch(popupFailedReducer({
                popupState: {
                    success: false,
                    message: data.message
                }
            }))
        }
    }

    useEffect(() => {
        if (isUpdate) {
            x(id)
        }
    }, [isUpdate])

    return (
        <>
            <h2>Create Post</h2>
            <form onSubmit={submit} className='flex flex-col gap-5 items-center'>
                <input
                    type="text"
                    name='title'
                    className='border'
                    // value={title}
                    defaultValue={title}
                // onChange={(e) => setTitle(e.target.value)}
                />
                <input type="file" name="image" id="" className='border' />
                <JoditEditor
                    value={content}
                    config={config}
                    name='content'
                // onChange={(newContent) => {
                //     setContent(newContent)
                // }}
                />
                <div>
                    <h3>IsPublished</h3>
                    {isUpdate ?
                        isPublished && <>
                            <label htmlFor="">public</label>
                            <input onChange={() => { }} type="radio" name="isPublished" id="" value={'public'} defaultChecked={isPublished === "public"} />

                            <label htmlFor="">Private</label>
                            <input onChange={() => { }} type="radio" name="isPublished" id="" value={'private'} defaultChecked={isPublished === "private"} />
                        </>
                        :
                        <>
                            <label htmlFor="">public</label>
                            <input onChange={() => { }} type="radio" name="isPublished" id="" value={'public'} defaultChecked={true} />

                            <label htmlFor="">Private</label>
                            <input onChange={() => { }} type="radio" name="isPublished" id="" value={'private'} />
                        </>
                    }

                </div>
                <button disabled={isSubmitting} type="submit" className={`border  ${isSubmitting ? "bg-green-400" : "bg-blue-500"}`}>{isUpdate ? "Update Post" : "Create Post"}</button>
            </form>
        </>
    )
}

export default CreatePost