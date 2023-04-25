import React from 'react'

export default function Ship ({ value }) {

  const handleDragStart = (event) => {
    event.dataTransfer.setData('ship', JSON.stringify(value))
  }

  function handleDragEnd (event) {
  }

  return (
    <div
      draggable='true'
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      {value.label}
    </div>
  )
}
