import React, { useState } from 'react'

import { Cell } from './Cell'
import { generateGrid } from '../logic/boardGenerator'

export const Board = () => {

  const grid = generateGrid()
  const [pendingShips, setPendingShips] = useState(['🛥', '🛥', '🛥', '🛥'])

  const updateBoard = () => {
    console.log('nto workingg')
    const newPendingShips = pendingShips[0]
    const cellContent = newPendingShips.shift()
    setPendingShips(newPendingShips)
  }

  return (
    <main className='board'>
      <div className='grid'>
        {grid.map((item, index) => (
          <Cell key={index} updateBoard={updateBoard} />
        ))}
      </div>

      <div>
        <p>Fleet</p>
        {pendingShips.map((ship, index) => (
          <span key={index}>{ship}</span>
        ))}
      </div>

    </main>
  )

}
