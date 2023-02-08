import { addDoc, collection, doc, getDoc } from 'firebase/firestore'
import { db } from './firebaseDb'

export const saveGame = async (playerId) => {

  const docRef = await addDoc(collection(db, 'Games'), { players: [playerId] })

  return { id: docRef.id, players: docRef.players }

}

export const readGame = async (gameId) => {

  const docRef = doc(db, 'Games', gameId)

  return await getDoc(docRef)

}
