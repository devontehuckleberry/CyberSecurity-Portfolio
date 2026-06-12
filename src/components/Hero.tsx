import Image from 'next/image'
import GlowButton from './GlowButton'
import Wrap from './Wrap'
import styles from './Hero.module.css'

const STATS = [
  { num: '2', lbl: 'Certs earned' },
  { num: '1', lbl: 'Real incident worked' },
  { num: '10+', lbl: 'Yrs hands-on IT' },
]

export default function Hero() {
  return (
    <section id="hero" className={styles.hero}>
      <Wrap>
        <div className={styles.inner}>
          {/* Text column */}
          <div>
            <h1 className={styles.heading}>
              Devonte<br />
              <em>Huckleberry</em>
            </h1>

            <p className={styles.role}>Security · Identity · IT Operations</p>

            <p className={styles.desc}>
              Ten-plus years of hands-on IT, a physical-security background, and formal training through Per
              Scholas Chicago. I read logs in <strong>Splunk</strong>, manage identities in{' '}
              <strong>Active Directory</strong>, write SQL against real datasets, and document incidents in
              reports people actually use. All of it is proven below: a self-built enterprise lab, four
              certifications earned or in progress, and one real incident worked end to end.
            </p>

            <div className={styles.btns}>
              <GlowButton href="#projects" variant="primary">View my work</GlowButton>
              <GlowButton href="#contact" variant="ghost">Get in touch</GlowButton>
            </div>

            <div className={`${styles.btns} ${styles.btnsRow2}`}>
              <GlowButton href="#about" variant="ghost">Read more</GlowButton>
              <GlowButton href="/resume" variant="ghost">View resume</GlowButton>
            </div>

            <div className={styles.stats}>
              {STATS.map((stat, i) => (
                <div key={stat.lbl} style={{ display: 'contents' }}>
                  {i > 0 && <div className={styles.statRule} aria-hidden="true" />}
                  <div className={styles.stat}>
                    <div className={styles.num}>{stat.num}</div>
                    <div className={styles.lbl}>{stat.lbl}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Photo column */}
          <div className={styles.photoSide}>
            <div className="glass glow">
              <div className={styles.frame}>
                <div className={`${styles.corner} ${styles.cornerTl}`} aria-hidden="true" />
                <div className={`${styles.corner} ${styles.cornerBr}`} aria-hidden="true" />
                <Image
                  src="/devonte.jpg"
                  alt="Devonte Huckleberry"
                  width={420}
                  height={525}
                  className={styles.photo}
                  priority
                />
              </div>
            </div>

            <a href="#contact" className={styles.chip}>
              <span>🟢</span>
              Open to work · Chicago + remote
            </a>
          </div>
        </div>
      </Wrap>
    </section>
  )
}
