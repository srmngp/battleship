import React, { useEffect } from 'react'
import { GAME_STATES, copyGameUrl } from '../../logic/utils'
import { ToastButton } from './ToastButton'
import { PlayerList } from './PlayerList'
import { Settings } from './Settings'
import StartButton from './StartButton'
import useGameContext from '../hooks/useGameContext'
import { useNavigate } from 'react-router-dom'

export const GameSetup = () => {

  const { game } = useGameContext()
  const navigation = useNavigate()

  useEffect(() => {
    if (game.status === GAME_STATES.SETUP_SHIPS) {
      navigation(`/game/${game.id}`)
    }
  }, [game])

  return (
    <div className='GameSetup'>

      <div className='row bg-blue'>

        <div className='col-md-4'>
          <h3>Players</h3>
          <PlayerList />
        </div>

        <div className='col-md-8 setting-list'>
          <h3>Game settings</h3>
          <Settings />
        </div>

      </div>

      <div className='row padding-10'>
        <div className='col'>
          <ToastButton text='🔗 Invite' clickAction={() => copyGameUrl(game.id)} toastText='Link copied!' />
          <StartButton />
        </div>
      </div>

    </div>
  )

}
