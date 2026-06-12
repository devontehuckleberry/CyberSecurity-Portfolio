'use client'
import { useRef, MouseEvent, KeyboardEvent } from 'react'

interface GlassCardProps {
  children: React.ReactNode
  className?: string
  glowColor?: string
  style?: React.CSSProperties
  onClick?: () => void
}

export default function GlassCard({ children, className = '', glowColor, style, onClick }: GlassCardProps) {
  const ref = useRef<HTMLDivElement>(null)

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    el.style.setProperty('--mx', `${x}%`)
    el.style.setProperty('--my', `${y}%`)
  }

  function handleKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    if (onClick && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault()
      onClick()
    }
  }

  const interactive = Boolean(onClick)

  return (
    <div
      ref={ref}
      className={`glass glow ${className}`}
      onMouseMove={handleMouseMove}
      onClick={onClick}
      onKeyDown={interactive ? handleKeyDown : undefined}
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      style={{ position: 'relative', ...style, ...(glowColor ? { '--glow': glowColor } as React.CSSProperties : {}) }}
    >
      {children}
    </div>
  )
}
