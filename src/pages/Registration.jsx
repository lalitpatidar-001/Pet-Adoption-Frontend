import React, { useState } from 'react'
import { Link, json, useNavigate } from 'react-router-dom';
import axios from 'axios';
import axiosInstance from '../axios';
import {toast} from "react-hot-toast"
import cover_photo from "../assets/cover-registration.jpg"
import Inputbox from '../shared/Inputbox';
import ButtonPrimary from '../shared/ButtonPrimary';
import AuthActions from '../shared/AuthActions';
import AuthHeader from '../shared/AuthHeader';
function Registration() {
    const navigate = useNavigate();

    const initalValue =
    {
        fullname: "",
        username: "",
        password: "",
        email: "",
        contact: ""
    };
    const [userData, setUserData] = useState(initalValue);
    const [isLoading, setIsLoading] = useState(false);

    const handleUserData = (e) => {
        const { name, value } = e.target;
        setUserData(prevData => ({ ...prevData, [name]: value }));
    }

    const handleSubmitSignUp = async (e) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            const response = await axiosInstance.post('/auth/register/', userData);
            if (response.status === 201) {
                toast.success("User Registered Successfully");
                navigate("/login");
            }
        }
        catch (error) {
            if (error.response && error.response.data.msg ) {
                toast.error(error.response.data.msg)
            } else {
                 toast.error("Something went wrong");
            }
        }finally{
            setIsLoading(false)
        }
    }

    return (
        // container
        <div className='flex items-center justify-center h-[100vh]  bg-[#dddddd]'>
            {/* wrapper */}
         <div className="flex  max-w-[650px] ">

         <div className="flex-1 hidden sm:block rounded-l-lg overflow-hidden">
<img className="h-[464px]" src={cover_photo}/>
          </div>
          <div className='flex flex-1 flex-col h-[] gap-[20px] bg-white  sm:p-3 p-4 w-full sm:w-[300px] py-8  rounded-r-lg '>

                <AuthHeader
                heading="Register to Pet-Adoption"
                message="Welcome, fill details to create account"
                />
                {/* <h1 className='text-3xl '>Register here</h1> */}
                <form onSubmit={handleSubmitSignUp} className='flex flex-col gap-3 '>

                    <Inputbox
                    type="text"
                    name="fullname"
                    placeholder="Enter fullname"
                    value={userData.fullname}
                    onChange={handleUserData}
                    />

                    <Inputbox
                    type="text"
                    placeholder="Enter username"
                    name="username"
                    value={userData.username}
                    onChange={handleUserData}
                    />
                    <Inputbox
                    type="password"
                    placeholder="Enter password"
                    name="password"
                    value={userData.password}
                    onChange={handleUserData}
                    />
                    <Inputbox
                    type="email"
                    placeholder="Enter email"
                    name="email"
                    value={userData.email}
                    onChange={handleUserData}
                    />
                    <Inputbox
                    type="number"
                    placeholder="Enter Phone Number"
                    name="contact"
                    value={userData.contact}
                    onChange={handleUserData}
                    />
            
            <ButtonPrimary 
            isLoading={isLoading
            }
            title="Sign Up"
            type="submit"
            />
                   
                    <AuthActions
                    path="/login"
                    message="Already user?"
                    text="Login here"
                    />
                </form>
            </div>

         </div>
        </div>
    )
}

export default Registration