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
import ValidationFeedback from '../shared/ValidationFeedback';
import { handleRegisterationValidation } from '../utils/auth-validation/validation';

const initalValue =
    {
        fullname: "",
        username: "",
        password: "",
        email: "",
        contact: ""
    };
function Registration() {
    const navigate = useNavigate();
    const [userData, setUserData] = useState(initalValue);
    const [isLoading, setIsLoading] = useState(false);
    const [valdationErrors , setValidationErrors] = useState({});

    const handleUserData = (e) => {
        const { name, value } = e.target;
        setUserData(prevData => ({ ...prevData, [name]: value }));
    }




    const handleSubmitSignUp = async (e) => {
        e.preventDefault();

        // validating user inputs
        const result = handleRegisterationValidation(userData);
        setValidationErrors(result);

        // calling api if no validation errors
        if(Object.keys(result).length===0){
            console.log("calling api");
            try {
                setIsLoading(true);
                const response = await axiosInstance.post('/auth/register/', userData);
                // console.log(response)
                if (response.status === 201) {
                    toast.success("User Registered Successfully");
                    navigate("/login");
                }
            }
            catch (error) {
                console.log(error)
                if(error?.response?.status=== 400 && error?.response?.data?.errors[0]?.msg){
                    toast.error(error?.response?.data?.errors[0]?.msg);
                }
                else if (error?.response && error?.response?.data?.msg ) {
                    toast.error(error.response.data.msg)
                } 
                else {
                     toast.error("Something went wrong");
                }
            }finally{
                setIsLoading(false)
            }
        }
    }


   
    

    return (
        // container
        <div className='flex items-center justify-center min-h-[100vh]  bg-[#dddddd]'>
            {/* wrapper */}
         <div className="flex  max-w-[650px] ">

         <div className="flex-1 hidden sm:block rounded-l-lg overflow-hidden">
<img className="min-h-full" src={cover_photo}/>
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
                    <ValidationFeedback text={valdationErrors?.fullname}/>
                    <Inputbox
                    type="text"
                    placeholder="Enter username"
                    name="username"
                    value={userData.username}
                    onChange={handleUserData}
                    />
                      <ValidationFeedback text={valdationErrors?.username}/>
                    <Inputbox
                    type="password"
                    placeholder="Enter password"
                    name="password"
                    value={userData.password}
                    onChange={handleUserData}
                    />
                      <ValidationFeedback text={valdationErrors?.password}/>
                    <Inputbox
                    type="email"
                    placeholder="Enter email"
                    name="email"
                    value={userData.email}
                    onChange={handleUserData}
                    />
                      <ValidationFeedback text={valdationErrors?.email}/>
                    <Inputbox
                    type="number"
                    placeholder="Enter Phone Number"
                    name="contact"
                    value={userData.contact}
                    onChange={handleUserData}
                    />
                      <ValidationFeedback text={valdationErrors?.contact}/>
            
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