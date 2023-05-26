import React from 'react'
import useGameContext from '../hooks/useGameContext'
import { Player } from '../player/Player'
import '../../styles/battle.css'
import { Board } from './Board'

export default function Battle () {

  const { playerList } = useGameContext()

  return (
    <div className='row bg-blue'>

      <div>
        <h2>Choose the missile target</h2>
      </div>

      <div className='enemy-list'>
        {playerList.map(player => (
          <div key={player.id}>
            <Player player={player} />
            <Board grid={player.grid} />
          </div>
        ))}
      </div>

    </div>
  )
}
