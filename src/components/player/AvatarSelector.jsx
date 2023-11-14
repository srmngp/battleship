import { useEffect } from 'react'
import { getRandomMixUrl } from '../../logic/EmojiMixApiClient.js'

export default function AvatarSelector ({ updateAvatarUrl, url }) {

  useEffect(() => {
    const fetchAvatarUrl = async () => {
      if (!url) {
        const avatarUrl = await getRandomAvatarUrl()
        updateAvatarUrl(avatarUrl)
      }
    }
    fetchAvatarUrl()
  }, [])

  const handleAvatarClick = async () => {
    const avatarUrl = await getRandomAvatarUrl()
    updateAvatarUrl(avatarUrl)
  }

  return (
    <div className='avatar-selector'>
      <img className='avatar mx-auto' src={url} />
      <button className='randomize' onClick={handleAvatarClick}>↺</button>
    </div>
  )
}

// const getRandomAvatarUrl = () => `https://garticphone.com/images/avatar/${getRandomAvatarId()}.svg`
// const getRandomAvatarId = () => Math.ceil(Math.random() * 45)
const getRandomAvatarUrl = () => {
  return getRandomMixUrl()
}
