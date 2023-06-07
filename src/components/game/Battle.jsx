import React from 'react'
import useGameContext from '../hooks/useGameContext'
import { Player } from '../player/Player'
import '../../styles/battle.css'
import { BattleBoard } from './BattleBoard'
import { setShootTo } from '../../logic/playerService'

export default function Battle () {

  const { playerList, localPlayer } = useGameContext()

  const selectCellTarget = (playerTarget, cellIndex) => {
    console.log(`${playerTarget.name} selected as target, shooting to cell ${cellIndex}`)
    setShootTo(playerTarget, cellIndex)
  }

  return (
    <div className='row bg-blue'>

      <h2>Choose the target cell</h2>

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
                onCellClick={selectCellTarget}
              />
            </div>
          ))}

      </div>

    </div>
  )
}
