import React, { useState } from 'react'
import { Player } from './Player'
import { SetupShips } from './SetupShips'

export const Game = () => {

  const [players, setPlayers] = useState([{ name: 'Player 1', shipsReady: false }, { name: 'Player 2', shipsReady: false }])

  const [currentAction, setCurrentAction] = useState(<SetupShips players={players} />)

  const ready = (name) => {
    console.log(`Player ${name} is ready`)
  }

  return (
    <>
      <h3>Game status</h3>
      {currentAction}

      <div className='game'>
        {players.map((player, index) => (
          <Player key={index} name={player.name} playerReady={ready} />
        ))}
      </div>
    </>
  )

}
