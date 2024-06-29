import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Pets from '../components/Pets'
import Filters from '../components/Filters'
import SideBar from '../components/SideBar'
import CreatePost from '../components/CreatePost'
import BlackScreen from '../components/BlackScreen'
import { useDispatch, useSelector } from 'react-redux'
import { addAllPets } from '../redux/slices/petSlice'
import { connectSocket, socket } from '../socket'
import { userContext } from '../context/UserContextProvider'
import axiosInstance from '../axios'

function Home() {
  const [isCreateOpened, setIsCreateOpened] = useState(false);
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

  console.log("rendering home")
  useEffect(() => {
    if (isCreateOpened) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }

    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [isCreateOpened]);

  return (
    <>
      {/* <Navbar page="home"/> */}
      <div className={`flex justify-between bg-[#dddddd] gap-[5px] w-[100vw] p-2  top-0 `}>
        {isCreateOpened && <BlackScreen isCreateOpened={isCreateOpened} setIsCreateOpened={setIsCreateOpened} />}
        {isCreateOpened &&
          <CreatePost
            isCreateOpened={isCreateOpened} setIsCreateOpened={setIsCreateOpened}
            isPostLoading={isPostLoading} setIsPostLoading={setIsPostLoading}
          />}

        <SideBar
          isCreateOpened={isCreateOpened} setIsCreateOpened={setIsCreateOpened} />

        {isPostLoading ? <span>Loading...</span> : <Pets />}
        <Filters
          onFilterChange={handleFilterChange}
          isPostLoading={isPostLoading} setIsPostLoading={setIsPostLoading} />
      </div>
    </>
  )
}

export default Home