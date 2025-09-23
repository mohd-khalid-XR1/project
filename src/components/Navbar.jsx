import React, { useState } from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom'
import { IoMenu } from "react-icons/io5";
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import { useSelector } from 'react-redux';

const Navbar = () => {

    const isAuthenticated = useSelector((state) => state.authSlice.isAuthenticated)
    const userData = useSelector((state)=>state.authSlice.userData)
    // console.log(userData);
    const [isSidebarActive, setIsSidebarActive] = useState(false)
    return (
        <>
            <header>
                <nav>
                    <Link to={'/'}>
                        <div className="logo-container">
                            <img src="./activa h smart.jpg" alt="activa" />
                            <h1>My website</h1>
                        </div>
                    </Link>

                    <div className="links">
                        <a href="">About</a>
                        <a href="">Contact</a>
                        <a href="">Create</a>
                        <span className="bell">
                            <span>2</span>
                            🔔
                        </span>
                    </div>

                    {isAuthenticated ?
                        <div className="nav-btn">
                            <button onClick={() => setIsSidebarActive((prev) => !prev)}><IoMenu /></button>
                        </div> :
                        <div className="nav-btn">
                            <Link to={`/login`}> <button>Login</button></Link>
                            <Link to={`/signup`}> <button>Signup</button></Link>
                        </div>}

                </nav>
            </header>
            <Sidebar
                isSidebarActive={isSidebarActive}
                setIsSidebarActive={setIsSidebarActive}
            />
            <Outlet />
        </>
    )
}

export default Navbar