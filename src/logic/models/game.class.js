export class Game {

  id = ''
  owner = ''
  boardSize

  constructor (id, owner, boardSize) {
    this.id = id
    this.owner = owner
    this.boardSize = boardSize
  }

}

export const gameConverter = {

  toFirestore: (game) => {
    return {
      owner: game.owner,
      boardSize: game.boardSize
    }
  },

  fromFirestore: (snapshot, options) => {
    const data = snapshot.data(options)
    return new Game(snapshot.id, data.owner, data.boardSize)
  }

}
