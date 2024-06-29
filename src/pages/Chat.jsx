import React from 'react'
import Conversatoin from '../components/conversations/Conversatoin'
import Chats from "../components/chats/Chats"

const Chat = () => {
    return (
        <div className='flex bg-[#dddddd]  gap-[1px] '>
            <Chats/>
            <Conversatoin/>
        </div>

    )
}

export default Chat