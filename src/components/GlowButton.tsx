import styles from './GlowButton.module.css'

interface GlowButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'ghost'
  href?: string
  onClick?: () => void
  className?: string
}

export default function GlowButton({ children, variant = 'ghost', href, onClick, className = '' }: GlowButtonProps) {
  const cls = `${styles.btn} ${variant === 'primary' ? styles.primary : styles.ghost} ${className}`
  if (href) return <a href={href} className={cls}>{children}</a>
  return <button onClick={onClick} className={cls}>{children}</button>
}
