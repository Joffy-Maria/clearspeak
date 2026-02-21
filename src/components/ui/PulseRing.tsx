'use client'

export default function PulseRing() {
  return (
    <div className="relative flex items-center justify-center">
      <span className="absolute w-16 h-16 rounded-full bg-red-400 opacity-70 animate-ping"></span>
      <span className="w-8 h-8 rounded-full bg-red-500"></span>
    </div>
  )
}