import ColorBends from '@/components/ColorBends'
import CardNav from '@/components/CardNav'

const SECTIONS = [
  'hero',
  'certs',
  'about',
  'capabilities',
  'projects',
  'terminal',
  'contact',
] as const

export default function Home() {
  return (
    <>
      <ColorBends />
      <CardNav />
      <main style={{ position: 'relative', zIndex: 2 }}>
        {SECTIONS.map((id) => (
          <section
            key={id}
            id={id}
            style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <p>Section: {id}</p>
          </section>
        ))}
      </main>
    </>
  )
}
