import React, { useContext, useEffect, useState } from 'react'
import Pet from './Pet'
// import Createpet from './Createpet'
import axios from 'axios';
// import { petContext } from '../context/petContext';
import { useDispatch, useSelector } from 'react-redux';
import { addAllPets } from '../redux/slices/petSlice';
import axiosInstance from '../axios';
import NoResult from '../shared/NoResult';

function Pets({}) {
  const {pets} = useSelector(state=>state.pet);
  const dispatch = useDispatch();



  if(pets?.legnth<=0) return <NoResult/>

  return (
    <>
      <div className=' flex flex-[5] flex-col gap-10 outline-nond items-center   gap-y-[5px] flex-wrap relative  '>
       {
        pets  && pets?.map((pet)=>{
         return  <Pet {...pet} key={pet._id}/>
        })
       }
      </div>
    </>
  )
}

export default React.memo(Pets)