import GlassCard from '@/components/GlassCard'
import Wrap from '@/components/Wrap'
import styles from './Capabilities.module.css'

const CAPS = [
  {
    n: '01',
    title: 'Threat Detection & Log Analysis',
    body: 'Reading log data for attack patterns, correlating SIEM alerts, tracing events across a timeline. The Splunk and packet-capture work backing this is in the portfolio.',
  },
  {
    n: '02',
    title: 'Network Traffic Analysis',
    body: 'Live packet capture and protocol-level analysis using Wireshark and tshark. Applied in a real-world domain hijack investigation with QUIC/TLS handshake tracing.',
  },
  {
    n: '03',
    title: 'Incident Response',
    body: "Incident documentation built around the NIST framework: 6-phase planning, clear timelines, and a handler's journal I actually maintain. One of the entries is from a live incident.",
  },
  {
    n: '04',
    title: 'Vulnerability Assessment',
    body: 'Formal vulnerability assessment using NIST SP 800-30 and Nmap: threat scoring, prioritized remediation, and reports that decision-makers can act on without a decoder ring.',
  },
  {
    n: '05',
    title: 'SQL & Data Querying',
    body: 'Writing precise SQL queries against login logs and employee records to surface what the security team actually needs: failed after-hours attempts, geographic outliers, department-specific machine subsets.',
  },
  {
    n: '06',
    title: 'IAM & Access Governance',
    body: "Least-privilege design, RBAC, and access reviews. The direction I'm deliberately building toward, with framework-aligned risk work sitting behind it on the GRC side.",
  },
]

export default function Capabilities() {
  return (
    <section id="capabilities" className={styles.section}>
      <Wrap>
        <p className={styles.eyebrow}>What I do</p>
        <h2 className={styles.h2}>
          Security <b>capabilities</b>
        </h2>
        <p className={styles.ssub}>
          Hands-on skills built through labs, coursework, and real-world incident response. These
          aren&apos;t buzzwords. Each one maps to actual project work in this portfolio.
        </p>
        <div className={styles.grid}>
          {CAPS.map((cap) => (
            <GlassCard key={cap.n} className={styles.card}>
              <span className={styles.n}>{cap.n}</span>
              <h3>{cap.title}</h3>
              <p>{cap.body}</p>
            </GlassCard>
          ))}
        </div>
      </Wrap>
    </section>
  )
}
