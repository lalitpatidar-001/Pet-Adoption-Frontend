import React, { useContext, useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import SideBar from '../components/SideBar';
import Pet from '../components/Pet';
import PetProfile from '../components/PetProfile';
import CancelIcon from '@mui/icons-material/Cancel';
import { useParams } from 'react-router-dom';
import { userContext } from '../context/UserContextProvider';
import axios from 'axios';

import Posts from '../components/profile/Posts';
import Adoptions from '../components/profile/Adoptions';
import Wishlists from '../components/profile/Wishlists';
import axiosInstance, { STATIC_PATH } from '../axios';
import {toast} from "react-hot-toast"
import {useNavigate} from "react-router-dom";
import EditProfileModel from '../components/models/EditProfileModel';
import CenteredTabs from '../shared/Tab';
import LoaderBox from '../shared/LoaderBox';
import ProfileCard from '../components/profile/ProfileCard';


function Profile() {
    const { id } = useParams();
    const [isEditProfileModelOpen , setIsEditProfileModelOpen] = useState(false)
    const [postCount , setPostCount] = useState(0);
    const [userPosts, setUserPosts] = useState([]);
    const { User, setUser } = useContext(userContext);
    const [userData, setUserData] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [profileImageURL, setProfileImageURL] = useState(null);
    const [value, setValue] = useState(0);
    const navigate = useNavigate();

// get the user
    useEffect(() => {
        async function getUser() {
            try {
                setIsLoading(true);
                const response = await axiosInstance.get(`/user/${id}`);
                console.log("user",response);
                setIsLoading(false)
               
                if(response.status===200){
                    setUserData(response.data);
                }
            } catch (error) {
                console.log(error)
                if(error?.response?.data?.msg){
                    toast.error(error?.response?.data?.msg);
                    navigate("/");
                }else{
                    toast.error("Something went wrong , try again");

                }
            }finally{
                setIsLoading(false);
            }
        }
        if (id) getUser();
    }, [id]);


    useEffect(() => {
        if(isLoading) return
        setProfileImageURL(() => {
            // no profile image
            if(!userData?.profileImage) return null

            if(userData?.profileImage?.startsWith("profiles/")){ 
                const imageAddress = userData.profileImage
                const imageUrl = `${STATIC_PATH + imageAddress}`;
                return imageUrl
            }
            return null
           
        })
    }, [userData])

 

   
    if(isLoading) return <LoaderBox customWidth="flex-[5]"/>
 
    return (
        // container
        <>
           
                <div className='flex relative overflow-hidden w-full'>

                    <div className='flex  flex-col  w-full items-center bg-[#dddddd]  min-h-[100vh] p-2'>
                        {/* wrapper */}

                        <div className='  bg-white p-4 flex flex-col items-center w-full '>
                            {/* profile */}
                            <ProfileCard
                                profileImageURL={profileImageURL}
                                userPosts={userPosts}
                                userData={userData}
                                setIsEditProfileModelOpen={setIsEditProfileModelOpen}
                                postCount={postCount}
                            />

                            {/* switch tabs */}
                            <CenteredTabs id={id} User={User} value={value} setValue={setValue} />


                            {/* posts */}
                            <div className='flex flex-col items-center gap-2 w-full max-w-[500px] border-t-2'>
                                {value === 0 && <Posts setPostCount={setPostCount}  />}
                                {value === 1 && <Adoptions />}
                                {User === id && (value === 2 && <Wishlists id={id} />)}
                            </div>
                        </div>
                    </div>


                    <EditProfileModel
                    id={id}
                    isEditProfileModelOpen={isEditProfileModelOpen}
                    setIsEditProfileModelOpen={setIsEditProfileModelOpen}
                    />
                </div>
                

        </>
    )
}

export default Profile