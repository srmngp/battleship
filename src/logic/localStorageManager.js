const PLAYER = 'player'

export const savePlayerInLocalStorage = (value) => {
  saveLocalStorageKey(PLAYER, value)
}

export const readPlayerFromLocalStorage = () => (
  readLocalStorageKey(PLAYER)
)

const saveLocalStorageKey = (key, value) => {
  window.localStorage.setItem(key, JSON.stringify(value))
}

const readLocalStorageKey = (key) => {
  const value = window.localStorage.getItem(key)
  const playerreaded = JSON.parse(value)
  console.log('Reading from local storage: ', playerreaded)
  return playerreaded
}
