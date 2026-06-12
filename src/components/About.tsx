import GlassCard from '@/components/GlassCard'
import GlowButton from '@/components/GlowButton'
import Wrap from '@/components/Wrap'
import styles from './About.module.css'

export default function About() {
  return (
    <section id="about">
      <Wrap>
        <div className={styles.aboutGrid}>
          {/* Left: text */}
          <div className={styles.body}>
            <p className={styles.eyebrow}>About me</p>
            <h2 className={styles.h2}>
              Background &amp; <b>direction</b>
            </h2>
            <p>
              Before cybersecurity, I spent years in physical security and client-facing operations:
              watching access points, documenting incident patterns, escalating threats, and writing
              reports teams actually used. That background transfers directly to security and IT work.
              The perimeter is different; the principles aren&apos;t.
            </p>
            <p>
              The formal transition started with the <strong>Google Cybersecurity Certificate</strong>,
              then the <strong>ISC&sup2; CC</strong>. I&apos;m currently in Per Scholas Chicago&apos;s
              cybersecurity cohort working toward Security+ and Splunk Core Certified User. My home lab
              runs a full Active Directory domain, Kali Linux, and Splunk, which is where most of the
              portfolio projects below came from.
            </p>
            <p>
              The long-term path leads into <strong>Identity &amp; Access Management</strong>: least-privilege
              design, access reviews, RBAC, and identity governance, where the habit of writing clear records
              pays off directly. I&apos;m also tracking GRC and AI-compliance frameworks (NIST AI RMF, the
              EU AI Act, ISO 42001) because access governance doesn&apos;t exist in a vacuum.
            </p>
            <div className={styles.btns}>
              <GlowButton href="#projects" variant="primary">See the work</GlowButton>
              <GlowButton href="/resume" variant="ghost">View resume</GlowButton>
            </div>
          </div>

          {/* Right: career path panel */}
          <GlassCard className={styles.pathPanel}>
            <p className={styles.panelTitle}>Career path</p>

            <span className={`${styles.pathLine} ${styles.r}`}>&#10003; IT Support / Help Desk</span>
            <div className={styles.ind1}>
              <span className={`${styles.pathLine} ${styles.r}`}>
                &#x2514;&#x2500; &#8594; SOC Analyst{' '}
                <span className={styles.tgt}>[target]</span>
              </span>
              <div className={styles.ind1}>
                <span className={styles.pathLine}>
                  &#x2514;&#x2500; Senior SOC Analyst
                </span>
                <div className={styles.ind1}>
                  <span className={styles.pathLine}>
                    &#x2514;&#x2500; IAM Analyst
                  </span>
                  <div className={styles.ind1}>
                    <span className={styles.pathLine}>
                      &#x2514;&#x2500; IAM Engineer / Identity Governance
                    </span>
                    <span className={`${styles.pathLine} ${styles.r}`} style={{ paddingLeft: '1.2rem' }}>
                      &middot; GRC &amp; AI compliance &mdash; secondary track
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <p className={styles.ph}># active certs</p>
            <span className={`${styles.pathLine} ${styles.w}`}>~ CompTIA Security+</span>
            <span className={`${styles.pathLine} ${styles.w}`}>~ Splunk Core Certified User</span>

            <p className={styles.ph}># frameworks tracking</p>
            <span className={styles.pathLine}>&middot; NIST AI RMF</span>
            <span className={styles.pathLine}>&middot; EU AI Act | ISO 42001</span>

            <p className={styles.ph}># platforms</p>
            <span className={styles.pathLine}>
              &middot;{' '}
              <a
                href="https://tryhackme.com/p/Devonte"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'var(--muted)', textDecoration: 'underline', textDecorationColor: 'var(--hairline)' }}
              >
                TryHackMe
              </a>
            </span>
          </GlassCard>
        </div>
      </Wrap>
    </section>
  )
}
