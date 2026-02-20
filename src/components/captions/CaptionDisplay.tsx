'use client'

import CaptionWord from './CaptionWord'

export default function CaptionDisplay({ text }: { text: string }) {
  const words = text.split(' ').filter(Boolean)

  return (
    <div
      aria-live="polite"
      className="text-3xl font-bold leading-relaxed"
    >
      {words.map((word, index) => (
        <CaptionWord key={`${word}-${index}`} word={word} />
      ))}
    </div>
  )
}