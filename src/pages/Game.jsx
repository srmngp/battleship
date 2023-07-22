import React, { useEffect } from 'react'
import useGameContext from '../components/hooks/useGameContext'
import { GAME_STATES } from '../logic/utils'
import { SetupShips } from '../components/game/SetupShips'
import Battle from '../components/game/Battle'
import { useNavigate } from 'react-router-dom'

export default function Game () {

  const { game, localPlayer } = useGameContext()
  const navigation = useNavigate()

  useEffect(() => {
    if (!localPlayer.name) {
      navigation('/')
    }
  }, [])

  return (
    <>
      {game.status === GAME_STATES.SETUP_SHIPS && <SetupShips />}
      {game.status === GAME_STATES.IN_PROGRESS && <Battle />}
      {game.status === GAME_STATES.FINISHED && <Battle />}
    </>
  )

}
