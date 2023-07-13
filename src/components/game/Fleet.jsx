import React from 'react'
import DraggableShip from './DraggableShip'

export default function Fleet ({ pendingShips }) {

  return (
    <>
      <h5>Fleet</h5>
      <div className='fleet'>
        {pendingShips.map((ship, index) => (
          <DraggableShip ship={ship} key={index} />
        ))}
      </div>
    </>
  )
}
