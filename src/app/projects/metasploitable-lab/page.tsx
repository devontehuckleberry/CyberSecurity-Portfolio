import type { Metadata } from 'next'
import styles from '../project-page.module.css'

export const metadata: Metadata = {
  title: 'Metasploitable 2 VSFTPD Exploitation — Devonte Huckleberry',
  description:
    'End-to-end penetration test on Metasploitable 2: enumeration, vsftpd 2.3.4 backdoor exploitation (CVE-2011-2523), and confirmed root access in an isolated lab.',
}

export default function MetasploitableLabPage() {
  return (
    <>
      <div className={styles.tag}>Case File 02 · Home Lab</div>
      <h1 className={styles.title}>Metasploitable 2 VSFTPD Exploitation</h1>

      <p className={styles.lead}>
        <strong>Environment:</strong> Kali Linux ARM + Metasploitable 2 (UTM, host-only network) &nbsp;·&nbsp;{' '}
        <strong>CVE:</strong> CVE-2011-2523
      </p>

      <p className={styles.lead}>
        Full penetration test on an isolated lab network: ping sweep → service enumeration →
        vsftpd 2.3.4 backdoor identification → reverse shell session → root access confirmed. Actual exploit
        time was roughly 15 minutes; the full session was about 4 hours of deliberate, documented methodology.
        The complete lab write-up is embedded below.
      </p>

      <div className={styles.chips}>
        {['Kali Linux', 'Nmap', 'Metasploit', 'vsftpd 2.3.4', 'Reverse Shell'].map((t) => (
          <span key={t} className={styles.chip}>{t}</span>
        ))}
      </div>

      <h2 className={styles.section}>Lab Write-Up</h2>

      <div className={styles.embedHead}>
        <div className={styles.embedLabel}>Lab Write-Up — found in my Drive folder under homelab</div>
        <a
          href="https://drive.google.com/file/d/1JpXvtn_y_8Q9s5xIHeiRmjWIE8KA5BLl/view?usp=drive_link"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.driveBtn}
        >
          Open in Google Drive ↗
        </a>
      </div>
      <div className={styles.iframeWrap} style={{ height: 'min(85vh,1000px)' }}>
        <iframe
          src="https://drive.google.com/file/d/1JpXvtn_y_8Q9s5xIHeiRmjWIE8KA5BLl/preview"
          title="Metasploitable 2 vsftpd exploit lab write-up — Google Drive"
          loading="lazy"
          allow="autoplay"
        />
      </div>
      <p className={styles.note}>
        Can&apos;t see the document above? Google Drive sometimes blocks embedded previews —{' '}
        <a
          href="https://drive.google.com/file/d/1JpXvtn_y_8Q9s5xIHeiRmjWIE8KA5BLl/view?usp=drive_link"
          target="_blank"
          rel="noopener noreferrer"
        >
          open the write-up directly ↗
        </a>.
      </p>
    </>
  )
}
