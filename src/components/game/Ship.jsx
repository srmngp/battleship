import React from 'react'
import { useDraggable } from '@dnd-kit/core'
import { Cell } from './Cell'
import { CSS } from '@dnd-kit/utilities'

export default function Ship ({ ship }) {

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: `ship-${ship.value}`,
    data: { ship }
  })

  const style = { transform: CSS.Translate.toString(transform) }

  return (
    <div
      className='ship-container'
      {...attributes}
      {...listeners}
      ref={setNodeRef}
      style={style}
    >
      {ship.label.map((label, index) => (
        <Cell key={index}>
          {label}
        </Cell>
      ))}
    </div>
  )
}
