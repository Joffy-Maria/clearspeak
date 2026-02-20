'use client'

import Link from 'next/link'
import { Mic, Bell, MessageCircle, Settings } from 'lucide-react'

export default function BottomNav() {
  return (
    <div className="glass flex justify-around p-4">
      <Link href="/captions"><Mic /></Link>
      <Link href="/sound-alerts"><Bell /></Link>
      <Link href="/quick-reply"><MessageCircle /></Link>
      <Link href="/settings"><Settings /></Link>
    </div>
  )
}