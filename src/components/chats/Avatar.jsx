import React from 'react'
import userAvatar from "../../assets/user-avatar.jpg"
import { STATIC_PATH } from '../../axios';
const Avatar = ({profileImage}) => {
    console.log("profileImage",profileImage);
    const fullPath  = STATIC_PATH + profileImage
    return (
        <div className='overflow-hidden '>
            <img className='h-12 w-12 rounded-full border-2 border-green-500' src={profileImage?fullPath:userAvatar} alt='avatar-img'/>
        </div>
    )
}

export default Avatar