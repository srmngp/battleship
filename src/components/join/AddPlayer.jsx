import React from 'react'
import { addPlayerToGame } from '../../logic/gameService'
import PlayerCreator from '../player/PlayerCreator'
import { useNavigate } from 'react-router-dom'
import useGameContext from '../hooks/useGameContext'

export const AddPlayer = () => {

  const { game } = useGameContext()
  const navigation = useNavigate()

  const addPlayer = (playerData) => {
    console.log('addPlayer', playerData)
    addPlayerToGame(playerData, game)
      .then(navigation(`/lobby/${game.id}`))
  }

  return (
    <div>
      <h2 className='flex-center'>You have been invited to join a game</h2>
      <PlayerCreator createAction={addPlayer} buttonText='Join game' />
    </div>
  )
}
