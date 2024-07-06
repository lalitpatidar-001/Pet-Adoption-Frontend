import React, { useContext, useEffect, useState,useCallback } from 'react'
import Navbar from '../components/Navbar'
import Pets from '../components/Pets'
import Filters from '../components/Filters'
import SideBar from '../components/SideBar'
import CreatePost from '../components/CreatePost'
import { useDispatch, useSelector } from 'react-redux'
import { addAllPets } from '../redux/slices/petSlice'
import { connectSocket, socket } from '../socket'
import { userContext } from '../context/UserContextProvider'
import axiosInstance from '../axios'
import Loader from '../shared/Loader'
import LoaderBox from '../shared/LoaderBox'

function Home() {
  const { User } = useContext(userContext);
  const dispatch = useDispatch();
  const [isPostLoading, setIsPostLoading] = useState(false);

  

  useEffect(() => {
    if (!socket) {
      connectSocket(User)
    }
  }, [User, socket])

  const handleFilterChange = (filteredPosts) => {
    dispatch(addAllPets({ data: filteredPosts }))

  };

  useEffect(() => {
    async function getAllpet() {
      try {
        setIsPostLoading(true)
        const response = await axiosInstance.get("/post/all");
        console.log(response.data)
        if(response.status===200){
          dispatch(addAllPets({data:response.data}))
        }
      }
      catch (error) {
          toast.error("something went wrong on server.")
      }finally{
        setIsPostLoading(false);
      }
    }
    getAllpet();
  },[dispatch,setIsPostLoading]);


  

  return (
    <>
      {/* <Navbar page="home"/> */}
      <div className={`flex justify-between  gap-[2px] w-[100vw]  py-1 sm:pl-0 pl-[1px]  top-0 `}>
 
        {isPostLoading ? <LoaderBox customWidth="flex-[5]"/> : <Pets setIsPostLoading={setIsPostLoading}  />}
        
        <Filters
          onFilterChange={handleFilterChange}
          isPostLoading={isPostLoading} setIsPostLoading={setIsPostLoading} />
      </div>
    </>
  )
}

export default Home