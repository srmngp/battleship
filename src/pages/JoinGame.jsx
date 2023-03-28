import React from 'react'
import { useDocument } from 'react-firebase-hooks/firestore'
import { useParams } from 'react-router-dom'
import { AddPlayer } from '../components/AddPlayer'
import { GameNotFound } from '../components/GameNotFound'
import { getGameRef } from '../logic/repository/gameRepository'

export const JoinGame = () => {

  const { gameId } = useParams()
  const [gameSnapshot, gameLoading, gameError] = useDocument(getGameRef(gameId))

  return (
    <>
      <div>
        {gameError && <GameNotFound />}
        {gameLoading && <span>Document: Loading...</span>}
        {gameSnapshot && <AddPlayer gameSnapshot={gameSnapshot} />}
      </div>
    </>

  )

}
