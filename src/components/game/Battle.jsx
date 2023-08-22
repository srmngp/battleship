import React, { useEffect } from 'react'
import useGameContext from '../hooks/useGameContext'
import { Player } from '../player/Player'
import '../../styles/battle.css'
import { BattleBoard } from './BattleBoard'
import { resolveBombs, setBombTo, skipTurnFor } from '../../logic/playerService'
import StatusInfo from './StatusInfo'
import { checkIfGameHasEnded } from '../../logic/gameService'
import { GAME_STATES } from '../../logic/utils'
export default function Battle () {

  const { game, playerList, localPlayer } = useGameContext()

  useEffect(() => { endTurn() }, [playerList])
  useEffect(() => { checkIfGameHasEnded(playerList) }, [playerList])

  const selectTargetCell = (targetPlayer, cellIndex) => {
    if (localPlayer.hasSelectedTarget ||
      game.status === GAME_STATES.FINISHED ||
      targetPlayer.id === localPlayer.id) {
      return
    }

    setBombTo(localPlayer, targetPlayer, cellIndex)
  }

  const endTurn = () => {
    if (everyPlayerHasSelectedTarget(playerList)) {
      setTimeout(() => {
        resolveBombs(playerList)
      }, 1800)
    }
  }

  const skipTurn = () => {
    console.log('Timeout exceeded, skipping turn')
    skipTurnFor(localPlayer)
  }

  return (
    <div className='row bg-blue'>

      <StatusInfo onTimeUp={skipTurn} />

      <div className='board-list row'>

        {playerList
          .sort((a, b) => b.isLocalPlayer - a.isLocalPlayer)
          .map(player => (
            <div key={player.id} className='col board-container'>
              <Player player={player} />
              <BattleBoard
                player={player}
                onCellClick={selectTargetCell}
              />
            </div>
          ))}

      </div>

    </div>
  )
}

const everyPlayerHasSelectedTarget = (playerList) => (
  playerList.every(player => player.hasSelectedTarget)
)
