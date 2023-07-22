export const GAME_STATES = {
  LOBBY: 'AT_LOBBY',
  SETUP_SHIPS: 'SETUP_SHIPS',
  IN_PROGRESS: 'IN_PROGRESS',
  FINISHED: 'FINISHED'
}

export const boardSizeOptions = [
  { size: 49, label: 'Small 7x7' },
  { size: 100, label: 'Medium 10x10' },
  { size: 225, label: 'Large 15x15' }
]

export const fleetOptions = [
  { size: 1, parts: [{ sprite: '1.svg' }] },
  { size: 2, parts: [{ sprite: '2.1.svg' }, { sprite: '2.2.svg' }] },
  { size: 3, parts: [{ sprite: '3.1.svg' }, { sprite: '3.2.svg' }, { sprite: '3.3.svg' }] },
  { size: 4, parts: [{ sprite: '4.1.svg' }, { sprite: '4.2.svg' }, { sprite: '4.3.svg' }, { sprite: '4.4.svg' }] }
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

export const getSprite = (spriteName) => {
  return `/sprites/${spriteName}`
}
