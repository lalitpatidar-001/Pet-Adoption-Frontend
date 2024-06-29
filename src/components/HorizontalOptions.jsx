import React, { useContext } from 'react'
import { userContext } from '../context/UserContextProvider'
import MenuDialog from './MenuDialog';

function HorizontalOptions({isMenuOpen,postId,userId , setIsMenuOpen}) {
    const {User} = useContext(userContext);
    // console.log("ids ",userId , User)
  return (
    // container
    <div className=' absolute right-0 p-2' >
        {/* wrapper */}
        <MenuDialog postId={postId} userId={userId} isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen}/>
    </div>
  )
}

export default HorizontalOptions