import axios from 'axios'
import React,{useState} from 'react'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { deleteRequest } from '../redux/slices/requestSlice';
import { format } from "timeago.js"
import axiosInstance from '../axios'

export const RequestCard = ({ _id, status, pet, owner, updatedAt }) => {
    const [isLoading , setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const handleRequestCanecl = async () => {
        try {
            setIsLoading(true);
            const response = await axiosInstance.delete(`/adoption-request/cancel-request/${_id}`);
            if (response.status === 200) {
                dispatch(deleteRequest({ data: _id }));
                toast.success("Request canceled successfully");
            }
        } catch (error) {
            console.log(error)
            if(error?.response?.data?.msg){
                toast.error(error?.response?.data?.msg)
            }else{
                toast.error("something went wrong on server");
            }
        }finally{
            setIsLoading(false)
        }
    }


    return (
        <div className='bg-white py-2 px-1 w-full rounded flex lg:flex-row flex-col gap-1 lg:gap-0 justify-between lg:items-center shadow-xl'>
            <div className='flex flex-col '>
                <h2 className='text-xl font-semibold text-gray-500'>You have sent {pet.type} Adoption Request to {owner.username}</h2>
                <span className='text-gray-400 text-sm'>{format(updatedAt)}</span>
            </div>
            <div className='flex gap-2 items-center'>
                <Link to={`/pet/${pet._id}`}>
                    <button className='bg-blue-600 text-white font-bold rounded border-none p-1 ' >View Pet Info</button>
                </Link>
                {status === "pending" && <button 
                disable={isLoading}
                className={`
                ${isLoading&&"bg-red-100"} bg-red-600 text-white font-bold rounded border-none p-1 
                    `} onClick={handleRequestCanecl}>Cancel Request</button>}
                {status === "denied" && <span className='text-red-500 font-bold text-2xl'>Rejected</span>}
                {status === "adopted" && <span className='text-xl text-green-600 font-bold'>Adopted</span>}
            </div>
        </div>
    )
}
