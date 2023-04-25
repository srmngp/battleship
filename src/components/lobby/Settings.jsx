import React from 'react'
import Select from 'react-select'
import { updateGameBoardSize, updateGameFleet } from '../../logic/gameService'
import useGameContext from '../hooks/useGameContext'

const boardSizeOptions = [
  { value: 49, label: 'Small' },
  { value: 100, label: 'Medium' },
  { value: 225, label: 'Large' }
]

const fleetOption = [
  { value: 1, label: ['🚤'] },
  { value: 2, label: ['⛵', '⛵'] },
  { value: 3, label: ['🛥', '🛥', '🛥'] },
  { value: 4, label: ['🚢', '🚢', '🚢', '🚢'] }
]

export const Settings = () => {

  const { game, localPlayer } = useGameContext()

  const findBoardSizeOption = () => (
    boardSizeOptions.find(option => option.value === game.boardSize)
  )

  const handleBoardSizeChange = (selected) => {
    updateGameBoardSize(game, selected.value)
  }

  const handleFleetChange = (selected) => {
    updateGameFleet(game, selected)
  }

  const playerIsNotGameOwner = () => (
    localPlayer.name !== game.owner
  )

  return (
    <div>
      <h3>Game settings</h3>

      <label htmlFor='select-size'>Board size</label>
      <Select
        id='select-size'
        options={boardSizeOptions}
        value={findBoardSizeOption()}
        onChange={handleBoardSizeChange}
        isDisabled={playerIsNotGameOwner()}
      />

      <label htmlFor='select-fleet'>Fleet</label>
      <Select
        isMulti
        id='select-fleet'
        className='basic-multi-select'
        classNamePrefix='select'
        options={fleetOption}
        value={game.fleet}
        onChange={handleFleetChange}
        isDisabled={playerIsNotGameOwner()}
      />
    </div>
  )

}
