import { useState } from 'react'

export const Cell = () => {

  const [content, setContent] = useState()

  const handleClick = () => {
    setContent('🛥')
  }

  return (
    <div onClick={handleClick} className='square'>
      {content}
    </div>
  )

}
