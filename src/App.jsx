import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Signup from './pages/Signup'
import Home from './pages/Home'
import Login from './pages/Login'
import Navbar from './components/Navbar'
import AuthProvider from './Provider/AuthProvider'
import ForgotPassword from './pages/ForgotPassword'
import Profile from './pages/Profile'
import CreatePost from './pages/CreatePost'
import ViewPost from './pages/ViewPost'
import Popup from './components/Popup'
const App = () => {
  // console.log();
  return (
    <AuthProvider>
      <Popup />
      <Routes>
        <Route path='/' element={<Navbar />}>
          <Route index element={<Home />} />
          <Route path='profile' element={<Profile />} />
          <Route path='create-post' element={<CreatePost />} />
          <Route path='view-post/:id' element={<ViewPost />} />
        </Route>
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
      </Routes>
    </AuthProvider>

  )
}

export default App