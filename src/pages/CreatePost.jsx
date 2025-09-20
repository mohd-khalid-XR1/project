import React, { useEffect, useState } from 'react'
import { fireStoreDB } from '../firebase/Configuration'
import { collection, addDoc, serverTimestamp, getDoc } from 'firebase/firestore'
import { useSelector } from 'react-redux'
import { collectionNames } from '../constant'
import JoditEditor from 'jodit-react';
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getPost } from '../lib/posts'

import { popupFailedReducer, popupSuccessReducer } from '../redux/features/booleanSlice'
const config = {
    readonly: false,
    placeholder: "Enter your content in my app"
}


const CreatePost = ({ isUpdate }) => {

    const { id } = useParams()
    const dispatch = useDispatch()
    const userData = useSelector((state) => state.authSlice.userData)
    const [content, setContent] = useState('')
    const [post, setPost] = useState(null)
    console.log(post?.title);
    const [title, setTitle] = useState(post?.title)
    console.log(title);
    

    const submit = async (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const title = formData.get("title")
        // const content = formData.get("content")
        const image = formData.get("image")
        let isPublished = formData.get("isPublished")
        isPublished = isPublished === 'public' ? true : false
        console.log(content);
        if (isUpdate) {

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
            setPost(data.payload)
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
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <input type="file" name="image" id="" className='border' />
                <JoditEditor
                    value={post?.content}
                    config={config}
                    name='content'
                    onChange={(newContent) => {
                        setContent(newContent)
                    }}
                />
                <div>
                    <h3>IsPublished</h3>
                    <label htmlFor="">public</label>
                    <input onChange={()=>{}} type="radio" name="isPublished" id="" value={'public'} checked={post?.isPublished} />

                    <label htmlFor="">Private</label>
                    <input onChange={()=>{}} type="radio" name="isPublished" id="" value={'private'} checked={post?.isPublished === false} />
                </div>
                <button type="submit" className='border bg-blue-500'>{isUpdate ? "Update Post" : "Create Post"}</button>
            </form>
        </>
    )
}

export default CreatePost