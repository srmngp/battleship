import React from 'react'
import { useDraggable } from '@dnd-kit/core'

export default function Ship ({ ship }) {

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: `ship-${ship.value}`,
    data: { ship }
  })

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`
      }
    : undefined

  return (
    <div
      {...attributes}
      {...listeners}
      ref={setNodeRef}
      style={style}
    >
      {ship.label.join('')}
    </div>
  )
}
