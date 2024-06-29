import axios from 'axios'
import React from 'react'
import { Link } from 'react-router-dom'
import { format } from "timeago.js"
import { toast } from "react-hot-toast"
import { useDispatch } from 'react-redux'
import { updateApplicantStatus } from '../redux/slices/applicantSlice'
import axiosInstance from '../axios'

const ApplicantCard = ({ _id, createdAt, owner, status, pet, requester }) => {
    const dispatch = useDispatch();
    // const { User, setUser } = useContext(userContext);
    // const cleanedUserId = User?.replace(/"/g, '');
    const handleAcceptRequest = async () => {
        try {
            const response = await axiosInstance.put(`/adoption-request/accept-request/${_id}`);
            console.log(response)
            console.log(response.data.data)
            if (response.status === 200) {
                dispatch(updateApplicantStatus({ data: _id }))
                toast.success("Accepted Adoption Successfully");
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className='bg-white flex justify-between items-center p-2 shadow-xl rounded '>
            <div className='flex flex-col justify-start'>
                <h2 className='text-xl font-semibold text-gray-500'>{requester.username} {status === "adopted" ?"had":"has"} sent request to adopt your {pet.type}</h2>
                <div className='flex gap-3 items-center'>
                    <span className='text-sm text-gray-400'>{format(createdAt)}</span>
                    <Link to={`/profile/${requester?._id}`}>
                        <span className='text-blue-600 cursor-pointer font-semibold'>view applicant</span>
                    </Link>
                </div>
            </div>
            {status !== "adopted" &&
                <div className='flex gap-2'>
                    <button className='bg-red-500 text-white font-bold rounded border-none px-2 py-1'>Reject Adoption</button>
                    <button className='bg-blue-500 text-white font-bold rounded border-none px-2 py-1' onClick={handleAcceptRequest}>Accept Adoption</button>
                </div>
            }
            {status === "adopted" &&
                <span className='text-xl text-green-600 font-bold'>
                    Accepted
                </span>
            }
        </div>
    )
}

export default ApplicantCard