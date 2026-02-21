'use client'

export default function GlassToggle({
  enabled,
  onToggle,
}: {
  enabled: boolean
  onToggle: () => void
}) {
  return (
    <button
      onClick={onToggle}
      className={`
        w-14 h-8
        rounded-full
        relative
        transition
        ${enabled ? 'bg-green-500' : 'bg-white/50'}
      `}
    >
      <span
        className={`
          absolute top-1 left-1
          w-6 h-6
          bg-white
          rounded-full
          transition
          ${enabled ? 'translate-x-6' : ''}
        `}
      />
    </button>
  )
}