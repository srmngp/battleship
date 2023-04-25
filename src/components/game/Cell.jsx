import React, { useState } from 'react'

export const Cell = ({ value, addShip, index }) => {

  const [classState, setClassState] = useState('square')

  const handleDrop = (event) => {
    const ship = JSON.parse(event.dataTransfer.getData('ship'))
    addShip(index, ship)
    setClassState('square')
  }

  const handleDragOver = (event) => {
    event.preventDefault()
    setClassState('square drag-over')
  }

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={() => setClassState('square')}
      className={classState}
    >
      {value}
    </div>
  )

}
