import { useDraggable } from '@dnd-kit/core'
import React from 'react'
import { fleetOptions } from '../../logic/utils'
import ShipPart from './ShipPart'

export default function DraggableShipPart ({ part, addShip, index }) {

  const getShipData = () => ({
    ...getShip(part.shipSize),
    firstPartPosition: part.firstPartPosition,
    isHorizontal: part.isHorizontal
  })

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: `ship-${part.shipSize}`,
    data: getShipData()
  })

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0) ${part.isHorizontal ? 'rotate(0deg)' : 'rotate(90deg)'}`
      : undefined
  }

  const handleClick = () => {
    console.log('Ship clicked, rotating', part)
    part.isHorizontal = !part.isHorizontal
    const shipRotated = addShip(index, getShipData())
    if (!shipRotated) {
      part.isHorizontal = !part.isHorizontal
    }
  }

  return (
    <div
      className='ship-container'
      {...attributes}
      {...listeners}
      ref={setNodeRef}
      style={style}
      onClick={handleClick}
    >
      <ShipPart part={part} />
    </div>
  )
}

const getShip = (size) => (
  fleetOptions.find(ship => ship.size === size)
)
