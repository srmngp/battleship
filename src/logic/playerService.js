import { savePlayerNameInLocalStorage } from './localStorageManager'
import { Player } from './models/player.class'
import { getPlayersCollection, savePlayer } from './repository/playerRepository'

export const createPlayer = async (playerName, gameId) => {

  savePlayer(playerName, gameId)
    .then(savePlayerNameInLocalStorage(playerName))
}

export const getPlayers = async (gameId) => {

  const docSnap = await getPlayersCollection(gameId)

  return docSnap.docs
    .map(doc => new Player(doc.id, doc.data().name))// TODO pq no funciona el converter?

}
