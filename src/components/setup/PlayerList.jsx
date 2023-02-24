import React from 'react'
import { readPlayerNameFromLocalStorage } from '../../logic/localStorageManager'

export const PlayerList = ({ players }) => {

  const getLocalPlayerClass = (name) => (
    readPlayerNameFromLocalStorage() === name ? 'localPlayer' : ''
  )

  const playerList = players.map(player =>
    <li key={player.id} className={getLocalPlayerClass(player.name)}>{player.name}</li>
  )

  return (
    playerList
  )

}
