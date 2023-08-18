import React from 'react'
import { Cell } from './Cell'
import { getSprite } from '../../logic/utils'

export default function Ship ({ ship }) {
  return (
    <div
      className='ship-container'
    >
      {ship.parts.map((part, index) => (
        <Cell key={index}>
          <img src={getSprite(part.sprite)} alt='ship' />
        </Cell>
      ))}
    </div>
  )
}
