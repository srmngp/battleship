import React from 'react'

export default function StatusInfo ({ playerList, localPlayer }) {

  const allPlayersChoosedTarget = () => (
    playerList.filter(player => player.hasSelectedTarget).length === playerList.length
  )

  const getGameInfo = () => {
    if (!localPlayer.hasSelectedTarget) return <h2>Choose the target cell</h2>
    if (localPlayer.hasSelectedTarget && !allPlayersChoosedTarget()) return <h2>Wait for the opponent to make a move</h2>
    if (localPlayer.hasSelectedTarget && allPlayersChoosedTarget()
    ) return <h2>Processing results...</h2>
  }

  return (
    getGameInfo()
  )
}
