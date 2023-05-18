import React from 'react'
import useGameContext from '../hooks/useGameContext'
import { Player } from '../player/Player'
import '../../styles/playerList.css'

export const PlayerList = () => {

  const { playerList } = useGameContext()

  const listedPlayers = playerList.map(player =>
    <Player key={player.name} player={player} />
  )

  return (
    <div className='playerList'>

      {listedPlayers}

    </div>
  )

}
