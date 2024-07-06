import React, { useContext, useEffect ,useState} from 'react'
import SideBar from '../components/SideBar'
import { RequestCard } from '../components/RequestCard'
import { userContext } from '../context/UserContextProvider';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addAllRequest } from '../redux/slices/requestSlice';
import axiosInstance from '../axios';
import LoaderBox from '../shared/LoaderBox';
import NoResult from '../shared/NoResult';

const Reqeusts = () => {
  const dispatch = useDispatch();
  const [isLoading , setIsLoading] = useState(false)
  const { requests } = useSelector(state => state.request)
  const { User, setUser } = useContext(userContext);
  const cleanedUserId = User?.replace(/"/g, '');


  useEffect(() => {
    async function getAllRequest() {
      try {
        setIsLoading(true);
        const response = await axiosInstance.get(`/adoption-request/all-sent-request/${cleanedUserId}`);

        if(response?.status === 200){
          dispatch(addAllRequest({ data: response.data.data }));
        }
      }
      catch (error) {
        if(error.response?.data?.msg){
          toast.error(error.response?.data?.msg);
        }else{
          toast.error("something went wrong on server");
        }
      }finally{
        setIsLoading(false);
      }
    }
    getAllRequest();
  }, [User]);


  if(isLoading) return <LoaderBox customWidth="flex-[5]"/>
  if(requests?.length<=0)return <NoResult/>

  return (
      <div className='flex-[6] flex flex-col gap-1 bg-[#dddddd] p-2  '>
        {
          requests?.map((item) => (
            <RequestCard key={item._id} {...item} />
          ))
        }
      </div>
  )
}

export default Reqeusts