import React from 'react'
import { getSprite } from '../../logic/utils'

export default function ShipPart ({ part }) {

  return (
    <div className={`ship-part ${part.isHorizontal ? 'horizontal' : 'vertical'}`}>
      <img src={getSprite(part.sprite)} alt='ship' />
    </div>
  )
}
