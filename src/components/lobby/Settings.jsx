import React from 'react'
import Select from 'react-select'
import { updateGameBoardSize } from '../../logic/gameService'
import { gameContext } from '../ContextProvider'

const boardSizeOptions = [
  { value: 50, label: 'Small' },
  { value: 150, label: 'Medium' },
  { value: 350, label: 'Large' }
]

export const Settings = () => {

  const context = React.useContext(gameContext)
  const game = context.game
  const localPlayer = context.localPlayer

  const getSelectedOption = () => (
    boardSizeOptions.find(option => option.value === game.boardSize)
  )

  const handleChange = (selected) => {
    updateGameBoardSize(game, selected.value)
  }

  return (
    <div>
      <h3>Game settings</h3>

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
