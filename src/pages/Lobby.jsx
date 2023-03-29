import React from 'react'
import { GameSetup } from '../components/lobby/GameSetup'
import ContextProvider from '../components/ContextProvider'

export const gameContext = React.createContext(null)

export const Lobby = () => { // TODO este componente no está un poco vacío?

  return (
    <ContextProvider>
      <GameSetup />
    </ContextProvider>
  )

}
