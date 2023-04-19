import { createPlayer } from './playerService'
import { saveGame, updateGameDocument } from './repository/gameRepository'

export const createGame = async (playerName) => {
  console.log(`Creating game for player: ${playerName}`)

  const newGame = { owner: playerName, status: 'AT_LOBBY' }

  return saveGame(newGame)// TODO esto no es un poco raro??
    .then(game => {
      createPlayer(playerName, game)
      return game
    })
}

export const addPlayerToGame = async (playerName, gameSnapshot) => {
  createPlayer(playerName, gameSnapshot)
}

export const updateGameBoardSize = (game, newBoardSize) => {
  console.log(`Updating game board size to: ${newBoardSize}`)

  const newGame = { ...game, boardSize: newBoardSize }
  updateGameDocument(newGame)
}

export const updateGameFleet = (game, newFleet) => {
  console.log(`Updating game fleet to: ${newFleet}`)

  const newGame = { ...game, fleet: newFleet }
  updateGameDocument(newGame)
}

export const updateGameSatus = (game, newStatus) => {
  console.log(`Updating game status to: ${newStatus}`)

  const newGame = { ...game, status: newStatus }
  updateGameDocument(newGame)
}
