import React, { useState } from 'react'
import { collection, query, where, getDocs } from 'firebase/firestore'
import { fireStoreDB } from '../firebase/Configuration'
import { collectionNames } from '../constant'
import PostCard from '../components/PostCard'
const Search = () => {
    const [posts, setPosts] = useState([])
    const [message, setMessage] = useState('')
    const searchPost = async (formData) => {
        try {
            setPosts([])
            const title = formData.get('title')
            console.log(title);
            if (!title) throw new Error("Title is cannot be empty")
            const q = query(
                collection(fireStoreDB, collectionNames.posts),
                where("title", "==", title)
            )
            const snapShot = await getDocs(q)
            const document = snapShot.docs.map((post) => ({ ...post.data(), id: post.id }))
            console.log(document);
            if (document.length === 0) {
                setMessage("No post available")
                return
            }

            setPosts(document)
        } catch (error) {
            console.log(error);
        }

    }

    return (
        <div>
            <h1 className='text-center text-gray-400 font-bold text-2xl mt-5'>Search Posts</h1>
            <form action={searchPost}>
                {/* React 19 or above  */}
                <label htmlFor="title">Title</label>
                <input name='title' type="text" id='title' className='border border-gray-400 px-1' />
                <button type="submit" className='block border-none bg-green-500 text-white px-2 py-1 rounded-md mt-2'>Search</button>
            </form>
            {message && <h2>{message}</h2>}
            <div>
                {posts.map((post) => {
                    return <PostCard key={post.id} post={post} />
                })}
            </div>

        </div>
    )
}

export default Search