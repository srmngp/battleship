import React from 'react'
import { Tooltip } from 'react-tooltip'

export default function ShotTooltip ({ cell, cellId }) {

  return (
    cell &&
      <Tooltip
        anchorSelect={`#${cellId}`}
        content={`Shot by ${cell.shot?.origin}`}
      />
  )
}
