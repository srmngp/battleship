import React from 'react'
import Select from 'react-select'
import { updateGameBoardSize, updateGameFleet } from '../../logic/gameService'
import useGameContext from '../hooks/useGameContext'
import '../../styles/settings.css'

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
    <>
      <div className='row setting'>

        <div className='col-sm-6 legend'>
          <i className='material-symbols-rounded icon'>
            resize
          </i>
          <span className='text'>
            <label className='title'>Board size</label>
            <span className='subtitle'>
              Select the size of the board
            </span>
          </span>
        </div>

        <div className='col-sm-6'>
          <Select
            id='select-size'
            className='select'
            options={boardSizeOptions}
            value={findBoardSizeOption()}
            onChange={handleBoardSizeChange}
            isDisabled={playerIsNotGameOwner()}
            styles={selectStyles}
          />
        </div>

      </div>

      <div className='row setting'>

        <div className='col-sm-6 legend'>
          <i className='material-symbols-rounded icon'>
            directions_boat
          </i>
          <span className='text'>
            <label className='title'>Fleet</label>
            <span className='subtitle'>
              Choose the ships to play with
            </span>
          </span>
        </div>

        <div className='col-sm-6'>
          <Select
            isMulti
            id='select-fleet'
            className='select'
            options={fleetOption}
            value={game.fleet}
            onChange={handleFleetChange}
            isDisabled={playerIsNotGameOwner()}
            styles={selectStyles}
          />

        </div>
      </div>
    </>
  )

}

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

const selectStyles = {
  control: (provided) => ({
    ...provided,
    backgroundColor: 'none',
    borderRadius: '5px',
    border: '1px solid #fff',
    fontWeight: 'bold',
    color: '#fff'
  }),
  singleValue: (provided) => ({
    ...provided,
    color: '#fff'
  }),
  placeholder: (provided) => ({
    ...provided,
    color: '#fff'
  }),
  indicatorSeparator: (provided) => ({
    ...provided,
    display: 'none'
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    color: '#fff',
    padding: '0 5px 0 0'
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? '#ccc' : 'white',
    color: '#333',
    fontWeight: 'bold'
  }),
  multiValue: (provided) => ({
    ...provided,
    backgroundColor: '#fff',
    color: '#333',
    fontWeight: 'bold'
  }),
  multiValueLabel: (provided) => ({
    ...provided,
    color: '#333',
    fontWeight: 'bold',
    padding: 'none'
  }),
  multiValueRemove: (provided) => ({
    ...provided,
    color: '#333',
    fontWeight: 'bold',
    ':hover': {
      backgroundColor: '#ccc',
      color: '#fff',
      fontSize: '1.2em'
    }
  }),
  clearIndicator: (provided) => ({
    ...provided,
    display: 'none'
  })

}
