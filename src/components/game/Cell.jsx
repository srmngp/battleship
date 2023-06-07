import React from 'react'
import { useDroppable } from '@dnd-kit/core'
import { Tooltip } from 'react-tooltip'

export const Cell = ({ value, index, onClick, tooltip }) => {

  const { setNodeRef } = useDroppable({
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
      onClick={onClick}
      data-tooltip-id={`tooltip-cell-${index}`}
      data-tooltip-content={`Shooted by ${tooltip}`}
    >

      {value}
      {tooltip !== '' && <Tooltip id={`tooltip-cell-${index}`} />}
    </div>
  )
}
