import React, { useState } from 'react'

export default function Fleet () {
  const [fleet, setFleet] = useState(['🛥', '🚤', '⛵', '🚢'])

  return (
    <div>
      <p>Fleet</p>
      {fleet.map((ship, index) => (
        <span key={index}>{ship}</span>
      ))}
    </div>
  )
}
