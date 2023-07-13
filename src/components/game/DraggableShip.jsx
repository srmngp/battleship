import React, { useState } from 'react'
import { useDraggable } from '@dnd-kit/core'
import Ship from './Ship'

export default function DraggableShip ({ ship }) {

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
      className={`${isHorizontal ? 'horizontal' : 'vertical'}`}
      {...attributes}
      {...listeners}
      ref={setNodeRef}
      style={style}
      onClick={() => setIsHorizontal(!isHorizontal)}
      // FIXME si rotas un barco y colocas otro en el tablero se pasa el giro a otro barco
    >
      <Ship ship={ship} />
    </div>
  )
}
