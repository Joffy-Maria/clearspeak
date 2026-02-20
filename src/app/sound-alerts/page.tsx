'use client'

import AppShell from '../../components/layout/AppShell'
import { useSoundDetector } from '../../hooks/useSoundDetector'

export default function SoundAlertsPage() {
  const {
    isActive,
    isSupported,
    volume,
    alertTriggered,
    start,
    stop,
  } = useSoundDetector()

  if (!isSupported) {
    return (
      <AppShell>
        <p>Sound detection not supported in this browser.</p>
      </AppShell>
    )
  }

  return (
    <AppShell>
      <div className="space-y-8">
        <h1 className="text-3xl font-bold">
          Sound Alerts
        </h1>

        <div className="glass p-6 rounded-xl space-y-4">
          <p>
            Microphone Level: {(volume * 100).toFixed(1)}%
          </p>

          <div className="w-full h-4 bg-white/30 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-500 transition-all"
              style={{ width: `${volume * 100}%` }}
            />
          </div>

          {alertTriggered && (
            <div className="text-red-500 font-semibold animate-pulse">
              Loud sound detected!
            </div>
          )}
        </div>

        <button
          onClick={isActive ? stop : start}
          className="glass px-6 py-3 rounded-full"
        >
          {isActive ? 'Stop Detection' : 'Start Detection'}
        </button>
      </div>
    </AppShell>
  )
}