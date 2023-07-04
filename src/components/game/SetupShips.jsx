import React, { useState } from 'react'
import useGameContext from '../hooks/useGameContext'
import { Board } from './Board'
import Fleet from './Fleet'
import { DndContext, KeyboardSensor, MouseSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core'
import ReadyButton from './ReadyButton'
import '../../styles/fleet.css'
import '../../styles/board.css'
import { updatePlayer } from '../../logic/playerService'
import { updateGameStatus } from '../../logic/gameService'
import { GAME_STATES } from '../../logic/utils'

export const SetupShips = () => {

  const { game, playerList, localPlayer } = useGameContext()
  const [fleet, setFleet] = useState(game.fleet)
  const [shipsGrid, setGrid] = useState(Array(game.boardSize).fill(null))

  const handleDragOver = (event) => {
    cleanAllCellsHover()
    // Este método es una ñapa :( para que hover ocupe el espacio del ship.
    // Junto con el css de .ship-size-{}
    if (!event.over || event.over.data.current.type !== 'cell') {
      return
    }

    const cellOver = document.getElementsByClassName(`cell-${event.over.data.current.id}`)
    const shipSize = `ship-size-${event.active.data.current.ship.value}`

    cellOver[0].classList.add('drag-over', shipSize)
  }

  const handleDragEnd = (event) => {
    cleanAllCellsHover()
    if (!event.over || event.over.data.current.type !== 'cell') {
      return
    }

    const ship = event.active.data.current.ship
    const index = event.over.data.current.id

    addShip(index, ship)
  }

  const addShip = (gridCellIndex, ship) => {
    if (!possitionAvaliable(gridCellIndex, ship)) {
      return
    }

    const newGrid = [...shipsGrid]
    for (let i = 0; i < ship.value; i++) {
      newGrid[gridCellIndex + i] = { ...ship, part: i }
    }

    setGrid(newGrid)
    removeShipFromFleet(ship)
  }

  const possitionAvaliable = (gridCellIndex, ship) => {
    if (shipsGrid[gridCellIndex] !== null) {
      return false
    }
    for (let i = 1; i < ship.value; i++) {
      if (shipsGrid[gridCellIndex + i] !== null) {
        return false
      }
    }
    return true
  }

  const removeShipFromFleet = (shipAdded) => {
    const newFleet = fleet.filter(ship => ship.value !== shipAdded.value)
    setFleet(newFleet)
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

    if (isThisTheLastPlayerSettingShips(playerList)) { // Last player in getting ready starts the game
      console.log('Starting game!')
      updateGameStatus(game, GAME_STATES.IN_PROGRESS)
    }
  }

  const mouseSensor = useSensor(MouseSensor)
  const touchSensor = useSensor(TouchSensor)
  const keyboardSensor = useSensor(KeyboardSensor)

  const sensors = useSensors(
    mouseSensor,
    touchSensor,
    keyboardSensor
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
          <ReadyButton fleet={fleet} onClick={readyClick} />
        </div>
      </div>

    </DndContext>
  )
}

const cleanAllCellsHover = () => {
  const allCells = document.getElementsByClassName('square')
  Array.from(allCells).forEach(cell =>
    cell.classList.remove('drag-over', 'ship-size-1', 'ship-size-2', 'ship-size-3', 'ship-size-4'))
}

const isThisTheLastPlayerSettingShips = (playerList) => (
  getNumberOfPlayersReady(playerList) >= playerList.length - 1
)

const getNumberOfPlayersReady = (playerList) => (
  playerList.filter(player => player.shipsReady).length
)
