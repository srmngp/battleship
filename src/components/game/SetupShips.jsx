import React, { useState } from 'react'
import useGameContext from '../hooks/useGameContext'
import { Board } from './Board'
import Fleet from './Fleet'

export const SetupShips = () => {

  const { game, playerList } = useGameContext()
  const [fleet, setFleet] = useState(game.fleet)

  const removeShipFromFleet = (shipAdded) => {
    const newFleet = fleet.filter(ship => ship.value !== shipAdded.value)
    setFleet(newFleet)
  }

  return (
    <div className='Game'>
      <div className='row padding-b-30'>

        <div>
          <h2>Choose the ships positions</h2>
          <p>{playerList.filter(player => player.shipsReady).length}/{playerList.length} Players ready</p>

        </div>

        <div className='col-4'>
          <Fleet pendingShips={fleet} />
        </div>

        <div className='col-8'>
          <Board removeShipFromFleet={removeShipFromFleet} />
        </div>

      </div>
    </div>

  )
}
