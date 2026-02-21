'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import AppShell from '../../components/layout/AppShell'
import { defaultPhrases } from '../../lib/phrases'
import { useTTS } from '../../hooks/useTTS'
import GlassCard from '../../components/ui/GlassCard'
import GlassButton from '../../components/ui/GlassButton'
import GlassChip from '../../components/ui/GlassChip'

export default function QuickReplyPage() {
  const { speak } = useTTS()

  const categories = [
    'All',
    'Greetings',
    'Classroom',
    'Workplace',
    'Emergency',
    'Social',
    'Daily Life'
  ]

  const [activeCategory, setActiveCategory] = useState('All')
  const [favorites, setFavorites] = useState<string[]>([])

  useEffect(() => {
    const stored = localStorage.getItem('clearspeak_favorites')
    if (stored) setFavorites(JSON.parse(stored))
  }, [])

  const toggleFavorite = (id: string) => {
    const updated = favorites.includes(id)
      ? favorites.filter(f => f !== id)
      : [...favorites, id]

    setFavorites(updated)
    localStorage.setItem('clearspeak_favorites', JSON.stringify(updated))
  }

  const filtered =
    activeCategory === 'All'
      ? defaultPhrases
      : defaultPhrases.filter(p => p.category === activeCategory)

  return (
    <AppShell>
      <div className="space-y-12 py-16">

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center text-7xl font-[var(--font-cursive)] bg-gradient-to-r from-pink-600 via-blue-600 to-green-500 bg-clip-text text-transparent"
        >
          Quick Reply
        </motion.h1>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-4">
          {categories.map(cat => (
            <GlassChip
              key={cat}
              label={cat}
              active={activeCategory === cat}
              onClick={() => setActiveCategory(cat)}
            />
          ))}
        </div>

        {/* Phrases */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 px-6">

          {filtered.map(phrase => (
            <GlassCard key={phrase.id} className="space-y-6">

              <p className="text-lg text-slate-800">
                {phrase.text}
              </p>

              <div className="flex justify-between items-center">

                <GlassButton
                  onClick={() => speak(phrase.text)}
                  className="bg-gradient-to-r from-blue-500 to-green-400 text-white"
                >
                  🔊 Speak
                </GlassButton>

                <button
                  onClick={() => toggleFavorite(phrase.id)}
                  className="text-2xl"
                >
                  {favorites.includes(phrase.id) ? '❤️' : '🤍'}
                </button>

              </div>

            </GlassCard>
          ))}

        </div>

      </div>
    </AppShell>
  )
}