import { addDoc, collection, doc, getDocs } from 'firebase/firestore'
import { Player, playerConverter } from '../models/player.class'
import { db } from './firebaseDb'

export const createPlayer = async (playerName, gameId) => {

  const gamesCollection = collection(db, 'Games')
  const game = doc(gamesCollection, gameId)
  const playersCollection = collection(game, 'Players').withConverter(playerConverter)

  addDoc(playersCollection, new Player('', playerName))

}

export const readPlayers = async (gameId) => {

  const gamesCollection = collection(db, 'Games')
  const game = doc(gamesCollection, gameId)
  const playersCollection = collection(game, 'Players')

  return getDocs(playersCollection)

}
