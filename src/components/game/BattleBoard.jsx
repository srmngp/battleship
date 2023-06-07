import React from 'react'

import { Cell } from './Cell'
import { getSquareStyle } from '../../logic/utils'

export const BattleBoard = ({ player, onCellClick }) => {

  const grid = player.hitsGrid

  const gridSizeStyle = getSquareStyle(grid.length)

  return (
    <main className='board pb-3'>
      <div className='grid' style={gridSizeStyle}>

        {grid.map((cell, index) => (
          <Cell
            key={index}
            index={index}
            value={getShotResult(cell)}
            tooltip={getShotOrigin(cell)}
            onClick={() => onCellClick(player, index)}
          />
        ))}

      </div>

    </main>
  )

}

const getShotResult = (cell) => {
  if (!cell) return
  return cell.shot.hitted ? '💥' : '🌊'
}

const getShotOrigin = (cell) => {
  if (!cell) return ''
  return cell.shot.origin
}
