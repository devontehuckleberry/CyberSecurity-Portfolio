import type { Metadata } from 'next'
import ExpandableProjectCards from '@/components/ExpandableProjectCards'
import { PROJECTS } from '@/data/projects'
import styles from './project-page.module.css'

export const metadata: Metadata = {
  title: 'Projects — Devonte Huckleberry',
  description:
    "Every project on file: an AD purple-team lab, a live incident investigation, offensive labs, SQL investigation queries, a NIST vulnerability assessment, and an incident handler's journal.",
}

export default function ProjectsIndexPage() {
  return (
    <>
      <div className={styles.tag}>All work</div>
      <h1 className={styles.title}>Projects</h1>
      <p style={{ color: 'var(--muted)', maxWidth: '52ch', lineHeight: 1.7 }}>
        Everything on file — labs, case files, and one real incident. Click a card to expand it, or jump
        straight to the full write-up.
      </p>
      <div style={{ marginTop: '2rem' }}>
        <ExpandableProjectCards projects={PROJECTS} />
      </div>
    </>
  )
}
