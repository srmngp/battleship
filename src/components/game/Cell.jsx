import React from 'react'
import { useDroppable } from '@dnd-kit/core'

export const Cell = ({ id, onClick, children }) => {

  const { setNodeRef } = useDroppable({
    id,
    data: {
      type: 'cell'
    }
  })

  return (
    <div
      id={id}
      ref={setNodeRef}
      className={`square cell-${id}`}
      onClick={onClick}
    >
      {children}
    </div>
  )

}
