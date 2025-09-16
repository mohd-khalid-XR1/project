import React from 'react'
import { FaHeart } from "react-icons/fa6";


const PostCard = (props) => {
    const { post } = props
    console.log(props);
    return (
        <div className='border border-gray-300 mb-2'>
            <span>{post.author.username}</span>
            <h2 className='font-black'>{post.title}</h2>
            <article>{post.content}</article>
            <div className='flex gap-2 items-center'>
                <FaHeart />
                <span>{post.heart}</span>
            </div>
        </div>
    )
}

export default PostCard