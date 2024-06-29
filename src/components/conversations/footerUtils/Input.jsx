import React from 'react'

const Input = ({message,setMessage}) => {

    const handleChangeInput = (e)=>{
        setMessage((prev)=>(e.target.value));
    }

    return (
        <div className='w-full rounded  bg-gray-200'>
            <input onChange={handleChangeInput} value={message} type='text' className='w-full py-2 px-1
             outline-none rounded bg-transparent
         ' placeholder='send message...' />
        </div>
    )
}

export default Input