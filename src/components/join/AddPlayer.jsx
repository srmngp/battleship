import React from 'react'
import { addPlayerToGame } from '../../logic/gameService'
import PlayerCreator from '../player/PlayerCreator'
import { useNavigate } from 'react-router-dom'

export const AddPlayer = ({ gameSnapshot }) => {

  const navigation = useNavigate()

  const addPlayer = (playerData) => {
    console.log('addPlayer', playerData)
    addPlayerToGame(playerData, gameSnapshot)
      .then(navigation(`/lobby/${gameSnapshot.id}`))
  }

  return (
    <>
      <h2>You have been invited to join a game</h2>

      <PlayerCreator createAction={addPlayer} buttonText='Join game' />
    </>
  )
}
