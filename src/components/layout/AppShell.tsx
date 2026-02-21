'use client'

import { ReactNode } from 'react'

export default function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-pink-200 via-blue-200 to-green-200 text-gray-900">
      <div className="backdrop-blur-xl bg-white/50 min-h-screen">
        <div className="max-w-6xl mx-auto p-4 md:p-8">
          {children}
        </div>
      </div>
    </div>
  )
}