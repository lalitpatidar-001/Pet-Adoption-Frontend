import React from 'react'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import { Link } from 'react-router-dom';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'


function PetProfile({ props }) {
    return (
        // wrapper

        <Link to="/pet/1">
            <div className='w-[70%] p-2   shadow-lg bg-white  border-1 border-[#bfbdbd]'>

                {/* user details */}
                <div className='flex  p-2 justify-between items-center'>
                    <div className='flex gap-2'>
                        <img className='w-[50px] rounded-[50%]' src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" />
                        <h1 className='py-2
                font-semibold text-xl'>lalitpatidar-001</h1>
                    </div>
                    <div>
                        <MoreHorizIcon />
                    </div>
                </div>

                <img className='w-[100%] h-[px]' src="https://images.pexels.com/photos/1490908/pexels-photo-1490908.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="dogs-images" />

                {/* details */}
                <div className='flex flex-col w-[100%]'>
                    <div className='flex justify-between '>
                        <h2 className='capitalize font-bold'> <span className='text-[gray]  '>Name : </span>rocky</h2>
                        <h4 className='capitalize font-bold'><span className='text-[gray]'>Age : </span>4 yr</h4>
                    </div>
                    <div className='flex justify-between border-b-2'>
                        <span className='capitalize font-bold'><span className='text-[gray]'>Type : </span>Dog(M)</span>

                        <span className='capitalize font-bold'><span className='text-[gray]'>Breed : </span>labrador</span>
                    </div>
                    {/* actions */}
                    <div className='flex justify-between p-1 ]'>

                        <div className='flex  gap-[10px] w-[100%]'>
                            <FavoriteBorderIcon className='self-start' />
                            <BookmarkBorderIcon />
                            <SendOutlinedIcon />

                        </div>
                        <span className='text-green-700 font-semibold'>Available</span>
                    </div>
                </div>
            </div>

        </Link>
    )
}

export default PetProfile;