import { addDoc, collection, doc, getDoc } from 'firebase/firestore'
import { gameConverter } from '../models/game.class'
import { db } from './firebaseDb'

export const saveGame = async (game) => {

  const gamesRef = collection(db, 'Games').withConverter(gameConverter)

  return addDoc(gamesRef, game)
}

export const readGame = async (gameId) => {

  const docRef = doc(db, 'Games', gameId).withConverter(gameConverter)

  return await getDoc(docRef)

}
