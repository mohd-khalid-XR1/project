import React from 'react'
import './Login.css'
import { Link } from 'react-router-dom'
import { firebaseAuth } from '../firebase/Configuration'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useDispatch } from 'react-redux'
import { signup } from '../redux/features/authSlice'
import { useNavigate } from 'react-router-dom'
const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const submit = async (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const email = formData.get("email")
        const password = formData.get("password")
        console.log(email, password);
        try {
            const userCredential = await signInWithEmailAndPassword(
                firebaseAuth,
                email,
                password
            )
            // console.log(userCredential);
            // let user = userCredential.user
            // user = {
            //     uid: user.uid,
            //     username: user.displayName,
            //     email: user.email,
            //     isVerified: user.emailVerified,
            //     createdAt: user.metadata.creationTime,
            //     photoURL: user.photoURL
            // }
            // dispatch(signup({ user }))
            navigate('/')
        } catch (error) {
            console.log(error?.message);
            alert("invalid user")
        }
    }
    return (
        <div id='login-page'>
            <form onSubmit={submit}>
                <img src="./images/nature.jpg" alt="" />
                <h2>Login</h2>
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
                <p>Not a Member ? <Link to={'/signup'}>Signup</Link></p>
            </form>
        </div>
    )
}

export default Login