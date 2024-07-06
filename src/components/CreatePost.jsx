import React, { useContext, useState } from 'react';
import CancelIcon from '@mui/icons-material/Cancel';
import axios from 'axios';
import { userContext } from '../context/UserContextProvider';
import { useDispatch } from "react-redux";
import { updatePets } from '../redux/slices/petSlice';
import axiosInstance, { urlPath } from '../axios';
import { handleCreatePostValidation } from '../utils/validations/postValidation';
import ValidationFeedback from '../shared/ValidationFeedback';
import {toast} from "react-hot-toast"

function CreatePost({  handleClose }) {
  const [isLoading , setIsLoading] = useState(false)
  const { User } = useContext(userContext);
  const dispatch = useDispatch();
  const [isNoFeeChecked, setIsNoFeeChecked] = useState(false);
  const [errors,setErrors] = useState({})
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
    setErrors({})
    const result = handleCreatePostValidation(formData,image,isNoFeeChecked);
    setErrors(result)
    // call api only if data is valid
    if(Object.keys(result).length===0) {

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
      // setIsPostLoading(true)
      setIsLoading(true);
      const response = await axios.post(`${urlPath}/api/post/createpost/${User}`, postData,
        {
          headers:{
            "Content-Type":"multipart/form-data"
          }
        }
      );

     if(response.status === 201){
       dispatch(updatePets({ data: response.data.post }));
       toast.success("Post created successfully");
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
       handleClose();
     }

    } catch (error) {
      console.error('Error:', error);
      if(error.response?.data?.msg){
        toast.error(error.response?.data?.msg)
      }else{
        toast.error("something went wrong on server")
      }
    }
    finally {
      setIsLoading(false)
    };
    }

    
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };



  return (
    <div className=' w-[90%] h-fit  bg-white flex p-8 justify-center rounded'>
      
      <form onSubmit={handlePostSubmit} encType="multipart/form-data" className='flex flex-col px-2 gap-4 items-center'>
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

          <input className='w-[1px] h-[1px]' name='postImage' 
          // required 
          type='file' id='choose-image' onChange={(e) => setImage(e.target.files[0])} />
          <ValidationFeedback text={errors?.image}/>

        </div>
        <div className='flex gap-[10px] flex-col sm:flex-row '>
          <div className="flex flex-col ">
          <div className="flex items-center justify-between w-full gap-3">
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
          <ValidationFeedback text={errors?.name}/>
          </div>

           <div className="flex flex-col">
          <div className="flex items-center justify-between w-full gap-3">
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
        <ValidationFeedback text={errors?.type}/>
          </div>
        </div>
        <div className='flex gap-[10px] flex-col sm:flex-row'>
          <div className="flex flex-col">
          <div className="flex items-center justify-between w-full gap-3">
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
            <ValidationFeedback text={errors?.breed}/>
          </div>
          <div className="flex flex-col ">
          <div className="flex items-center justify-between w-full gap-3">
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
            <ValidationFeedback text={errors?.age}/>
          </div>
        </div>
        <div className='flex sm:gap-[75px] flex-col sm:flex-row w-full justify-around '>
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
                {...(isNoFeeChecked ? {} : { required: null })}
              />
              <ValidationFeedback text={errors?.price}/>
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
        <div className="w-full flex justify-around">
        <button
          onClick={handleClose}
          type="button"
          className='bg-red-400 text-white px-8 py-1 rounded font-semibold cursor-pointer'
        >
          Cancel
        </button>
        <button
        disabled={isLoading}
          type='submit'
          className={`
            ${isLoading&&"bg-blue-300"}
            bg-[#1877F2] text-white px-8 py-1 rounded font-semibold cursor-pointer`}
        >
          {isLoading?"uploading...":"Post"}
        </button>
        </div>
      </form>
    </div>
  );
}

export default CreatePost;
