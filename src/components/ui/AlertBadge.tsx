'use client'

export default function AlertBadge({
  label,
  type,
}: {
  label: string
  type: 'danger' | 'attention' | 'info'
}) {
  const colors = {
    danger: 'bg-red-500',
    attention: 'bg-amber-500',
    info: 'bg-green-500',
  }

  return (
    <span
      className={`px-3 py-1 rounded-full text-white text-xs ${colors[type]}`}
    >
      {label}
    </span>
  )
}