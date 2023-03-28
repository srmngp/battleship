import React from 'react'
import { GameSetup } from '../components/lobby/GameSetup'
import ContextProvider from '../components/lobby/ContextProvider'

export const gameContext = React.createContext(null)

export const Lobby = () => {

  return (
    <ContextProvider>
      <GameSetup />
    </ContextProvider>
  )

}
