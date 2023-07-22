import { useEffect } from 'react'

export default function AvatarSelector ({ updateAvatarUrl, url }) {

  useEffect(() => {
    if (!url) {
      updateAvatarUrl(getRandomAvatarUrl())
    }
  }, [])

  const handleAvatarClick = () => {
    updateAvatarUrl(getRandomAvatarUrl())
  }

  return (
    <div className='avatar-selector'>
      <img className='avatar mx-auto' src={url} />
      <button className='randomize' onClick={handleAvatarClick}>↺</button>
    </div>
  )
}

const getRandomAvatarUrl = () => `https://garticphone.com/images/avatar/${getRandomAvatarId()}.svg`

const getRandomAvatarId = () => Math.ceil(Math.random() * 45)
