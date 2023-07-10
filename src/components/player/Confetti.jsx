import React, { useEffect, useRef } from 'react'
import confetti from 'canvas-confetti'

export const Confetti = () => { // TODO show 2 confetti cannons
  const confettiRef = useRef(null)

  useEffect(() => {
    const elementRect = confettiRef.current.getBoundingClientRect()
    console.log((elementRect.left) / window.innerWidth, (elementRect.top) / window.innerHeight)
    confetti({
      particleCount: 100,
      spread: 70,
      origin: {
        x: elementRect.left / window.innerWidth,
        y: elementRect.top / window.innerHeight
      }
    })
  })

  return (
    <div ref={confettiRef} />
  )
}
