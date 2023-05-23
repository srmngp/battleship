import React from 'react'
import { useDraggable } from '@dnd-kit/core'

export default function Ship ({ ship }) {

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: `ship-${ship.value}`,
    data: { ship }
  })

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        display: 'flex'
      }
    : undefined

  return (
    <div
      className='ship-container'
      {...attributes}
      {...listeners}
      ref={setNodeRef}
      style={style}
    >
      {ship.label.map((ship, index) => (
        <div className='square' key={index}>
          {ship}
        </div>
      ))}
    </div>
  )
}
