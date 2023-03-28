import React, { useEffect } from 'react'
import { copyGameUrl, GAME_STATES } from '../../logic/utils'
import { ToastButton } from './ToastButton'
import { PlayerList } from './PlayerList'
import { Settings } from './Settings'
import StartButton from './StartButton'
import { gameContext } from './ContextProvider'
import { useNavigate } from 'react-router-dom'

export const GameSetup = () => {

  const context = React.useContext(gameContext)
  const game = context.game
  const playerList = context.playerList

  const navigation = useNavigate()

  useEffect(() => {
    if (game.status === GAME_STATES.SETUP_SHIPS) {
      navigation(`/game/${game.id}`)
    }
  }, [game])

  return (
    <div className='GameSetup'>

      <div className='row padding-b-30'>

        <div className='col-4'>
          <PlayerList players={playerList} />
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
