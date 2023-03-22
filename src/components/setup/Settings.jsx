import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import React from 'react'
import * as Yup from 'yup'
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
    game.boardSize = event.target.value
    // TODO updateGame
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
        {({ errors, touched }) => (
          <Form id='gameSettingsForm'>
            <FormControl fullWidth>
              <InputLabel id='boardSize-label'>Board size</InputLabel>
              <Field name='boardSize'>
                {({ field }) => (
                  <Select
                    id='boardSize'
                    label='Board size'
                    labelId='boardSize-label'
                    error={errors.boardSize && touched.boardSize}
                    disabled={game.owner !== localPlayer}
                    onChange={handleBoardSizeChange}
                    {...field}
                  >
                    <MenuItem value='50'>Small (25x25)</MenuItem>
                    <MenuItem value='150'>Medium (75x75)</MenuItem>
                    <MenuItem value='350'>Big (175x175)</MenuItem>
                  </Select>

                )}
              </Field>
              {errors.boardSize && (
                <ErrorMessage name='boardSize' component='div' />
              )}
            </FormControl>
          </Form>
        )}
      </Formik>
    </div>
  )
}
