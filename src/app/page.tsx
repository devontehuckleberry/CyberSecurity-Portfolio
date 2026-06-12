import ColorBends from '@/components/ColorBends'
import CardNav from '@/components/CardNav'
import Hero from '@/components/Hero'
import Certs from '@/components/Certs'
import About from '@/components/About'
import Capabilities from '@/components/Capabilities'
import Projects from '@/components/Projects'
import Terminal from '@/components/Terminal'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <ColorBends />
      <CardNav />
      <main style={{ position: 'relative', zIndex: 2 }}>
        <Hero />
        <Certs />
        <About />
        <Capabilities />
        <Projects />
        <Terminal />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
