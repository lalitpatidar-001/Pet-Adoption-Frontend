import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/pet-logo.png' ;
import HomeIcon from '@mui/icons-material/Home';
import AddBoxIcon from '@mui/icons-material/AddBox';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import CreatePost from './CreatePost';
import { userContext } from '../context/UserContextProvider';
import axiosInstance from '../axios';
import {toast} from "react-hot-toast"
import CreatePostModel from './models/CreatePostModel';

function SideBar( {page}) {
    const [isCreatePostModelOpen , setIsCreatePostModelOpen] = useState(false);
    const navitgate = useNavigate();
    const {User,setUser} = useContext(userContext);

    const handleLogout = async()=>{
        try{
            const response = await axiosInstance.get("/auth/logout");
            console.log(response);
            if(response.status===200) {
                localStorage.removeItem("user-data");
                setUser(null);
                toast.success("Logged Out Successfully")
                navitgate("/login");
            }
        }catch(error){
            console.log(error);
            toast.error("can not logout, try again")
        }
        
    }

    return (
        // container
        <div className='sm:w-[200px]    flex h-[calc(100vh-10px)] sticky  top-[4px] sm:top[8px]  bg-white'>
            {/* wrapper */}
            <div className="flex flex-col    bg-white">
                {/* logo */}
                <div className='  flex p-1 border-b-2 items-center justify-center gap-1'>
                <img className='w-[30px] h-[30px]' src={logo} alt="" />
                    <h1 className='text-sm sm:block hidden font-bold '>Pet-Adoption</h1>
                </div>

                {/* menu */}
                <Link to='/'>
                <div className='flex gap-1 sm:px-4 px-2 pt-5 '>
                <HomeIcon/>
                <span className='  hidden sm:block font-semibold'>Home</span>
                </div>
                </Link>

                <Link to={`/profile/${User}`}>
                <div className='flex gap-1 sm:px-4 px-2 pt-5 '>
                <AccountBoxIcon/>
                <span className='hidden sm:block font-semibold'>Profile</span>
                </div>
                </Link>
              
                {page!=="profile" && <div onClick={()=>setIsCreatePostModelOpen(!isCreatePostModelOpen)} className='flex gap-1 sm:px-4 px-2 pt-5 cursor-pointer '>
                <AddBoxIcon/>
                <span className='hidden sm:block font-semibold'>Create</span>
                </div>}

                <Link to={`/request/${User}`}>
                <div className='flex gap-1 sm:px-4 px-2 pt-5 '>
                <AccountBoxIcon/>
                <span className='hidden sm:block font-semibold'>Requests</span>
                </div>
                </Link>
                <Link to={`/applicant/${User}`}>
                <div className='flex gap-1 sm:px-4 px-2 pt-5 '>
                <AccountBoxIcon/>
                <span className='hidden sm:block font-semibold'>Applicants</span>
                </div>
                </Link>
                <Link to={`/chat/${User}`}>
                <div className='flex gap-1 sm:px-4 px-2 pt-5 '>
                <AccountBoxIcon/>
                <span className='hidden sm:block font-semibold'>Conversations</span>
                </div>
                </Link>
                <Link to={`/donate`}>
                <div className='flex gap-1 sm:px-4 px-2 pt-5 '>
                <AccountBoxIcon/>
                <span className='hidden sm:block font-semibold'>Donate Us</span>
                </div>
                </Link> 
           
                 <div className='flex gap-1 sm:px-4 px-2 pt-5 ' onClick={handleLogout}>
                <LogoutOutlinedIcon />
                <span className='hidden sm:block font-semibold'>Logout</span>
                </div>
                
               
            </div>

            <CreatePostModel
            isCreatePostModelOpen={isCreatePostModelOpen}
            setIsCreatePostModelOpen={setIsCreatePostModelOpen}/>
        </div>
    )
}

export default SideBar