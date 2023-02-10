import React, { useState } from 'react'

export const ToastButton = ({ text, clickAction, toastText }) => {

  const [isShown, setIsShown] = useState(false)

  const onClick = () => {
    clickAction()
    showToast(2000)
  }

  const showToast = (milis) => {
    setIsShown(true)
    setTimeout(() => {
      setIsShown(false)
    }, milis)
  }

  return (
    <div>
      <button onClick={onClick}>
        {text}
      </button>
      {isShown && (
        <div className='toast'>
          <span>{toastText}</span>
        </div>
      )}
    </div>
  )
}
