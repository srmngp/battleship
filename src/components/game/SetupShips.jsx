import React, { useEffect, useState } from 'react'
import useGameContext from '../hooks/useGameContext'
import { Board } from './Board'
import Fleet from './Fleet'
import { DndContext, MouseSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core'
import '../../styles/fleet.css'
import '../../styles/board.css'
import { updatePlayer } from '../../logic/playerService'
import { updateGameStatus } from '../../logic/gameService'
import { GAME_STATES } from '../../logic/utils'
import { Button } from 'react-bootstrap'

export const SetupShips = () => { // TODO: This component is too big, refactor it pls

  const { game, playerList, localPlayer } = useGameContext()
  const [fleet, setFleet] = useState(game.fleet)
  const [shipsGrid, setGrid] = useState(Array(game.boardSize).fill(null))

  useEffect(() => { startBattle() }, [playerList])

  const handleDragOver = (event) => {
    if (!event.over || event.over.data.current.type !== 'cell') {
      return
    }
    console.log('Drag over', event)
    cleanAllCellsHover()

    const ship = event.active.data.current
    const cellOverIndex = event.over.id

    setHoverBackground(cellOverIndex, ship)
  }

  const handleDragEnd = (event) => {
    cleanAllCellsHover()
    if (!event.over || event.over.data.current.type !== 'cell') {
      return
    }
    console.log('Drag end', event)

    const ship = event.active.data.current
    const targetCellIndex = event.over.id

    addShip(targetCellIndex, ship)
  }

  const addShip = (targetCellIndex, ship) => {
    if (!possitionAvaliable(targetCellIndex, ship)) {
      console.log('Position not available')
      return
    }
    console.log('Adding ship to grid', ship)

    const newGrid = [...shipsGrid]
    removeShipFromPreviousPosition(ship, newGrid)

    ship.parts.forEach((part, index) => {
      const cellData = {
        ...part,
        shipSize: ship.size,
        firstPartPosition: targetCellIndex,
        isHorizontal: ship.isHorizontal
      }
      const partIndex = getPartIndex(targetCellIndex, index, ship.isHorizontal)

      newGrid[partIndex] = cellData
    })

    removeShipFromFleet(ship)

    setGrid(newGrid)
  }

  const getPartIndex = (targetCellIndex, partIndex, isHorizontal) => {
    if (isHorizontal) {
      return targetCellIndex + partIndex
    }
    // grid is a square, so we can know the cells in each row by square root of the array size
    const rowLength = Math.sqrt(shipsGrid.length)
    return targetCellIndex + (partIndex * rowLength)
  }

  const setHoverBackground = (cellOverIndex, ship) => {
    ship.parts.forEach((part, index) => {
      const partIndex = getPartIndex(cellOverIndex, index, ship.isHorizontal)
      const cellOver = document.getElementsByClassName(`cell-${partIndex}`)[0]

      cellOver?.classList.add('drag-over')
    })
  }

  const possitionAvaliable = (targetCellIndex, ship) => {
    return shipFitsInGrid(targetCellIndex, ship) && !shipOverlapsAnotherShip(targetCellIndex, ship)
  }

  const shipFitsInGrid = (targetCellIndex, ship) => {
    if (ship.isHorizontal) {
      // grid is a square, so we can know the number of rows by square root of the array size
      const numberOfRows = Math.sqrt(shipsGrid.length)
      const firstPartRow = Math.floor(targetCellIndex / numberOfRows)
      const lastPartRow = Math.floor((targetCellIndex + ship.size - 1) / numberOfRows)

      return firstPartRow === lastPartRow
    }

    return getPartIndex(targetCellIndex, ship.size - 1, ship.isHorizontal) < shipsGrid.length
  }

  const shipOverlapsAnotherShip = (targetCellIndex, ship) => (
    ship.parts.some((part, index) =>
      shipsGrid[getPartIndex(targetCellIndex, index, ship.isHorizontal)] !== null && // there is a ship in the cell
      shipsGrid[getPartIndex(targetCellIndex, index, ship.isHorizontal)].shipSize !== ship.size // the ship in the cell is not the same
    )
  )

  const removeShipFromFleet = (shipAdded) => {
    const newFleet = fleet.filter(ship => ship.size !== shipAdded.size)
    setFleet(newFleet)
  }

  const removeShipFromPreviousPosition = (ship, newGrid) => {
    if (ship.firstPartPosition === undefined) { // first time adding ship
      return
    }

    ship.parts.forEach((part, index) => {
      newGrid[ship.firstPartPosition + index] = null
    })
  }

  const readyClick = () => {
    console.log('Player ready')
    updatePlayer(localPlayer,
      {
        id: localPlayer.id,
        shipsReady: true,
        shipsGrid,
        hitsGrid: Array(game.boardSize).fill(null)
      })
  }

  const startBattle = () => {
    if (!everyPlayerIsReady(playerList)) {
      return
    }
    console.log('Starting game!')
    updateGameStatus(game, GAME_STATES.IN_PROGRESS)
  }

  const mouseSensor = useSensor(MouseSensor, { // FIXME if mouse does not move, ship is moved to next cells
    activationConstraint: { // FIXME This generates errors in console but is needed for rotating ships
      delay: 150
    }
  })
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 150
    }
  })

  const sensors = useSensors(
    mouseSensor,
    touchSensor
  )

  return (
    <DndContext
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
      sensors={sensors}
    >
      <div className='row bg-blue'>

        <div>
          <h2>Choose the ships positions</h2>
          <p className='hint'>Drag the ships to the board</p>
          <p>Tap to rotate</p>
        </div>

        <div className='col-md-4'>
          <Fleet pendingShips={fleet} />
        </div>

        <div className='col-md-8'>
          <Board grid={shipsGrid} />
        </div>

      </div>

      <div className='row pt-2'>
        <p>{getNumberOfPlayersReady(playerList)}/{playerList.length} Players ready</p>

        <div className='col'>
          <Button
            className='button'
            variant='light'
            onClick={readyClick}
            disabled={fleet.length !== 0}
          >
            <span className='icon material-symbols-rounded'>
              select_check_box
            </span>
            Ready
          </Button>
        </div>
      </div>

    </DndContext>
  )
}

const cleanAllCellsHover = () => {
  const allCells = document.getElementsByClassName('square')
  Array.from(allCells).forEach(cell =>
    cell.classList.remove('drag-over', 'vertical', 'horizontal'))
}

const everyPlayerIsReady = (playerList) => (
  playerList.every(player => player.shipsReady)
)

const getNumberOfPlayersReady = (playerList) => (
  playerList.filter(player => player.shipsReady).length
)
