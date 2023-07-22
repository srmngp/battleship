import React, { useEffect } from 'react'
import { readPlayerFromLocalStorage } from '../../logic/localStorageManager'

export default function InputPlayerName ({ updatePlayerName, name }) {

  useEffect(() => {
    updatePlayerName(readPlayerFromLocalStorage()?.name)
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
