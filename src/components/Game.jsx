import React, { useState } from 'react'
import { GAME_PHASE } from '../logic/gamePhases'
import { Player } from './Player'

export const Game = () => {

  const [currentAction, setCurrentAction] = useState(GAME_PHASE.SETUP_BOATS)

  return (
    <>

      <h3>Game status</h3>
      <p>{currentAction}</p>

      <div className='game'>
        <Player playerName='Player 1' />
        <Player playerName='Player 2' />
      </div>

    </>
  )

}
