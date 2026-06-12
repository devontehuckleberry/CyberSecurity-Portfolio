'use client'
import { useRef, MouseEvent } from 'react'

interface GlassCardProps {
  children: React.ReactNode
  className?: string
  glowColor?: string
  style?: React.CSSProperties
}

export default function GlassCard({ children, className = '', glowColor, style }: GlassCardProps) {
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

  return (
    <div
      ref={ref}
      className={`glass glow ${className}`}
      onMouseMove={handleMouseMove}
      style={{ position: 'relative', ...style, ...(glowColor ? { '--glow': glowColor } as React.CSSProperties : {}) }}
    >
      {children}
    </div>
  )
}
