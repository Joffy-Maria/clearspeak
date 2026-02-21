'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

export default function GlassCard({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className={`
        backdrop-blur-2xl
        bg-white/50
        border border-white/40
        shadow-2xl
        rounded-[32px]
        p-6
        ${className}
      `}
    >
      {children}
    </motion.div>
  )
}