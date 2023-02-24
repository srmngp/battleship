import React from 'react'
import { ToastButton } from '../ToastButton'
import { PlayerList } from './PlayerList'

export const GameSetup = ({ game, playersCollection }) => {

  const copyGameUrl = () => {
    const joinGameUrl = window.location.origin + '/join/' + game.id

    navigator.clipboard.writeText(joinGameUrl)
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
