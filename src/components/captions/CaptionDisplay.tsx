'use client'

import { useEffect, useRef } from 'react'
import CaptionWord from './CaptionWord'

export default function CaptionDisplay({
  text,
}: {
  text: string
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const words = text.split(' ').filter(Boolean)

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop =
        containerRef.current.scrollHeight
    }
  }, [text])

  return (
    <div
      ref={containerRef}
      className="h-64 overflow-y-auto text-2xl font-semibold leading-relaxed p-2"
      role="status"
      aria-live="polite"
    >
      {words.map((word, index) => (
        <CaptionWord
          key={`${word}-${index}`}
          word={word}
          isLatest={index === words.length - 1}
        />
      ))}
    </div>
  )
}