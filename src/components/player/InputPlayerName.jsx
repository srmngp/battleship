import React, { useEffect } from 'react'
import { readPlayerNameFromLocalStorage } from '../../logic/localStorageManager'

export default function InputPlayerName ({ updatePlayerName, name }) {

  useEffect(() => {
    updatePlayerName(readPlayerNameFromLocalStorage())
  }, [])

  return (
    <input
      className='player-name-input'
      type='text'
      placeholder='Payer name'
      value={name}
      onChange={(e) => updatePlayerName(e.currentTarget.value)}
    />
  )
}
