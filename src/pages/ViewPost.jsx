import React, { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from "react-router-dom";
import { doc, getDoc, deleteDoc } from 'firebase/firestore';
import { fireStoreDB } from '../firebase/Configuration';
import { collectionNames } from '../constant';
import parse from 'html-react-parser'
import { FaTrash } from "react-icons/fa";
import { useSelector, useDispatch } from 'react-redux';
import { popupFailedReducer, popupSuccessReducer } from '../redux/features/booleanSlice';
import { MdModeEditOutline } from "react-icons/md";

const ViewPost = () => {
    // console.log(process.env.NODE_ENV)
    const { id } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const isAuthenticated = useSelector((state) => state.authSlice.isAuthenticated)
    const userData = useSelector((state) => state.authSlice.userData)

    const [post, setPost] = useState(null)
  
    const isEligibleToDeletePost = post && isAuthenticated && (post.author.uid === userData.uid)
  

    const getPost = async (postId) => {
        try {
            const docRef = doc(fireStoreDB, collectionNames.posts, postId)
            // console.log(ref);
            const document = await getDoc(docRef)
            if (document.exists()) {
                // console.log(document.data());
                setPost(document.data())
            } else {
                console.log("Document not get");
            }
        } catch (error) {

        }
    }
    const deletePost = async (postId) => {
        try {
            // throw new Error("Netwoek issuse")
            if (!isEligibleToDeletePost) throw new Error("You cannot delete this post")
            console.log(postId)
            await deleteDoc(doc(fireStoreDB, collectionNames.posts, postId))
            dispatch(popupSuccessReducer({
                popupState: {
                    success: true,
                    message: "Post is deleted"
                }
            }))
            navigate('/')

        } catch (error) {
            dispatch(popupFailedReducer({
                popupState: {
                    success: false,
                    message: `Post is not deleted : ${error?.message}`
                }
            }))
        }
    }
    useEffect(() => {
        getPost(id)
    }, [id])
    return (
        <div>
            {post ? <div className='px-3 py-2'>
                <span className='text-gray-500'>{post.author.username}</span>
                <div className='flex justify-between px-2'>
                    <h1 className='font-bold'>{post.title}</h1>
                    <div>
                        {isEligibleToDeletePost && <Link to={`/update-post/${id}`}> <MdModeEditOutline /></Link>}
                        {isEligibleToDeletePost && <span onClick={() => deletePost(id)}><FaTrash /></span>}
                    </div>

                </div>
                <article className='mt-3'>{parse(post.content)}</article>
            </div> : <div>Waiting...</div>}
        </div>
    )
}

export default ViewPost