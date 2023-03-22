import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import { Form, Formik } from 'formik'
import React from 'react'
import * as Yup from 'yup'
import { updateGame } from '../../logic/gameService'
import { gameContext } from '../../pages/Lobby'

const gameSettingsSchema = Yup.object({
  boardSize: Yup
    .number('Choose a size')
    .oneOf([50, 150, 350], 'Not a valid size')
    .required('Required')
})

export const Settings = () => {

  const context = React.useContext(gameContext)
  const game = context.game
  const localPlayer = context.localPlayer

  const handleBoardSizeChange = (event) => {
    const newGame = { ...game, boardSize: event.target.value }
    updateGame(newGame)
    // TODO show changes on other devices!!
  }

  return (
    <div className='col-8'>
      <h2>Game settings</h2>

      <Formik
        initialValues={{
          boardSize: game.boardSize
        }}
        validationSchema={gameSettingsSchema}
        onSubmit={(values) => {
          console.log('subbmiting form')
          console.log(values)
        }}
      >
        {({ values, errors, touched, handleChange }) => (
          <Form id='gameSettingsForm'>
            <FormControl fullWidth>
              <InputLabel id='boardSize-label'>Board size</InputLabel>
              <Select
                name='boardSize'
                id='boardSize'
                label='Board size'
                labelId='boardSize-label'
                value={values.boardSize}
                error={errors.boardSize && touched.boardSize}
                disabled={game.owner !== localPlayer}
                onChange={(event) => {
                  handleChange(event)
                  handleBoardSizeChange(event)
                }}
              >
                <MenuItem value='50'>Small (25x25)</MenuItem>
                <MenuItem value='150'>Medium (75x75)</MenuItem>
                <MenuItem value='350'>Big (175x175)</MenuItem>
              </Select>
            </FormControl>
          </Form>
        )}
      </Formik>
    </div>
  )
}
