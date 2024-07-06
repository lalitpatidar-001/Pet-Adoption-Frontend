import React,{useContext} from 'react'
import { userContext } from '../../context/UserContextProvider';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

const ProfileCard = ({
    profileImageURL,
    userPosts,
    userData,
    postCount,
    setIsEditProfileModelOpen}) => {
    const { User, setUser } = useContext(userContext);

    const dumyUrl = "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=600";
  return (
    <div className='flex p-5 pl-5 lg:gap-[40px] justify-center ' >

    <img className='sm:w-[100px] sm:h-[100px] h-[60px] w-[60px] rounded-[50%]' src={profileImageURL?
        profileImageURL : dumyUrl} alt="profile-image" />

    <div className='sm:px-4 px-2 py-2 flex flex-col'>
        <h1 className='text-xl font-semibold'>{userData.username}</h1>
        <span className='font-semibold'>{postCount}post</span>
        {userData._id === User &&
            <span onClick={() => setIsEditProfileModelOpen(prev=>!prev)} className=' mt-2 font-bold rounded text-center cursor-pointer bg-[#dddddd]'>Edit Profile</span>
        }
    </div>
    {/* options */}
    <div className='py-2 cursor-pointer'>
        <MoreHorizIcon />
    </div>
</div>
  )
}

export default ProfileCard