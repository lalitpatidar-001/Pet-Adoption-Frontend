import React from 'react'
import moment from 'moment';

const TextMessage = ({User,scrollRef, text, from,createdAt}) => {
    const parsedTimestamp = moment(createdAt);
    return (
        <div ref={scrollRef} className={`w-full flex ${User===from?"justify-end ":"justify-start"}`}>
            <div className={`flex gap-2  max-w-[90%] w-fit p-1 rounded ${User===from?"bg-blue-500 text-white": "bg-gray-200"} `}>
                <span className=''>{text}</span>
                <div className='flex gap-[2px] justify-end'>
                    <span className='text-xs self-end '>{parsedTimestamp.format('hh:mm a')}</span>
                    {User===from&& <span className='text-xs self-end'>tik</span>}
                </div>
            </div>
        </div>
    )
}

export default TextMessage