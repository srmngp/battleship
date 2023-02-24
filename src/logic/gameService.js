import { createPlayer } from './playerService'
import { readGame, saveNewGame } from './repository/gameRepository'

export const createGame = (player) => { // TODO estos return??

  const game = saveNewGame()
    .then(game => {
      createPlayer(player, game.id)
      return game
    })

  return game

}

export const getGame = async (gameId) => {
  const docSnap = await readGame(gameId)

  if (docSnap.exists()) {
    console.log(`Game ${gameId} found`, docSnap.data())
    return docSnap
  }

  console.log(`Game ${gameId} not found`)
}

export const addPlayerToGame = async (playerName, gameId) => {

  getGame(gameId)
    .then(game => createPlayer(playerName, game.id))

}
