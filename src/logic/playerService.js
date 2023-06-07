import { readPlayerNameFromLocalStorage, savePlayerNameInLocalStorage } from './localStorageManager'
import { savePlayer, updatePlayerDocument } from './repository/playerRepository'

export const createPlayer = async (playerData, gameSnapshot) => {
  savePlayer(playerData, gameSnapshot)
    .then(savePlayerNameInLocalStorage(playerData.name))
}

export const setPlayerAsReady = (player) => {
  console.log('Updating player as ready', player)
  const newPlayer = { ...player, ready: true }

  updatePlayerDocument(player.gameId, newPlayer)
}

export const setShootTo = (player, cellIndex) => {
  const newPlayer = { ...player, hitsGrid: printShotOnGrid(player, cellIndex) }

  updatePlayerDocument(player.gameId, newPlayer)
}

const printShotOnGrid = (player, cellIndex) => {
  const localPlayer = readPlayerNameFromLocalStorage()
  const hitsGrid = [...player.hitsGrid]
  const shipsGrid = [...player.grid]

  const shotResult = shipsGrid[cellIndex] !== null

  hitsGrid[cellIndex] = { shot: { origin: localPlayer, hitted: shotResult } }

  return hitsGrid
}
