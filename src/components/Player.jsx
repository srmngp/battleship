import React from 'react'
import { Board } from './Board'

export const Player = ({ playerName }) => {

  return (
    <div className='player'>
      <h2>{playerName}</h2>
      <Board />
    </div>
  )

}
