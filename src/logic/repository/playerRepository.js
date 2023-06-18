import { addDoc, collection, doc, updateDoc } from 'firebase/firestore'
import { db } from './firebaseDb'

export const savePlayer = async (playerData, gameSnapshot) => (
  addDoc(
    getPlayersRef(gameSnapshot.id),
    {
      name: playerData.name,
      avatarUrl: playerData.avatarUrl,
      gameId: gameSnapshot.id
    })
)

export const getPlayersRef = (gameId) => (
  collection(db, `Games/${gameId}/Players`)
)

export const updatePlayerDocument = (player) => { // FIXME shouldn't be necessary, use updatePlayerFields instead
  console.log(`Updating ${player.name} `, player)
  const docRef = getDocRef(player)

  updateDoc(docRef, player)
}

export const updatePlayerFields = (player, fields) => {
  console.log(`Updating ${player.name} fields`, fields)
  const docRef = getDocRef(player)

  updateDoc(docRef, fields)
}

const getDocRef = (player) => (
  doc(db, `Games/${player.gameId}/Players`, player.id)
)
