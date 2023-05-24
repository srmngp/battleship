import React from 'react'
import Ship from './Ship'

export default function Fleet ({ pendingShips }) {

  return (
    <>
      <span>Fleet</span>
      <div className='fleet'>
        {pendingShips.map((ship, index) => (
          <Ship ship={ship} key={index} />
        ))}
      </div>
    </>
  )
}
