export const GAME_STATES = {
  LOBBY: 'AT_LOBBY',
  SETUP_SHIPS: 'SETTING_UP_SHIPS',
  IN_PROGRESS: 'IN_PROGRESS',
  FINISHED: 'FINISHED'
}

export const copyGameUrl = (gameId) => {
  const joinGameUrl = window.location.origin + '/join/' + gameId

  window.navigator.clipboard.writeText(joinGameUrl)
}
