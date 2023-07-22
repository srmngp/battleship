import React, { useEffect, useState } from 'react'
import useGameContext from '../hooks/useGameContext'
import { Board } from './Board'
import Fleet from './Fleet'
import { DndContext, MouseSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core'
import { updatePlayer } from '../../logic/playerService'
import { updateGameStatus } from '../../logic/gameService'
import { GAME_STATES } from '../../logic/utils'
import { Button } from 'react-bootstrap'
import '../../styles/fleet.css'
import '../../styles/board.css'

export const SetupShips = () => { // TODO: This component is too big, refactor it pls

  const { game, playerList, localPlayer } = useGameContext()

  useEffect(() => { startBattle() }, [playerList])

  const getShipsGrid = () => {
    if (!localPlayer.shipsGrid) {
      return Array(game.boardSize).fill(null)
    }
    return localPlayer.shipsGrid
  }
  const [shipsGrid, setGrid] = useState(getShipsGrid())

  const getPendingShips = () => {
    if (!localPlayer.shipsGrid) {
      return game.fleet
    }
    const fleet = game.fleet.filter(ship => !shipsGrid.some(cell => cell?.shipSize === ship.size))
    return fleet
  }
  const [fleet, setFleet] = useState(getPendingShips())

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
      console.log(`Possition ${targetCellIndex} not avaliable for ship ${ship}`)
      return false
    }
    console.log('Adding ship to grid possition', targetCellIndex, ship)

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
    return true
  }

  const setPlayerAsNotReady = () => {
    updatePlayer(localPlayer, { shipsReady: false })
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
    ship.parts.forEach((part, index) => { // part is not used but needed
      const partIndex = getPartIndex(cellOverIndex, index, ship.isHorizontal)
      const cellOver = document.getElementsByClassName(`cell-${partIndex}`)[0]

      if (partFitsInGrid(cellOverIndex, index, ship.isHorizontal)) {
        cellOver?.classList.add('drag-over')
      }
      if (!possitionAvaliable(cellOverIndex, ship)) {
        cellOver?.classList.add('wrong')
      }
    })
  }

  const partFitsInGrid = (cellOverIndex, partIndex, isHorizontal) => {
    return isHorizontal
      ? partFitsInRow(cellOverIndex, partIndex)
      : partFitsInColumn(cellOverIndex, partIndex)
  }

  const partFitsInRow = (cellOverIndex, partIndex) => {
    // grid is a square, so we can know the number of rows by square root of the array size
    const numberOfRows = Math.sqrt(shipsGrid.length)
    const firstPartRow = Math.floor(cellOverIndex / numberOfRows)
    const partRow = Math.floor((cellOverIndex + partIndex) / numberOfRows)

    return firstPartRow === partRow
  }

  const partFitsInColumn = (partIndex) => {
    return partIndex < shipsGrid.length
  }

  const possitionAvaliable = (cellOverIndex, ship) => {
    return everyPartFitsOnGrid(cellOverIndex, ship) && !shipOverlapsAnotherShip(cellOverIndex, ship)
  }

  const everyPartFitsOnGrid = (cellOverIndex, ship) => (
    ship.parts.every((part, index) => (
      partFitsInGrid(cellOverIndex, index, ship.isHorizontal))
    )
  )

  const shipOverlapsAnotherShip = (targetCellIndex, ship) => (
    ship.parts.some((part, index) =>
      shipsGrid[getPartIndex(targetCellIndex, index, ship.isHorizontal)] !== null && // there is a ship in the cell
      shipsGrid[getPartIndex(targetCellIndex, index, ship.isHorizontal)]?.shipSize !== ship.size // the ship in the cell is not the same
    )
  )

  const removeShipFromFleet = (shipAdded) => {
    const newFleet = fleet.filter(ship => ship.size !== shipAdded.size)
    setFleet(newFleet)
  }

  const removeShipFromPreviousPosition = (ship, newGrid) => {
    newGrid.forEach((cell, index) => {
      if (cell?.shipSize === ship.size) {
        newGrid[index] = null
      }
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

  const notReadyButton = (
    <Button
      className='button'
      variant='light'
      onClick={setPlayerAsNotReady}
    >
      Not ready yet
    </Button>
  )

  const readyButton = (
    <Button
      className='button'
      variant='light'
      onClick={readyClick}
      disabled={fleet.length !== 0}
    >
      <span className='icon material-symbols-rounded'>
        select_check_box
      </span>
      I'm ready
    </Button>
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
          <h5>Board</h5>
          <Board grid={shipsGrid} addShip={addShip} />
        </div>

      </div>

      <div className='row pt-2'>
        <p>{getNumberOfPlayersReady(playerList)}/{playerList.length} Players ready</p>

        <div className='col'>
          {!localPlayer.shipsReady
            ? readyButton
            : notReadyButton}
        </div>
      </div>

    </DndContext>
  )

}

const cleanAllCellsHover = () => {
  const allCells = document.getElementsByClassName('square')
  Array.from(allCells).forEach(cell =>
    cell.classList.remove('drag-over', 'vertical', 'horizontal', 'wrong'))
}

const everyPlayerIsReady = (playerList) => (
  playerList.every(player => player.shipsReady)
)

const getNumberOfPlayersReady = (playerList) => (
  playerList.filter(player => player.shipsReady).length
)
