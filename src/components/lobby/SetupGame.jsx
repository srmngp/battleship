import React, { useEffect } from 'react'
import { GAME_STATES, copyGameUrl } from '../../logic/utils'
import { ToastButton } from './ToastButton'
import { PlayerList } from './PlayerList'
import { Settings } from './Settings'
import StartButton from './StartButton'
import useGameContext from '../hooks/useGameContext'
import { useNavigate } from 'react-router-dom'
import { Alert } from 'react-bootstrap'

export const SetupGame = () => {

  const { game, localPlayer } = useGameContext()
  const navigation = useNavigate()

  useEffect(() => {
    if (game.status === GAME_STATES.SETUP_SHIPS) {
      navigation(`/game/${game.id}`)
    }
  }, [game])

  const waitingInfo = (
    <Alert variant='primary'>
      Waiting for {game.owner} to start the game...
    </Alert>
  )

  return (
    <>
      {game.owner !== localPlayer.name ? waitingInfo : undefined}

      <div className='setup-game row bg-blue'>

        <div className='col-md-4'>
          <h3>Players</h3>
          <PlayerList />
        </div>

        <div className='col-md-8 setting-list'>
          <h3>Game settings</h3>
          <Settings />
        </div>

      </div>

      <div className='row pt-2'>
        <div className='col'>
          <ToastButton text='🔗 Invite' clickAction={() => copyGameUrl(game.id)} toastText='Link copied!' />
          {game.owner === localPlayer.name
            ? <StartButton />
            : undefined}
        </div>
      </div>

    </>
  )

}
