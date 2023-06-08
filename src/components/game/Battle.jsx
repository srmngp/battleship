import React from 'react'
import useGameContext from '../hooks/useGameContext'
import { Player } from '../player/Player'
import '../../styles/battle.css'
import { BattleBoard } from './BattleBoard'
import { resolveBombs, setBombTo } from '../../logic/playerService'
import StatusInfo from './StatusInfo'

export default function Battle () {

  const { playerList, localPlayer } = useGameContext()

  const selectTargetCell = (playerTarget, cellIndex) => {

    if (localPlayer.hasSelectedTarget) return

    console.log(`${playerTarget.name} selected as target, shooting to cell ${cellIndex}`)
    setBombTo(localPlayer, playerTarget, cellIndex)

    setTimeout(() => {

      if (isThisTheLastPlayerShoting(playerList)) {
        resolveBombs(playerList)
      }

    }, 3000)

  }

  return (
    <div className='row bg-blue'>

      <StatusInfo playerList={playerList} localPlayer={localPlayer} />

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

const isThisTheLastPlayerShoting = (playerList) => (
  playerList.filter(player => player.hasSelectedTarget).length >= playerList.length - 1
)
