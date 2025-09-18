import React from 'react'
import { FaHeart } from "react-icons/fa6";
import parse from 'html-react-parser';
import { Link } from 'react-router-dom';
const PostCard = (props) => {
    
    const { post } = props
  

    return (
        <Link to={`/view-post/${post.id}`}>
            <div className='border border-gray-300 mb-2'>
                <span>{post.author.username}</span>
                <h2 className='font-black'>{post.title}</h2>
                {/* <article>{parse(post.content)}</article> */}
                <div className='flex gap-2 items-center'>
                    <FaHeart />
                    <span>{post.heart}</span>
                </div>
            </div>
        </Link>
    )
}

export default PostCard