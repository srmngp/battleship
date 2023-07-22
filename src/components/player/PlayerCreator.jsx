import React, { useState } from 'react'
import AvatarSelector from './AvatarSelector'
import InputPlayerName from './InputPlayerName'
import '../../styles/playerCreator.css'
import Button from 'react-bootstrap/Button'
import { readPlayerFromLocalStorage } from '../../logic/localStorageManager'

export default function PlayerCreator ({ createAction, buttonText }) {

  const previousPlayer = readPlayerFromLocalStorage()

  const [name, setName] = useState(previousPlayer?.name)
  const [avatarUrl, setAvatarUrl] = useState(previousPlayer?.avatarUrl)

  const handleButtonClick = () => {
    createAction({ name, avatarUrl })
  }

  return (
    <div className='row'>

      <div className='user-panel bg-blue col-5 mx-auto text-center'>

        <AvatarSelector updateAvatarUrl={setAvatarUrl} url={avatarUrl} />

        <InputPlayerName updatePlayerName={setName} name={name} />

      </div>

      <div className='button-panel p-2'>
        <Button
          variant='light'
          onClick={handleButtonClick}
          disabled={!name}
        >
          {buttonText}
        </Button>
      </div>

    </div>
  )
}
