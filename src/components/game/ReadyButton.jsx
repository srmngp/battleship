import React, { useState, useEffect, useRef } from 'react'

export default function ReadyButton ({ fleet, onClick }) {

  const [buttonDisabled, setButtonDisabled] = useState(true)
  const startButton = useRef()

  useEffect(() => {
    setButtonDisabled(fleet.length !== 0)
    startButton.current.focus()
  }, [fleet])

  return (
    <button
      ref={startButton}
      className='button button-primary'
      onClick={onClick}
      disabled={buttonDisabled}
    >
      <span className='icon material-symbols-rounded'>
        select_check_box
      </span>
      Ready
    </button>
  )

}
