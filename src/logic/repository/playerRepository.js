import { addDoc, collection, getDocs } from 'firebase/firestore'
import { Player, playerConverter } from '../models/player.class'
import { db } from './firebaseDb'

export const savePlayer = async (playerName, gameId) => {

  const playersCollection = collection(db, `Games/${gameId}/Players`)
    .withConverter(playerConverter)

  return addDoc(playersCollection, new Player('', playerName))

}

export const getPlayersCollection = async (gameId) => {

  const playersCollection = collection(db, `Games/${gameId}/Players`)
    .withConverter(playerConverter) // TODO pq no funciona el converter?

  return getDocs(playersCollection)

}
