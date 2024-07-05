import React from 'react'

const ValidationFeedback = ({text}) => {
  return (<>
  {  text &&<span className="text-red-500  text-sm pl-2 -mt-2 -mb-1">{text}</span>}
  </>
  )
}

export default ValidationFeedback