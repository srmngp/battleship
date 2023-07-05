export const GAME_STATES = {
  LOBBY: 'AT_LOBBY',
  SETUP_SHIPS: 'SETUP_SHIPS',
  IN_PROGRESS: 'IN_PROGRESS',
  FINISHED: 'FINISHED'
}

export const boardSizeOptions = [
  { size: 49, label: 'Small' },
  { size: 100, label: 'Medium' },
  { size: 225, label: 'Large' }
]

export const fleetOptions = [
  { size: 1, parts: [{ sprite: '<=>' }] },
  { size: 2, parts: [{ sprite: '<=' }, { sprite: '=>' }] },
  { size: 3, parts: [{ sprite: '<=' }, { sprite: '=' }, { sprite: '=>' }] },
  { size: 4, parts: [{ sprite: '<=' }, { sprite: '=' }, { sprite: '=' }, { sprite: '=>' }] }
]

export const defaultGame = {
  status: 'AT_LOBBY',
  boardSize: 49,
  fleet: [
    fleetOptions[0],
    fleetOptions[1],
    fleetOptions[2]
  ]

}

export const EMPTY_CELL = { label: '' }

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
