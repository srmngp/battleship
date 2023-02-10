export class Player {
  id = ''
  name = ''

  constructor (id, name) {
    this.id = id
    this.name = name
  }

}

export const playerConverter = {
  toFirestore: (player) => {
    return {
      name: player.name
    }
  },
  fromFirestore: (snapshot, options) => {
    const data = snapshot.data(options)
    return new Player(snapshot.id, data.name)
  }
}
