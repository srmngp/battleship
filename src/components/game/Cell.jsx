import React from 'react'
import { useDroppable } from '@dnd-kit/core'

export const Cell = ({ value, index }) => {

  const { setNodeRef, isOver } = useDroppable({
    id: `cell-${index}`,
    data: {
      index,
      type: 'cell'
    }
  })

  return (
    <div
      ref={setNodeRef}
      className={`square cell-${index}`}
    >
      {value}
    </div>
  )
}
