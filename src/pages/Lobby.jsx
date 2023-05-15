import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { GameSetup } from '../components/lobby/GameSetup'
import { GAME_STATES } from '../logic/utils'
import useGameContext from '../components/hooks/useGameContext'

export const Lobby = () => {

  const game = useGameContext()

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
