import React from 'react'
import './Login.css'

const Login = () => {
    return (
        <div id='login-page'>
            <form>
                <img src="./images/nature.jpg" alt="" />
                <h2>Login</h2>
                <div>
                    <label for="">Email</label>
                    <input type="email" name="" id="" />
                </div>
                <div>
                    <div class="password-label">
                        <label for="">Password</label>
                        <span>Forgot Password ? </span>
                    </div>
                    <input type="password" name="" id="" />
                </div>
                <button type="submit">Login</button>
                <p>Not a Member ? <a href="">Signup</a></p>
            </form>
        </div>
    )
}

export default Login