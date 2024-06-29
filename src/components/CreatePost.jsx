import React, { useContext, useState } from 'react';
import CancelIcon from '@mui/icons-material/Cancel';
import axios from 'axios';
import { userContext } from '../context/UserContextProvider';
import { useDispatch } from "react-redux";
import { updatePets } from '../redux/slices/petSlice';
import axiosInstance, { urlPath } from '../axios';


function CreatePost({ isCreateOpened, setIsCreateOpened, setIsPostLoading }) {
  const { User } = useContext(userContext);
  const dispatch = useDispatch();
  const [isNoFeeChecked, setIsNoFeeChecked] = useState(false);

  const [image, setImage] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    breed: '',
    age: '',
    gender: 'male',
    price: '',
  });


  const handlePostSubmit = async (e) => {
    e.preventDefault();
    // Prepare the form data
    const postData = new FormData();
    postData.append('name', formData.name);
    postData.append('type', formData.type);
    postData.append('breed', formData.breed);
    postData.append('age', formData.age);
    postData.append('gender', formData.gender);
    postData.append('price', formData.price);
    postData.append('image', image);
    postData.append('isNoFee', isNoFeeChecked);
    console.log(postData);
    try {
      setIsPostLoading(true)
      const response = await axios.post(`${urlPath}/api/post/createpost/${User}`, postData,
        {
          headers:{
            "Content-Type":"multipart/form-data"
          }
        }
      );

      // Handle the response, you can log it for now
      console.log('API Response:', response.data.post);
      dispatch(updatePets({ data: response.data.post }))

      // Reset the form after successful submission
      setFormData({
        name: '',
        type: '',
        breed: '',
        age: '',
        gender: 'male',
        price: '',
      })
      setImage(null);
      setIsNoFeeChecked(false);
      setIsCreateOpened(false);
    } catch (error) {
      console.error('Error:', error);
      // Handle error (show a message to the user, etc.)
    }
    finally {
      setIsPostLoading(false)
    };
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };



  return (
    <div className='absolute z-40 w-[500px] h-fit top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white flex p-8 justify-center rounded'>
      <div className='absolute top-0 right-0 cursor-pointer' onClick={() => setIsCreateOpened(false)}>
        <CancelIcon />
      </div>
      <form onSubmit={handlePostSubmit} encType="multipart/form-data" className='flex flex-col gap-4 items-center'>
        <div className='flex flex-col relative items-center'>
          {image && (
            <button className='absolute top-0 right-0' onClick={() => setImage(null)}>
              <CancelIcon />
            </button>
          )}
          <label
            className='bg-[#dddddd]  p-2 h-[150px] w-[150px] flex items-center justify-center rounded-[50%] font-semibold cursor-pointer overflow-hidden'
            htmlFor='choose-image'
          >
            {!image ? 'Choose Image' : <img className='w-[100%] ' src={URL.createObjectURL(image)} alt='' />}
          </label>

          <input className='w-[1px] h-[1px]' name='postImage' required type='file' id='choose-image' onChange={(e) => setImage(e.target.files[0])} />

        </div>
        <div className='flex gap-[10px]'>
          <div>
            <label htmlFor='name'>Name </label>
            <input
              className='border-2 p-1 rounded'
              required
              type='text'
              name='name'
              value={formData.name}
              onChange={handleInputChange}
              placeholder='enter pet name'
            />
          </div>
          <div>
            <label htmlFor='type'>Type </label>
            <input
              className='border-2 p-1 rounded'
              required
              type='text'
              name='type'
              value={formData.type}
              onChange={handleInputChange}
              placeholder='enter pet type'
            />
          </div>
        </div>
        <div className='flex gap-[10px]'>
          <div>
            <label htmlFor='breed'>Breed </label>
            <input
              className='border-2 p-1 rounded'
              required
              type='text'
              name='breed'
              value={formData.breed}
              onChange={handleInputChange}
              placeholder='enter pet breed'
            />
          </div>
          <div>
            <label htmlFor='age'>Age </label>
            <input
              className='border-2 p-1 rounded'
              required
              type='number'
              name='age'
              value={formData.age}
              onChange={handleInputChange}
              placeholder='enter pet age'
            />
          </div>
        </div>
        <div className='flex gap-[75px] w-full justify-around '>
          <div className='flex flex-col gap-2 self-start'>
            <label htmlFor='gender'>Gender</label>
            <div className='flex flex-col justify-center pl-9 gap-1'>
              <label>
                <input
                  type='radio'
                  name='gender'
                  value='male'
                  required
                  onChange={handleInputChange}
                  checked={formData.gender === 'male'}
                />
                Male
              </label>
              <label>
                <input
                  type='radio'
                  name='gender'
                  value='female'
                  required
                  onChange={handleInputChange}
                  checked={formData.gender === 'female'}
                />
                Female
              </label>
            </div>
          </div>
          <div className=' flex flex-col gap-2 '>
            <div className={` flex flex-col ${!isNoFeeChecked ? 'cursor-not-allowed' : 'cursor-text'} `}>
              <label htmlFor='price'>Price </label>
              <input
                className={`border-2 p-1 rounded ${isNoFeeChecked ? 'cursor-not-allowed' : 'cursor-text'} `}
                type='number'
                name='price'
                disabled={isNoFeeChecked ? true : false}
                value={formData.price}
                onChange={handleInputChange}
                placeholder='enter adoption price'
                {...(isNoFeeChecked ? {} : { required: true })}
              />
            </div>
            <div>
              <label htmlFor='noFee'>No Fee </label>
              <input
                onClick={() => setIsNoFeeChecked(!isNoFeeChecked)}
                className='border-2 p-1 rounded'
                type='checkbox'
                name='noFee'
                defaultChecked={isNoFeeChecked}
              />
            </div>
          </div>
        </div>
        <button
          type='submit'
          className='bg-[#1877F2] text-white px-8 py-1 rounded font-semibold cursor-pointer'
        >
          Post
        </button>
      </form>
    </div>
  );
}

export default CreatePost;
