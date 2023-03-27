import React, { useState } from 'react'
import Select from 'react-select'
import { updateGameBoardSize } from '../../logic/gameService'
import { gameContext } from '../../pages/Lobby'

const boardSizeOptions = [
  { value: 50, label: 'Small' },
  { value: 150, label: 'Medium' },
  { value: 350, label: 'Large' }
]

export const Settings = () => {

  const context = React.useContext(gameContext)
  const game = context.game
  const localPlayer = context.localPlayer

  const getSelectedOption = () => {
    console.log('looking for option ')
    return boardSizeOptions.find(option => option.value === game.boardSize)
  }

  const handleChange = (selected) => {
    updateGameBoardSize(game, selected.value)
  }

  return (
    <div className='col-8'>
      <h2>Game settings</h2>

      <label htmlFor='select-options'>Select an option:</label>
      <Select
        id='select-options'
        options={boardSizeOptions}
        value={getSelectedOption()}
        onChange={handleChange}
        isDisabled={localPlayer !== game.owner}
      />
    </div>
  )

}
