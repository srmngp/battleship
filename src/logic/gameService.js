import { createPlayer } from './playerService'
import { saveGame, updateGameDocument } from './repository/gameRepository'

export const createGame = async (playerName) => {

  const newGame = { owner: playerName, boardSize: 50 }

  return saveGame(newGame)// TODO esto no es un poco raro??
    .then(game => {
      createPlayer(playerName, game)
      return game
    })
}

export const updateGameBoardSize = (game, newBoardSize) => {
  console.log('Updating game..')

  const newGame = { ...game, boardSize: newBoardSize }
  updateGameDocument(newGame)
}

export const addPlayerToGame = async (playerName, gameSnapshot) => {
  createPlayer(playerName, gameSnapshot)
}
