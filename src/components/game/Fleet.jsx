import React from 'react'
import Ship from './Ship'

export default function Fleet ({ pendingShips }) {

  return (
    <>
      <h5>Fleet</h5>
      <div className='fleet'>
        {pendingShips.map((ship, index) => (
          <Ship ship={ship} key={index} />
        ))}
      </div>
    </>
  )
}
