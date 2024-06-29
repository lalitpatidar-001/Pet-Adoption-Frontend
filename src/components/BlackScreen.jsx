import React from 'react'

function BlackScreen({isCreateOpened , setIsCreateOpened}) {
  return (
    <div onClick={()=>setIsCreateOpened(false)} className='w-[100vw] h-[100vh] bg-[rgba(0,0,0,0.6)] absolute top-0 overflow-hidden  z-40 '></div>
  )
}

export default BlackScreen