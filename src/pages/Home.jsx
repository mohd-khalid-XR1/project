import React from 'react'
import { useSelector } from 'react-redux'
const Home = () => {
  const userData = useSelector((state) => state.authSlice.userData)
  
  console.log(userData);
  return (
    <>
    <h1>Home</h1>
    <br />
    {userData && <div className='flex flex-col'>
      <div>username : {userData.username}</div>
      <div>uid : {userData.uid}</div>
      <div>created At :{userData.createdAt}</div>
      <div>photo url : {userData.photoURL}</div>
      <div>email : {userData.email}</div>
      <div>isVerified : {userData.isVerified}</div>
    </div>}
    </>
  )
}

export default Home