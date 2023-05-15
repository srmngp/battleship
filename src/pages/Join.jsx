import React from 'react'
import { useDocument } from 'react-firebase-hooks/firestore'
import { useParams } from 'react-router-dom'
import { GameNotFound } from '../components/GameNotFound'
import { AddPlayer } from '../components/join/AddPlayer'
import { getGameRef } from '../logic/repository/gameRepository'

export const Join = () => {

  const { gameId } = useParams()
  const [gameSnapshot, gameLoading, gameError] = useDocument(getGameRef(gameId))

  return (
    <>
      <div className='flex-center'>
        {gameError && <GameNotFound />}
        {gameLoading && <span>Document: Loading...</span>}
        {gameSnapshot && <AddPlayer gameSnapshot={gameSnapshot} />}
      </div>
    </>

  )

}
