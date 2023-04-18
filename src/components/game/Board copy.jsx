import React, { useState } from 'react'

import { Cell } from './Cell'
import { generateGrid } from '../../logic/boardGenerator'

export const Board = ({ readyFunction }) => {

  const [grid, setGrid] = useState(generateGrid())
  const [fleet, setFleet] = useState(['🛥', '🛥', '🛥', '🛥'])

  const setNextShip = (index) => {
    if (grid[index] === '🛥') {
      return
    }

    if (!fleet.length) {
      readyFunction()
    }

    const newFleet = [...fleet]
    const cellContent = newFleet.shift()
    setFleet(newFleet)

    const newGrid = [...grid]
    newGrid[index] = cellContent
    setGrid(newGrid)

  }

  return (
    <main className='board'>
      <div className='grid'>
        {grid.map((cellContent, index) => (
          <Cell key={index} updateBoard={() => setNextShip(index)}>
            {cellContent}
          </Cell>
        ))}
      </div>

      <div>
        <p>Fleet</p>
        {fleet.map((ship, index) => (
          <span key={index}>{ship}</span>
        ))}
      </div>

    </main>
  )

}
