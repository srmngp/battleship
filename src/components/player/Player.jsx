import React from 'react'
import useGameContext from '../hooks/useGameContext'
import { Confetti } from './Confetti'
import { GAME_STATES } from '../../logic/utils'

export const Player = ({ player }) => {

  const { localPlayer, game } = useGameContext()

  // FIXME fix icon position when user has 2 lines name on mobile screens
  return (
    <div key={player} className='player'>

      <img className='avatar' src={player.avatarUrl} />
      {game.winner === player.name && <Confetti />}

      {player.name === localPlayer.name && localPLayerIcon()}

      <span className='name'>
        {player.name}
        {!player.shipsRemainAfloat &&
          <span className='skull'>💀</span>}
      </span>

      {!player.hasSelectedTarget && game.status !== GAME_STATES.LOBBY &&
        <span className='💣'>💣</span>}

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
