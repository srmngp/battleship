const PLAYER = 'player'

export const savePlayerNameInLocalStorage = (value) => {
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
  return JSON.parse(value)
}
