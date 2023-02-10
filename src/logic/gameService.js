import { readGame, saveNewGame } from './repository/gameRepository'
import { createPlayer } from './repository/playerRepository'

export const createGame = async (playerName) => { // TODO estos return??

  const game = saveNewGame()
    .then(game => {
      createPlayer(playerName, game.id)
      return game
    })

  return game

}

export const getGame = async (gameId) => { // TODO el segundo return?

  const docSnap = await readGame(gameId)

  if (docSnap.exists()) {
    console.log(`Game ${gameId} found`, docSnap.data())
    return docSnap
  }

  console.log(`Game ${gameId} not found`)
}
