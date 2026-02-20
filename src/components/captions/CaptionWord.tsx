'use client'

import { motion } from 'framer-motion'

export default function CaptionWord({ word }: { word: string }) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="inline-block mr-2"
    >
      {word}
    </motion.span>
  )
}