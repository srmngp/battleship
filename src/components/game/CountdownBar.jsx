import React, { useEffect, useState } from 'react'
import { ProgressBar } from 'react-bootstrap'

export default function CountdownBar ({ onTimeUp }) {
  const [progress, setProgress] = useState(10)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress === 0) {
          clearInterval(interval)
          onTimeUp()
        }
        return prevProgress - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const progressBar = (
    <>
      <h4>{`${progress} seconds left`}</h4>
      <ProgressBar
        animated
        now={progress}
        max={10}
        label='💣'
        style={{ padding: '0px' }}
      />
    </>
  )

  return (
    <div className='col-md-4'>
      {progress <= 0 && <h4>Time's up!</h4>}
      {progress > 0 && progressBar}
    </div>
  )
}
