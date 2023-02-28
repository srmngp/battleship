import { savePlayerNameInLocalStorage } from './localStorageManager'
import { getPlayersOnSnapshot, savePlayer } from './repository/playerRepository'

export const createPlayer = async (playerName, gameId) => {

  savePlayer(playerName, gameId)
    .then(savePlayerNameInLocalStorage(playerName))
}

export const getPlayersRealtime = (gameId, setPlayers) => {

  return getPlayersOnSnapshot(gameId, setPlayers)
}
