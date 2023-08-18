import React from 'react'
import useGameContext from '../hooks/useGameContext'
import { Player } from '../player/Player'
import '../../styles/playerList.css'

export const PlayerList = () => {

  const { playerList, game } = useGameContext()

  const listedPlayers = playerList
    .sort((a, b) => game.owner === a.name ? -1 : 1)
    .map(player =>
      <Player key={player.name} player={player} />
    )

  return (
    <div className='playerList'>

      {listedPlayers}

    </div>
  )

}
