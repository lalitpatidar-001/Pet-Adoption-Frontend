import React, { useContext, useEffect } from 'react'
import ChatElement from './ChatElement'
import { userContext } from "../../../context/UserContextProvider";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios"
import { addAllChats } from '../../../redux/slices/chatSlice';
import axiosInstance from '../../../axios';
const ChatContainer = () => {
    const { User } = useContext(userContext);
    const dispatch = useDispatch();
    const { chats } = useSelector(state => state.chat);

    useEffect(() => {
        async function getAllChats() {
            try {
                const response = await axiosInstance.get(`/chat/all-chats/${User}`);
                console.log(response)
                console.log(response.data.data)
                dispatch(addAllChats({ data: response.data.data }))
            } catch (error) {
                console.log(error)
            }
        }
        getAllChats();
    }, [User])
    return (
        <div className='flex flex-col gap-[1px]  pl-[1px] overflow-y-scroll h-[calc(100vh-65px)]'>
            {
                chats?.map((chat) => (
                    <ChatElement  chat={chat} key={chat._id} {...chat} />
                ))
            }
        </div>
    )
}

export default ChatContainer