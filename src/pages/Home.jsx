import React from 'react'
import { useNavigate } from 'react-router-dom'
import { createGame } from '../logic/gameService'
import PlayerCreator from '../components/player/PlayerCreator'
// import { createExampleGame } from '../logic/createExampleGame'

export const Home = () => {

  const navigation = useNavigate()

  const createGameButton = (playerData) => {
    createGame(playerData)
      .then(game => navigation(`/lobby/${game.id}`))
  }

  return (
    <>
      <PlayerCreator createAction={createGameButton} buttonText='Create game' />

      {/* <button onClick={() => {
        createExampleGame()
        navigation('/game/test-game')
      }}
      >
        Create example game
      </button> */}
    </>
  )

}
