import React from 'react'
import Ship from './Ship'

export default function Fleet ({ pendingShips }) {

  return (
    <div>
      <p>Fleet</p>
      {pendingShips.map((ship, index) => (
        <Ship value={ship} key={index} />
      ))}
    </div>
  )
}
