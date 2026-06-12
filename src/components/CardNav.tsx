'use client'

import { useState } from 'react'
import styles from './CardNav.module.css'

export default function CardNav() {
  const [open, setOpen] = useState(false)

  function close() {
    setOpen(false)
  }

  return (
    <div className={styles.cardNavWrap}>
      <nav
        className={`${styles.cardNav} glass ${open ? styles.open : ''}`}
        aria-label="Main"
      >
        <div className={styles.cnTop}>
          <button
            className={styles.cnBurger}
            aria-label="Menu"
            aria-expanded={open}
            onClick={() => setOpen((prev) => !prev)}
          >
            <span />
            <span />
          </button>

          <a className={styles.cnLogo} href="#hero" onClick={close}>
            Devonte<b>.</b>
          </a>

          <a
            className={`btn btn-primary ${styles.cnCta}`}
            href="#contact"
            onClick={close}
          >
            Hire me
          </a>
        </div>

        <div className={styles.cnCards} aria-hidden={!open}>
          <div
            className={`${styles.cnCard} ${styles.cnCardWork}`}
          >
            <div className={styles.cnLabel}>Work</div>
            <a href="#projects" onClick={close}>Projects</a>
          </div>

          <div
            className={`${styles.cnCard} ${styles.cnCardAbout}`}
          >
            <div className={styles.cnLabel}>About</div>
            <a href="#about" onClick={close}>About me</a>
            <a href="/resume" onClick={close}>Resume</a>
          </div>

          <div
            className={`${styles.cnCard} ${styles.cnCardContact}`}
          >
            <div className={styles.cnLabel}>Contact</div>
            <a href="#contact" onClick={close}>Get in touch</a>
            <a
              href="https://linkedin.com/in/devontehuckleberry"
              rel="noopener noreferrer"
              target="_blank"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </nav>
    </div>
  )
}
