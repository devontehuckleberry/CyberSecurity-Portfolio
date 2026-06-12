import GlassCard from './GlassCard'
import Wrap from './Wrap'
import styles from './Certs.module.css'

const CERTS = [
  { issuer: 'Google / Coursera', name: 'Cybersecurity Professional Certificate', state: 'Earned' },
  { issuer: 'ISC²', name: 'Certified in Cybersecurity (CC)', state: 'Earned' },
  { issuer: 'CompTIA · Per Scholas', name: 'Security+ (SY0-701)', state: 'In progress' },
  { issuer: 'Splunk · Per Scholas', name: 'Splunk Core Certified User', state: 'In progress' },
]

export default function Certs() {
  return (
    <section id="certs" className={styles.certs}>
      <Wrap>
        <div className={styles.row}>
          {CERTS.map((cert) => (
            <GlassCard key={cert.name} className={styles.card}>
              <p className={styles.issuer}>{cert.issuer}</p>
              <p className={styles.name}>{cert.name}</p>
              <p className={styles.state}>{cert.state}</p>
            </GlassCard>
          ))}
        </div>
      </Wrap>
    </section>
  )
}
