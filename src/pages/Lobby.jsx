import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { SetupGame } from '../components/lobby/SetupGame'
import { GAME_STATES } from '../logic/utils'
import useGameContext from '../components/hooks/useGameContext'

export const Lobby = () => {

  const { game, localPlayer } = useGameContext()

  const navigation = useNavigate()

  useEffect(() => {
    if (game.status === GAME_STATES.SETUP_SHIPS) {
      navigation(`/game/${game.id}`)
    }

    if (localPlayer.name === null) {
      console.log('no local player name: ')
      navigation('/')
    }
  }, [game])

  return (
    <SetupGame />
  )

}
