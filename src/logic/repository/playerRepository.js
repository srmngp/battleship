import { addDoc, collection } from 'firebase/firestore'
import { db } from './firebaseDb'

export const savePlayer = async (playerData, gameSnapshot) => (

  addDoc(getPlayersRef(gameSnapshot.id), { name: playerData.name, avatarUrl: playerData.avatarUrl })

)

export const getPlayersRef = (gameId) => (collection(db, `Games/${gameId}/Players`))
