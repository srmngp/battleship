import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { addPlayerToGame } from '../../logic/gameService'
import { readPlayerNameFromLocalStorage } from '../../logic/localStorageManager'

export const AddPlayer = ({ gameSnapshot }) => {

  const [playerName, setPlayerName] = useState('')
  const navigation = useNavigate()

  useEffect(() => {
    setPlayerName(readPlayerNameFromLocalStorage())
  }, [])

  const submit = async (e) => {
    e.preventDefault()

    addPlayerToGame(playerName, gameSnapshot)
      .then(navigation(`/lobby/${gameSnapshot.id}`))
  }

  return (
    <>
      <h2>You have veen invited to join a game</h2>

      <div className='lobby'>
        <form onSubmit={submit}>

          <input// TODO no permitir que el nombre del jugador sea vacío
            type='text' placeholder='Payer name'
            value={playerName}
            onChange={(e) => setPlayerName(e.currentTarget.value)}
          />

          <button type='submit'>
            Join game
          </button>

        </form>
      </div>
    </>
  )
}
