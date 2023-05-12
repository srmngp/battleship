import { useEffect } from 'react'
import '../../styles/avatarSelector.css'

export default function AvatarSelector ({ updateAvatarUrl, url }) {

  useEffect(() => {
    handleAvatarClick()
  }, [])

  const handleAvatarClick = () => {
    updateAvatarUrl(getRandomAvatarUrl())
  }

  return (
    <div className='avatar-selector'>
      <img className='avatar' src={url} />
      <button className='randomize' onClick={handleAvatarClick}>↺</button>
    </div>
  )
}

const getRandomAvatarUrl = () => `https://garticphone.com/images/avatar/${getRandomAvatarId()}.svg`

const getRandomAvatarId = () => Math.ceil(Math.random() * 45)
