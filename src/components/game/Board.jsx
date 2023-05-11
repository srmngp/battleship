import React from 'react'

import { Cell } from './Cell'

export const Board = ({ grid }) => {

  const sideLength = Math.sqrt(grid.length)
  const gridSizeStyle = {
    gridTemplateColumns: `repeat(${sideLength}, 1fr)`,
    gridTemplateRows: `repeat(${sideLength}, 1fr)`
  }

  return (
    <main className='board'>
      <div className='grid' style={gridSizeStyle}>

        {grid.map((ship, index) => (
          <Cell key={index} index={index} value={ship} />
        ))}

      </div>

    </main>
  )

}
