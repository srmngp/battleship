import React from 'react'
import { Cell } from './Cell'
import { getSquareStyle } from '../../logic/utils'
import ShotTooltip from './ShotTooltip'
import ShipPart from './ShipPart'

export const BattleBoard = ({ player, onCellClick }) => {

  const grid = player.hitsGrid

  const gridSizeStyle = getSquareStyle(grid.length)

  const getCellId = (index) => (
    `player-${player.id}-cell-${index}`
  )

  const getLocalPlayerShips = (index) => {
    if (!player.isLocalPlayer) {
      return
    }

    const part = player.shipsGrid[index]
    return part && <ShipPart part={part} />
  }

  const getPartFromSunkShips = (index) => {
    const part = player.shipsGrid[index]
    if (!part || player.isLocalPlayer) {
      return
    }

    const hitsNumber = player.hitsGrid
      .filter(hit => hit !== null)
      .filter(hit => hit.shot.shipSize === part.shipSize)
      .length

    const shipIsSunk = hitsNumber === part.shipSize

    return shipIsSunk && <ShipPart className='sunk' part={part} />
  }

  return (
    <main className={`board battle pb-3 ${!player.shipsRemainAfloat ? 'loser opacity-50' : ''}`}>
      <div className='grid' style={gridSizeStyle}>

        {grid.map((cell, index) => (
          <div key={index}>
            <Cell
              id={getCellId(index)}
              onClick={() => onCellClick(player, index)}
            >
              {getCellValue(cell)}
              {getLocalPlayerShips(index)}
              {getPartFromSunkShips(index)}
            </Cell>
            <ShotTooltip cell={cell} cellId={getCellId(index)} playerId={player.id} />
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
    return <div className='shot 💣'>💣</div>
  }

  return <div className='shot'>{cell.shot.hitted ? '💥' : '🌊'}</div>
}
