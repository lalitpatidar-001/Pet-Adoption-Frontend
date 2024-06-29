import React, { useContext, useEffect, useRef } from 'react'
import TextMessage from '../messageUtils/TextMessage'
import { message_list } from '../messageUtils'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { addAllMessages, updateMessages } from '../../../redux/slices/messageSlice'
import { userContext } from '../../../context/UserContextProvider'
import { socket } from '../../../socket'
import ImageMessage from '../messageUtils/ImageMessage'
import axiosInstance from '../../../axios'


const Messages = () => {
    const { User } = useContext(userContext)
    const dispatch = useDispatch();
    const { currentChat } = useSelector(state => state.chat);
    const { messages } = useSelector(state => state.message);
    const scrollRef = useRef();

    useEffect(() => {
        socket?.on("new_message_arrived", (data) => {
            console.log("message_arrived", data);
            console.log("currentChat._id", currentChat._id)
            console.log("data.chatId", data.chatId)
            if (currentChat._id === data.chatId) {
                console.log("inner called 1")
                dispatch(updateMessages({ data: data }));
            }
        })
        return () => {
            socket?.off("new_message_arrived");
        }
    }, [socket, currentChat]);

    useEffect(() => {
        console.log("scrollRef", scrollRef)
        if (scrollRef.current) {
            // console.log("scrooling");
            scrollRef.current.scrollIntoView();
        }
    }, [messages]);

    useEffect(() => {
        async function getMessages() {
            try {
                const response = await axiosInstance.get(`/message/all-messages/${currentChat._id}`);
                console.log(response)
                console.log(response.data.data)
                console.log(response.data.data)
                dispatch(addAllMessages({ data: response.data.data }))
            } catch (error) {
                console.log(error)
            }
        }
        if (currentChat) getMessages();
    }, [currentChat])
    return (
        <div className='flex flex-col gap-2 flex-grow bg-[#dddddd] overflow-y-scroll p-1'>
            {
                messages?.map((message) => (
                    <>
                        {message.type === "Text" && <TextMessage scrollRef={scrollRef} User={User} {...message} />}
                        {message.type === "Image" && <ImageMessage scrollRef={scrollRef} User={User} {...message} />}
                    </>
                ))
            }

            <div>

            </div>
        </div>
    )
}

export default Messages