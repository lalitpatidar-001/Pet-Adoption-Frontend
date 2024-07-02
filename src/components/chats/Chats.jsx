import React from 'react'
import ChatsHeader from './utils/ChatsHeader'
import ChatContainer from './utils/ChatContainer'
import { useDispatch, useSelector } from 'react-redux'
const Chats = () => {
  const {currentChat} = useSelector(state=>state.chat);
  return (
    <div className={`sm:flex-[2] flex-col bg-white  h-screen
    ${currentChat?" sm:flex hidden":"flex w-full"}
    `}>

      {/* header */}
      <ChatsHeader />

      {/* Chats*/}
      <ChatContainer/>
    </div>
  )
}

export default Chats