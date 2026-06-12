'use client'

import { useEffect } from 'react'

export default function GlowTracker() {
  useEffect(() => {
    function onMove(e: PointerEvent) {
      const target = e.target as Element | null
      const el = target?.closest?.('.glow') as HTMLElement | null
      if (!el) return
      const r = el.getBoundingClientRect()
      el.style.setProperty('--mx', `${((e.clientX - r.left) / r.width) * 100}%`)
      el.style.setProperty('--my', `${((e.clientY - r.top) / r.height) * 100}%`)
    }
    document.addEventListener('pointermove', onMove, { passive: true })
    return () => document.removeEventListener('pointermove', onMove)
  }, [])
  return null
}
