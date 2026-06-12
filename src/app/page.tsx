import ColorBends from '@/components/ColorBends'
import CardNav from '@/components/CardNav'
import Hero from '@/components/Hero'
import Certs from '@/components/Certs'

const PLACEHOLDER_SECTIONS = [
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
        <Hero />
        <Certs />
        {PLACEHOLDER_SECTIONS.map((id) => (
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
