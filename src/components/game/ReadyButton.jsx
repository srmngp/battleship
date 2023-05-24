import React, { useState, useEffect } from 'react'
import useGameContext from '../hooks/useGameContext'
import { setPlayerAsReady } from '../../logic/playerService'

export default function ReadyButton ({ fleet }) {

  const [className, setClassName] = useState('button button-primary disabled')
  const { game, localPlayer } = useGameContext()

  useEffect(() => {
    setClassName(fleet.length === 0 ? 'button button-primary' : 'button button-primary disabled')
  }, [fleet])

  const handleClick = () => {
    console.log('Player ready')
    setPlayerAsReady(game, localPlayer)
  }

  return (
    <button className={className} onClick={handleClick}>pon disabled de vdd
      <span className='icon material-symbols-rounded'>
        select_check_box
      </span>
      Ready
    </button>
  )

}
