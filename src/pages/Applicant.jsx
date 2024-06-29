import React, { useContext, useEffect } from 'react'
import SideBar from '../components/SideBar'
import ApplicantCard from '../components/ApplicantCard'
import { userContext } from '../context/UserContextProvider';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addAllApplicants } from '../redux/slices/applicantSlice';
import axiosInstance from '../axios';

const Applicant = () => {
    const dispatch = useDispatch();
    const { User, setUser } = useContext(userContext);
    const { applicants } = useSelector(state => state.applicant)
    const cleanedUserId = User?.replace(/"/g, '');

    useEffect(() => {
        async function getAllAplicants() {
            try {
                const response = await axiosInstance.get(`/adoption-request/all-request/${cleanedUserId}`);
                console.log(response)
                console.log(response.data.data);
                dispatch(addAllApplicants({ data: response.data.data }))
            } catch (error) {
                console.log(error)
            }
        }
        getAllAplicants();
    }, [User])
    return (
        <div className='flex  '>
            <SideBar />
            <div className='flex-[6] flex flex-col gap-1 bg-[#dddddd] p-2'>
                {
                    applicants?.map((applicant) => (
                        <ApplicantCard key={applicant._id} {...applicant} />
                    ))
                }
            </div>
        </div>
    )
}

export default Applicant