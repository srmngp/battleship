import { Game } from './models/game.class'
import { createPlayer } from './playerService'
import { readGame, saveGame } from './repository/gameRepository'

export const createGame = (playerName) => { // TODO estos return??

  const newGame = new Game('', playerName)

  const game = saveGame(newGame)
    .then(game => {
      createPlayer(playerName, game.id)
      return game
    })

  return game

}

export const getGame = async (gameId) => {
  const docSnap = await readGame(gameId)

  if (docSnap.exists()) {
    console.log(`Game ${gameId} found`, docSnap.data())
    return docSnap.data()
  }

  console.log(`Game ${gameId} not found`)
}

export const addPlayerToGame = async (playerName, gameId) => {

  getGame(gameId)
    .then(game => createPlayer(playerName, game.id))

}
