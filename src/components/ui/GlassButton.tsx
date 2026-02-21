'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

export default function GlassButton({
  children,
  onClick,
  className = '',
}: {
  children: ReactNode
  onClick?: () => void
  className?: string
}) {
  return (
    <motion.button
      whileTap={{ scale: 0.96 }}
      whileHover={{ scale: 1.03 }}
      onClick={onClick}
      className={`
        px-6 py-3
        rounded-full
        backdrop-blur-xl
        bg-white/60
        border border-white/40
        shadow-lg
        transition
        ${className}
      `}
    >
      {children}
    </motion.button>
  )
}