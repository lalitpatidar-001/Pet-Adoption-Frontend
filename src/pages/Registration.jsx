import React, { useState } from 'react'
import { Link, json, useNavigate } from 'react-router-dom';
import axios from 'axios';
import axiosInstance from '../axios';
import {toast} from "react-hot-toast"
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
        setIsLoading(true);

        try {
            const response = await axiosInstance.post('/auth/register/', userData);
            setIsLoading(false);
            console.log(response.data);
            if (response.status === 201) {
                toast.success("User Registered Successfully");
                navigate("/login");
            }

        }
        catch (error) {
            setIsLoading(false);
            if (error.response && error.response.data.msg ) {
                toast.error(error.response.data.msg)
            } else {
                 toast.error("Something went wrong");
            }
        }
    }

    return (
        // container
        <div className='flex items-center justify-center h-[100vh] w-[100vw] bg-[#dddddd]'>
            {/* wrapper */}
            <div className='flex flex-col gap-[20px] bg-white w-fit h-fit p-8  rounded '>
                <h1 className='text-3xl '>Register here</h1>
                <form onSubmit={handleSubmitSignUp} className='flex flex-col gap-3 '>
                    <input required className='p-2 border-b-2 outline-none' type="text" placeholder='Full Name'
                        name='fullname' value={userData.fullname} onChange={handleUserData} />
                    <input required className='p-2 border-b-2 outline-none' type="text" placeholder='Username'
                        name='username' value={userData.username} onChange={handleUserData} />
                    <input required className='p-2 border-b-2  outline-none' type='password' placeholder='Password'
                        name='password' value={userData.password} onChange={handleUserData} />
                    <input required className='p-2 border-b-2  outline-none' type='email' placeholder='email address'
                        name='email' value={userData.email} onChange={handleUserData} />
                    <input required className='p-2 border-b-2  outline-none' type='number' placeholder='Phone Number '
                        name='contact' value={userData.contact} onChange={handleUserData} />
                    <button disabled={isLoading && true} className={`p-2 px-4 border-none bg-[#5551FF] rounded text-white font-semibold w-fit ${isLoading && "bg-[#a9a8e9]"} `} type='submit'>Sign In</button>
                    <span>already user? <Link to=
                        "/login"><span className='text-[#5551FF]'>Login here</span></Link></span>
                </form>
            </div>
        </div>
    )
}

export default Registration