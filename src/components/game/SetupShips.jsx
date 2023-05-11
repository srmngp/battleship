import React, { useState } from 'react'
import useGameContext from '../hooks/useGameContext'
import { Board } from './Board'
import Fleet from './Fleet'
import { DndContext } from '@dnd-kit/core'

export const SetupShips = () => {

  const { game, playerList } = useGameContext()
  const [fleet, setFleet] = useState(game.fleet)
  const [grid, setGrid] = useState(Array(game.boardSize).fill(null))

  const handleDragEnd = (event) => {
    if (!event.over || event.over.data.current.type !== 'cell') {
      return
    }

    const ship = JSON.parse(event.active.data.current.ship)
    const index = event.over.data.current.index

    addShip(index, ship)
  }

  const addShip = (gridCellIndex, value) => {
    if (grid[gridCellIndex] !== null) {
      return
    }

    const newGrid = [...grid]
    value.label.forEach((ship, index) => {
      newGrid[gridCellIndex + index] = ship
    })

    setGrid(newGrid)
    removeShipFromFleet(value)
  }

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

        <DndContext onDragEnd={handleDragEnd}>
          <div className='col-4'>
            <Fleet pendingShips={fleet} />
          </div>

          <div className='col-8'>
            <Board grid={grid} />
          </div>
        </DndContext>
      </div>
    </div>

  )
}
