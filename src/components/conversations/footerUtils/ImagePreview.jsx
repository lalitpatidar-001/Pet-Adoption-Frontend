import React from 'react'

const ImagePreview = ({image,setImageMessage}) => {
    if(!image){
        return
    }
  return (
    <div className='absolute -top-[410px] p-2 w-[90%]  flex justify-center  bg-white'>
    <span className='absolute top-1 right-1 bg-gray-400 text-xl h-6  w-6 cursor-pointer  flex items-center justify-center'
    onClick={()=>setImageMessage(null)}
    >x</span>
    <img className='h-[400px] w-[400px] ' src={URL.createObjectURL(image)} alt="image-preview"/>
    </div>

  )
}

export default ImagePreview