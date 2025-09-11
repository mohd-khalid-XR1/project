import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { sendEmailVerification } from 'firebase/auth'
import { firebaseAuth } from '../firebase/Configuration'
import { useDispatch } from 'react-redux'
import { signup } from '../redux/features/authSlice'
const Profile = () => {
    const dispatch = useDispatch()
    const userData = useSelector((state) => state.authSlice.userData)
    const [visible, setVisible] = useState(true)
    const [checkStatus, setCheckStatus] = useState(false)

    console.log(userData);

    const verifyEmail = async () => {
        try {
            setVisible(false)
            setCheckStatus(true)
            if (userData.isVerified) return
            const currentUser = firebaseAuth.currentUser
            await sendEmailVerification(currentUser)
            alert("Email is sent")
        } catch (error) {
            alert("Email not sent")
        }
    }
    const checkEmailStatus = async () => {
        if (firebaseAuth.currentUser) {
            let user = await firebaseAuth.currentUser.reload()
            alert("reload success")
            user = firebaseAuth.currentUser
            if (user) {
                let currentUser = {
                    uid: user.uid,
                    username: user.displayName,
                    email: user.email,
                    isVerified: user.emailVerified,
                    createdAt: user.metadata.creationTime,
                    photoURL: user.photoURL
                }
                console.log(currentUser);
                dispatch(signup({ user: currentUser }))
            }
        }
    }

    return (
        <div>
            {userData && <div className='flex flex-col'>
                <div>username : {userData.username}</div>
                <div>created At :{userData.createdAt}</div>
                <div>photo url : {userData.photoURL}</div>
                <div>isVerified : {userData.isVerified ? "Verified" :
                    <span>
                        <span>Not Verified</span>
                        {visible && <button onClick={verifyEmail} className='bg-green-500 text-white ml-3 rounded-sm px-1'>Verify</button>}
                        {checkStatus && <button className='bg-green-500 text-white ml-3 rounded-sm px-1' onClick={checkEmailStatus}>Check Status</button>}
                    </span>
                }</div>
            </div>}
        </div>
    )
}

export default Profile