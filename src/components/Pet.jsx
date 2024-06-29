import React, { useContext, useEffect, useState } from 'react';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import { Link } from 'react-router-dom';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import axios from 'axios';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HorizontalOptions from './HorizontalOptions';
import { userContext } from '../context/UserContextProvider';
import { useDispatch, useSelector } from 'react-redux';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { addAllWishlists, deleteWishlist, updateWishlist } from '../redux/slices/wishlistSlice';
import toast from 'react-hot-toast';
import axiosInstance, { STATIC_PATH } from '../axios';

function Pet({ _id, name, type, breed, age, gender, price, isNoFee, userId, image, status }) {
  const dispatch = useDispatch();
  const { wishlists } = useSelector(state => state.wishlist);
  const [isPostSaved, setIsPostSaved] = useState(wishlists?.some(item => item.post._id === _id));
  const { User } = useContext(userContext);
  const [isPostLike, setIsPostLike] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const imageAddress = image?.replace(/\\/g, '/');
  const imageURL = `${STATIC_PATH + imageAddress}`;

  const profileAddress = userId?.profileImage?.replace(/\\/g, '/');
  const profileURL = `${STATIC_PATH + profileAddress}`;

  useEffect(() => {
    setIsPostSaved(wishlists?.some(item => item.post._id === _id))
  }, [wishlists])

  useEffect(() => {
    async function getIslike(userId, _id) {
      try {
        const response = await axiosInstance.get(`/post/islike/${User}?postId=${_id}`);
        setIsPostLike(response.data.isLike);
      } catch (error) {
        console.log(error);
      }
    }
    getIslike(userId, _id);
  }, [User, userId, _id]);

  const handleLikeButton = async () => {
    try {
      const response = await axiosInstance.post(`/post/like/${User}?postId=${_id}`);
      if (response.status === 201) {
        setIsPostLike(response.data.isLike);
        toast.success("Liked Post")
      }
      if (response.status === 200) {
        setIsPostLike(response.data.isLike);
        toast.success("UnLiked Post")
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClickSavePost = async () => {
    try {
      const response = await axiosInstance.put(`/post/savepost/${User}/?postId=${_id}`);
      console.log(response)
      console.log(response.data.data)
      if (response.status === 201) {
        toast.success("Post added to wishlist")
        dispatch(updateWishlist({ data: response.data.data }));
      }
      if (response.status === 200) {
        dispatch(deleteWishlist({ data: _id }))
        toast.success("Post removed from wishlist")
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleMoreOptionClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className='w-full h-[95vh] flex flex-col p-1 shadow-lg bg-white border-1 border-[#bfbdbd] pb-2'>
      <div className='flex p-2 justify-between items-center'>
        <div className='flex gap-2'>
          <img className='w-[50px] h-[50px] overflow-hidden rounded-[50%]' src={profileURL} alt="profile-image" />
          <Link to={`/profile/${userId._id}`}>
            <h1 className=' cursor-pointer hover:text-blue-500 py-2 font-semibold text-xl'>{userId.username}</h1>
          </Link>
        </div>
        <div className='relative'>
          <MoreHorizIcon onClick={handleMoreOptionClick} />
          {isMenuOpen && <HorizontalOptions postId={_id} userId={userId._id} isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />}
        </div>
      </div>
      <Link to={`/pet/${_id}`}>
        <div className='h-[70vh] w-full' style={{
          backgroundImage: `url(${imageURL})`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "contain",
          aspectRatio: '16/11',
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
          {/* Content inside the background */}
        </div>
      </Link>


      <div className='flex flex-col w-[100%]'>
        <div className='flex justify-between'>
          <h2 className='capitalize font-bold'>
            <span className='text-[gray]'>Name:</span> {name}
          </h2>
          <h4 className='capitalize font-bold'>
            <span className='text-[gray]'>Age:</span> {age} yr
          </h4>
        </div>
        <div className='flex justify-between border-b-2'>
          <span className='capitalize font-bold'>
            <span className='text-[gray]'>Type:</span> {type}({gender})
          </span>
          <span className='capitalize font-bold'>
            <span className='text-[gray]'>Breed:</span> {breed}
          </span>
        </div>
        <div className='flex justify-between p-1'>
          <div className='flex gap-[10px] w-[100%]'>
            {isPostLike ? (
              <div className='flex items-center' onClick={handleLikeButton}>
                <FavoriteIcon style={{ color: "#F70086", cursor: "pointer" }} />
              </div>
            ) : (
              <div onClick={handleLikeButton} className='flex items-center'>
                <FavoriteBorderIcon className='self-start' style={{ cursor: "pointer" }} />
              </div>
            )}
            {!isPostSaved ? (
              <BookmarkBorderIcon onClick={handleClickSavePost} />
            ) : (
              <BookmarkIcon onClick={handleClickSavePost} />
            )}
          </div>
          <span className='text-green-700 font-semibold'>{status}</span>
        </div>
      </div>
    </div>
  );
}

export default Pet;
