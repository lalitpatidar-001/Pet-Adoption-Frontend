import React, { useContext, useEffect } from 'react'
import Avatar from '../../chats/Avatar'
import { useDispatch, useSelector } from 'react-redux'
import { userContext } from '../../../context/UserContextProvider';
import { setToUser } from '../../../redux/slices/messageSlice';
const ConvoHeader = () => {
    const { toUser } = useSelector(state => state.message);
    //     const {User} = useContext(userContext)
    //     const {currentChat} = useSelector(state=>state.chat);
    //     const dispatch = useDispatch();

    //     const getToUser = (members) => {
    //       const oppenentUserData = members?.filter((member) => User !== member._id);
    //       return oppenentUserData
    //   }

    //     useEffect(()=>{
    //         console.log("currentChat",currentChat)
    //       if(currentChat){
    //         console.log("called ")
    //         const toUserdata = getToUser(currentChat.participants);
    //         dispatch(setToUser({data:toUserdata[0]}))
    //       }
    //     },[currentChat,toUser])



    return (
        <div className='flex items-center bg-white pl-2 min-h-[65px]  shadow-sm border-b-2'>
            <div className='flex gap-2 '>
                <Avatar profileImage={toUser?.profileImage} />
                <div className='flex flex-col '>
                    <span className='font-semibold'>
                        {toUser?.username}
                    </span>
                    <span className='text-gray-700'>online</span>
                </div>
            </div>
        </div>
    )
}

export default ConvoHeader