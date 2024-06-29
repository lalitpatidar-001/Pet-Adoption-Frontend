import React, { createContext, useState } from 'react'

export const postContext = createContext();

function PostContext({children}) {
 const [isPostCreated , setIsPostCreated] = useState(false);

  return (
    <postContext.Provider value={{isPostCreated , setIsPostCreated}}>
        {children}
    </postContext.Provider>
  )
}

export default PostContext