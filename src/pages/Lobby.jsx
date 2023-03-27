import React from 'react'
import { useParams } from 'react-router-dom'
import { GameNotFound } from '../components/GameNotFound'
import { GameSetup } from '../components/setup/GameSetup'
import { readPlayerNameFromLocalStorage } from '../logic/localStorageManager'
import { useCollection, useDocument } from 'react-firebase-hooks/firestore'
import { getGameRef } from '../logic/repository/gameRepository'
import { getPlayersRef } from '../logic/repository/playerRepository'

export const gameContext = React.createContext(null)

export const Lobby = () => {

  const { gameId } = useParams()

  const [gameSnapshot, gameLoading, gameError] = useDocument(getGameRef(gameId))
  const [playerListSnapshot, playerListLoading, playerListError] = useCollection(getPlayersRef(gameId))

  const createContext = () => (
    {
      game: { id: gameId, ...gameSnapshot?.data() },
      playerList: playerListSnapshot?.docs.map(doc => doc.data()),
      playerListLoading, // TODO usar esto para mostrar loading en PlayerList?
      playerListError,
      localPlayer: readPlayerNameFromLocalStorage()
    }
  )

  return (// TODO loading components?
    <gameContext.Provider value={createContext()}>

      <div>
        {gameError && <GameNotFound />}
        {gameLoading && <span>Document: Loading...</span>}
        {gameSnapshot && <GameSetup />}
      </div>

    </gameContext.Provider>

  )

}
