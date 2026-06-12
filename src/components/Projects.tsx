import Wrap from '@/components/Wrap'
import GlowButton from '@/components/GlowButton'
import ExpandableProjectCards from '@/components/ExpandableProjectCards'
import { PROJECTS } from '@/data/projects'
import styles from './Projects.module.css'

export default function Projects() {
  return (
    <section id="projects" className={styles.section}>
      <Wrap>
        <p className={styles.eyebrow}>Proof</p>
        <h2 className={styles.h2}>Projects</h2>
        <p className={styles.ssub}>
          Real incidents and labs I built to prove I can do the job. Click a card for the full story.
        </p>
        <ExpandableProjectCards projects={PROJECTS.filter((p) => p.featured)} />
        <div className={styles.allLink}>
          <GlowButton href="/projects" variant="ghost">View all 7 projects</GlowButton>
        </div>
      </Wrap>
    </section>
  )
}
