import React, { useContext, useEffect } from 'react'
import SideBar from '../components/SideBar'
import { RequestCard } from '../components/RequestCard'
import { userContext } from '../context/UserContextProvider';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addAllRequest } from '../redux/slices/requestSlice';
import axiosInstance from '../axios';

const Reqeusts = () => {
  const dispatch = useDispatch();
  const { requests } = useSelector(state => state.request)
  const { User, setUser } = useContext(userContext);
  const cleanedUserId = User?.replace(/"/g, '');


  useEffect(() => {
    async function getAllRequest() {
      try {
        const response = await axiosInstance.get(`/adoption-request/all-sent-request/${cleanedUserId}`);
        console.log(response);
        console.log(response.data.data);
        dispatch(addAllRequest({ data: response.data.data }));
      }
      catch (error) {
        console.log(error)
      }
    }
    getAllRequest();
  }, [User]);
  return (
    <div className='flex'>
      <SideBar />
      <div className='flex-[6] flex flex-col gap-1 bg-[#dddddd] p-2  '>
        {
          requests?.map((item) => (
            <RequestCard key={item._id} {...item} />
          ))
        }
      </div>
    </div>
  )
}

export default Reqeusts