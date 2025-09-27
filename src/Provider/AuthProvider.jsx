import React, { useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { firebaseAuth } from '../firebase/Configuration'
import { useDispatch, useSelector } from 'react-redux'
import { signup } from '../redux/features/authSlice'
import { getProfile } from '../lib/profile'
import { setProfileReducer } from '../redux/features/profileSlice'

const AuthProvider = (props) => {
    const dispatch = useDispatch()
    const myProfile = useSelector((state)=>state.profileSlice.profileData)
    console.log(myProfile);
    const getCurrentUser = async () => {
        try {
            await onAuthStateChanged(firebaseAuth, async (user) => {
               
                // console.log(user);
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
                    const profile = await getProfile(currentUser.uid)
                    console.log(profile);
                    if (profile) {
                        dispatch(setProfileReducer({ profileData: profile }))
                    }
                } else {
                    alert("You are not login")
                }

            })
        } catch (error) {
            console.log(error);
        }

    }


    useEffect(() => {
        getCurrentUser()
    }, [])


    return (
        <>
            {props.children}
        </>
    )
}

export default AuthProvider