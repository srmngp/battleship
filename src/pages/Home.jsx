import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createGame } from '../logic/gameService'
import { readPlayerNameFromLocalStorage } from '../logic/localStorageManager'

export const Home = () => {

  const [playerName, setPlayerName] = useState('')

  const navigation = useNavigate()

  useEffect(() => {
    setPlayerName(readPlayerNameFromLocalStorage())
  }, [])

  const submit = async (e) => {
    e.preventDefault()

    createGame(playerName)
      .then(game => navigation(`/game/${game.id}`))
  }

  return (
    <div className='lobby'>

      <form onSubmit={submit}>

        <input
          type='text' placeholder='Payer name'
          value={playerName}
          onChange={(e) => setPlayerName(e.currentTarget.value)}
        />

        <button type='submit'>
          Create game
        </button>

      </form>
    </div>
  )
}
