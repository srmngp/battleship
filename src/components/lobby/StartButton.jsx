import React, { useEffect, useState } from 'react'
import { updateGameSatus } from '../../logic/gameService'
import { GAME_STATES } from '../../logic/utils'
import useGameContext from '../hooks/useGameContext'

export default function StartButton () {

  const { game, playerList, localPlayer } = useGameContext()

  const [buttonDisabled, setButtonDisabled] = useState(true)

  useEffect(() => {
    if (playerList.length > 1) {
      setButtonDisabled(false)
    }
  }, [playerList])

  const handleClick = () => {
    console.log('Starting game...')
    updateGameSatus(game, GAME_STATES.SETUP_SHIPS)
  }

  const button = (
    <button
      className='button button-primary margin-l-10'
      onClick={handleClick}
      disabled={buttonDisabled}
    >
      💣 Start
    </button>
  )

  return (
    <>
      {game.owner === localPlayer.name
        ? button
        : ''}
    </>
  )

}
