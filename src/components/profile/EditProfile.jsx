import React, { useContext, useState } from 'react';
import CancelIcon from '@mui/icons-material/Cancel';
import { userContext } from '../../context/UserContextProvider';
import axios from 'axios';
import axiosInstance, { urlPath } from '../../axios';
import { editProfileValidation } from '../../utils/validations/profileValidation';
import ValidationFeedback from '../../shared/ValidationFeedback';
import {toast} from "react-hot-toast"
import LoaderBox from '../../shared/LoaderBox';
const initialState ={
    name: "",
    username: "",
    selectedGender: "",
    address: "",
    dob: "",
}
function EditProfile({ id,handleClose }) {
    console.log("iddd",id)
    const [isLoading, setIsLoading] = useState(false);
    const [profileImage, setprofileImage] = useState(null);
    const [details, setDetails] = useState(initialState);
    const [errors ,setErrors] = useState(false);
    const { User } = useContext(userContext);

    function hasNonEmptyString(details) {
        return Object.values(details).some(value => typeof value === 'string' && value.trim() !== '');
    }

    const handleProfileChangeSubmit = async (e) => {
        e.preventDefault();
        // validate data
        const result = editProfileValidation(details);
        setErrors(result) // set errors

        // validate atleast one field is filled
        const isOneInputIsNotEmpty = hasNonEmptyString(details) ||!!profileImage



        if(!isOneInputIsNotEmpty){
            return toast.error("atlesat fill one field to update");
        }

        if(Object.keys(result).length===0 && isOneInputIsNotEmpty ){
            try {
                const formData = new FormData();
                formData.append('fullname', details.name);
                formData.append('username', details.username);
                formData.append('gender', details.selectedGender);
                formData.append('address', details.address);
                formData.append('DOB', details.dob);
                formData.append('profileImage', profileImage);

                setIsLoading(true)
                const response = await axios.post(`${urlPath}/api/user/update?id=${id}`, formData,{
                    headers:{
                        "Content-Type":"multipart/form-data"
                    }
                });

                if(response.status===200){
                    // reseting data
                    setprofileImage(null);
                    setDetails(initialState);
                    handleClose(true)
                    toast.success("Profile updated Successfully")
                }
            
            } catch (error) {
                console.error('Error updating user profile:', error);
                if(error.response?.data?.msg){
                    toast.error(error.response?.data?.msg);
                }else{
                    toast.error("something went wrong on server");
                }
            }
            finally {
               setIsLoading(false);
            }
        }
        
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDetails((prev) => ({ ...prev, [name]: value }));
    };

    if(isLoading) return <LoaderBox customWidth="w-full"/> 

    return (<>

            <div className='  w-full overflow-y-auto  px-4 py-1 bg-white  h-fit flex items-center justify-center   ' >
               

                <form encType="multipart/form-data"
                    onSubmit={handleProfileChangeSubmit} 
                    className='w-full flex flex-col gap-4 items-start justify-center   '>
                    <div className='flex flex-col relative items-center self-center '>
                        {profileImage && <button className='absolute top-0 right-0' onClick={() => setprofileImage(null)}><CancelIcon /></button>}
                        <label className='bg-[#dddddd]  p-2 h-[150px] w-[150px] flex items-center justify-center rounded-[50%] font-semibold cursor-pointer overflow-hidden' htmlFor="choose-image">
                            {!profileImage ? "Choose Image" :
                                <img className='w-[100%] rounded-full' src={URL.createObjectURL(profileImage)} alt="" />
                            }</label>
                        <input className='w-[1px] h-[1px]' name="profileImage" type="file" id='choose-image' onChange={e => setprofileImage(e.target.files[0])} />
                    </div>

                    <div className='flex flex-col gap-[10px] justify-center w-[70%]'>
                        <div className='flex flex-col'>
                            <label className='font-semibold' htmlFor="name">Name </label>
                            <input onChange={handleChange} value={details.name} name='name' className='border-b-2 border-black p-1 rounded bg-transparent outline-none  ' type="text" placeholder='Enter pet name' />
                            <ValidationFeedback text={errors.name}/>
                        </div>
                        <div className='flex flex-col'>
                            <label className='font-semibold' htmlFor="username">Username</label>
                            <input onChange={handleChange} value={details.username} name='username' className='border-b-2 border-black p-1 rounded bg-transparent outline-none  ' type="text" placeholder='Enter new username' />
                            <ValidationFeedback text={errors.username}/>
                        </div>
                    </div>

                    <div className='flex flex-col gap-[10px]'>
                        <div className='flex flex-col'>
                            <label className='font-semibold' htmlFor="address">Address </label>
                            <input onChange={handleChange} value={details.address} name='address' className='border-b-2 border-black p-1 rounded bg-transparent outline-none  ' type="text" placeholder='Enter your address' />
                        </div>
                        <div className='flex flex-col'>
                            <label className='font-semibold' htmlFor="dob">Date of birth </label>
                            <input onChange={handleChange} value={details.dob} name='dob' className='border-b-2 border-black p-1 rounded bg-transparent outline-none  ' type="date" placeholder='Enter pet name' />
                        </div>
                    </div>

                    <div className='flex  flex-col self-start'>
                        <label className='font-semibold' htmlFor="selectedGender">Gender</label>
                        <div className='flex  justify-center pl-9 gap-1'>
                            <label className='font-semibold'>
                                <input
                                    type="radio"
                                    name="selectedGender"
                                    value="male"

                                    checked={details.selectedGender === 'male'}
                                    onChange={handleChange}
                                />
                                Male
                            </label>

                            <label className='font-semibold'>
                                <input
                                    type="radio"
                                    name="selectedGender"
                                    value="female"

                                    checked={details.selectedGender === 'female'}
                                    onChange={handleChange}
                                />
                                Female
                            </label>
                        </div>
                    </div>

                    <div className="flex gap-4 justify-around w-full">
                    <button type='button' onClick={handleClose} className='bg-red-400 text-white px-8 py-1 rounded font-semibold cursor-pointer self-center'>Cancel</button>
                    <button type='submit' className='bg-[#1877F2] text-white px-8 py-1 rounded font-semibold cursor-pointer self-center'>Update</button>
                    </div>


                    
                </form>
            </div>

    </>
    );
}

export default EditProfile;
