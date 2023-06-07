import { createPlayer } from './playerService'
import { saveGame, updateGameDocument } from './repository/gameRepository'

export const createGame = async (playerData) => {
  console.log(`Creating game for player: ${playerData.name}`, playerData)

  const newGame = { owner: playerData.name, status: 'AT_LOBBY' }

  return saveGame(newGame)// FIXME esto no es un poco raro??
    .then(game => {
      createPlayer(playerData, game)
      return game
    })
}

export const addPlayerToGame = async (playerData, gameSnapshot) => {
  createPlayer(playerData, gameSnapshot)
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
