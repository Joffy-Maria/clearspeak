'use client'

import { useEffect, useState } from 'react'

export function useOnboarding() {
  const [onboarded, setOnboarded] = useState(false)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const flag = localStorage.getItem('clearspeak_onboarded')
      setOnboarded(flag === 'true')
      setReady(true)
    }
  }, [])

  const completeOnboarding = () => {
    localStorage.setItem('clearspeak_onboarded', 'true')
    setOnboarded(true)
  }

  return { onboarded, ready, completeOnboarding }
}