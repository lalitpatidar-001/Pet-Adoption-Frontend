import React, { useContext, useEffect, useState } from 'react'
import Pet from '../Pet'
import axios from 'axios'
import { userContext } from '../../context/UserContextProvider';
import { useDispatch, useSelector } from 'react-redux';
import { addAllWishlists } from '../../redux/slices/wishlistSlice';
import axiosInstance from '../../axios';

const Wishlists = () => {
  const { User } = useContext(userContext);
  const {wishlists} = useSelector(state=>state.wishlist);
  const dispatch = useDispatch();
  useEffect(()=>{
    async function getWishlist (){
      try{
        const response = await axiosInstance.get(`/user/wishlists/${User}`)
        console.log(response)
        console.log(response.data.data);
        dispatch(addAllWishlists({data:response.data.data}))
      }catch(error){
        console.log(error)
      }
    }
    getWishlist();
  },[User])
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