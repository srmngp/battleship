import { addDoc, collection, doc, getDoc, onSnapshot, updateDoc } from 'firebase/firestore'
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

export const getGameRef = (gameId) => (doc(db, 'Games', gameId))

export const updateGameDocument = async (game) => {
  const docRef = doc(db, 'Games', game.id).withConverter(gameConverter)

  await updateDoc(docRef, game)
}

export const getGameOnSnapshot = (gameId, setGame) => {
  const docRef = doc(db, 'Games', gameId)

  const unsub = onSnapshot(docRef, (doc) => {
    console.log('Game updated..', doc.data())
  })

  return unsub
}
