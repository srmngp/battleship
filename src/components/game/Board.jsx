import React from 'react'

import { Cell } from './Cell'
import { getSquareStyle } from '../../logic/utils'
import DraggableShipPart from './DraggableShipPart'

export const Board = ({ grid }) => {

  const gridSizeStyle = getSquareStyle(grid.length)

  return (
    <>
      <main className='board pb-3'>

        <div className='grid' style={gridSizeStyle}>

          {grid.map((cellData, index) => (
            <Cell
              key={index}
              id={index}
            >
              {cellData && <DraggableShipPart part={cellData} />}
            </Cell>
          ))}

        </div>

      </main>
    </>
  )

}
