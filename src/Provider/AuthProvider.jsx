import React, { useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { firebaseAuth } from '../firebase/Configuration'
import { useDispatch } from 'react-redux'
import { signup } from '../redux/features/authSlice'

const AuthProvider = (props) => {
    const dispatch = useDispatch()
    const getCurrentUser = async () => {
        try {
            await onAuthStateChanged(firebaseAuth, (user) => {
                console.log("user login");
                console.log(user);
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
                }else{
                    // alert("You are not login")
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