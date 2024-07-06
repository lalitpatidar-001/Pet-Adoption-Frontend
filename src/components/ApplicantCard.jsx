import axios from 'axios'
import React ,{useState} from 'react'
import { Link } from 'react-router-dom'
import { format } from "timeago.js"
import { toast } from "react-hot-toast"
import { useDispatch } from 'react-redux'
import { updateApplicantStatus } from '../redux/slices/applicantSlice'
import axiosInstance from '../axios'

const ApplicantCard = ({ _id, createdAt, owner, status, pet, requester }) => {
    const dispatch = useDispatch();
    const [isAcceptLoading, setIsAcceptLoading] = useState(false);
    const handleAcceptRequest = async () => {
        try {
            setIsAcceptLoading(true);
            const response = await axiosInstance.put(`/adoption-request/accept-request/${_id}`);
            if (response.status === 200) {
                dispatch(updateApplicantStatus({ data: _id }))
                toast.success("Accepted Adoption Successfully");
            }
        } catch (error) {
            console.log(error)
            if(error.response?.data?.msg){
                toast.error(error.response?.data?.msg)
            }else{
                toast.error("Something went wrong on server");
            }
        }finally{
            setIsAcceptLoading(false);
        }
    }


    return (
        <div className='bg-white flex flex-col gap-1 lg:gap-0 lg:flex-row  justify-between lg:items-center p-2 shadow-xl rounded '>
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
                    <button 
                    className={`
                    sm:text-[16px] text-[12px]  bg-red-500 text-white font-bold rounded border-none px-2 py-1`}>Reject Adoption</button>

                    <button 
                    disable={isAcceptLoading}
                    className={`
                    ${isAcceptLoading&&"bg-red-100"}
                    sm:text-[16px] text-[12px]  bg-blue-500 text-white font-bold rounded border-none px-2 py-1`} onClick={handleAcceptRequest}>Accept Adoption</button>
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