import styles from './Wrap.module.css'

interface WrapProps {
  children: React.ReactNode
  className?: string
}

export default function Wrap({ children, className = '' }: WrapProps) {
  return (
    <div className={`${styles.wrap} ${className}`.trim()}>
      {children}
    </div>
  )
}
