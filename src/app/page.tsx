'use client'

import { motion } from 'framer-motion'
import AppShell from '../components/layout/AppShell'
import OnboardingFlow from '../components/onboarding/OnboardingFlow'
import { useOnboarding } from '../hooks/useOnboarding'
import { usePreferences } from '../hooks/usePreferences'

export default function HomePage() {
  usePreferences()
  const { onboarded, ready } = useOnboarding()

  if (!ready) return null

  return (
    <>
      {!onboarded && <OnboardingFlow />}
      <AppShell>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-lg opacity-70">
            Communication without barriers.
          </p>
        </motion.div>
      </AppShell>
    </>
  )
}