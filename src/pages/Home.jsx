import React, { useEffect, useState } from 'react'
import { getDocs, collection } from 'firebase/firestore';
import { fireStoreDB } from '../firebase/Configuration';
import { collectionNames } from '../constant';
import PostCard from '../components/PostCard';
import { useDispatch } from 'react-redux';
import { popupFailedReducer } from '../redux/features/booleanSlice';

const Home = () => {
  console.log(window.innerWidth);
  const dispatch = useDispatch()
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const getPosts = async () => {
    try {
      setLoading(true)
      setError("")
      // throw new Error("network issue")
      const response = await getDocs(collection(fireStoreDB, collectionNames.posts))
      const documents = response.docs.map((snapShot) => {
        return { ...snapShot.data(), id: snapShot.id }
      })
      setPosts(documents)
      setLoading(false)
    } catch (error) {
      console.log("Error", error);
      setError(error?.message)
      setLoading(false)
      dispatch(popupFailedReducer({
        popupState : {
          success : false,
          message : `Something Went Wrong.`
        }
      }))
    }
  }

  useEffect(() => {
    getPosts()
  }, [])


  if (loading) {
    return (
      <div className='text-center mt-10 font-bold'>Wait.Post is loading...</div>
    )
  }

  if(error){
    return <div className='text-center mt-10 font-bold'>{error}</div>
  }

  if (!posts || posts.length === 0) {
    return (
      <div className='text-center mt-10 font-bold'>No Post Available</div>
    )
  }

  return (
    <>
      <div className='w-full flex flex-col xl:flex-row lg:flex-row md:flex-row items-center justify-around mt-5 gap-3.5 flex-wrap'>
        {posts.map((post) => {
          return <PostCard key={post.id} post={post} />
        })}
      </div>
    </>
  )
}

export default Home