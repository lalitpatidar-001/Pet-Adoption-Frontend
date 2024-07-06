import React, { useContext, useEffect, useState } from 'react'
import Pet from '../Pet'
import axios from 'axios'
import { userContext } from '../../context/UserContextProvider';
import { useDispatch, useSelector } from 'react-redux';
import { addAllWishlists } from '../../redux/slices/wishlistSlice';
import axiosInstance from '../../axios';
import {toast} from "react-hot-toast"
import LoaderBox from '../../shared/LoaderBox';
import NoResult from '../../shared/NoResult';
const Wishlists = () => {
  const [isLoading, setIsLoading] = useState(false)
  const { User } = useContext(userContext);
  const {wishlists} = useSelector(state=>state.wishlist);
  const dispatch = useDispatch();
  useEffect(()=>{
    async function getWishlist (){
      try{
        setIsLoading(true);
        const response = await axiosInstance.get(`/user/wishlists/${User}`);
        if(response.status===200){
          dispatch(addAllWishlists({data:response.data.data}))
        }
      }catch(error){
        console.log(error)
        if(error.response?.status===404){
          dispatch(addAllWishlists({data:[]}))
        }else if(error?.response?.data?.msg){
          toast.error(error?.response?.data?.msg)
        }else{
          toast.error("somethin went wrong on server")
        }
      }finally{
        setIsLoading(false);
      }
    }
    getWishlist();
  },[User])


  if(isLoading) return <LoaderBox/>;
  if(wishlists.length<=0) return <NoResult/>
  return (
      <>

        {wishlists &&
          wishlists?.map((post) => {
            return <Pet key={post._id} {...post?.post} userId={post?.owner} />
          })
        }
      </>
 
  )
}

export default Wishlists