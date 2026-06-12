import styles from './GlowButton.module.css'

interface GlowButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'ghost'
  href?: string
  onClick?: () => void
  className?: string
  down?: boolean
}

export default function GlowButton({ children, variant = 'ghost', href, onClick, className = '', down = false }: GlowButtonProps) {
  const cls = `${styles.btn} ${variant === 'primary' ? styles.primary : styles.ghost} ${down ? styles.down : ''} ${className}`.trim()
  if (href) {
    const isExternal = href.startsWith('http')
    return (
      <a
        href={href}
        className={cls}
        {...(isExternal ? { rel: 'noopener noreferrer', target: '_blank' } : {})}
      >
        {children}
      </a>
    )
  }
  return <button type="button" onClick={onClick} className={cls}>{children}</button>
}
