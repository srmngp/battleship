import React from 'react'
import { useCollection, useDocument } from 'react-firebase-hooks/firestore'
import { useParams } from 'react-router-dom'
import { readPlayerNameFromLocalStorage } from '../logic/localStorageManager'
import { getGameRef } from '../logic/repository/gameRepository'
import { getPlayersRef } from '../logic/repository/playerRepository'
import { GameNotFound } from './GameNotFound'

export const gameContext = React.createContext(null)

export default function ContextProvider ({ children }) {

  const { gameId } = useParams()

  const [gameSnapshot, gameLoading, gameError] = useDocument(getGameRef(gameId))
  const [playerListSnapshot] = useCollection(getPlayersRef(gameId))

  const createContext = () => {

    const game = { id: gameId, ...gameSnapshot?.data() }
    const playerList = playerListSnapshot?.docs.map(doc => doc.data())

    const localPlayer = { // FIXME avoid duplication
      ...playerListSnapshot?.docs.find(doc => doc.data().name === readPlayerNameFromLocalStorage()).data(),
      id: playerListSnapshot?.docs.find(doc => doc.data().name === readPlayerNameFromLocalStorage()).id
    }

    return {
      game,
      playerList,
      localPlayer
    }
  }

  return (
    <gameContext.Provider value={createContext()}>

      {gameError && <GameNotFound />}
      {gameLoading && <span>Document: Loading...</span>}

      {gameSnapshot && children}

    </gameContext.Provider>
  )
}
