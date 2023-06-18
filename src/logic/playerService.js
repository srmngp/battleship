import { savePlayerNameInLocalStorage } from './localStorageManager'
import { savePlayer, updatePlayerDocument, updatePlayerFields } from './repository/playerRepository'

export const createPlayer = async (playerData, gameSnapshot) => {
  savePlayer(playerData, gameSnapshot)
    .then(savePlayerNameInLocalStorage(playerData.name))
}

export const setPlayerAsReady = (player) => {
  console.log('Updating player as ready', player)
  const newPlayerData = { ...player, ready: true }// FIXME rename to shipsReady

  updatePlayerDocument(newPlayerData)
}

export const setBombTo = (localPlayer, targetPlayer, cellIndex) => {
  console.log(`${targetPlayer.name} selected as target, shooting to cell ${cellIndex}`)

  const targetPlayerUpdatedFields = {
    hitsGrid: printBombOnGrid(localPlayer, targetPlayer, cellIndex)
  }
  updatePlayerFields(targetPlayer, targetPlayerUpdatedFields)

  const localPlayerUpdatedFields = {
    hasSelectedTarget: true
  }
  updatePlayerFields(localPlayer, localPlayerUpdatedFields)
}

export const resolveBombs = (playerList) => {
  playerList.forEach((player) => {
    console.log(`Resolving ${player.name}'s bombs`)

    const newFields = {
      hasSelectedTarget: false,
      hitsGrid: resolveBombsOnGrid(player)
    }

    updatePlayerFields(player, newFields)
  })
}

const printBombOnGrid = (localPlayer, targetPlayer, cellIndex) => {
  const hitsGrid = [...targetPlayer.hitsGrid]

  hitsGrid[cellIndex] = { shot: { origin: localPlayer.name, isBomb: true } }

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

  return cell.shot.isBomb
}
