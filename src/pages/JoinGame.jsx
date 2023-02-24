import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AddPlayer } from '../components/AddPlayer'
import { GameNotFound } from '../components/GameNotFound'
import { getGame } from '../logic/gameService'

export const JoinGame = () => {

  const { gameId } = useParams()
  const [game, setGame] = useState(null)

  const loadGame = () => {
    getGame(gameId)
      .then(game => { setGame(game) })
  }

  useEffect(() => {
    loadGame()
  }, [])

  return (
    <>
      {game
        ? <AddPlayer game={game} />
        : <GameNotFound />}
    </>

  )

}
