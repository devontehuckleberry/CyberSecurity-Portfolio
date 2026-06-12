import Wrap from '@/components/Wrap'
import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <Wrap>
        <div className={styles.inner}>
          <span>&copy; 2026 Devonte Huckleberry &middot; Chicago, IL</span>
          <nav className={styles.links}>
            <a href="#hero">Top &#x2191;</a>
            <a href="/Devonte_Huckleberry_Resume.pdf">Resume</a>
            <a href="mailto:DevonteHuckleberry@gmail.com">Email</a>
          </nav>
        </div>
      </Wrap>
    </footer>
  )
}
