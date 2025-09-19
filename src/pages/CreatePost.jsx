import React, { useState } from 'react'
import { fireStoreDB } from '../firebase/Configuration'
import { collection, addDoc, serverTimestamp, getDoc } from 'firebase/firestore'
import { useSelector } from 'react-redux'
import { collectionNames } from '../constant'
import JoditEditor from 'jodit-react';
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { popupSuccessReducer } from '../redux/features/booleanSlice'
const config = {
    readonly: false,
    placeholder: "Enter your content in my app"
}


const CreatePost = ({ isUpdate }) => {
    console.log(isUpdate);
    const { id } = useParams()
    console.log(id);
    const dispatch = useDispatch()
    const userData = useSelector((state) => state.authSlice.userData)
    const [content, setContent] = useState('')

    const submit = async (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const title = formData.get("title")
        // const content = formData.get("content")
        const image = formData.get("image")
        let isPublished = formData.get("isPublished")
        isPublished = isPublished === 'public' ? true : false
        console.log(content);

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

        // console.log(title);
        // console.log(content);
        // console.log(image);
    }
    return (
        <>
            <h2>Create Post</h2>
            <form onSubmit={submit} className='flex flex-col gap-5 items-center'>
                <input type="text" name='title' className='border' />
                <input type="file" name="image" id="" className='border' />
                <JoditEditor
                    config={config}
                    name='content'
                    onChange={(newContent) => {
                        setContent(newContent)
                    }}
                />
                <div>
                    <h3>IsPublished</h3>
                    <label htmlFor="">public</label>
                    <input type="radio" name="isPublished" id="" value={'public'} />

                    <label htmlFor="">Private</label>
                    <input type="radio" name="isPublished" id="" value={'private'} />
                </div>
                <button type="submit" className='border bg-blue-500'>create Post</button>
            </form>
        </>
    )
}

export default CreatePost