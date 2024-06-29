import React from 'react'
import Pet from '../Pet'

const Posts = ({userPosts}) => {
    return (
        <>

            {userPosts &&
                userPosts?.map((post) => {
                    return <Pet key={post._id} {...post} />
                })
            }
        </>
    )
}

export default Posts