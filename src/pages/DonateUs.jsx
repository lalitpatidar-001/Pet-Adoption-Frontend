import React from 'react'
import SideBar from '../components/SideBar'
import qr_code_photo from "../assets/phonepe_qr.jpeg"
const DonateUs = () => {
    return (
        <div className='flex gap-[2px] bg-[#dddddd] '>
            <SideBar />
            <div className='h-screen w-full flex-[6] flex flex-col justify-center items-center bg-white  shadow-sm '>
                <span className='text-2xl font-semibold text-purple-800'>Please Donate-Us</span>
                <img className=' h-[80vh]' src={qr_code_photo} />
                <span className='text-xl font-bold text-center'>Join a campaign to save the lives of pet animals and ensure they receive the </span>
                <span className='text-xl font-bold text-center'><span className='text-red-500'>Love</span>, <span className='text-green-500'>Care</span>, and <span className='text-yellow-500'>Protection</span> </span>
            </div>
        </div>
    )
}

export default DonateUs