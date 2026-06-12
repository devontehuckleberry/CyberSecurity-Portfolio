'use client'
import { KeyboardEvent } from 'react'

interface GlassCardProps {
  children: React.ReactNode
  className?: string
  glowColor?: string
  style?: React.CSSProperties
  onClick?: () => void
}

export default function GlassCard({ children, className = '', glowColor, style, onClick }: GlassCardProps) {
  function handleKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    if (onClick && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault()
      onClick()
    }
  }

  const interactive = Boolean(onClick)

  return (
    <div
      className={`glass glow srv ${className}`}
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
