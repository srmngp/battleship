import React from 'react'

import { Cell } from './Cell'
import { getSquareStyle } from '../../logic/utils'

export const Board = ({ grid }) => {

  const gridSizeStyle = getSquareStyle(grid.length)

  return (
    <main className='board pb-3'>
      <div className='grid' style={gridSizeStyle}>

        {grid.map((ship, index) => (
          <Cell
            key={index}
            id={index}
          >
            {ship && ship.label[ship.part]}
          </Cell>
        ))}

      </div>

    </main>
  )

}
