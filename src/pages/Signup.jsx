import React from 'react'
import { firebaseAuth } from '../firebase/Configuration'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'


const Signup = () => {

  const signup = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const username = formData.get("username")
    const email = formData.get("email")
    const password = formData.get("password")
    console.log(username);
    console.log(email);
    console.log(password);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        firebaseAuth,
        email,
        password,
      )
      const user = userCredential.user 
      await updateProfile(user,{
        displayName : username
      })

      console.log(user);
    } catch (error) {
      console.log(error?.message)
    }

  }

  return (
    <div id='login-page'>
      <form onSubmit={signup}>
        <img src="./images/nature.jpg" alt="" />
        <h2>Signup</h2>
        <div>
          <label htmlFor="">Username</label>
          <input type="text" name="username" id="" />
        </div>
        <div>
          <label htmlFor="">Email</label>
          <input type="email" name="email" id="" />
        </div>
        <div>
          <div className="password-label">
            <label htmlFor="">Password</label>
            <span>Forgot Password ? </span>
          </div>
          <input type="password" name="password" id="" />
        </div>
        <button type="submit">Login</button>
        <p>Not a Member ? <a href="">Signup</a></p>
      </form>
    </div>
  )
}

export default Signup