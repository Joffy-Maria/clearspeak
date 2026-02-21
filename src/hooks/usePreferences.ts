'use client'

import { useState, useEffect } from 'react'

export type Preferences = {
  fontSize: 'normal' | 'large' | 'xlarge'
  highContrast: boolean
  language: string
  ttsRate: number
  masterSoundEnabled: boolean
}

const defaultPreferences: Preferences = {
  fontSize: 'normal',
  highContrast: false,
  language: 'en-US',
  ttsRate: 1,
  masterSoundEnabled: true,
}

export function usePreferences() {
  const [preferences, setPreferences] =
    useState<Preferences>(defaultPreferences)

  useEffect(() => {
    const stored = localStorage.getItem('clearspeak_preferences')
    if (stored) {
      setPreferences(JSON.parse(stored))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(
      'clearspeak_preferences',
      JSON.stringify(preferences)
    )

    const root = document.documentElement
    root.classList.remove('text-normal', 'text-large', 'text-xlarge')
    root.classList.add(`text-${preferences.fontSize}`)

    if (preferences.highContrast) {
      root.classList.add('high-contrast')
    } else {
      root.classList.remove('high-contrast')
    }
  }, [preferences])

  return { preferences, setPreferences }
}