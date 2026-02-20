'use client'

import { ReactNode } from 'react'
import Sidebar from './Sidebar'
import BottomNav from './BottomNav'

export default function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <div className="hidden md:block w-60">
        <Sidebar />
      </div>

      <div className="flex-1 p-6 pb-24 md:pb-6" id="main">
        {children}
      </div>

      <div className="md:hidden fixed bottom-0 left-0 right-0">
        <BottomNav />
      </div>
    </div>
  )
}