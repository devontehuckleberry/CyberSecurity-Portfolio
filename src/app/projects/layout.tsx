import ColorBends from '@/components/ColorBends'
import CardNav from '@/components/CardNav'
import styles from './project-page.module.css'

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ColorBends />
      <CardNav />
      <div className={styles.page}>
        <div className={styles.inner}>
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
          <a className={styles.back} href="/#projects">← Back to portfolio</a>
          {children}
        </div>
      </div>
    </>
  )
}
