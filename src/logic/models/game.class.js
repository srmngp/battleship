export class Game {

  id = ''
  owner = ''

  constructor (id, owner) {
    this.id = id
    this.owner = owner
  }

}

export const gameConverter = {

  toFirestore: (game) => {
    return {
      owner: game.owner
    }
  },

  fromFirestore: (snapshot, options) => {
    const data = snapshot.data(options)
    return new Game(snapshot.id, data.owner)
  }

}
