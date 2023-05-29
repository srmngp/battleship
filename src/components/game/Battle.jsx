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

      <div className='enemy-list row'>
        {playerList.map(player => (
          <div key={player.id} className='p-3 col-md-12'>
            <div className='enemy-container'>
              <Player player={player} />
              <Board grid={player.grid} />
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}
