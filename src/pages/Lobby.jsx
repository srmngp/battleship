import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createGame } from '../logic/gameService'

export const Lobby = () => {

  const [playerName, setUsername] = useState('')

  const navigation = useNavigate()

  const submit = async (e) => {
    e.preventDefault()

    const game = await createGame(playerName)
    console.log(game.id)
    console.log(game.players)
    navigateToGame(game)
  }

  const navigateToGame = (game) => {
    navigation({
      pathname: `/game/${game.id}`,
      state: {
        player: game.players
      }
    })
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
