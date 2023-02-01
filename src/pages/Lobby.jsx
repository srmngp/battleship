import React from 'react'

export const Lobby = () => {
  return (
    <div className='lobby'>
      <input type='text' placeholder='Payer name' />

      <button>
        Create game
      </button>

      <button>
        Join game
      </button>
    </div>
  )
}
