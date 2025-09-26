import React, { useState } from 'react'
import { FaHeart } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { getPost, updatePost } from '../lib/posts';
import { getProfile, updateProfile } from '../lib/profile';
import { useSelector, useDispatch } from 'react-redux';
import { setProfileReducer } from '../redux/features/profileSlice';

const PostCard = (props) => {
    const dispatch = useDispatch()
    const userData = useSelector((state) => state.authSlice.userData)
    const [isHearted, setIsHearted] = useState(null)
    console.log(isHearted);
    const myProfile = useSelector((state) => state.profileSlice.profileData)
    const heartPostId = myProfile.heartPostId
    const { post } = props
    const heartPost = async () => {
        const id = post.id
        try {
            const latestPost = await getPost(id)
            const myProfile = await getProfile(userData.uid)
            if (!latestPost.success || !myProfile) throw new Error("something went wrong")
            let heart = latestPost?.payload?.heart
            let heartPostId = myProfile?.heartPostId

            if (isNaN(heart) || !Array.isArray(heartPostId)) throw new Error("something went wrong")

            if (heartPostId.includes(id)) {

                console.log("already liked");
                setIsHearted(false)
                heart--
                heartPostId = heartPostId.filter((post_id) => post_id !== id)
                await updatePost(id, {
                    heart,
                })
                const value = await updateProfile(userData.uid, {
                    heartPostId,
                })
                const updatedProfile = await getProfile(userData.uid)

                dispatch(setProfileReducer({ profileData: updatedProfile }))
            } else {
                console.log("not liked");
                setIsHearted(true)
                heart++
                // heartPostId.push(id) 
                heartPostId = [...heartPostId, id]
                // console.log(heart);
                // console.log(heartPostId);

                await updatePost(id, {
                    heart,
                })
                const value = await updateProfile(userData.uid, {
                    heartPostId,
                })
                const updatedProfile = await getProfile(userData.uid)

                dispatch(setProfileReducer({ profileData: updatedProfile }))

            }

        } catch (error) {
            setIsHearted(null)
            console.log(error);
            dispatch({
                popupState: {
                    success: false,
                    message: error?.message
                }
            })
        }
    }
    console.log(post);

    return (
        <div className='border border-gray-300 mb-2 w-[95%] xl:w-[30%] lg:w-[30%] md:w-[30%]'>
            <img src={`${post.image.public_url}`} alt={post.title} />
            <Link to={`/view-post/${post.id}`} className='w-full'>
                <span>{post.author.username}</span>
                <h2 className='font-black'>{post.title}</h2>
                {/* <article>{parse(post.content)}</article> */}
            </Link>
            <div className='flex gap-2 items-center cursor-pointer' onClick={heartPost}>
                <FaHeart className={`${heartPostId.includes(post.id) ? "text-red-500" : "text-gray-400"}`} />
                <span>{post.heart}</span>
            </div>
        </div>
    )
}

export default PostCard