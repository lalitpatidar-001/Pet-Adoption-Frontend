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

function SideBar({isCreateOpened ,setIsCreateOpened , page}) {
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
        <div className='flex-[2] h-[calc(100vh-10px)] sticky top-[8px] flex flex-col bg-white '>
            {/* wrapper */}
            <div>
                {/* logo */}
                <div className=' flex p-1 border-b-2 items-center gap-1'>
                <img className='w-[50px] h-[50px]' src={logo} alt="" />
                    <h1 className='text-xl font-bold '>Pet-Adoption</h1>
                </div>

                {/* menu */}
                <Link to='/'>
                <div className='flex gap-1 px-4 pt-5 '>
                <HomeIcon/>
                <span className='font-semibold'>Home</span>
                </div>
                </Link>

                <Link to={`/profile/${User}`}>
                <div className='flex gap-1 px-4 pt-5 '>
                <AccountBoxIcon/>
                <span className='font-semibold'>Profile</span>
                </div>
                </Link>
              
                {page!=="profile" && <div onClick={()=>setIsCreateOpened(!isCreateOpened)} className='flex gap-1 px-4 pt-5 cursor-pointer '>
                <AddBoxIcon/>
                <span className='font-semibold'>Create</span>
                </div>}

                <Link to={`/request/${User}`}>
                <div className='flex gap-1 px-4 pt-5 '>
                <AccountBoxIcon/>
                <span className='font-semibold'>Requests</span>
                </div>
                </Link>
                <Link to={`/applicant/${User}`}>
                <div className='flex gap-1 px-4 pt-5 '>
                <AccountBoxIcon/>
                <span className='font-semibold'>Applicants</span>
                </div>
                </Link>
                <Link to={`/chat/${User}`}>
                <div className='flex gap-1 px-4 pt-5 '>
                <AccountBoxIcon/>
                <span className='font-semibold'>Conversations</span>
                </div>
                </Link>
                <Link to={`/donate`}>
                <div className='flex gap-1 px-4 pt-5 '>
                <AccountBoxIcon/>
                <span className='font-semibold'>Donate Us</span>
                </div>
                </Link>
           
                <div className='flex gap-1 px-4 pt-5 ' onClick={handleLogout}>
                <LogoutOutlinedIcon />
                <span className='font-semibold'>Logout</span>
                </div>
                
               
            </div>
        </div>
    )
}

export default SideBar