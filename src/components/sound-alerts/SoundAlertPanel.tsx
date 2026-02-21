'use client'

import AlertCard from './AlertCard'

type Prediction = {
  label: string
  confidence: number
  severity: 'danger' | 'attention' | 'info'
} | null

type Props = {
  prediction: Prediction
  isReady: boolean
  enabled: boolean
}

export default function SoundAlertPanel({
  prediction,
  isReady,
  enabled,
}: Props) {
  return (
    <div style={{ marginTop: 40 }}>
      {!enabled && (
        <p style={{ fontSize: 16 }}>
          Sound detection is disabled.
        </p>
      )}

      {enabled && !isReady && (
        <p style={{ fontSize: 16 }}>
          Loading model...
        </p>
      )}

      {enabled && isReady && !prediction && (
        <p style={{ fontSize: 16 }}>
          Listening...
        </p>
      )}

      {enabled && prediction && (
        <AlertCard
          label={prediction.label}
          confidence={prediction.confidence}
          severity={prediction.severity}
        />
      )}
    </div>
  )
}