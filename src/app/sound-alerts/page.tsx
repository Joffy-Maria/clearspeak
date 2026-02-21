'use client'

import { usePreferences } from '../../hooks/usePreferences'
import { useSoundClassifier } from '../../components/sound-alerts/useSoundClassifier'
import SoundAlertPanel from '../../components/sound-alerts/SoundAlertPanel'

export default function SoundAlertsPage() {
  const { preferences, setPreferences } = usePreferences()

  const { prediction, isReady } = useSoundClassifier(
    preferences.soundDetectionEnabled
  )

  const toggleDetection = () => {
    setPreferences({
      ...preferences,
      soundDetectionEnabled: !preferences.soundDetectionEnabled,
    })
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        padding: '60px 40px',
        background:
          'linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 50%, #c2f0c2 100%)',
      }}
    >
      <h1 style={{ fontSize: 40, marginBottom: 30 }}>
        Sound Alerts
      </h1>

      <button
        onClick={toggleDetection}
        style={{
          padding: '14px 24px',
          fontSize: 16,
          borderRadius: 12,
          border: 'none',
          cursor: 'pointer',
          background: preferences.soundDetectionEnabled
            ? '#ff6b6b'
            : '#4caf50',
          color: 'white',
          marginBottom: 30,
        }}
      >
        {preferences.soundDetectionEnabled
          ? 'Disable Detection'
          : 'Enable Detection'}
      </button>

      <div style={{ marginBottom: 20 }}>
        <p>
          <strong>Enabled:</strong>{' '}
          {preferences.soundDetectionEnabled ? 'Yes' : 'No'}
        </p>
        <p>
          <strong>Model Ready:</strong>{' '}
          {isReady ? 'Yes' : 'No'}
        </p>
      </div>

      <SoundAlertPanel
        prediction={prediction}
        isReady={isReady}
        enabled={preferences.soundDetectionEnabled}
      />
    </div>
  )
}