import React, { useContext, useEffect, useState } from 'react'
import Pet from '../Pet'
import axios from 'axios'
import { userContext } from '../../context/UserContextProvider';
import axiosInstance from '../../axios';
import LoaderBox from '../../shared/LoaderBox';
import {toast} from "react-hot-toast";
import NoResult from '../../shared/NoResult';
const Adoptions = () => {
  const [isLoading, setIsLoading] = useState(false)
  const { User } = useContext(userContext);
  const [adoptions ,setAdoptions] = useState([])
  useEffect(()=>{
    async function getAllAdoptions (){
      try{
        setIsLoading(true);
        const response = await axiosInstance.get(`/user/adoptions/${User}`)
        if(response.status===200){
          setAdoptions(response.data.data)
        }
      }catch(error){
        if(error?.response?.data?.msg){
          toast.error(error?.response?.data?.msg)
        }else{
          toast.error("something went wrong");
        }
      }finally{
        setIsLoading(false);
      }
    }
    getAllAdoptions();
  },[User]);


  if(isLoading) return <LoaderBox/>
  if(adoptions?.length<=0) return <NoResult/>
  return (
      <>
        {adoptions &&
          adoptions?.map((post) => {
            return <Pet key={post._id} {...post?.pet} userId={post?.owner} />
          })
        }
      </>
 
  )
}

export default Adoptions