import React, { useContext, useState } from 'react'
import Input from '../footerUtils/Input';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import StyleRoundedIcon from '@mui/icons-material/StyleRounded';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { userContext } from '../../../context/UserContextProvider';
import { updateMessages } from '../../../redux/slices/messageSlice';
import { socket } from '../../../socket';
import ImagePreview from '../footerUtils/ImagePreview';
import axiosInstance from '../../../axios';

const Footer = () => {
    const [message, setMessage] = useState("");
    const [imageMessage, setImageMessage] = useState(null);
    const { User } = useContext(userContext);
    const dispatch = useDispatch();
    const { currentChat } = useSelector(state => state.chat);
    const { toUser } = useSelector(state => state.message);



    const handleChangeImageMessageInput = (e) => {
        setImageMessage(e.target.files[0]);
        console.log("imageMessage", imageMessage)
    }

    const handleMessageSendClick = async () => {
        if (message.length > 0) {
            try {
                const response = await axiosInstance.post(`/message/text-message/${User}`, {
                    chatId: currentChat._id,
                    to: toUser._id,
                    type: "Text",
                    text: message
                });
                if (response.status === 201) {
                    setMessage("");
                    dispatch(updateMessages({ data: response.data.data }));
                    socket?.emit("sent_new_message", response.data.data);
                }
                console.log(response);
                console.log("message", response.data.data);
            } catch (error) {
                console.log(error);
            }
        }

        // image message
        if (imageMessage) {
            try {
                const formData = new FormData();
                console.log("images in form data", imageMessage)
                formData.append("messageImage", imageMessage);
                formData.append("chatId", currentChat._id);
                formData.append("to", toUser._id);
                formData.append("type", "Image");

                const response = await axiosInstance.post(`/message/image-message/${User}`,
                    formData
                    ,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    }
                );

                if (response.status === 201) {
                    setImageMessage(null);
                    dispatch(updateMessages({ data: response.data.data }));
                    socket?.emit("sent_new_message", response.data.data);
                }
                console.log(response);
                console.log(response.data.data);
            } catch (error) {
                console.log(error)
            }
        }
    }
    return (
        <div className=' bg-white flex gap-3 items-center py-2 p-2 w-full relative '>
            {imageMessage && <ImagePreview setImageMessage={setImageMessage} image={imageMessage} />}
            <input className='hidden' id="image-input" name="messageImage" onChange={handleChangeImageMessageInput} type='file' />
            <label htmlFor='image-input' className="text-gray-700 cursor-pointer">
                <StyleRoundedIcon />
            </label>
            <div className='flex-grow'>
                <Input message={message} setMessage={setMessage} />
            </div>
            <div className='bg-blue-500 p-[6px] rounded-lg cursor-pointer text-white' onClick={handleMessageSendClick}><SendRoundedIcon /></div>
        </div>
    )
}

export default Footer