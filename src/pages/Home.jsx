import React from 'react'
import { useNavigate } from 'react-router-dom'
import { createGame } from '../logic/gameService'
import '../styles/userCreation.css'
import PlayerCreator from '../components/player/PlayerCreator'

export const Home = () => {

  const navigation = useNavigate()

  const createGameButton = (playerData) => {
    createGame(playerData)
      .then(game => navigation(`/lobby/${game.id}`))
  }

  return (
    <>
      <PlayerCreator createAction={createGameButton} buttonText='Create game' />
    </>
  )

}
