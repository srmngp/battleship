import React from 'react'

import { Cell } from './Cell'
import { getSquareStyle } from '../../logic/utils'
import { Tooltip } from 'react-tooltip'

export const BattleBoard = ({ player, onCellClick }) => {

  const grid = player.hitsGrid

  const gridSizeStyle = getSquareStyle(grid.length)

  const getTooltip = (cell, index) => {
    return (
      cell &&
        <Tooltip
          anchorSelect={`#${getCellId(index)}`}
          content={`Shot by ${cell.shot?.origin}`} // FIXME revisar este texto
        />
    )
  }

  const getCellId = (index) => (
    `player-${player.id}-cell-${index}`
  )

  return (
    <main className={`board pb-3 ${!player.shipsRemainAfloat ? 'loser opacity-50' : ''}`}>
      <div className='grid' style={gridSizeStyle}>

        {grid.map((cell, index) => (
          <div key={index}>
            <Cell
              id={getCellId(index)}
              onClick={() => onCellClick(player, index)}
            >
              {getCellValue(cell)}
            </Cell>
            {getTooltip(cell, index)}
          </div>
        ))}

      </div>

    </main>
  )

}

const getCellValue = (cell) => {
  if (!cell) {
    return
  }

  if (cell.shot.hitted === undefined) {
    return <div className='💣'>💣</div>
  }

  return cell.shot.hitted ? '💥' : '🌊'
}
