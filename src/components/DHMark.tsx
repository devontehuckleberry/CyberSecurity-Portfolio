interface DHMarkProps {
  size?: number
  className?: string
}

export default function DHMark({ size = 36, className = '' }: DHMarkProps) {
  return (
    <span
      className={className}
      style={{
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 0,
        lineHeight: 1,
        userSelect: 'none',
      }}
    >
      <span
        style={{
          fontFamily: 'var(--font-serif)',
          fontWeight: 700,
          fontSize: size,
          color: 'var(--text, #fff)',
          letterSpacing: '-0.03em',
          lineHeight: 1,
        }}
      >
        DH
      </span>
      <span
        style={{
          display: 'block',
          width: '60%',
          height: 2,
          background: 'var(--red, #C1121F)',
          borderRadius: 1,
          marginTop: 3,
        }}
      />
    </span>
  )
}
