import React from 'react'
import { firebaseAuth } from '../firebase/Configuration'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { useSelector, useDispatch } from 'react-redux'
import { signup as signupReducer } from '../redux/features/authSlice'
import { Link, useNavigate } from 'react-router-dom'
import { setDoc , doc} from 'firebase/firestore'
import { fireStoreDB } from '../firebase/Configuration'
import { collectionNames } from '../constant'

const Signup = () => {
  const navigation = useNavigate()
  const dispatch = useDispatch()
  const userData = useSelector((state) => state.authSlice)
  console.log(userData);

  const signup = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const username = formData.get("username")
    const email = formData.get("email")
    const password = formData.get("password")
    // console.log(username);
    // console.log(email);
    // console.log(password);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        firebaseAuth,
        email,
        password,
      )

      let user = userCredential.user
      await updateProfile(user, {
        displayName: username
      })

      const x = await setDoc(doc(fireStoreDB,collectionNames.profile,user.uid),{
        username : user.displayName,
        heartPostId : []
      })

      console.log(x);

      // user = {
      //   uid: user.uid,
      //   username: user.displayName,
      //   email: user.email,
      //   isVerified: user.emailVerified,
      //   createdAt: user.metadata.creationTime,
      //   photoURL : user.photoURL

      // }
      // dispatch(signupReducer({ user }))
      navigation('/')
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
          <input type="text" name="username" id="" className='border' />
        </div>
        <div>
          <label htmlFor="">Email</label>
          <input type="email" name="email" id="" className='border'  />
        </div>
        <div>
          <div className="password-label">
            <label htmlFor="">Password</label>
           <Link to={`/forgot-password`}>Forgot Password ? </Link>
          </div>
          <input type="password" name="password" id="" className='border'  />
        </div>
        <button type="submit">Signup</button>
        <p>Not a Member ? <Link to={'/login'}>Login</Link></p>
      </form>
    </div>
  )
}

export default Signup