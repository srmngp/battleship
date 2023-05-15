import React, { useState } from 'react'
import AvatarSelector from './AvatarSelector'
import InputPlayerName from './InputPlayerName'
import '../../styles/playerCreator.css'

export default function PlayerCreator ({ createAction, buttonText }) {

  const [name, setName] = useState()
  const [avatarUrl, setAvatarUrl] = useState()

  const handleButtonClick = () => {
    createAction({ name, avatarUrl })
  }

  return (
    <>

      <div className='user-creation'>

        <div className='user-panel'>

          <AvatarSelector updateAvatarUrl={setAvatarUrl} url={avatarUrl} />

          <InputPlayerName updatePlayerName={setName} name={name} />

        </div>

        <div className='button-panel'>
          <button className='create-game-button' onClick={handleButtonClick}>
            {buttonText}
          </button>
        </div>

      </div>

    </>
  )
}
