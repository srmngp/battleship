import React from 'react'
import { useCollection, useDocument } from 'react-firebase-hooks/firestore'
import { useParams } from 'react-router-dom'
import { readPlayerFromLocalStorage } from '../logic/localStorageManager'
import { getGameRef } from '../logic/repository/gameRepository'
import { getPlayersCollectionRef } from '../logic/repository/playerRepository'
import { GameNotFound } from './GameNotFound'

export const gameContext = React.createContext(null)

export default function ContextProvider ({ children }) {

  const { gameId } = useParams()

  const [gameSnapshot, gameLoading, gameError] = useDocument(getGameRef(gameId))
  const [playerListSnapshot] = useCollection(getPlayersCollectionRef(gameId))

  const createContext = () => {

    const game = { id: gameId, ...gameSnapshot?.data() }
    const playerList = playerListSnapshot?.docs.map(doc => (
      {
        ...doc.data(),
        id: doc.id,
        isLocalPlayer: doc.data().name === readPlayerFromLocalStorage().name
      }
    ))

    const localPlayer = playerList?.find(player => player.isLocalPlayer)

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
