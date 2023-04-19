import React, { useState } from 'react'

import { Cell } from './Cell'
import { generateGrid } from '../../logic/boardGenerator'
import useGameContext from '../hooks/useGameContext'

export const Board = ({ shipsPosition }) => {

  const { game } = useGameContext()
  const [grid, setGrid] = useState(generateGrid(game.boardSize))
  const sideLength = Math.sqrt(game.boardSize)

  const gridSizeStyle = {
    gridTemplateColumns: `repeat(${sideLength}, 1fr)`,
    gridTemplateRows: `repeat(${sideLength}, 1fr)`
  }

  return (
    <main className='board'>
      <div className='grid' style={gridSizeStyle}>
        {grid.map((cellContent, index) => (
          <Cell key={index} updateBoard={() => console.log('Cell clicked')}>
            {cellContent}
          </Cell>
        ))}
      </div>

    </main>
  )

}
