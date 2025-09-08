import React, { useState } from 'react'
import './Sidebar.css'
import { ImCross } from "react-icons/im";
const Sidebar = ({ isSidebarActive, setIsSidebarActive }) => {

    return (
        <section id="sidebar" className={`${isSidebarActive ? "active" : ""} py-3`}>
            <div className='px-3'>
                <ImCross onClick={() => setIsSidebarActive((prev) => !prev)} />
            </div>
            <li>Home</li>
            <li>Gallery</li>
            <li>About</li>
            <li>Logout</li>
        </section>
    )
}

export default Sidebar