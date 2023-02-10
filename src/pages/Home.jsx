import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createGame } from '../logic/gameService'

export const Home = () => {

  const [playerName, setUsername] = useState('')

  const navigation = useNavigate()

  const submit = async (e) => {
    e.preventDefault()

    createGame(playerName)
      .then(game => navigation(`/game/${game.id}`))
      .catch(reason => console.log(reason))

  }

  return (
    <div className='lobby'>
      <form onSubmit={submit}>

        <input
          type='text' placeholder='Payer name'
          value={playerName}
          onChange={(e) => setUsername(e.currentTarget.value)}
        />

        <button type='submit'>
          Create game
        </button>

        <button>
          Join game
        </button>

      </form>
    </div>
  )
}
