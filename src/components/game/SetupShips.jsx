import React from 'react'
import useGameContext from '../hooks/useGameContext'

export const SetupShips = () => {

  const { playerList } = useGameContext()

  return (
    <div>
      <h2>Choose the ships positions</h2>
      <p>{playerList.filter(player => player.shipsReady).length}/{playerList.length} Players ready</p>
    </div>
  )
}
