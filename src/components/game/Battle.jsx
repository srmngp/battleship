import React, { useEffect } from 'react'
import useGameContext from '../hooks/useGameContext'
import { Player } from '../player/Player'
import '../../styles/battle.css'
import { BattleBoard } from './BattleBoard'
import { resolveBombs, setBombTo } from '../../logic/playerService'
import StatusInfo from './StatusInfo'
import { checkIfGameHasEnded } from '../../logic/gameService'
import { GAME_STATES } from '../../logic/utils'

export default function Battle () {

  const { game, playerList, localPlayer } = useGameContext()

  useEffect(() => { endTurn() }, [playerList])
  useEffect(() => { checkIfGameHasEnded(playerList) }, [playerList])

  const selectTargetCell = (targetPlayer, cellIndex) => {
    if (localPlayer.hasSelectedTarget || game.status === GAME_STATES.FINISHED) {
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

  return (
    <div className='row bg-blue'>

      <StatusInfo />

      <div className='board-list row'>

        <div className='col board-container'>
          <Player player={localPlayer} />
          <BattleBoard
            player={localPlayer}
            onCellClick={() => {}}
          />
        </div>

        {playerList
          .filter(player => player.name !== localPlayer.name)
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
