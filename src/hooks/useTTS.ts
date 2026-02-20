'use client'

import { useState } from 'react'

export function useTTS() {
  const [isSpeaking, setIsSpeaking] = useState(false)

  const speak = (text: string) => {
    if (typeof window === 'undefined') return

    window.speechSynthesis.cancel()

    const utterance = new SpeechSynthesisUtterance(text)

    utterance.onstart = () => setIsSpeaking(true)
    utterance.onend = () => setIsSpeaking(false)

    window.speechSynthesis.speak(utterance)
  }

  const stop = () => {
    window.speechSynthesis.cancel()
    setIsSpeaking(false)
  }

  return { speak, stop, isSpeaking }
}