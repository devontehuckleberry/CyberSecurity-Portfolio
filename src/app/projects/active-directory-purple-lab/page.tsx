import type { Metadata } from 'next'
import Image from 'next/image'
import styles from '../project-page.module.css'

export const metadata: Metadata = {
  title: 'Active Directory Purple-Team & SOC Lab — Devonte Huckleberry',
  description:
    'A self-built mini-enterprise AD domain with Sysmon + Splunk detection and Kali-based offensive exercises. IAM, SOC, and purple team in one lab.',
}

const evidence = [
  { src: '/evidence/01-aduc-ou-tree-users.png', alt: 'ADUC OU tree and users', cap: '01 · Active Directory Users & Computers — OU tree and user accounts' },
  { src: '/evidence/02-server-manager-roles.png', alt: 'Server Manager roles', cap: '02 · Server Manager — AD DS and DNS roles installed on DC01' },
  { src: '/evidence/03-get-addomain.png', alt: 'Get-ADDomain output', cap: '03 · PowerShell Get-ADDomain — lab.local forest confirmed' },
  { src: '/evidence/04-svc_sql-spn-and-ipconfig.png', alt: 'Service account SPN', cap: '04 · svc_sql service account with SPN set — the planted Kerberoast target' },
  { src: '/evidence/05-it-admins-membership.png', alt: 'IT-Admins group', cap: '05 · IT-Admins group membership' },
  { src: '/evidence/06-helpdesk-membership.png', alt: 'Helpdesk group', cap: '06 · Helpdesk group membership' },
  { src: '/evidence/07-finance-membership.png', alt: 'Finance group', cap: '07 · Finance group membership' },
  { src: '/evidence/08-logon-banner-gpo.png', alt: 'Logon banner GPO', cap: '08 · Logon-banner GPO linked and applied' },
]

export default function ADLabPage() {
  return (
    <>
      <div className={styles.tag}>Flagship · Purple team · Phase 1 complete</div>
      <h1 className={styles.title}>Active Directory Purple-Team &amp; SOC Lab</h1>
      <p className={styles.lead}>
        A self-built mini-enterprise running on a spare Windows laptop and an Apple Silicon Mac. I stand up
        an Active Directory domain, attack it from Kali, then catch the attack in Splunk. One lab, three
        skill areas I&apos;m targeting for work: <strong>identity (IAM)</strong>,{' '}
        <strong>detection (SOC)</strong>, and <strong>offensive technique (purple team)</strong>.
      </p>
      <p className={styles.lead}>
        Maps to Security+ SY0-701 domains: access control and identity, attacks and indicators, and
        security operations and monitoring.
      </p>

      <h2 className={styles.section}>Architecture</h2>
      <table className={styles.adTable}>
        <thead>
          <tr>
            <th>VM</th>
            <th>Role</th>
            <th>IP</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>DC01</code> — Windows Server 2022</td>
            <td>Domain Controller, DNS for <code>lab.local</code>, Sysmon</td>
            <td><code>10.10.10.10</code></td>
          </tr>
          <tr>
            <td><code>WS01</code> — Windows 10/11</td>
            <td>Domain-joined workstation, Sysmon, Splunk (SOC console)</td>
            <td><code>10.10.10.30</code></td>
          </tr>
          <tr>
            <td><code>KALI</code> — Kali Linux (UTM, Mac)</td>
            <td>Attacker, only reachable during exercises</td>
            <td><code>10.10.10.20</code></td>
          </tr>
        </tbody>
      </table>
      <ul>
        <li>Domain traffic rides a sealed VirtualBox internal network; the bridged adapter stays disabled except during attack exercises</li>
        <li>SOC capability comes from Sysmon + Splunk Free inside the existing VMs — no extra SIEM VM needed on 16 GB of RAM</li>
        <li>Safety rule: credential and protocol attacks against my own VMs only; no live malware or real C2 on home topology</li>
      </ul>

      <h2 className={styles.section}>Phase 1 — Identity: stand up the domain (done)</h2>
      <ul>
        <li>Promoted <code>DC01</code> to Domain Controller for a new forest, <code>lab.local</code></li>
        <li>Built the OU tree (<code>Corp</code> → Users, Workstations, ServiceAccounts) with users and groups: IT-Admins, Helpdesk, Finance</li>
        <li>Linked a logon-banner GPO to feel the IAM workflow end to end</li>
        <li>Planted the attack surface for Phase 3: a service account with an SPN and a deliberately weak password — the Kerberoasting target</li>
      </ul>

      <h2 className={styles.section}>Evidence — Phase 1</h2>
      <div className={styles.evidenceGrid}>
        {evidence.map(({ src, alt, cap }) => (
          <div key={src} className={styles.ev}>
            <Image src={src} alt={alt} width={1024} height={768} style={{ width: '100%', height: 'auto' }} />
            <div className={styles.cap}>{cap}</div>
          </div>
        ))}
      </div>

      <h2 className={styles.section}>Next phases</h2>
      <ul>
        <li>Phase 2 — Detection: Sysmon on both Windows VMs, telemetry centralized in Splunk</li>
        <li>Phase 3 — Offense: Kerberoasting and a password spray from Kali, end to end</li>
        <li>Phase 4 — Purple: write the Splunk detections that catch both attacks, document the fix</li>
      </ul>

      <div className={styles.chips}>
        {['Windows Server 2022', 'Active Directory', 'Sysmon', 'Splunk', 'Kali Linux', 'Kerberoasting', 'GPO', 'IAM', 'Purple Team'].map((t) => (
          <span key={t} className={styles.chip}>{t}</span>
        ))}
      </div>
    </>
  )
}
