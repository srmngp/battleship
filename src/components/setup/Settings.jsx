import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import { useFormik } from 'formik'
import React from 'react'
import * as Yup from 'yup'

const gameSettingsSchema = Yup.object({
  boardSize: Yup
    .number('Choose a size')
    .required('Required')
})

export const Settings = () => {

  const formik = useFormik({
    initialValues: {
      boardSize: 50
    },
    validationSchema: gameSettingsSchema,
    onSubmit: (values) => {
      // alert(JSON.stringify(values, null, 2))
    }
  })

  return (
    <div className='col-8'>
      <h2>Game settings</h2>
      <form onSubmit={formik.handleSubmit}>

        <FormControl fullWidth>
          <InputLabel id='demo-simple-select-label'>board size</InputLabel>
          <Select
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            value={formik.values.boardSize}
            label='Board size'
            onChange={formik.handleChange}
            error={formik.touched.boardSize && Boolean(formik.errors.boardSize)}
          >
            <MenuItem value={50}>Small</MenuItem>
            <MenuItem value={120}>Medium</MenuItem>
            <MenuItem value={300}>Big</MenuItem>
          </Select>
        </FormControl>

      </form>
    </div>
  )
}
