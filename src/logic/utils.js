export const GAME_STATES = {
  LOBBY: 'AT_LOBBY',
  SETUP_SHIPS: 'SETUP_SHIPS',
  IN_PROGRESS: 'IN_PROGRESS',
  FINISHED: 'FINISHED'
}

export const copyGameUrl = (gameId) => {
  const joinGameUrl = window.location.origin + '/join/' + gameId

  window.navigator.clipboard.writeText(joinGameUrl)
}

export const getSquareStyle = (length) => {
  const sideLength = Math.sqrt(length)
  return {
    gridTemplateColumns: `repeat(${sideLength}, 1fr)`,
    gridTemplateRows: `repeat(${sideLength}, 1fr)`
  }
}

export const loserGrid = (
  [
    null, '⬛', '⬛', '⬛', '⬛', '⬛', null,
    '⬛', '⬛', '⬛', '⬛', '⬛', '⬛', '⬛',
    '⬛', null, null, '⬛', null, null, '⬛',
    '⬛', null, null, '⬛', null, null, '⬛',
    '⬛', '⬛', '⬛', '⬛', '⬛', '⬛', '⬛',
    null, '⬛', '⬛', '⬛', '⬛', '⬛', null,
    null, '⬛', null, '⬛', null, '⬛', null
  ])

export const winnerGrid = (
  [
    null, null, null, null, null, null, null,
    null, '🟨', '🟨', '🟨', '🟨', '🟨',
    null, '🟨', '🟨', '🟨', '🟨', '🟨', '🟨',
    '🟨', '🟨', null, '🟨', '🟨', '🟨', null,
    '🟨', '🟨', '🟨', '🟨', '🟨', '🟨', '🟨',
    null, null, null, null, '🟨', null, null,
    null, null, null, '🟨', '🟨', '🟨', null, null
  ])
