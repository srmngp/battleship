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

  const createContext = () => (
    {
      game: { id: gameId, ...gameSnapshot?.data() },
      playerList: playerListSnapshot?.docs.map(doc => doc.data()),
      localPlayer: playerListSnapshot?.docs.find(doc => doc.data().name === readPlayerNameFromLocalStorage()).data()
    }
  )

  return (
    <gameContext.Provider value={createContext()}>

      <div>
        {gameError && <GameNotFound />}
        {gameLoading && <span>Document: Loading...</span>}

        {gameSnapshot && children}

      </div>

    </gameContext.Provider>
  )
}
