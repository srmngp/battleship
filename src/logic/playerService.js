import { readPlayers as getPlayersCollection } from './repository/playerRepository'

export const getPlayers = async (gameId) => {

  const docSnap = await getPlayersCollection(gameId)

  return docSnap.docs

}
