'use client'

import { useEffect } from 'react'
import { usePreferencesStore } from '../stores/preferencesStore'

export function usePreferences() {
  const store = usePreferencesStore()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('clearspeak_preferences')
      if (saved) {
        const parsed = JSON.parse(saved)
        Object.entries(parsed).forEach(([key, value]) => {
          store.setPreference(key as any, value as any)
        })
      }
    }
  }, [])

  return store
}