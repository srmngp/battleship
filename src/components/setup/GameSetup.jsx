import React from 'react'
import { ToastButton } from '../ToastButton'
import { PlayerList } from './PlayerList'

export const GameSetup = ({ game, playersCollection }) => {

  const copyGameUrl = () => {
    navigator.clipboard.writeText(window.location.href)
  }

  return (
    <div className='GameSetup'>

      <div className='playerList'>
        <h3>Players</h3>
        <PlayerList players={playersCollection} />
        <li className='otherPlayers'>
          <span className='loader' />
          <span className='text'>Waiting for other players</span>
        </li>
      </div>
      <ToastButton text='🔗 Invite' clickAction={copyGameUrl} toastText='Link copied!' />
    </div>
  )

}
