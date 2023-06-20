import { addDoc, collection, doc, updateDoc } from 'firebase/firestore'
import { db } from './firebaseDb'

export const saveGame = (game) => {

  const gamesRef = collection(db, 'Games')

  return addDoc(gamesRef, game)
}

export const getGameRef = (gameId) => (doc(db, 'Games', gameId))

export const updateGameDocument = (game) => {
  const docRef = doc(db, 'Games', game.id)

  updateDoc(docRef, game)
}

export const updateGameFields = (gameId, fields) => {
  console.log(`Updating ${gameId} fields`, fields)
  const docRef = doc(db, 'Games', gameId)

  updateDoc(docRef, fields)
}
