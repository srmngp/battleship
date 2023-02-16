import React from 'react'
import { ToastButton } from '../ToastButton'

export const GameSetup = ({ game, playersCollection }) => {

  const players = playersCollection.map(player => <li key={player.id}>{player.name}</li>)

  const copyGameUrl = () => {
    navigator.clipboard.writeText(window.location.href)
  }

  return (
    <div className='GameSetup'>

      <div className='playerList'>
        <h3>Players</h3>
        {players}
        <li className='otherPlayers'>
          <span className='loader' />
          <span className='text'>Waiting for other players</span>
        </li>
      </div>
      <ToastButton text='🔗 Invite' clickAction={copyGameUrl} toastText='Link copied!' />
    </div>
  )

}
