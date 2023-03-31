import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { gameContext } from '../components/ContextProvider'
import { GameSetup } from '../components/lobby/GameSetup'
import { GAME_STATES } from '../logic/utils'

export const Lobby = () => {

  // TODO esto podría ser un hook?
  const context = React.useContext(gameContext)
  const game = context.game

  const navigation = useNavigate()

  useEffect(() => {
    if (game.status === GAME_STATES.SETUP_SHIPS) {
      navigation(`/game/${game.id}`)
    }
  }, [game])

  return (
    <GameSetup />
  )

}
