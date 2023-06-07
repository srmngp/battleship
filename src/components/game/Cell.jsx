import React from 'react'
import { useDroppable } from '@dnd-kit/core'

export const Cell = ({ value, id, onClick }) => {

  const { setNodeRef } = useDroppable({
    id,
    data: {
      id,
      type: 'cell'
    }
  })

  return (
    <div
      id={id}
      ref={setNodeRef}
      className='square'
      onClick={onClick}
    >

      {value}
    </div>
  )

}
