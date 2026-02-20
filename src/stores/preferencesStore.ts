'use client'

import { create } from 'zustand'

export type Preferences = {
  fontSize: 'normal' | 'large' | 'xlarge'
  highContrast: boolean
  theme: 'dark' | 'light'
  language: string
}

type Store = Preferences & {
  setPreference: <K extends keyof Preferences>(
    key: K,
    value: Preferences[K]
  ) => void
}

const defaultPrefs: Preferences = {
  fontSize: 'normal',
  highContrast: false,
  theme: 'dark',
  language: 'en-US'
}

export const usePreferencesStore = create<Store>((set) => ({
  ...defaultPrefs,
  setPreference: (key, value) =>
    set((state) => {
      const updated = { ...state, [key]: value }
      if (typeof window !== 'undefined') {
        localStorage.setItem(
          'clearspeak_preferences',
          JSON.stringify(updated)
        )
      }
      return updated
    })
}))