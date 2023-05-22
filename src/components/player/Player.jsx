import React from 'react'
import useGameContext from '../hooks/useGameContext'

export const Player = ({ player }) => {

  const { localPlayer, game } = useGameContext()

  return (
    <div key={player} className='player'>

      <img className='avatar' src={player.avatarUrl} />

      {player.name === localPlayer.name && localPLayerIcon()}

      <span className='name'>
        {player.name}
      </span>

      {game.owner === player.name && ownerIcon()}

    </div>
  )

}

const localPLayerIcon = () => (
  <span className='localPlayerIcon-bg'>
    <i className='material-symbols-rounded localPlayer'>
      account_circle
    </i>
  </span>
)

const ownerIcon = () => (
  <span className='ownerIcon-bg'>
    <i className='material-symbols-rounded ownerIcon'>
      workspace_premium
    </i>
  </span>
)
