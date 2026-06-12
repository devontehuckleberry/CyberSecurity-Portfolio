import type { Metadata } from 'next'
import styles from '../project-page.module.css'

export const metadata: Metadata = {
  title: 'Website Hijack & Malicious Redirect Investigation — Devonte Huckleberry',
  description:
    'Investigation of a live CDN account takeover serving a fraudulent gambling platform under a church domain — packet capture, IOC identification, and a full incident report.',
}

export default function HijackInvestigationPage() {
  return (
    <>
      <div className={styles.tag}>Case File 01 · Live Incident</div>
      <h1 className={styles.title}>Website Hijack &amp; Malicious Redirect Investigation</h1>

      <p className={styles.lead}>
        <strong>Target:</strong> ssumcchicago.org &nbsp;·&nbsp; <strong>Date:</strong> May 21, 2026 &nbsp;·&nbsp;{' '}
        <strong>Type:</strong> CDN account takeover / malicious redirect
      </p>

      <p className={styles.lead}>
        Identified an active CDN account takeover serving a fraudulent gambling platform under a live church
        domain. Ran packet capture, traced the attack to a Cloudflare config-level compromise, identified the
        indicators of compromise (IOCs), and produced a full incident report with remediation steps. The
        evidence package below documents the timeline, captures, and analysis end to end.
      </p>

      <div className={styles.chips}>
        {['Wireshark', 'tshark', 'VirusTotal', 'DNS Analysis', 'QUIC/TLS', 'Incident Response'].map((t) => (
          <span key={t} className={styles.chip}>{t}</span>
        ))}
      </div>

      <h2 className={styles.section}>Evidence</h2>

      <div className={styles.embedHead}>
        <div className={styles.embedLabel}>Evidence — ssumcchicago.org · Incident Evidence (May 21 2026)</div>
        <a
          href="https://drive.google.com/drive/folders/1MiCHnl7v4U2SJ9kMAKGCCMRF7Dn_PV7R?usp=drive_link"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.driveBtn}
        >
          Open in Google Drive ↗
        </a>
      </div>
      <div className={styles.iframeWrap}>
        <iframe
          src="https://drive.google.com/embeddedfolderview?id=1MiCHnl7v4U2SJ9kMAKGCCMRF7Dn_PV7R#list"
          title="Incident evidence — Google Drive folder"
          loading="lazy"
        />
      </div>
      <p className={styles.note}>
        Can&apos;t see the files above? Google Drive sometimes blocks embedded previews —{' '}
        <a
          href="https://drive.google.com/drive/folders/1MiCHnl7v4U2SJ9kMAKGCCMRF7Dn_PV7R?usp=drive_link"
          target="_blank"
          rel="noopener noreferrer"
        >
          open the evidence folder directly ↗
        </a>.
      </p>
    </>
  )
}
