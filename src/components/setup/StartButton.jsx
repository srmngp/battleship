import React, { useEffect, useState } from 'react'
import { gameContext } from '../../pages/Lobby'

export default function StartButton () {

  const context = React.useContext(gameContext)
  const game = context.game
  const playerList = context.playerList
  const localPlayer = context.localPlayer

  const defatultStartStyle = 'btn btn-primary col-2 margin-l-10'
  const [startButtonStyle, setStartButtonStyle] = useState(defatultStartStyle + 'disabled')

  useEffect(() => {
    if (playerList.length > 1) {
      setStartButtonStyle(defatultStartStyle)
    }
  }, [playerList])

  return (
    <>
      {game.owner === localPlayer
        ? <button form='gameSettingsForm' className={startButtonStyle}>💣 Start</button>
        : ''}
    </>
  )
}
