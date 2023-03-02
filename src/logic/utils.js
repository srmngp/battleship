export const copyGameUrl = (gameId) => {
  const joinGameUrl = window.location.origin + '/join/' + gameId

  navigator.clipboard.writeText(joinGameUrl)
}
