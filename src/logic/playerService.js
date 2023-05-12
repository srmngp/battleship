import { savePlayerNameInLocalStorage } from './localStorageManager'
import { savePlayer } from './repository/playerRepository'

export const createPlayer = async (playerData, gameSnapshot) => {
  savePlayer(playerData, gameSnapshot)
    .then(savePlayerNameInLocalStorage(playerData.name))
}
