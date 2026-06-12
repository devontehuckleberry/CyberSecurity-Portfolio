import ColorBends from '@/components/ColorBends'
import CardNav from '@/components/CardNav'

export default function ResumeLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ColorBends />
      <CardNav />
      {children}
    </>
  )
}
