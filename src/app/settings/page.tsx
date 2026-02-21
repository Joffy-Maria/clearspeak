'use client'

import { motion } from 'framer-motion'
import AppShell from '../../components/layout/AppShell'
import { usePreferences } from '../../hooks/usePreferences'

export default function SettingsPage() {
  const { preferences, setPreferences } = usePreferences()

  const update = (key: string, value: any) => {
    setPreferences(prev => ({
      ...prev,
      [key]: value,
    }))
  }

  return (
    <AppShell>
      <div className="space-y-16 py-16">

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center text-7xl font-bold font-[var(--font-cursive)] bg-gradient-to-r from-pink-600 via-blue-600 to-green-500 bg-clip-text text-transparent"
        >
          Settings
        </motion.h1>

        <div className="space-y-10 max-w-3xl mx-auto">

          {/* Font Size */}
          <div className="backdrop-blur-xl bg-white/60 border border-white/40 shadow-xl rounded-3xl p-8">
            <h2 className="text-2xl font-semibold mb-4">Font Size</h2>

            <div className="flex gap-4">
              {['normal', 'large', 'xlarge'].map(size => (
                <button
                  key={size}
                  onClick={() => update('fontSize', size)}
                  className={`px-6 py-2 rounded-full transition ${
                    preferences.fontSize === size
                      ? 'bg-blue-500 text-white'
                      : 'bg-white/50'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* High Contrast */}
          <div className="backdrop-blur-xl bg-white/60 border border-white/40 shadow-xl rounded-3xl p-8">
            <h2 className="text-2xl font-semibold mb-4">
              High Contrast
            </h2>

            <button
              onClick={() =>
                update('highContrast', !preferences.highContrast)
              }
              className={`px-6 py-2 rounded-full ${
                preferences.highContrast
                  ? 'bg-green-500 text-white'
                  : 'bg-white/50'
              }`}
            >
              {preferences.highContrast ? 'Enabled' : 'Disabled'}
            </button>
          </div>

          {/* Language */}
          <div className="backdrop-blur-xl bg-white/60 border border-white/40 shadow-xl rounded-3xl p-8">
            <h2 className="text-2xl font-semibold mb-4">
              Speech Language
            </h2>

            <select
              value={preferences.language}
              onChange={e =>
                update('language', e.target.value)
              }
              className="px-4 py-2 rounded-xl bg-white/70"
            >
              <option value="en-US">English</option>
              <option value="es-ES">Spanish</option>
              <option value="fr-FR">French</option>
              <option value="de-DE">German</option>
              <option value="hi-IN">Hindi</option>
            </select>
          </div>

          {/* TTS Rate */}
          <div className="backdrop-blur-xl bg-white/60 border border-white/40 shadow-xl rounded-3xl p-8">
            <h2 className="text-2xl font-semibold mb-4">
              TTS Speech Rate
            </h2>

            <input
              type="range"
              min="0.5"
              max="2"
              step="0.1"
              value={preferences.ttsRate}
              onChange={e =>
                update('ttsRate', Number(e.target.value))
              }
              className="w-full"
            />

            <p className="mt-2 text-sm opacity-70">
              Current: {preferences.ttsRate}×
            </p>
          </div>

          {/* Sound Alerts Master Toggle */}
          <div className="backdrop-blur-xl bg-white/60 border border-white/40 shadow-xl rounded-3xl p-8">
            <h2 className="text-2xl font-semibold mb-4">
              Sound Detection
            </h2>

            <button
              onClick={() =>
                update(
                  'masterSoundEnabled',
                  !preferences.masterSoundEnabled
                )
              }
              className={`px-6 py-2 rounded-full ${
                preferences.masterSoundEnabled
                  ? 'bg-green-500 text-white'
                  : 'bg-white/50'
              }`}
            >
              {preferences.masterSoundEnabled
                ? 'Enabled'
                : 'Disabled'}
            </button>
          </div>

        </div>

      </div>
    </AppShell>
  )
}