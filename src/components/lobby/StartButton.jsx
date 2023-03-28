import React, { useEffect, useState } from 'react'
import { updateGameSatus } from '../../logic/gameService'
import { GAME_STATES } from '../../logic/utils'
import { gameContext } from './ContextProvider'

export default function StartButton () {

  const context = React.useContext(gameContext)
  const game = context.game
  const playerList = context.playerList
  const localPlayer = context.localPlayer

  const defatultStartStyle = 'btn btn-primary col-2 margin-l-10 '
  const [startButtonStyle, setStartButtonStyle] = useState(defatultStartStyle + 'disabled')

  useEffect(() => {
    if (playerList.length > 1) {
      setStartButtonStyle(defatultStartStyle)
    }
  }, [playerList])

  const handleClick = () => {
    console.log('Starting game...')
    updateGameSatus(game, GAME_STATES.SETUP_SHIPS)
  }

  return (
    <>
      {game.owner === localPlayer
        ? <button form='gameSettingsForm' className={startButtonStyle} onClick={handleClick()}>💣 Start</button>
        : ''}
    </>
  )

}
