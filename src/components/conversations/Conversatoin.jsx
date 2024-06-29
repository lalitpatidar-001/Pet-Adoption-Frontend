import React, { useContext, useEffect } from 'react'
import ConvoHeader from './utils/ConvoHeader'
import Messages from './utils/Messages'
import Footer from './utils/Footer'
import { useDispatch, useSelector } from 'react-redux'
import { setToUser } from '../../redux/slices/messageSlice'
import { userContext } from '../../context/UserContextProvider'

const Conversatoin = () => {
  const dispatch = useDispatch();
  const {User} = useContext(userContext)
  const {currentChat} = useSelector(state=>state.chat);

  const getToUser = (members) => {
    const oppenentUserData = members?.filter((member) => User !== member._id);
    return oppenentUserData
}

  useEffect(()=>{
    if(currentChat){
      const toUserdata = getToUser(currentChat.participants);
      dispatch(setToUser({data:toUserdata[0]}))
    }
  },[currentChat])
  return (
    <div className='flex-[5] flex flex-col  h-screen'>
      <ConvoHeader />
      <Messages />
      <Footer />
    </div>
  )
}

export default Conversatoin