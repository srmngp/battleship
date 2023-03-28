import { addDoc, collection } from 'firebase/firestore'
import { db } from './firebaseDb'

export const savePlayer = async (playerName, gameSnapshot) => (

  addDoc(getPlayersRef(gameSnapshot.id), { name: playerName })

)

export const getPlayersRef = (gameId) => (collection(db, `Games/${gameId}/Players`))
