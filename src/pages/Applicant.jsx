import React, { useContext, useEffect,useState } from 'react'
import SideBar from '../components/SideBar'
import ApplicantCard from '../components/ApplicantCard'
import { userContext } from '../context/UserContextProvider';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addAllApplicants } from '../redux/slices/applicantSlice';
import axiosInstance from '../axios';
import NoResult from '../shared/NoResult';
import LoaderBox from '../shared/LoaderBox';

const Applicant = () => {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false)
    const { User, setUser } = useContext(userContext);
    const { applicants } = useSelector(state => state.applicant)
    const cleanedUserId = User?.replace(/"/g, '');

    useEffect(() => {
        async function getAllAplicants() {
            try {
                setIsLoading(true);
                const response = await axiosInstance.get(`/adoption-request/all-request/${cleanedUserId}`);
                if(response.status===200){
                    dispatch(addAllApplicants({ data: response.data.data }))
                }
            } catch (error) {
                if(error.response?.data?.msg){
                    taost.error(error.response?.data?.msg)
                }else{
                    toast.error("something went wrong on server");
                }
            }finally{
                setIsLoading(false);
            }
        }
        getAllAplicants();
    }, [User]);

    if(isLoading) return <LoaderBox customWidth="flex-[5]"/>
    if(applicants?.length<=0)return <NoResult/>
    
    return (
        <div className='flex  w-full'>
            {/* <SideBar /> */}
            <div className=' flex flex-col w-full gap-1 bg-[#dddddd] p-2'>
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