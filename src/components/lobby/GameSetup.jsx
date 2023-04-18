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

      <div className='row padding-b-30'>

        <div className='col-4'>
          <PlayerList />
        </div>

        <div className='col-8'>
          <Settings />
        </div>

      </div>

      <div className='row'>
        <div className='col-12 justify-content-center'>
          <ToastButton text='🔗 Invite' clickAction={() => copyGameUrl(game.id)} toastText='Link copied!' />
          <StartButton />
        </div>
      </div>

    </div>
  )

}
