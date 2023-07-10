import React, { useState } from 'react'
import { useDraggable } from '@dnd-kit/core'
import { Cell } from './Cell'
import { getSprite } from '../../logic/utils'

export default function Ship ({ ship }) {

  const [isHorizontal, setIsHorizontal] = useState(true)

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: `ship-${ship.size}`,
    data: { ...ship, isHorizontal }
  })

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0) ${isHorizontal ? 'rotate(0deg)' : 'rotate(90deg)'}`
      : undefined
  }

  return (
    <div
      className={`ship-container ${isHorizontal ? 'horizontal' : 'vertical'}`}
      {...attributes}
      {...listeners}
      ref={setNodeRef}
      style={style}
      onClick={() => setIsHorizontal(!isHorizontal)}
    >
      {ship.parts.map((part, index) => (
        <Cell key={index}>
          <img src={getSprite(part.sprite)} alt='ship' />
        </Cell>
      ))}
    </div>
  )
}
