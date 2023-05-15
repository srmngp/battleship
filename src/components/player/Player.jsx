import React from 'react'
import useGameContext from '../hooks/useGameContext'

export const Player = ({ player }) => {

  const { localPlayer } = useGameContext()

  const getLocalPlayerClass = (name) => (
    localPlayer.name === name ? 'player localPlayer' : 'player'
  )

  return (
    <div key={player} className={getLocalPlayerClass(player.name)}>
      <img className='avatar' src={player.avatarUrl} />
      {player.name}
    </div>
  )

}
