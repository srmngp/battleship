import { addDoc, collection, onSnapshot, query } from 'firebase/firestore'
import { Player, playerConverter } from '../models/player.class'
import { db } from './firebaseDb'

export const savePlayer = async (playerName, gameId) => {

  const playersCollection = collection(db, `Games/${gameId}/Players`)
    .withConverter(playerConverter)

  return addDoc(playersCollection, new Player('', playerName))

}

export const getPlayersOnSnapshot = (gameId, setPlayers) => {

  const queryPlayers = query(playersCollection(gameId))

  const updatePlayers = (querySnapshot) => {
    const players = []
    querySnapshot.forEach(doc => {
      players.push(new Player(doc.id, doc.data().name))
    })

    setPlayers(players)
  }

  const unsubscribe = onSnapshot(queryPlayers, updatePlayers)

  return unsubscribe
}

const playersCollection = (gameId) => (collection(db, `Games/${gameId}/Players`))// TODO pq no puedo usar esto en todos los métodos??
