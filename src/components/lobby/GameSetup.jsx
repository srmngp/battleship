import React from 'react'
import { copyGameUrl } from '../../logic/utils'
import { ToastButton } from './ToastButton'
import { PlayerList } from './PlayerList'
import { Settings } from './Settings'
import StartButton from './StartButton'
import useGameContext from '../hooks/useGameContext'

export const GameSetup = () => {

  const { game } = useGameContext()

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
