import React, { useEffect, useState } from 'react'
import { getDocs, collection } from 'firebase/firestore';
import { fireStoreDB } from '../firebase/Configuration';
import { collectionNames } from '../constant';

import PostCard from '../components/PostCard';
const Home = () => {

  const [posts, setPosts] = useState([])
  console.log(posts);
  const getPosts = async () => {
    try {
      const response = await getDocs(collection(fireStoreDB, collectionNames.posts))
      const documents = response.docs.map((snapShot) => {
        return { ...snapShot.data(), id: snapShot.id }
      })
      setPosts(documents)
    } catch (error) {
      console.log("Error", error);
    }
  }

  useEffect(() => {
    getPosts()
  }, [])

  return (
    <>
      <h1>Home</h1>
      <br />
      <div className='flex flex-col justify-start gap-3.5'>
        {posts.map((post) => {
          return <PostCard key={post.id} post={post} />
        })}
      </div>

    </>
  )
}

export default Home