'use client'

import { motion } from 'framer-motion'

type Props = {
  label: string
  confidence: number
  severity: 'danger' | 'attention' | 'info'
}

export default function AlertCard({
  label,
  confidence,
  severity,
}: Props) {
  const getColor = () => {
    if (severity === 'danger') return '#ff4d4f'
    if (severity === 'attention') return '#faad14'
    return '#1890ff'
  }

  const color = getColor()

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 200 }}
      style={{
        marginTop: 30,
        padding: 30,
        borderRadius: 24,
        background: 'rgba(255,255,255,0.65)',
        backdropFilter: 'blur(16px)',
        boxShadow: `0 20px 40px ${color}55`,
        border: `2px solid ${color}`,
      }}
    >
      <h2
        style={{
          fontSize: 28,
          color,
          marginBottom: 10,
        }}
      >
        {label}
      </h2>

      <p style={{ fontSize: 16 }}>
        Confidence: {(confidence * 100).toFixed(1)}%
      </p>

      <p
        style={{
          marginTop: 10,
          fontWeight: 600,
          color,
        }}
      >
        {severity.toUpperCase()}
      </p>
    </motion.div>
  )
}