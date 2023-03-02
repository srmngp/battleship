import React from 'react'
import { readPlayerNameFromLocalStorage } from '../../logic/localStorageManager'

export const PlayerList = ({ players }) => {

  const getLocalPlayerClass = (name) => (
    readPlayerNameFromLocalStorage() === name ? 'localPlayer' : ''
  )

  const playerList = players.map(player =>
    <li key={player.id} className={getLocalPlayerClass(player.name)}>{player.name}</li>
  )

  return (
    <div className='playerList'>
      <h3>Players</h3>
      {playerList}
      <li className='otherPlayers'>
        <span className='loader' />
        <span className='text'>Waiting for other players</span>
      </li>
    </div>
  )

}
