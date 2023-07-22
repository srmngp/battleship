import React, { useState, useEffect } from 'react'
import { AddPlayer } from '../components/join/AddPlayer'
import useGameContext from '../components/hooks/useGameContext'
import { Alert, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { GAME_STATES } from '../logic/utils'

export const Join = () => {

  const { game, localPlayer } = useGameContext()
  const [showAlert, setShowAlert] = useState(true)
  const navigation = useNavigate()

  const canJoinGame = () => {
    return game.status === GAME_STATES.LOBBY
  }

  useEffect(() => {
    console.log('localPlayer', localPlayer)
    if (playerAlreadyJoinedGame()) {
      navigation(`/lobby/${game.id}`)
    }
  }, [])

  const playerAlreadyJoinedGame = () => {
    if (!localPlayer) return false

    return localPlayer.joinedGames?.some(joinedGame => joinedGame === game.id)
  }

  const cantJoinGame = (
    <>
      <Alert show={showAlert} variant='danger' onClose={() => setShowAlert(false)}>
        The game is already in progress, you can't join it.
      </Alert>
      <Button
        className='col-4'
        href='/'
        variant='outline-light'
      >
        New game
      </Button>
    </>

  )

  return (
    <>
      {canJoinGame()
        ? <AddPlayer />
        : cantJoinGame}
    </>

  )

}
