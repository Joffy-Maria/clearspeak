'use client'

import Link from 'next/link'
import { Mic, Bell, MessageCircle, Settings } from 'lucide-react'

export default function Sidebar() {
  return (
    <div className="glass h-full p-6 space-y-8">
      <h1 className="text-xl font-bold">ClearSpeak</h1>

      <nav className="space-y-4">
        <Link href="/captions" className="flex items-center gap-2">
          <Mic size={18} /> Live Captions
        </Link>
        <Link href="/sound-alerts" className="flex items-center gap-2">
          <Bell size={18} /> Sound Alerts
        </Link>
        <Link href="/quick-reply" className="flex items-center gap-2">
          <MessageCircle size={18} /> Quick Reply
        </Link>
        <Link href="/settings" className="flex items-center gap-2">
          <Settings size={18} /> Settings
        </Link>
      </nav>
    </div>
  )
}