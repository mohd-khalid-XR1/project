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


const CreatePost = ({ isUpdate }) => {

    const { id } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const userData = useSelector((state) => state.authSlice.userData)
    const [content, setContent] = useState('')
    const [title, setTitle] = useState('')
    const [isPublished, setIsPublished] = useState(null)
    console.log(isPublished);

    const submit = async (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const title = formData.get("title")
        const content = formData.get("content")
        const image = formData.get("image")
        let isPublished = formData.get("isPublished")
        isPublished = isPublished === 'public' ? true : false

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
            try {
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
                        secure_url: "",
                        public_id: ""
                    },
                    isPublished: isPublished
                })
                // console.log(response);

                const document = await getDoc(response)

                if (document.exists()) {
                    console.log(document.data());
                    dispatch(popupSuccessReducer({
                        popupState: {
                            success: true,
                            message: 'Post Created'
                        }
                    }))
                } else {
                    console.log("there is no found");
                }

            } catch (error) {
                console.log(error);
            }
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
                <button type="submit" className='border bg-blue-500'>{isUpdate ? "Update Post" : "Create Post"}</button>
            </form>
        </>
    )
}

export default CreatePost