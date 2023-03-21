import { addDoc, collection, onSnapshot, query } from 'firebase/firestore'
import { Player, playerConverter } from '../models/player.class'
import { db } from './firebaseDb'

export const savePlayer = async (playerName, gameId) => {

  const queryPlayers = playersCollection(gameId)
    .withConverter(playerConverter)

  return addDoc(queryPlayers, new Player('', playerName))

}

export const getPlayersOnSnapshot = (gameId, setPlayers) => {

  const queryPlayers = query(playersCollection(gameId))

  const updatePlayers = (querySnapshot) => {
    const players = querySnapshot.docs.map(
      (doc) => new Player(doc.id, doc.data().name)
    )

    setPlayers(players)
  }

  const unsubscribe = onSnapshot(queryPlayers, updatePlayers)

  return unsubscribe // cuando unsuscribe?
}

const playersCollection = (gameId) => (collection(db, `Games/${gameId}/Players`))
