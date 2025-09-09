import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Signup from './pages/Signup'
import Home from './pages/Home'
import Login from './pages/Login'
import Navbar from './components/Navbar'
import AuthProvider from './Provider/AuthProvider'

const App = () => {
  // console.log();
  return (
    <AuthProvider>
      <Routes>
        <Route path='/' element={<Navbar />}>
          <Route index element={<Home />} />

        </Route>

        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
      </Routes>
    </AuthProvider>

  )
}

export default App