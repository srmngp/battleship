import React from 'react'
import { gameContext } from '../ContextProvider'

export default function useGameContext () {

  const context = React.useContext(gameContext)

  const game = context.game
  const playerList = context.playerList
  const localPlayer = context.localPlayer

  return (
    { game, playerList, localPlayer }
  )
}
