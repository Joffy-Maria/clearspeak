'use client'

import { useEffect, useRef } from 'react'

export default function AnimatedWaveform() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const width = canvas.width = 300
    const height = canvas.height = 100

    let frame = 0

    const draw = () => {
      ctx.clearRect(0, 0, width, height)
      ctx.beginPath()

      for (let x = 0; x < width; x++) {
        const y =
          height / 2 +
          Math.sin((x + frame) * 0.05) * 20

        ctx.lineTo(x, y)
      }

      ctx.strokeStyle = '#3b82f6'
      ctx.stroke()

      frame += 2
      requestAnimationFrame(draw)
    }

    draw()
  }, [])

  return <canvas ref={canvasRef} className="w-full" />
}