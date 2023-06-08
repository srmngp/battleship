import { readPlayerNameFromLocalStorage, savePlayerNameInLocalStorage } from './localStorageManager'
import { savePlayer, updatePlayerDocument } from './repository/playerRepository'

export const createPlayer = async (playerData, gameSnapshot) => {
  savePlayer(playerData, gameSnapshot)
    .then(savePlayerNameInLocalStorage(playerData.name))
}

export const setPlayerAsReady = (player) => {
  console.log('Updating player as ready', player)
  const newPlayerData = { ...player, ready: true }// FIXME rename to shipsReady

  updatePlayerDocument(player.gameId, newPlayerData)
}
export const setBombTo = (localPlayer, targetPlayer, cellIndex) => {

  const newTargetPlayerData = {
    ...targetPlayer,
    hitsGrid: printBombOnGrid(targetPlayer, cellIndex)
  }
  updatePlayerDocument(targetPlayer.gameId, newTargetPlayerData)

  const newLocalPlayerData = {
    ...localPlayer,
    hasSelectedTarget: true
  }
  updatePlayerDocument(localPlayer.gameId, newLocalPlayerData)
}

export const resolveBombs = (playerList) => {
  playerList.forEach(player => {
    console.log(`Resolving booms from player ${player.name}`)

    const newPlayerData = {
      ...player,
      hasSelectedTarget: false,
      hitsGrid: resolveBombsOnGrid(player)
    }

    updatePlayerDocument(player.gameId, newPlayerData)
  })
}

const printBombOnGrid = (player, cellIndex) => {
  const localPlayer = readPlayerNameFromLocalStorage()
  const hitsGrid = [...player.hitsGrid]

  hitsGrid[cellIndex] = { shot: { origin: localPlayer } }

  return hitsGrid
}

const resolveBombsOnGrid = (player) => {
  const shipsGrid = [...player.grid]
  const hitsGrid = [...player.hitsGrid]

  hitsGrid.forEach((cell, index) => {
    if (cellIsBomb(cell)) {
      console.log(`Bomb in cell ${index}`)
      const isHitted = shipsGrid[index] !== null

      const newShotData = {
        origin: cell.shot.origin,
        hitted: isHitted
      }

      hitsGrid[index] = { shot: newShotData }
    }
  })

  return hitsGrid
}

const cellIsBomb = (cell) => {
  if (cell === null) return false

  return cell.shot.hitted === undefined
}
