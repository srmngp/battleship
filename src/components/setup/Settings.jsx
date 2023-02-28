import React, { useState } from 'react'

export const Settings = () => {

  const [boardSize, setBoardSize] = useState(10)

  return (
    <div className='col-8'>
      <h2>Game settings</h2>

      <div className='form-floating mb-3'>
        <input value={boardSize} type='number' className='form-control' id='floatingInput' />
        <label htmlFor='floatingInput'>Board size</label>
      </div>

    </div>
  )
}
