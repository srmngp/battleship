import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { GameNotFound } from '../components/GameNotFound'
import { GameSetup } from '../components/setup/GameSetup'
import { getGame } from '../logic/gameService'
import { getPlayers } from '../logic/playerService'

export const Game = () => {

  const { id } = useParams()
  const [game, setGame] = useState(null)
  const [players, setPlayers] = useState(null)

  const loadGame = () => {
    getGame(id)
      .then(game => {
        getPlayers(id)
          .then(playersCollection => {
            setGame(game)
            setPlayers(playersCollection)
          })
      })
  }

  useEffect(() => {
    loadGame()

  }, [])

  return (
    <>
      {game ? <GameSetup game={game} playersCollection={players} /> : <GameNotFound />}
    </>
  )

}
