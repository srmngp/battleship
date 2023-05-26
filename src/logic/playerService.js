import { savePlayerNameInLocalStorage } from './localStorageManager'
import { savePlayer, upadatePlayerDocument } from './repository/playerRepository'

export const createPlayer = async (playerData, gameSnapshot) => {
  savePlayer(playerData, gameSnapshot)
    .then(savePlayerNameInLocalStorage(playerData.name))
}

export const setPlayerAsReady = (player) => {
  console.log('Updating player as ready', player)
  const newPlayer = { ...player, ready: true }

  upadatePlayerDocument(player.gameId, newPlayer)
}
