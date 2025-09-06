import React, { useState } from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom'
import { IoMenu } from "react-icons/io5";

const Navbar = () => {
    const [authStatus, setAuthStatus] = useState(false)
    return (
        <header>
            <nav>
                <div className="logo-container">
                    <img src="./activa h smart.jpg" alt="activa" />
                    <h1>My website</h1>
                </div>

                <div className="links">
                    <a href="">About</a>
                    <a href="">Contact</a>
                    <a href="">Create</a>
                    <span className="bell">
                        <span>2</span>
                        🔔
                    </span>
                </div>

                {authStatus ?
                    <div className="nav-btn">
                        <button><IoMenu /></button>
                    </div> :
                    <div className="nav-btn">
                        <Link to={`/login`}> <button>Login</button></Link>
                        <Link to={`/signup`}> <button>Signup</button></Link>
                    </div>}

            </nav>
        </header>
    )
}

export default Navbar