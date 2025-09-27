import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Signup from './pages/Signup'
import Search from './pages/Search'
import Home from './pages/Home'
import Login from './pages/Login'
import Navbar from './components/Navbar'
import AuthProvider from './Provider/AuthProvider'
import ForgotPassword from './pages/ForgotPassword'
import Profile from './pages/Profile'
import CreatePost from './pages/CreatePost'
import ViewPost from './pages/ViewPost'
import Popup from './components/Popup'
import NotFound from './components/NotFound'
const App = () => {
  // console.log();
  return (
    <AuthProvider>
      <Popup />
      <Routes>
        <Route path='/' Component={Navbar}>
          <Route index Component={Home} />
          <Route path='profile' Component={Profile} />
          <Route path='create-post' element={<CreatePost isUpdate={false} />} />
          <Route path='update-post/:id' element={<CreatePost isUpdate={true} />} />
          <Route path='view-post/:id' element={<ViewPost />} />
          <Route path='search' Component={Search} />
        </Route>
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='*' Component={NotFound} />
      </Routes>
    </AuthProvider>

  )
}

export default App