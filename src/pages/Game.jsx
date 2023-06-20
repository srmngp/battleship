import React from 'react'
import useGameContext from '../components/hooks/useGameContext'
import { GAME_STATES } from '../logic/utils'
import { SetupShips } from '../components/game/SetupShips'
import Battle from '../components/game/Battle'

export default function Game () {

  const { game } = useGameContext()

  return (
    <>
      {game.status === GAME_STATES.SETUP_SHIPS && <SetupShips />}
      {game.status === GAME_STATES.IN_PROGRESS && <Battle />}
      {game.status === GAME_STATES.FINISHED && <Battle />}
    </>
  )

}
