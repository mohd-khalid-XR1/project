import React, { useState } from 'react'
import './Sidebar.css'
import { ImCross } from "react-icons/im";
import { signOut } from 'firebase/auth';
import { firebaseAuth } from '../firebase/Configuration';
import { useDispatch } from 'react-redux';
import { logoutReducer } from '../redux/features/authSlice';
import { Link } from 'react-router-dom';
const Sidebar = ({ isSidebarActive, setIsSidebarActive }) => {

    const dispatch = useDispatch();

    const signOutUser = async () => {
        try {
            await signOut(firebaseAuth)
            dispatch(logoutReducer())
        } catch (error) {
            console.log(error?.message);
            alert("logout failed")
        }
    }

    return (
        <section id="sidebar" className={`${isSidebarActive ? "active" : ""} py-3`}>
            <div className='px-3'>
                <ImCross onClick={() => setIsSidebarActive((prev) => false)} />
            </div>
            <Link
                to={'/profile'}
                onClick={() => setIsSidebarActive(false)}
            ><li>My Profile</li>
            </Link>
            <Link
                to={'/create-post'}
                onClick={() => setIsSidebarActive(false)}
            ><li>Create Post</li></Link>
            <li>About</li>
            <li onClick={() => {
                setIsSidebarActive(false)
                signOutUser()
            }}>Logout</li>
        </section>
    )
}

export default Sidebar