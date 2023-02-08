import { addDoc, collection } from 'firebase/firestore'
import { db } from './firebaseDb'

export const createPlayer = async (name) => {

  const docRef = await addDoc(collection(db, 'Players'), { name })

  return { id: docRef.id, name }

}
