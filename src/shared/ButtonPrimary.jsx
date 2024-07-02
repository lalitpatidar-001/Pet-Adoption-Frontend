import React from 'react'

const ButtonPrimary = ({
    isLoading,
    title,
    type

}) => {
  return (
   <button disabled={isLoading} className={`bg-[#101010] rounded-[8px] w-full font-bold text-white p-2 ${isLoading && "bg-[#a9a8e9]"}`} type={type}>
                        {title}
                    </button>
  )
}

export default ButtonPrimary