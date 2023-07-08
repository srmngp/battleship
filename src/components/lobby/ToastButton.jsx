import React from 'react'
import { Tooltip } from 'react-tooltip'

export const ToastButton = ({ text, clickAction, toastText }) => {

  return (
    <>
      <button
        id='inviteButton' onClick={clickAction}
        className='button button-secondary inviteButton'
      >
        {text}
      </button>
      <Tooltip
        anchorSelect='#inviteButton'
        openOnClick
        delayHide={1000}
        content={toastText}
      />
    </>
  )
}
