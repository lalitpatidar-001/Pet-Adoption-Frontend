import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from "axios"
import { useDispatch, useSelector } from 'react-redux';
import { userContext } from '../context/UserContextProvider';
import toast from 'react-hot-toast';
import { updateRequest } from '../redux/slices/requestSlice';
import SideBar from '../components/SideBar';
import { setCurrentChat, updateChats } from '../redux/slices/chatSlice';
import axiosInstance, { STATIC_PATH } from '../axios';

function PetInfo() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { requests } = useSelector(state => state.request);
    const { User, setUser } = useContext(userContext);
    const cleanedUserId = User?.replace(/"/g, '');
    const [isAlreadyRequested, setIsAlreadyRequested] = useState(requests.some(item => item.pet._id === id));
    const [postData, setPostData] = useState({});

    const imageAddress = postData.image?.replace(/\\/g, '/');
    const imageURL = `${STATIC_PATH + imageAddress}`;

    console.log("isAlreadyRequested", isAlreadyRequested)
    console.log("isAlreadyRequested", isAlreadyRequested)
    useEffect(() => {
        async function getPostData(postId) {
            try {
                const response = await axiosInstance.get(`/post/get/${postId}`);
                console.log(response)
                console.log("post data", response.data.post)
                setPostData(response.data.post)
            } catch (error) {
                console.log(error)
            }
        }
        getPostData(id);
    }, [id])

    useEffect(() => {
        console.log(requests)
        setIsAlreadyRequested(requests.some(item => item.pet._id === id))
    }, [requests, id])

    const handleRequestSendClick = async () => {
        try {
            const response = await axiosInstance.post("/adoption-request/add-request/",
                {
                    ownerId: postData.userId,
                    petId: postData._id,
                    requesterId: cleanedUserId,
                });
            console.log(response.data)
            if (response.status === 201) {
                toast.success("Adoption request sent successfully");
                dispatch(updateRequest({ data: response.data.data }))
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleChatContactClick = async () => {
        try {
            const response = await axiosInstance.post("/chat/create-chat",
                {
                    memberOne: User,
                    memberTwo: postData.userId
                });
            if (response.status === 200) {
                // chat already exist
                console.log(" chat exists")
                dispatch(setCurrentChat({ data: response.data.data }));
                navigate(`/chat/${User}`);
            }
            if (response.status === 201) {
                // new chat created
                console.log("new chat created")
                dispatch(updateChats({ data: response.data.data }));
                dispatch(setCurrentChat({ data: response.data.data }));
                navigate(`/chat/${User}`);
            }
            console.log(response);
            console.log(response.data.data);
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='flex'>
            {/* <Navbar /> */}
            {/* container */}
            <SideBar page="profile" />
            <div className='flex flex-[7] justify-center bg-[#dddddd] p-2 '>
                {/* wrapper */}

                <div className='w-full  flex p-4 bg-white h-[calc(100vh-66px)] items-center relative '>


                    <Link to='/'>
                        <div className='flex items-center absolute top-2 left-[2px] rounded-[50%] bg-[#dddddd]'  >
                            <ArrowBackIcon />
                        </div>
                    </Link>

                    <div className=' flex-1 p-4 flex flex-col justify-between h-[70vh]'>
                        <div >
                            <div className='flex justify-between'>
                                <h1 className='text-2xl font-bold '>{postData.name}  ({postData.type})</h1>

                            </div>
                            <div className='flex justify-between items-center'>
                                <div>
                                    <span className='text-xl text-[gray]  '>Gender : </span>
                                    <span className='text-xl'>{postData.gender}</span>
                                </div>
                                <div >
                                    <span className='text-xl'>{postData.breed} | {postData.age}yr</span>
                                </div>
                            </div>
                            <span className='font-bold text-green-700'>{postData.status}</span>

                            <div className='flex mt-[10px]'>
                                <p> <span className=' font-semibold ' >Health : </span>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sit itaque similique asperiores? </p>
                            </div>

                            <div className='flex mt-[10px]'>
                                <p> <span className=' font-semibold ' >Location : </span>Indore, M.P.</p>
                            </div>
                            <div className='flex mt-[10px] gap-[5px]'>
                                <span className=' font-semibold ' >Adoption Fee : </span><span className='font-semibold'>{postData.isNoFee ? "No Fee" : postData.price} </span>
                            </div>

                            <p className='mt-[10px]'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repellat quisquam, qui odio nostrum dolorum nisi blanditiis dolore obcaecati corporis quibusdam.</p>

                        </div>
                        {

                            <div className='flex gap-[10px] '>
                                {User !== postData.userId && <>
                                    {!isAlreadyRequested ? <button className='bg-[#007BE5] rounded px-2 text-white font-semibold flex-1 '
                                        onClick={handleRequestSendClick}
                                    >
                                        Request To Adopt
                                    </button>
                                        :
                                        <button className='bg-gray-300 cursor-default text-gray-600 rounded px-2 font-bold'>Already Requested</button>
                                    }

                                    <button className='bg-[#007BE5] rounded px-2 text-white font-semibold flex-1' onClick={handleChatContactClick}>Chat Contact</button>
                                </>}
                            </div>
                        }
                    </div>
                    <div className='flex-[2] h-[70vh] overflow-hidden '>
                        <img className='w-full h-full' src={imageURL} alt="" />


                    </div>
                </div>
            </div>
        </div>
    )
}

export default PetInfo