import React from 'react'
import Select from 'react-select'
import { updateGameBoardSize, updateGameFleet } from '../../logic/gameService'
import useGameContext from '../hooks/useGameContext'
import '../../styles/settings.css'
import { boardSizeOptions, fleetOptions } from '../../logic/utils'
import Ship from '../game/Ship'

export const Settings = () => {

  const { game, localPlayer } = useGameContext()

  const findBoardSizeOption = () => (
    boardSizeOptions.find(option => option.size === game.boardSize)
  )

  const handleBoardSizeChange = (selected) => {
    updateGameBoardSize(game, selected.size)
  }

  const handleFleetChange = (selected) => {
    console.log('selected', selected)
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
            value={findBoardSizeOption()}
            options={boardSizeOptions}
            getOptionValue={option => option.size}
            getOptionLabel={option => option.label}
            onChange={handleBoardSizeChange}
            isDisabled={playerIsNotGameOwner()}
            styles={selectStyles}
            isSearchable={false}
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
            value={game.fleet}
            options={fleetOptions}
            components={{ Option: customOption, MultiValueLabel: customMultiValueLabel }}
            getOptionValue={option => option.size}
            getOptionLabel={option => option.parts.map(part => part.sprite).join('')}
            onChange={handleFleetChange}
            isDisabled={playerIsNotGameOwner()}
            styles={selectStyles}
            isSearchable={false}
          />

        </div>
      </div>
    </>
  )

}

const customOption = ({ innerProps, data }) => (
  <div {...innerProps}> {/* This div is needed, idk why */}
    <Ship {...innerProps} ship={data} />
  </div>
)

const customMultiValueLabel = ({ innerProps, data }) => (
  <Ship {...innerProps} ship={data} {...innerProps} />
)

const selectStyles = {
  control: (provided, { isDisabled }) => ({
    ...provided,
    backgroundColor: undefined,
    fontWeight: 'bold',
    color: '#fff',
    opacity: isDisabled ? 0.7 : 1
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
