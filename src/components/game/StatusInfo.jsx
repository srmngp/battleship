import React from 'react'
import useGameContext from '../hooks/useGameContext'
import { GAME_STATES } from '../../logic/utils'

export default function StatusInfo () {

  const { game, playerList, localPlayer } = useGameContext()

  const allPlayersChoosedTarget = () => (
    playerList.every(player => player.hasSelectedTarget)
  )

  const getGameInfo = () => {
    if (game.status === GAME_STATES.FINISHED) return <h2>{game.winner} wins</h2>

    if (!localPlayer.hasSelectedTarget) return <h2>Choose the target cell</h2>

    localPlayer.hasSelectedTarget && !allPlayersChoosedTarget()
      ? <h2>Wait for the opponent to make a move</h2>
      : <h2>Processing results...</h2>
  }

  return (
    getGameInfo()
  )
}
