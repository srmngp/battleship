import React, { useState } from 'react'
import useGameContext from '../hooks/useGameContext'
import { Board } from './Board'
import Fleet from './Fleet'
import { DndContext } from '@dnd-kit/core'
import '../../styles/fleet.css'
import '../../styles/board.css'

export const SetupShips = () => {

  const { game, playerList } = useGameContext()
  const [fleet, setFleet] = useState(game.fleet)
  const [grid, setGrid] = useState(Array(game.boardSize).fill(null))

  const handleDragOver = (event) => {
    // Este método es una ñapa :( para que hover ocupe el espacio del ship.
    // Junto con el css de .ship-size-{}
    console.log(event)
    if (!event.over || event.over.data.current.type !== 'cell') {
      return
    }

    cleanAllCellsHover()

    const cellOver = document.getElementsByClassName(`cell-${event.over.data.current.index}`)
    cellOver[0].classList.add('drag-over', `ship-size-${event.active.data.current.ship.value}`)

  }

  const handleDragEnd = (event) => {
    if (!event.over || event.over.data.current.type !== 'cell') {
      return
    }

    const ship = event.active.data.current.ship
    const index = event.over.data.current.index

    addShip(index, ship)
    cleanAllCellsHover()
  }

  const addShip = (gridCellIndex, ship) => {
    if (grid[gridCellIndex] !== null) {
      return
    }

    const newGrid = [...grid]
    ship.label.forEach((ship, index) => {
      newGrid[gridCellIndex + index] = ship
    })

    setGrid(newGrid)
    removeShipFromFleet(ship)
  }

  const removeShipFromFleet = (shipAdded) => {
    const newFleet = fleet.filter(ship => ship.value !== shipAdded.value)
    setFleet(newFleet)
  }

  return (
    <div className='Game'>
      <div className='row padding-b-30'>

        <DndContext onDragEnd={handleDragEnd} onDragOver={handleDragOver}>

          <div className='row bg-blue'>

            <div>
              <h2>Choose the ships positions</h2>
              <p>{playerList.filter(player => player.shipsReady).length}/{playerList.length} Players ready</p>
            </div>

            <div className='col-md-4'>
              <Fleet pendingShips={fleet} />
            </div>

            <div className='col-md-8'>
              <Board grid={grid} />
            </div>
          </div>

        </DndContext>

      </div>
    </div>

  )
}

const cleanAllCellsHover = () => {
  const allCells = document.getElementsByClassName('square')
  Array.from(allCells).forEach(cell => cell.classList.remove('drag-over'))
}
