import React from 'react'
import { FaHeart } from "react-icons/fa6";
import parse from 'html-react-parser';
import { Link } from 'react-router-dom';
import { getPost, updatePost } from '../lib/posts';
const PostCard = (props) => {

    const { post } = props
    const heartPost = async () => {
        const id = post.id
        try {
            const latestPost = await getPost(id)
            if (latestPost.success) {
                const newPost = latestPost.payload
                updatePost(id, {
                    heart: newPost.heart + 1
                })
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='border border-gray-300 mb-2 w-[95%] xl:w-[30%] lg:w-[30%] md:w-[30%]'>
            <Link to={`/view-post/${post.id}`} className='w-full'>
                <span>{post.author.username}</span>
                <h2 className='font-black'>{post.title}</h2>
                {/* <article>{parse(post.content)}</article> */}

            </Link>
            <div className='flex gap-2 items-center cursor-pointer' onClick={heartPost}>
                <FaHeart />
                <span>{post.heart}</span>
            </div>
        </div>
    )
}

export default PostCard