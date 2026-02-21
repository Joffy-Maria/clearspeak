'use client'

export default function GlassChip({
  label,
  active,
  onClick,
}: {
  label: string
  active?: boolean
  onClick?: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={`
        px-4 py-2
        rounded-full
        text-sm
        backdrop-blur-xl
        border border-white/40
        transition
        ${
          active
            ? 'bg-blue-500 text-white'
            : 'bg-white/50 text-slate-700 hover:bg-white/70'
        }
      `}
    >
      {label}
    </button>
  )
}