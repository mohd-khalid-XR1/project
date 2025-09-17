import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import { doc, getDoc } from 'firebase/firestore';
import { fireStoreDB } from '../firebase/Configuration';
import { collectionNames } from '../constant';
import parse from 'html-react-parser'

const ViewPost = () => {
    const { id } = useParams()
    const [post, setPost] = useState(null)
    // console.log(id);

    const getPost = async (postId) => {
        try {
            const docRef = doc(fireStoreDB, collectionNames.posts, postId)
            // console.log(ref);
            const document = await getDoc(docRef)
            if (document.exists()) {
                console.log(document.data());
                setPost(document.data())
            } else {
                console.log("Document not get");
            }
        } catch (error) {

        }
    }
    useEffect(() => {
        getPost(id)
    }, [id])
    return (
        <div>
            {post ? <div className='px-3 py-2'>
                <span className='text-gray-500'>{post.author.username}</span>
                <h1 className='font-bold'>{post.title}</h1>
                <article className='mt-3'>{parse(post.content)}</article>
            </div> : <div>Waiting...</div>}
        </div>
    )
}

export default ViewPost