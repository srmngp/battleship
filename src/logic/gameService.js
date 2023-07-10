import { createPlayer } from './playerService'
import { saveGame, updateGameDocument, updateGameFields } from './repository/gameRepository'
import { GAME_STATES, defaultGame } from './utils'

export const createGame = async (playerData) => {
  console.log(`Creating game for player: ${playerData.name}`, playerData)

  const newGame = { owner: playerData.name, ...defaultGame }

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

export const updateGameStatus = (game, status) => {
  console.log(`Updating game status to: ${status}`)

  const newGame = { ...game, status }
  updateGameDocument(newGame)
}

export const checkIfGameHasEnded = (playerList) => {
  console.log('Checking if game has ended')

  const alivePlayers = playerList.filter(player => player.shipsRemainAfloat)

  if (alivePlayers.length === 1) {
    const winner = alivePlayers[0]
    endGame(winner)
  }

}

const endGame = (winner) => {
  console.log(`Game ended, winner is ${winner.name}`)
  console.log(`${winner.name} is the winner`)

  updateGameFields(winner.gameId, { status: GAME_STATES.FINISHED, winner: winner.name })

}
