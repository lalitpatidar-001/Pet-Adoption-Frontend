import React, { useContext, useEffect, useState } from 'react'
import Avatar from '../Avatar'
import { userContext } from '../../../context/UserContextProvider'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentChat } from '../../../redux/slices/chatSlice'

const ChatElement = ({ participants, chat, _id }) => {
    const dispatch = useDispatch();
    const { currentChat } = useSelector(state => state.chat)
    const [oppenentUser, setOppenentUser] = useState({});

    const { User } = useContext(userContext);
    const getOpponentUser = (members) => {
        const oppenentUserData = members?.filter((member) => User !== member?._id);
        return oppenentUserData
    }

    useEffect(() => {
        setOppenentUser(getOpponentUser(participants)[0]);
        console.log("oppenentUser", oppenentUser)
    }, [participants, User])

    const handleClickOnChat = () => {
        console.log("called chat changed", chat);
        dispatch(setCurrentChat({ data: chat }))
    }

    return (
        <div className={`${currentChat?._id === _id ? " bg-gray-500 text-white" : "bg-white"} cursor-pointer flex items-center justify-between py-2`} onClick={handleClickOnChat}>
            <div className='flex gap-2'>
                <Avatar profileImage={oppenentUser?.profileImage} />
                <div className='flex flex-col'>
                    <span className='font-semibold '>{oppenentUser?.username}</span>
                    <span className='text-sm'>last message</span>
                </div>
            </div>
            <div className='flex flex-col items-end pr-2'>
                <div className='bg-blue-500 text-white h-4 w-4  flex items-center justify-center rounded-full text-xs'>3</div>
                <span className='text-xs text-gray-400'>12:00pm</span>
            </div>
        </div>
    )
}

export default ChatElement