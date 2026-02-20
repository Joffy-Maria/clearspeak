'use client'

import { useEffect, useRef, useState } from 'react'

export function useSoundDetector() {
  const [isActive, setIsActive] = useState(false)
  const [volume, setVolume] = useState(0)
  const [alertTriggered, setAlertTriggered] = useState(false)
  const [isSupported, setIsSupported] = useState(true)

  const audioContextRef = useRef<AudioContext | null>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const rafRef = useRef<number | null>(null)
  const isActiveRef = useRef(false)

  const threshold = 0.05

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (!navigator.mediaDevices) {
      setIsSupported(false)
    }
  }, [])

  const detect = () => {
    if (!analyserRef.current || !isActiveRef.current) return

    const bufferLength = analyserRef.current.fftSize
    const dataArray = new Uint8Array(bufferLength)

    analyserRef.current.getByteTimeDomainData(dataArray)

    let sum = 0
    for (let i = 0; i < bufferLength; i++) {
      const normalized = (dataArray[i] - 128) / 128
      sum += normalized * normalized
    }

    const rms = Math.sqrt(sum / bufferLength)
    setVolume(rms)

    if (rms > threshold) {
      setAlertTriggered(true)
      navigator.vibrate?.([200, 100, 200])
      setTimeout(() => setAlertTriggered(false), 500)
    }

    rafRef.current = requestAnimationFrame(detect)
  }

  const start = async () => {
    if (!navigator.mediaDevices) return

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      })

      const audioContext = new AudioContext()
      await audioContext.resume() // IMPORTANT

      const analyser = audioContext.createAnalyser()
      analyser.fftSize = 1024

      const microphone =
        audioContext.createMediaStreamSource(stream)

      microphone.connect(analyser)

      streamRef.current = stream
      audioContextRef.current = audioContext
      analyserRef.current = analyser

      isActiveRef.current = true
      setIsActive(true)

      detect()
    } catch (err) {
      console.error('Microphone error:', err)
    }
  }

  const stop = () => {
    isActiveRef.current = false
    setIsActive(false)
    setVolume(0)
    setAlertTriggered(false)

    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current)
    }

    streamRef.current?.getTracks().forEach(track => track.stop())
    audioContextRef.current?.close()
  }

  return {
    isActive,
    isSupported,
    volume,
    alertTriggered,
    start,
    stop,
  }
}