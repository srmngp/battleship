import React, { useState } from 'react'

export const ToastButton = ({ text, clickAction, toastText }) => { // TODO add styles

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
    <>
      <button onClick={onClick} className='button button-secondary'>
        {text}
      </button>
      {isShown && (
        <div className='custom-toast'>
          <span>{toastText}</span>
        </div>
      )}
    </>
  )
}
