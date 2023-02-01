import React from 'react'
import { Board } from './Board'

export const Player = ({ name, playerReady }) => {

  const readyFunction = () => {
    playerReady(name)
  }

  return (
    <div className='player'>
      <h2>{name}</h2>
      <Board readyFunction={readyFunction} />
    </div>
  )

}
