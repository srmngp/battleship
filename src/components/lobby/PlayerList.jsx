import React from 'react'
import useGameContext from '../hooks/useGameContext'

export const PlayerList = () => {

  const { playerList, localPlayer } = useGameContext()

  const getLocalPlayerClass = (name) => (
    localPlayer.name === name ? 'localPlayer' : ''
  )

  const listedPlayers = playerList.map(player =>
    <li key={player.name} className={getLocalPlayerClass(player.name)}>{player.name}</li>
  )

  return (
    <div className='playerList'>
      <h3>Players</h3>
      {listedPlayers}
      <li className='otherPlayers'>
        <span className='loader' />
        <span className='text'>Waiting for other players</span>
      </li>
    </div>
  )

}
