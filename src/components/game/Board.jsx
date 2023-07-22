import React from 'react'

import { Cell } from './Cell'
import { getSquareStyle } from '../../logic/utils'
import DraggableShipPart from './DraggableShipPart'
import useGameContext from '../hooks/useGameContext'

export const Board = ({ grid, addShip }) => {

  const gridSizeStyle = getSquareStyle(grid.length)
  const { localPlayer } = useGameContext()

  return (
    <>
      <main className={`board pb-3 ${localPlayer.shipsReady ? 'disabled' : ''}`}>

        <div className='grid' style={gridSizeStyle}>

          {grid.map((cellData, index) => (
            <Cell
              key={index}
              id={index}
            >
              {cellData && <DraggableShipPart part={cellData} addShip={addShip} index={index} />}
            </Cell>
          ))}

        </div>

      </main>
    </>
  )

}
