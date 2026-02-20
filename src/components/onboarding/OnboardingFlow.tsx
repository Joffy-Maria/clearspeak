'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { useOnboarding } from '../../hooks/useOnboarding'

export default function OnboardingFlow() {
  const [step, setStep] = useState(0)
  const { completeOnboarding } = useOnboarding()

  const slides = [
    { title: 'See Every Word', body: 'Live captions in real-time.' },
    { title: 'Stay Aware', body: 'Sound alerts keep you informed.' },
    { title: 'Your Preferences', body: 'Customize everything.' }
  ]

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <motion.div
        key={step}
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        className="glass p-10 max-w-md space-y-6 text-center"
      >
        <h2 className="text-2xl font-bold">{slides[step].title}</h2>
        <p>{slides[step].body}</p>

        <div className="flex justify-between">
          {step < 2 && (
            <button onClick={() => setStep(step + 1)}>Next</button>
          )}
          {step === 2 && (
            <button
              className="bg-cyan-500 px-6 py-2 rounded-full"
              onClick={completeOnboarding}
            >
              Let’s Go
            </button>
          )}
        </div>
      </motion.div>
    </div>
  )
}