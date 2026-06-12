'use client'

import { useEffect, useId, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { useOutsideClick } from '@/hooks/use-outside-click'
import GlowButton from '@/components/GlowButton'
import type { Project } from '@/data/projects'
import styles from './ExpandableProjectCards.module.css'

function TerminalCover({ project, big }: { project: Project; big?: boolean }) {
  return (
    <div className={`${styles.cover} ${big ? styles.coverBig : ''} ${project.green ? styles.coverGreen : ''}`}>
      <div className={styles.coverBar}>
        <span /><span /><span />
        <em>{project.id}@huckleberry</em>
      </div>
      <div className={styles.coverBody}>
        <p className={styles.coverCmd}>
          <b>$</b> {project.cover.cmd}
        </p>
        {project.cover.lines.map((line) => (
          <p key={line} className={styles.coverLine}>{line}</p>
        ))}
      </div>
    </div>
  )
}

export default function ExpandableProjectCards({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState<Project | null>(null)
  const ref = useRef<HTMLDivElement>(null)
  const id = useId()

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setActive(null)
    }
    if (active) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [active])

  useOutsideClick(ref, () => setActive(null))

  return (
    <>
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={styles.backdrop}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {active ? (
          <div className={styles.expandedWrap}>
            <motion.button
              key={`close-${active.id}-${id}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.05 } }}
              className={styles.closeBtn}
              onClick={() => setActive(null)}
              aria-label="Close project details"
            >
              ✕
            </motion.button>

            <motion.div
              layoutId={`card-${active.id}-${id}`}
              ref={ref}
              className={`glass ${styles.expanded}`}
            >
              <motion.div layoutId={`cover-${active.id}-${id}`}>
                <TerminalCover project={active} big />
              </motion.div>

              <div className={styles.expandedHead}>
                <div>
                  <motion.p
                    layoutId={`tag-${active.id}-${id}`}
                    className={`${styles.tag} ${active.green ? styles.tagGreen : ''}`}
                  >
                    {active.detail.tag}
                  </motion.p>
                  <motion.h3 layoutId={`title-${active.id}-${id}`} className={styles.expandedTitle}>
                    {active.title}
                  </motion.h3>
                </div>
                <motion.a
                  layoutId={`button-${active.id}-${id}`}
                  href={active.ctaLink}
                  {...(active.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className={`${styles.cta} ${active.green ? styles.ctaGreen : ''}`}
                >
                  {active.ctaText}
                </motion.a>
              </div>

              <motion.div
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className={styles.expandedBody}
              >
                <p className={styles.body}>{active.detail.body}</p>
                <ul className={styles.bullets}>
                  {active.detail.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
                <div className={styles.chips}>
                  {active.detail.chips.map((c) => (
                    <span key={c} className={styles.chip}>{c}</span>
                  ))}
                </div>
                {active.detail.secondaryBtn && (
                  <div className={styles.secondaryRow}>
                    <GlowButton href={active.detail.secondaryBtn.href} variant="ghost">
                      {active.detail.secondaryBtn.label}
                    </GlowButton>
                  </div>
                )}
              </motion.div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>

      <ul className={styles.grid}>
        {projects.map((project) => (
          <motion.li
            layoutId={`card-${project.id}-${id}`}
            key={`card-${project.id}-${id}`}
            onClick={() => setActive(project)}
            className={`glass glow ${styles.card}`}
            style={project.green ? { ['--glow' as string]: 'var(--green)' } : undefined}
            tabIndex={0}
            role="button"
            aria-haspopup="dialog"
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                setActive(project)
              }
            }}
          >
            <motion.div layoutId={`cover-${project.id}-${id}`}>
              <TerminalCover project={project} />
            </motion.div>
            <motion.p
              layoutId={`tag-${project.id}-${id}`}
              className={`${styles.tag} ${project.green ? styles.tagGreen : ''}`}
            >
              {project.tag}
            </motion.p>
            <motion.h3 layoutId={`title-${project.id}-${id}`} className={styles.cardTitle}>
              {project.title}
            </motion.h3>
            <p className={styles.summary}>{project.summary}</p>
            <div className={styles.metaRow}>
              <span>{project.meta}</span>
              <motion.span
                layoutId={`button-${project.id}-${id}`}
                className={`${styles.cta} ${project.green ? styles.ctaGreen : ''}`}
              >
                {project.ctaText}
              </motion.span>
            </div>
          </motion.li>
        ))}
      </ul>
    </>
  )
}
