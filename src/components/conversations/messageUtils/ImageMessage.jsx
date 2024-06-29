import React from 'react'
import { STATIC_PATH } from '../../../axios'

const ImageMessage = ({ User, scrollRef, text, image, from, createdAt }) => {

    const fullPath = STATIC_PATH + image
    return (
        <div ref={scrollRef} className={`w-full flex ${User === from ? "justify-end " : "justify-start"}`}>
            <div className={`flex flex-col gap-2  max-w-[90%] w-fit p-1 rounded ${User === from ? "bg-blue-500 text-white" : "bg-gray-300"} relative`}>

                <img className='max-h-[50vh] w-[400px] ' src={fullPath} alt="message-image" />
                <div className=' absolute right-2 bottom-2 flex gap-[2px] justify-end'>
                    <span className='text-xs self-end '>12: 00 pm</span>
                    {User === from && <span className='text-xs self-end'>tik</span>}
                </div>
            </div>
        </div>
    )
}

export default ImageMessage