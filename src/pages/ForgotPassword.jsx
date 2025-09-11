import React from 'react'
import { sendPasswordResetEmail } from 'firebase/auth'
import { firebaseAuth } from '../firebase/Configuration'
import { useNavigate } from 'react-router-dom'
const ForgotPassword = () => {
    const navigate = useNavigate()
    const forgot = async (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const email = formData.get("email")
        console.log(email)
        try {
            await sendPasswordResetEmail(firebaseAuth, email)
            navigate('/login')
            alert("Password reset email sent! Check your inbox.");
        } catch (error) {
            console.error("Error sending reset email:", error?.message);
            alert(error?.message);
        }
    }
    return (
        <form onSubmit={forgot}>
            <input type="email" name="email" id="" className='border' required />
            <button className='bg-red-500 p-1 rounded-sm text-white'>reset Email</button>
        </form>
    )
}

export default ForgotPassword