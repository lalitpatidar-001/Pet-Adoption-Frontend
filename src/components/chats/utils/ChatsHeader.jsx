import React from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from 'react-router-dom';

const ChatsHeader = () => {
  return (
    <div className='flex gap-3 items-center bg-white pl-2 h-[65px] shadow-sm border-b-2'>
      <Link to="/">
        <span className='cursor-pointer'><ArrowBackIcon /></span>
      </Link>
      <span className='text-xl font-bold font-mono'>Chats</span>
    </div>
  )
}

export default ChatsHeader