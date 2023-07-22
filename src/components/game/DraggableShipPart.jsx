import { useDraggable } from '@dnd-kit/core'
import React from 'react'
import { fleetOptions } from '../../logic/utils'
import ShipPart from './ShipPart'

export default function DraggableShipPart ({ part }) {

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: `ship-${part.shipSize}`,
    data: {
      ...getShip(part.shipSize),
      firstPartPosition: part.firstPartPosition,
      isHorizontal: part.isHorizontal
    }
  })

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0) ${part.isHorizontal ? 'rotate(0deg)' : 'rotate(90deg)'}`
      : undefined
  }

  return (
    <div
      className={`ship-container ${part.isHorizontal ? 'horizontal' : 'vertical'}`}
      {...attributes}
      {...listeners}
      ref={setNodeRef}
      style={style}
    >
      <ShipPart part={part} />
    </div>
  )
}

const getShip = (size) => (
  fleetOptions.find(ship => ship.size === size)
)
