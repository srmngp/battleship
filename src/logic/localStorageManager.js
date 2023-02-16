const PLAYER_NAME = 'playerName'

export const savePlayerNameInLocalStorage = (value) => {
  saveLocalStorage(PLAYER_NAME, value)
}

export const readPlayerNameFromLocalStorage = async () => (
  await readLocalStorage(PLAYER_NAME)
)

const saveLocalStorage = (key, value) => { // TODO revisar si las promesas aquí merecen la pena
  window.localStorage.setItem(key, value)
}

const readLocalStorage = (key) => {
  console.log(`Reading ${key} from local storage`)

  return new Promise((resolve, reject) => {
    const data = window.localStorage.getItem(key)
    if (data !== null) {
      console.log(`Found ${data}`)
      resolve(data)
    } else {
      reject(console.log(`Key ${key} not found`))
    }
  })
}
