import React from 'react'
import { useSelector } from 'react-redux'
const Home = () => {
  const userData = useSelector((state) => state.authSlice)
  console.log(userData);
  return (
    <h1>Home </h1>
  )
}

export default Home