import React, { useEffect, useState } from 'react'
import { copyGameUrl } from '../../logic/utils'
import { gameContext } from '../../pages/Game'
import { ToastButton } from '../ToastButton'
import { PlayerList } from './PlayerList'
import { Settings } from './Settings'

export const GameSetup = () => {

  const context = React.useContext(gameContext)
  const game = context.game
  const playerList = context.playerList

  const [startButtonStyle, setStartButtonStyle] = useState('btn btn-primary col-2 disabled')

  useEffect(() => {
    if (playerList.length > 1) {
      setStartButtonStyle('btn btn-primary col-2')
    }
  }, [playerList])

  return (
    <div className='GameSetup row'>

      <div className='col-4 text-start'>
        <PlayerList players={playerList} />
      </div>

      <div className='col-8'>
        <Settings />

        <div className='row'>
          <ToastButton text='🔗 Invite' clickAction={copyGameUrl(game.id)} toastText='Link copied!' />
          <button className={startButtonStyle}>💣 Start</button>
        </div>
      </div>

    </div>
  )

}
