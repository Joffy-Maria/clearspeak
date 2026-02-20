'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import AppShell from '../components/layout/AppShell'
import Link from 'next/link'

export default function Home() {
  const [showIntro, setShowIntro] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIntro(false)
    }, 5000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <AppShell>
      <AnimatePresence mode="wait">
        {showIntro ? <Intro key="intro" /> : <Dashboard key="dashboard" />}
      </AnimatePresence>
    </AppShell>
  )
}

/* ---------------- INTRO ---------------- */

function Intro() {
  const title = "ClearSpeak"

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="relative flex flex-col items-center justify-center h-screen overflow-hidden"
    >
      {/* Floating Gradient Background Orbs */}
      <div className="absolute w-[600px] h-[600px] bg-pink-400/30 rounded-full blur-3xl animate-pulse -top-40 -left-40"></div>
      <div className="absolute w-[500px] h-[500px] bg-blue-400/30 rounded-full blur-3xl animate-pulse bottom-0 right-0"></div>

      {/* Animated Title */}
      <motion.div
        className="text-8xl md:text-9xl font-extrabold tracking-tight text-center"
        initial="hidden"
        animate="show"
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.08 } }
        }}
      >
        {title.split('').map((letter, index) => (
          <motion.span
            key={index}
            variants={{
              hidden: { opacity: 0, y: 80 },
              show: {
                opacity: 1,
                y: 0,
                transition: {
                  type: 'spring',
                  stiffness: 220,
                  damping: 18
                }
              }
            }}
            className="inline-block bg-gradient-to-r from-pink-500 via-blue-500 to-green-400 bg-clip-text text-transparent drop-shadow-xl"
          >
            {letter}
          </motion.span>
        ))}
      </motion.div>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2 }}
        className="mt-8 text-2xl opacity-80 text-center"
      >
        Communication Without Barriers
      </motion.p>
    </motion.div>
  )
}

/* ---------------- DASHBOARD ---------------- */
function Dashboard() {
  const sections = [
    {
      title: "Live Captions",
      subtitle: "See every word in real time.",
      emoji: "🎤",
      link: "/captions",
      gradient: "from-pink-500 via-purple-500 to-blue-500"
    },
    {
      title: "Sound Alerts",
      subtitle: "Stay aware of your environment.",
      emoji: "🔔",
      link: "/sound-alerts",
      gradient: "from-blue-500 via-cyan-500 to-green-500"
    },
    {
      title: "Quick Reply",
      subtitle: "Speak instantly with confidence.",
      emoji: "💬",
      link: "/quick-reply",
      gradient: "from-green-500 via-teal-500 to-blue-500"
    },
    {
      title: "Transcripts",
      subtitle: "Review conversations anytime.",
      emoji: "📝",
      link: "/transcripts",
      gradient: "from-purple-500 via-pink-500 to-red-500"
    },
    {
      title: "Settings",
      subtitle: "Personalize your experience.",
      emoji: "⚙️",
      link: "/settings",
      gradient: "from-indigo-500 via-blue-500 to-cyan-500"
    }
  ]

  return (
    <div className="space-y-20 py-24 relative">

      {/* Pretty Dashboard Title */}
      <motion.h1
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="text-center text-8xl font-[var(--font-cursive)] bg-gradient-to-r from-pink-600 via-blue-600 to-green-500 bg-clip-text text-transparent drop-shadow-2xl"
      >
        Dashboard
      </motion.h1>

      {sections.map((section, index) => (
        <motion.div
          key={section.title}
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: index * 0.08 }}
          viewport={{ once: true }}
        >
          <Link href={section.link}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 180 }}
              className="relative backdrop-blur-xl bg-white/60 border border-white/50 shadow-2xl rounded-[40px] p-14 text-center cursor-pointer overflow-hidden"
            >
              {/* Glow background */}
              <div className={`absolute inset-0 bg-gradient-to-r ${section.gradient} opacity-10 blur-2xl`} />

              <div className="relative z-10">
                <div className="text-6xl mb-6">
                  {section.emoji}
                </div>

                <h2 className="text-4xl font-semibold text-slate-800">
                  {section.title}
                </h2>

                <p className="mt-3 text-slate-600 text-lg">
                  {section.subtitle}
                </p>
              </div>
            </motion.div>
          </Link>
        </motion.div>
      ))}

    </div>
  )
}