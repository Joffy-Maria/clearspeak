'use client'

import { useEffect, useRef, useState } from 'react'

export function useSpeechRecognition() {
  const [isListening, setIsListening] = useState(false)
  const [finalTranscript, setFinalTranscript] = useState('')
  const [interimTranscript, setInterimTranscript] = useState('')
  const [isSupported, setIsSupported] = useState(true)

  const recognitionRef = useRef<any>(null)
  const finalTranscriptRef = useRef('')
  const previousSessionsRef = useRef('')
  const currentSessionRef = useRef('')
  const shouldBeListeningRef = useRef(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition

    if (!SpeechRecognition) {
      setIsSupported(false)
      return
    }

    const recognition = new SpeechRecognition()
    recognition.continuous = true
    recognition.interimResults = true
    recognition.lang = 'en-US'

    recognition.onresult = (event: any) => {
      let interim = ''
      let sessionFinal = ''

      for (let i = 0; i < event.results.length; i++) {
        const result = event.results[i]
        const transcript = result[0].transcript
        const cleanTranscript = transcript.trim().toLowerCase()

        if (result.isFinal) {
          if (cleanTranscript) {
            const currentTotal = previousSessionsRef.current + sessionFinal
            const totalPadded = ' ' + currentTotal.trim().toLowerCase() + ' '
            const targetPadded = ' ' + cleanTranscript + ' '

            // Advanced Deduplication: prevent Android from repeating the last word/phrase
            if (!totalPadded.endsWith(targetPadded)) {
              sessionFinal += transcript + ' '
            }
          }
        } else {
          interim += transcript
        }
      }

      currentSessionRef.current = sessionFinal
      const totalFinal = previousSessionsRef.current + sessionFinal

      finalTranscriptRef.current = totalFinal
      setFinalTranscript(totalFinal)
      setInterimTranscript(interim)
    }

    recognition.onend = () => {
      previousSessionsRef.current += currentSessionRef.current
      currentSessionRef.current = ''

      if (shouldBeListeningRef.current) {
        try {
          recognition.start()
        } catch (e) {
          // Ignore start errors if already started
        }
      } else {
        setIsListening(false)
      }
    }

    recognition.onerror = () => {
      setIsListening(false)
    }

    recognitionRef.current = recognition

    return () => {
      recognition.stop()
    }
  }, [])

  const startListening = () => {
    if (!recognitionRef.current) return

    previousSessionsRef.current = ''
    currentSessionRef.current = ''
    finalTranscriptRef.current = ''
    setFinalTranscript('')
    setInterimTranscript('')
    shouldBeListeningRef.current = true

    try {
      recognitionRef.current.start()
      setIsListening(true)
    } catch (e) {
      // Ignore if it's already started
      setIsListening(true)
    }
  }

  const stopListening = () => {
    if (!recognitionRef.current) return

    shouldBeListeningRef.current = false
    recognitionRef.current.stop()
    setIsListening(false)
  }

  return {
    transcript: finalTranscript + interimTranscript,
    finalTranscript,
    isListening,
    isSupported,
    startListening,
    stopListening,
  }
}