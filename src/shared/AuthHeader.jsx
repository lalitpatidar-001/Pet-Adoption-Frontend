import React from 'react'
import logo from "../assets/pet-logo.png"
const AuthHeader = ({heading,message}) => {
  return (
    <div className="flex flex-col  items-start justify-center">
    <div className="flex items-center">
        <img className="h-10 w-10 rounded-full" src={logo} alt="pet_logo"/> 
   <div className="leading-[25px]">
   <h1 className="sm:text-[24px] text-[20px]  text-[#252733] font-[600]">{heading}</h1>
   <span className="text-[14px]  text-[#9FA2B4] font-[400]">{message}</span>
   </div>
    </div>
</div>
  )
}

export default AuthHeader