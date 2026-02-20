'use client'

import { useState } from 'react'
import AppShell from '../../components/layout/AppShell'
import CaptionDisplay from '../../components/captions/CaptionDisplay'
import { useSpeechRecognition } from '../../hooks/useSpeechRecognition'
import { useTranscripts } from '../../hooks/useTranscripts'

export default function CaptionsPage() {
  const {
    transcript,
    isListening,
    isSupported,
    startListening,
    stopListening,
  } = useSpeechRecognition()

  const { saveTranscript } = useTranscripts()

  const [startTime, setStartTime] = useState<number | null>(null)
  const [isSaving, setIsSaving] = useState(false)

  // Start a new session
  const handleStart = () => {
    startListening()
    setStartTime(Date.now())
  }

  // Stop session and persist transcript
  const handleStop = async () => {
    stopListening()

    if (!transcript.trim() || !startTime) {
      setStartTime(null)
      return
    }

    const duration = Math.floor((Date.now() - startTime) / 1000)

    try {
      setIsSaving(true)
      await saveTranscript(transcript, duration)
    } catch (error) {
      console.error('Failed to save transcript:', error)
    } finally {
      setIsSaving(false)
      setStartTime(null)
    }
  }

  if (!isSupported) {
    return (
      <AppShell>
        <div className="space-y-6">
          <h1 className="text-3xl font-bold">Live Captions</h1>
          <p className="text-red-500">
            Live captions require Chrome or Edge browser.
          </p>
        </div>
      </AppShell>
    )
  }

  return (
    <AppShell>
      <div className="space-y-8">
        <h1 className="text-3xl font-bold">Live Captions</h1>

        <div
          className="glass p-6 min-h-[150px] rounded-xl"
          role="status"
          aria-live="polite"
        >
          {transcript ? (
            <CaptionDisplay text={transcript} />
          ) : (
            <p className="opacity-60">
              Tap Start and begin speaking...
            </p>
          )}
        </div>

        <button
          onClick={isListening ? handleStop : handleStart}
          className="glass px-6 py-3 rounded-full text-lg font-semibold"
          disabled={isSaving}
        >
          {isSaving
            ? 'Saving...'
            : isListening
            ? 'Stop Listening'
            : 'Start Listening'}
        </button>
      </div>
    </AppShell>
  )
}