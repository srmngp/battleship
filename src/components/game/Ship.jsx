import React from 'react'
import { useDraggable } from '@dnd-kit/core'

export default function Ship ({ value }) {

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: `ship-${value.label.join('')}`,
    data: { ship: JSON.stringify(value) }
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
      {value.label.join('')}
    </div>
  )
}
