import React, { useState, useEffect } from 'react'
import useGameContext from '../hooks/useGameContext'
import { setPlayerAsReady } from '../../logic/playerService'

export default function ReadyButton ({ fleet }) {

  const [className, setClassName] = useState('button button-primary ready disabled')
  const [buttonDisabled, setButtonDisabled] = useState(true)

  const { game, localPlayer } = useGameContext()

  useEffect(() => {
    setClassName(fleet.length === 0 ? 'button button-primary ready' : 'button button-primary ready disabled')
  }, [fleet])

  const handleClick = () => {
    console.log('Player ready')
    setPlayerAsReady(game, localPlayer)
  }

  return (
    <button className='button button-primary' onClick={handleClick} disabled={buttonDisabled}>
      <span className='icon material-symbols-rounded'>
        select_check_box
      </span>
      Ready
    </button>
  )

}
