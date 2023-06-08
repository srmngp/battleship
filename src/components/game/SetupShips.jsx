import React, { useState } from 'react'
import useGameContext from '../hooks/useGameContext'
import { Board } from './Board'
import Fleet from './Fleet'
import { DndContext } from '@dnd-kit/core'
import ReadyButton from './ReadyButton'
import '../../styles/fleet.css'
import '../../styles/board.css'
import { setPlayerAsReady } from '../../logic/playerService'
import { updateGameSatus } from '../../logic/gameService'
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
    if (shipsGrid[gridCellIndex] !== null) {
      return
    }

    const newGrid = [...shipsGrid]
    ship.label.forEach((ship, index) => {
      newGrid[gridCellIndex + index] = ship
    })

    setGrid(newGrid)
    removeShipFromFleet(ship)
  }

  const removeShipFromFleet = (shipAdded) => {
    const newFleet = fleet.filter(ship => ship.value !== shipAdded.value)
    setFleet(newFleet)
  }

  const readyClick = () => {
    console.log('Player ready')
    setPlayerAsReady({
      ...localPlayer,
      shipsGrid,
      hitsGrid: Array(game.boardSize).fill(null),
      currentPlayer: game.owner
      // FIXME poner ready aqui o crear el player en otro sitio
    })

    if (isThisTheLastPlayerSettingShips(playerList)) { // Last player in getting ready starts the game
      console.log('Starting game!')
      updateGameSatus(game, GAME_STATES.IN_PROGRESS)
    }
  }

  return (
    <DndContext
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
    >
      <div className='row bg-blue'>

        <div>
          <h2>Choose the ships positions</h2>
        </div>

        <div className='col-md-4'>
          <Fleet pendingShips={fleet} />
        </div>

        <div className='col-md-8'>
          <Board grid={shipsGrid} />
        </div>

      </div>

      <div className='row pt-2'>
        <p>{getNumberOfPlayersReady()}/{playerList.length} Players ready</p>

        <div className='col'>
          <ReadyButton fleet={fleet} onClick={readyClick} />
        </div>
      </div>

    </DndContext>
  )
}

const cleanAllCellsHover = () => {
  const allCells = document.getElementsByClassName('square')
  Array.from(allCells).forEach(cell => cell.classList.remove('drag-over'))
}

const isThisTheLastPlayerSettingShips = (playerList) => (
  getNumberOfPlayersReady(playerList) === playerList.length - 1
)

const getNumberOfPlayersReady = (playerList) => (
  playerList.filter(player => player.ready).length
)
