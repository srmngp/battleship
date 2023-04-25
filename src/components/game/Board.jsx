import React, { useState } from 'react'

import { Cell } from './Cell'
import useGameContext from '../hooks/useGameContext'

export const Board = ({ removeShipFromFleet }) => {

  const { game } = useGameContext()
  const [grid, setGrid] = useState(Array(game.boardSize).fill(null))

  const sideLength = Math.sqrt(game.boardSize)
  const gridSizeStyle = {
    gridTemplateColumns: `repeat(${sideLength}, 1fr)`,
    gridTemplateRows: `repeat(${sideLength}, 1fr)`
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

  return (
    <main className='board'>
      <div className='grid' style={gridSizeStyle}>

        {grid.map((ship, index) => (
          <Cell key={index} index={index} value={ship} addShip={addShip} />
        ))}

      </div>

    </main>
  )

}
