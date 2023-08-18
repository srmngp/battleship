import React from 'react'
import { addPlayerToGame } from '../../logic/gameService'
import PlayerCreator from '../player/PlayerCreator'
import { useNavigate } from 'react-router-dom'
import useGameContext from '../hooks/useGameContext'
import { Alert } from 'react-bootstrap'

export const AddPlayer = () => {

  const { game } = useGameContext()
  const navigation = useNavigate()

  const addPlayer = (playerData) => {
    console.log('addPlayer', playerData)
    addPlayerToGame(playerData, game)
      .then(navigation(`/lobby/${game.id}`))
  }

  return (
    <div className='justify-content-center'>
      <div style={{ display: 'inline-block' }}>
        <Alert variant='primary'>
          You have been invited to join a game.
        </Alert>
      </div>
      <PlayerCreator createAction={addPlayer} buttonText='Join game' />
    </div>
  )
}
