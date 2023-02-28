import React, { useEffect, useState } from 'react'
import { ToastButton } from '../ToastButton'
import { PlayerList } from './PlayerList'
import { Settings } from './Settings'

export const GameSetup = ({ game, playersCollection }) => {

  const [disabled, setDisabled] = useState('disabled')

  const copyGameUrl = () => {
    const joinGameUrl = window.location.origin + '/join/' + game.id

    navigator.clipboard.writeText(joinGameUrl)
  }

  useEffect(() => {
    console.log('Playhers updated!')
    if (playersCollection.lenght > 1) {
      console.log('enabled start')
      setDisabled(<button className='btn btn-primary col-2'>💣 Start</button>)
    }
  }, [playersCollection])

  return (
    <div className='GameSetup row'>

      <PlayerList players={playersCollection} />
      <Settings />
      <div className='row justify-content-center'>

        <ToastButton text='🔗 Invite' clickAction={copyGameUrl} toastText='Link copied!' />
        <button className='btn btn-primary col-2'>💣 Start</button>
      </div>

    </div>
  )

}
