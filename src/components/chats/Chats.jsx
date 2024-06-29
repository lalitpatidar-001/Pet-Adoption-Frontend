import React from 'react'
import ChatsHeader from './utils/ChatsHeader'
import ChatContainer from './utils/ChatContainer'

const Chats = () => {
  return (
    <div className='flex-[2] bg-white  h-screen '>

      {/* header */}
      <ChatsHeader />

      {/* Chats*/}
      <ChatContainer/>
    </div>
  )
}

export default Chats