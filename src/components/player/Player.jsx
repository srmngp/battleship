import React from 'react'
import useGameContext from '../hooks/useGameContext'
import { Confetti } from './Confetti'
import { GAME_STATES } from '../../logic/utils'

export const Player = ({ player }) => {

  const { game } = useGameContext()

  const playerAvatar = (<img className='avatar' src={player.avatarUrl} />)
  const skullGif = (
    <img
      className='avatar'
      src='https://em-content.zobj.net/source/animated-noto-color-emoji/356/skull_1f480.gif' alt='Skull on Noto Color Emoji, Animated 15.0'
      width='120' height='120'
    />
  )

  return (
    <div key={player} className='player'>

      {player.shipsRemainAfloat ? playerAvatar : skullGif}

      {game.winner === player.name && <Confetti />}

      <span className='name'>
        {player.name}
      </span>

      {!player.hasSelectedTarget && game.status !== GAME_STATES.LOBBY &&
        <span className='💣'>💣</span>}

      <div className='player-icons'>
        {player.isLocalPlayer && localPLayerIcon()}
        {game.owner === player.name && ownerIcon()}
      </div>

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
