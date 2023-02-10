import React from 'react'
import { ToastButton } from '../ToastButton'

export const GameSetup = ({ game, playersCollection }) => {

  const players = playersCollection.map(player => <li key={player.id}>{player.data().name}</li>) // TODO pq no funciona el converter?

  const copyGameUrl = () => {
    navigator.clipboard.writeText(window.location.href)
  }

  return (
    <div className='GameSetup'>
      <p>Game id: {game.id}</p>

      <div className='playerList'>
        <h3>Players</h3>
        {players}
        <li className='otherPlayers'>
          <span className='loader' />
          <span className='text'>Waiting other players</span>
        </li>
      </div>
      <ToastButton text='🔗 Invite' clickAction={copyGameUrl} toastText='Link copied!' />
    </div>
  )

}
