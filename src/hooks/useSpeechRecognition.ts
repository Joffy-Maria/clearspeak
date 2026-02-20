'use client'

import { useEffect, useRef, useState } from 'react'

export function useSpeechRecognition() {
  const [isListening, setIsListening] = useState(false)
  const [finalTranscript, setFinalTranscript] = useState('')
  const [interimTranscript, setInterimTranscript] = useState('')
  const [isSupported, setIsSupported] = useState(true)

  const recognitionRef = useRef<any>(null)
  const finalTranscriptRef = useRef('')
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
      let accumulated = finalTranscriptRef.current

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript

        if (event.results[i].isFinal) {
          accumulated += transcript + ' '
        } else {
          interim += transcript
        }
      }

      finalTranscriptRef.current = accumulated
      setFinalTranscript(accumulated)
      setInterimTranscript(interim)
    }

    recognition.onend = () => {
      if (shouldBeListeningRef.current) {
        recognition.start()
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

    finalTranscriptRef.current = ''
    setFinalTranscript('')
    setInterimTranscript('')
    shouldBeListeningRef.current = true

    recognitionRef.current.start()
    setIsListening(true)
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