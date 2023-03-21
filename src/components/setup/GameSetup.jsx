import React from 'react'
import { copyGameUrl } from '../../logic/utils'
import { gameContext } from '../../pages/Lobby'
import { ToastButton } from '../ToastButton'
import { PlayerList } from './PlayerList'
import { Settings } from './Settings'
import StartButton from './StartButton'

export const GameSetup = () => {

  const context = React.useContext(gameContext)
  const game = context.game
  const playerList = context.playerList

  return (
    <div className='GameSetup row'>

      <div className='col-4 text-start'>
        <PlayerList players={playerList} />
      </div>

      <div className='col-8'>
        <Settings />

      </div>

      <div className='col-12 justify-content-center'>
        <ToastButton text='🔗 Invite' clickAction={() => copyGameUrl(game.id)} toastText='Link copied!' />
        <StartButton />
      </div>

    </div>
  )

}
