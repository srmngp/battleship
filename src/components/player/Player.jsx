import React from 'react'
import useGameContext from '../hooks/useGameContext'

export const Player = ({ player }) => {

  const { localPlayer, game } = useGameContext()

  return (
    <div key={player} className='player'>
      <img className='avatar' src={player.avatarUrl} />
      {player.name === localPlayer.name &&
        <i className='material-symbols-rounded'>
          person
        </i>}

      <span className='name'>
        {player.name}
      </span>

      {game.owner === player.name &&
        <i className='material-symbols-rounded icon'>military_tech</i>}
    </div>
  )

}
