'use client'

export default function GlassInput({
  value,
  onChange,
  placeholder,
}: {
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
}) {
  return (
    <input
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="
        w-full
        px-4 py-3
        rounded-2xl
        backdrop-blur-xl
        bg-white/60
        border border-white/40
        focus:outline-none
        focus:ring-2
        focus:ring-blue-400
      "
    />
  )
}