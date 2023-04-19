import React from 'react'
import useGameContext from '../hooks/useGameContext'
import { Board } from './Board'
import Fleet from './Fleet'

export const SetupShips = () => {

  const { playerList, localPlayer } = useGameContext()

  return (
    <div className='Game'>
      <div className='row padding-b-30'>

        <div>
          <h2>Choose the ships positions</h2>
          <p>{playerList.filter(player => player.shipsReady).length}/{playerList.length} Players ready</p>

        </div>

        <div className='col-4'>
          <Fleet pendingShips={localPlayer.pendingShips} />
        </div>

        <div className='col-8'>
          <Board shipsPosition={localPlayer.shipsPosition} />
        </div>

      </div>
    </div>

  )
}