import React from 'react'
import Loader from './Loader'

const LoaderBox = ({customWidth}) => {
  return (
    <div className={`${customWidth} flex h-screen  items-center justify-center`}>
        <Loader/>
    </div>
  )
}

export default LoaderBox