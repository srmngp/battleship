import { readGame, saveGame } from './repository/gameRepository'
import { createPlayer as savePlayer } from './repository/playerRepository'

export const createGame = async (playerName) => { // TODO se pueden quitar awaits usando promises?

  const player = await savePlayer(playerName)

  return saveGame(player.id)

}

export const getGame = async (gameId) => {

  const docSnap = await readGame(gameId)

  if (docSnap.exists()) {
    console.log(`Game ${gameId} found`, docSnap.id, docSnap.data())
    return docSnap
  }

  console.log(`Game ${gameId} not found`)
}
