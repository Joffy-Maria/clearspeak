'use client'

import AppShell from '../../components/layout/AppShell'
import CaptionDisplay from '../../components/captions/CaptionDisplay'
import { useSpeechRecognition } from '../../hooks/useSpeechRecognition'

export default function CaptionsPage() {
  const {
    transcript,
    isListening,
    isSupported,
    startListening,
    stopListening,
  } = useSpeechRecognition()

  if (!isSupported) {
    return (
      <AppShell>
        <div className="space-y-6">
          <h1 className="text-3xl font-bold">Live Captions</h1>
          <p className="text-red-500">
            Your browser does not support Speech Recognition.
          </p>
        </div>
      </AppShell>
    )
  }

  return (
    <AppShell>
      <div className="space-y-8">
        <h1 className="text-3xl font-bold">Live Captions</h1>

        <div className="glass p-6 min-h-[150px] rounded-xl">
          {transcript ? (
            <CaptionDisplay text={transcript} />
          ) : (
            <p className="opacity-60">
              Tap Start and begin speaking...
            </p>
          )}
        </div>

        <button
          onClick={isListening ? stopListening : startListening}
          className="glass px-6 py-3 rounded-full text-lg font-semibold"
        >
          {isListening ? 'Stop Listening' : 'Start Listening'}
        </button>
      </div>
    </AppShell>
  )
}