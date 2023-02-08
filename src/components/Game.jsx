import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getGame } from '../logic/gameService'
import { Player } from './Player'
import { SetupShips } from './SetupShips'

export const Game = () => {

  const { id } = useParams()
  const [game, setGame] = useState(null)

  useEffect(() => {
    getGame(id)
      .then((game) => setGame(game))

  }, [])

  const [players] = useState([{ name: 'Player 1', shipsReady: false }, { name: 'Player 2', shipsReady: false }])

  const [currentAction] = useState(<SetupShips players={players} />)

  const ready = (name) => {
    console.log(`Player ${name} is ready`)
  }

  return (
    <>
      {game
        ? (
          <div>
            <p>Game id: {game.id}</p>
            <p>Player id: {game.data().players[0]}</p>
          </div>
          )
        : (<div>Game not found</div>)}

      {/* <h3>Game status</h3>
      {currentAction}

      <div className='game'>
        {players.map((player, index) => (
          <Player key={index} name={player.name} playerReady={ready} />
        ))}
      </div> */}
    </>
  )

}
