export class Game {

  id = ''

  constructor (id) {
    this.id = id
  }

}

export const gameConverter = {
  toFirestore: (game) => {
    return {
    }
  },
  fromFirestore: (snapshot, options) => {
    // const data = snapshot.data(options)
    return new Game(snapshot.id)
  }
}
