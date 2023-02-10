import React from 'react'

export const SetupShips = ({ players }) => {
  return (
    <div>
      <p>Choose the ships positions</p>
      <p>{players.filter(player => player.shipsReady).length}/{players.length} Players ready</p>
    </div>
  )
}
