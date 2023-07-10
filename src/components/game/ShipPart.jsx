import { useDraggable } from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'
import React from 'react'
import { fleetOptions, getSprite } from '../../logic/utils'

export default function ShipPart ({ part }) {

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: `ship-${part.shipSize}`,
    data: {
      ...getShip(part.shipSize),
      firstPartPosition: part.firstPartPosition,
      isHorizontal: part.isHorizontal
    }
  })

  const style = { transform: CSS.Translate.toString(transform) }

  return (
    <div
      className={`ship-container ${part.isHorizontal ? 'horizontal' : 'vertical'}`}
      {...attributes}
      {...listeners}
      ref={setNodeRef}
      style={style}
    >
      <img src={getSprite(part.sprite)} alt='ship' />
    </div>
  )
}

const getShip = (size) => (
  fleetOptions.find(ship => ship.size === size)
)
