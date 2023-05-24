import { addDoc, collection, doc, updateDoc } from 'firebase/firestore'
import { db } from './firebaseDb'

export const savePlayer = async (playerData, gameSnapshot) => (
  addDoc(getPlayersRef(gameSnapshot.id), { name: playerData.name, avatarUrl: playerData.avatarUrl })
)

export const getPlayersRef = (gameId) => (
  collection(db, `Games/${gameId}/Players`)
)

export const upadatePlayerDocument = (gameId, player) => {
  const docRef = doc(db, `Games/${gameId}/Players`, player.id)

  console.log(`Updating ${docRef} to`, player)
  updateDoc(docRef, player)
}
