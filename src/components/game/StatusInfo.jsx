import React from 'react'
import useGameContext from '../hooks/useGameContext'
import { GAME_STATES } from '../../logic/utils'
import Button from 'react-bootstrap/Button'
import CountdownBar from './CountdownBar'

export default function StatusInfo ({ onTimeUp }) {

  const { game, playerList, localPlayer } = useGameContext()

  const allPlayersChoosedTarget = () => (
    playerList.every(player => player.hasSelectedTarget)
  )

  const gameEndedInfo = (
    <>
      <h2>{game.winner} wins</h2>

      <Button
        className='col-4'
        href='/'
        variant='outline-light'
      >
        Play again
      </Button>
    </>
  )

  const chooseTargegInfo = (
    <>
      <h2>Choose the target cell</h2>
      <CountdownBar onTimeUp={onTimeUp} />
    </>
  )

  const getGameInfo = () => {
    if (game.status === GAME_STATES.FINISHED) return gameEndedInfo

    if (!localPlayer.hasSelectedTarget) return chooseTargegInfo

    if (allPlayersChoosedTarget()) return <h2>Processing results...</h2>

    return <h2>Wait for the opponent to make a move</h2>
  }

  return (
    <div className='row justify-content-center p-2'>

      {getGameInfo()}
    </div>
  )
}
