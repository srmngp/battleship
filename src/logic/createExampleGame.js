import { collection, doc, setDoc } from 'firebase/firestore'
import { db } from './repository/firebaseDb'
import { savePlayerNameInLocalStorage } from './localStorageManager'

export const createExampleGame = () => {

  const game = {
    id: 'test-game',
    boardSize: 49,
    fleet: [{ label: ['🚤'], value: 1 }, { label: ['🛥', '🛥', '🛥'], value: 3 }],
    owner: 'Player-1',
    status: 'IN_PROGRESS',
    players: [
      { name: 'Player 1', color: 'red' },
      { name: 'Player 2', color: 'blue' }
    ]
  }

  saveGame(game)
  savePlayer(
    buildNewTestPlayer(1),
    buildNewTestPlayer(2),
    buildNewTestPlayer(3))
  savePlayerNameInLocalStorage('Player-1')
}

const buildNewTestPlayer = (number) => {
  return {
    id: `Player-${number}`,
    gameId: 'test-game',
    name: `Player-${number}`,
    ready: true,
    shipsRemainAfloat: true,
    avatarUrl: `https://garticphone.com/images/avatar/${number}.svg`,
    shipsGrid: ['🚤', null, null, null, null, null, null, '🛥', '🛥', '🛥', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
    hitsGrid: [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null]
  }

}

const saveGame = (game) => {

  const gamesRef = collection(db, 'Games')
  const testGameRef = doc(gamesRef, game.id)

  return setDoc(testGameRef, game)
}

const savePlayer = (...players) => {
  players.forEach(player => {
    const playersRef = collection(db, 'Games/test-game/Players')
    const testPlayerRef = doc(playersRef, player.id)

    setDoc(testPlayerRef, player)
  })
}
