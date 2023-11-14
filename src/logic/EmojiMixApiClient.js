export const getRandomMixUrl = async () => {
  const url = import.meta.env.VITE_EMOJI_MIX_API_BASE_URL + '/mix/random-url'

  try {
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return data.url
  } catch (error) {
    console.error(error)
    return null
  }
}

