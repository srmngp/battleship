import { savePlayerNameInLocalStorage } from './localStorageManager'
import { savePlayer, updatePlayerFields } from './repository/playerRepository'

export const createPlayer = async (playerData, gameSnapshot) => {
  savePlayer(playerData, gameSnapshot)
    .then(savePlayerNameInLocalStorage(playerData.name))
}

export const updatePlayer = (player, newFields) => {
  console.log('Updating player', player, newFields)

  updatePlayerFields(player, newFields)
}
// FIXME create board/game service

export const setBombTo = (localPlayer, targetPlayer, cellIndex) => {
  console.log(`${targetPlayer.name} selected as target, shooting to cell ${cellIndex}`)

  if (!validShot(targetPlayer, cellIndex)) {
    console.log('Invalid shot, ignoring')
    return
  }

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

    const resolvedHitsGrid = resolveBombsOnGrid(player)

    const newFields = {
      hasSelectedTarget: false,
      hitsGrid: resolvedHitsGrid,
      shipsRemainAfloat: shipsRemainAfloat(player, resolvedHitsGrid)
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
  const shipsGrid = [...player.shipsGrid]
  const hitsGrid = [...player.hitsGrid]

  hitsGrid.forEach((cell, index) => {
    if (!cellIsBomb(cell)) {
      return
    }

    console.log(`Bomb in cell ${index}`)
    const isHitted = shipsGrid[index] !== null

    const newShotData = {
      origin: cell.shot.origin,
      hitted: isHitted,
      shipSize: isHitted ? shipsGrid[index].shipSize : ''
    }

    hitsGrid[index] = { shot: newShotData }
  })

  return hitsGrid
}

const cellIsBomb = (cell) => {
  if (cell === null) {
    return false
  }

  return cell.shot.isBomb
}

const cellWasAlreadyShot = (player, cellIndex) => {
  return player.hitsGrid[cellIndex] !== null
}

const shipsRemainAfloat = (player, resolvedHitsGrid) => {
  const numberOfShips = player.shipsGrid.filter(cell => cell !== null).length
  const numberOfHits = resolvedHitsGrid.filter(cell => cell !== null && cell.shot.hitted).length

  return numberOfShips !== numberOfHits
}

const validShot = (targetPlayer, cellIndex) => {
  if (cellWasAlreadyShot(targetPlayer, cellIndex)) {
    console.log('Cell was already shot, ignoring')
    return false
  }

  return targetPlayer.shipsRemainAfloat
}
