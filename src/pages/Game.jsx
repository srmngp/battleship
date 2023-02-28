import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { GameNotFound } from '../components/GameNotFound'
import { GameSetup } from '../components/setup/GameSetup'
import { getGame } from '../logic/gameService'
import { getPlayersRealtime } from '../logic/playerService'

export const Game = () => {

  const { gameId } = useParams()
  const [game, setGame] = useState(null)
  const [players, setPlayers] = useState([])

  const loadGame = () => {
    getGame(gameId)
      .then(game => {
        setGame(game)
        getPlayersRealtime(gameId, setPlayers)
      })
  }

  useEffect(() => {
    loadGame()
  }, [])

  return (
    <>
      {game
        ? <GameSetup game={game} playersCollection={players} />
        : <GameNotFound />}
    </>
  )

}
