import { savePlayerNameInLocalStorage } from './localStorageManager'
import { savePlayer } from './repository/playerRepository'

export const createPlayer = async (playerName, gameSnapshot) => {
  savePlayer(playerName, gameSnapshot)
    .then(savePlayerNameInLocalStorage(playerName))
}
