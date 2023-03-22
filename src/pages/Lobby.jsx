import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { GameNotFound } from '../components/GameNotFound'
import { GameSetup } from '../components/setup/GameSetup'
import { getGame, getGameRealTime } from '../logic/gameService'
import { readPlayerNameFromLocalStorage } from '../logic/localStorageManager'
import { getPlayersRealtime } from '../logic/playerService'

export const gameContext = React.createContext(null)

export const Lobby = () => {

  const { gameId } = useParams()
  const [game, setGame] = useState(null)
  const [playerList, setPlayerList] = useState([])

  useEffect(() => {

    getGame(gameId)
      .then(game => {
        setGame(game)
      })
    const unsubscribeGame = getGameRealTime(gameId, setGame)
    const unsubscribePlayers = getPlayersRealtime(gameId, setPlayerList)

    return () => {
      unsubscribePlayers()
      unsubscribeGame()
    }
  }, [])

  const createContext = () => (
    {
      game,
      playerList,
      localPlayer: readPlayerNameFromLocalStorage()
    }
  )

  return (
    <gameContext.Provider value={createContext()}>

      {game
        ? <GameSetup />
        : <GameNotFound />}

    </gameContext.Provider>

  )

}
