import React, { useState } from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom'
import { IoMenu } from "react-icons/io5";
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import { useSelector } from 'react-redux';
import { FaHome } from "react-icons/fa";
import { GoSearch } from "react-icons/go";
import { MdCreate } from "react-icons/md";

const Navbar = () => {

    const isAuthenticated = useSelector((state) => state.authSlice.isAuthenticated)
    const userData = useSelector((state) => state.authSlice.userData)
    // console.log(userData);
    const [isSidebarActive, setIsSidebarActive] = useState(false)
    const links = [
        { name: "Home", path: "/", id: 1 , icon : <FaHome />},
        { name: "Search", path: "/search", id: 2 , icon : <GoSearch /> },
        { name: "create post", path: "/create-post", id: 3, icon : <MdCreate /> },
    ]
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
                        {links.map((nav) => {
                            return <Link to={nav.path} key={nav.id}>{nav.name} {nav.icon}</Link>
                            
                        })}
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