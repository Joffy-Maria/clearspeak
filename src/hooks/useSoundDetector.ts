'use client'

import { useEffect, useRef, useState } from 'react'

type SoundEvent = {
  label: string
  confidence: number
  severity: 'danger' | 'attention' | 'info'
}

export function useSoundClassifier(enabled: boolean) {
  const recognizerRef = useRef<any>(null)
  const cooldownRef = useRef<number>(0)
  const isInitializingRef = useRef(false)

  const [prediction, setPrediction] = useState<SoundEvent | null>(null)
  const [isReady, setIsReady] = useState(false)

  const mapSeverity = (label: string): 'danger' | 'attention' | 'info' => {
    const danger = ['Fire Alarm', 'Glass Breaking', 'Siren']
    const attention = ['Phone Ring', 'door bell']
    const info = ['baby cry', 'dog bark', 'Clap']

    if (danger.includes(label)) return 'danger'
    if (attention.includes(label)) return 'attention'
    return 'info'
  }

  useEffect(() => {
    if (!enabled) {
      recognizerRef.current?.stopListening()
      setIsReady(false)
      return
    }

    if (isInitializingRef.current) return
    isInitializingRef.current = true

    const start = async () => {
      try {
        console.log('Requesting mic...')
        await navigator.mediaDevices.getUserMedia({ audio: true })

        console.log('Loading speech model...')
        const speechCommands = await import('@tensorflow-models/speech-commands')

        const recognizer = speechCommands.create(
          'BROWSER_FFT',
          undefined,
          '/models/audio_model/model.json',
          '/models/audio_model/metadata.json'
        )

        await recognizer.ensureModelLoaded()
        console.log('Model ready.')

        recognizerRef.current = recognizer
        setIsReady(true)

        recognizer.listen(
          async (result: any): Promise<void> => {
            const scores = Array.from(result.scores as Float32Array)
            const labels = recognizer.wordLabels()

            const maxScore = Math.max(...scores)
            const maxIndex = scores.indexOf(maxScore)
            const label = labels[maxIndex]

            const now = Date.now()

            if (
              label !== 'Background Noise' &&
              maxScore > 0.6 &&
              now - cooldownRef.current > 3000
            ) {
              cooldownRef.current = now

              console.log('Detected:', label)

              setPrediction({
                label,
                confidence: maxScore,
                severity: mapSeverity(label),
              })
            }
          },
          {
            probabilityThreshold: 0.6,
            overlapFactor: 0.5,
          }
        )
      } catch (err) {
        console.error('Classifier error:', err)
      }
    }

    start()

    return () => {
      recognizerRef.current?.stopListening()
    }
  }, [enabled])

  return { prediction, isReady }
}