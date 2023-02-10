import { addDoc, collection, doc, getDoc } from 'firebase/firestore'
import { Game, gameConverter } from '../models/game.class'
import { db } from './firebaseDb'

export const saveNewGame = async () => {

  const gamesRef = collection(db, 'Games').withConverter(gameConverter)

  return addDoc(gamesRef, new Game())
}

export const readGame = async (gameId) => {

  const docRef = doc(db, 'Games', gameId).withConverter(gameConverter)

  return await getDoc(docRef)

}
