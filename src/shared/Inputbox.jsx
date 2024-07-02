import React from 'react'

const Inputbox = ({type, placeholder , name , value , onChange}) => {
  return (
    <input required className=' p-2 outline-none
    border-[1.5px] border-[#101010]
    rounded-[8px] placeholder:text-[#9FA2B4] placeholder:text-[14px] placeholder:font-[400]' type={type} placeholder={placeholder}
                    name={name} value={value} onChange={onChange} />
  )
}

export default Inputbox