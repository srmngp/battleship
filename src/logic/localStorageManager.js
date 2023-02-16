const PLAYER_NAME = 'playerName'

export const savePlayerNameInLocalStorage = (value) => {
  saveLocalStorage(PLAYER_NAME, value)
}

export const readPlayerNameFromLocalStorage = () => (
  readLocalStorage(PLAYER_NAME)
)

const saveLocalStorage = (key, value) => {
  window.localStorage.setItem(key, value)
}

const readLocalStorage = (key) => (
  window.localStorage.getItem(key)
)
