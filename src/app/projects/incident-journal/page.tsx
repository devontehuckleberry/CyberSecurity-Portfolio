import type { Metadata } from 'next'
import styles from '../project-page.module.css'

export const metadata: Metadata = {
  title: "Incident Handler's Journal — Devonte Huckleberry",
  description:
    "Incident handler's journal kept across lab scenarios and a real-world domain hijack — each entry captures the 5 W's, tools, timeline, and response, mirroring SOC analyst workflow.",
}

export default function IncidentJournalPage() {
  return (
    <>
      <div className={styles.tag}>Case File 05 · IR Documentation</div>
      <h1 className={styles.title}>Incident Handler&apos;s Journal</h1>

      <div className={styles.callout}>
        A running journal kept across home-lab scenarios and a real-world incident. Each entry follows the
        same structure a SOC analyst maintains in a live environment — the <strong>5 W&apos;s</strong>,
        tools used, timeline, and response summary — drawn from the NIST incident-response framework. New
        entries are added as labs and incidents accumulate.
      </div>

      {/* Entry 1 */}
      <div className={styles.entry}>
        <div className={styles.entryHead}>
          <span className={styles.entryNo}>ENTRY 01</span>
          <span className={styles.entryDate}>May 21, 2026</span>
          <span className={`${styles.entryKind} ${styles.kindLive}`}>Live Incident</span>
        </div>
        <div className={styles.entryBody}>
          <div className={styles.entryTitle}>Domain hijack &amp; malicious redirect — ssumcchicago.org</div>
          <p>
            A live church domain was discovered serving a fraudulent gambling platform. I captured and
            analyzed the traffic, traced the root cause, identified indicators of compromise, and produced
            a full incident report with remediation steps.
          </p>
          <div className={styles.lbl}>Tools used</div>
          <div className={styles.tools}>
            {['Wireshark', 'tshark', 'VirusTotal', 'DNS analysis', 'QUIC / TLS'].map((t) => (
              <span key={t} className={styles.tool}>{t}</span>
            ))}
          </div>
          <div className={styles.lbl}>The 5 W&apos;s</div>
          <ul className={styles.wList}>
            <li><b>Who</b> An external actor who gained control of the site&apos;s CDN (Cloudflare) account and configuration.</li>
            <li><b>What</b> A CDN account takeover served attacker-controlled content — a fraudulent gambling site — under the legitimate church domain.</li>
            <li><b>When</b> Identified and documented on May 21, 2026.</li>
            <li><b>Where</b> At the CDN configuration layer (Cloudflare), not the origin web server — which is what made it hard to spot from the host alone.</li>
            <li><b>Why</b> A compromised CDN account allowed the attacker to redirect/serve content under a trusted domain, abusing its reputation.</li>
          </ul>
          <div className={styles.lbl}>Response summary</div>
          <p>
            Ran packet capture to confirm the malicious behavior, correlated IOCs against VirusTotal,
            isolated the compromise to the CDN config level, and delivered a written incident report with
            prioritized remediation.
          </p>
          <a href="/projects/hijack-investigation" className={styles.entryLink}>
            Full investigation &amp; evidence →
          </a>
        </div>
      </div>

      {/* Entry 2 */}
      <div className={styles.entry}>
        <div className={styles.entryHead}>
          <span className={styles.entryNo}>ENTRY 02</span>
          <span className={styles.entryDate}>2025 · Home Lab</span>
          <span className={`${styles.entryKind} ${styles.kindLab}`}>Authorized Lab</span>
        </div>
        <div className={styles.entryBody}>
          <div className={styles.entryTitle}>vsftpd 2.3.4 backdoor exploitation — Metasploitable 2</div>
          <p>
            An authorized penetration test in an isolated lab: enumeration, identification of a vulnerable
            service, exploitation, and root access — fully documented end to end.
          </p>
          <div className={styles.lbl}>Tools used</div>
          <div className={styles.tools}>
            {['Kali Linux', 'Nmap', 'Metasploit', 'CVE-2011-2523'].map((t) => (
              <span key={t} className={styles.tool}>{t}</span>
            ))}
          </div>
          <div className={styles.lbl}>The 5 W&apos;s</div>
          <ul className={styles.wList}>
            <li><b>Who</b> Myself, as the authorized tester — no external party; a closed, host-only lab network.</li>
            <li><b>What</b> Exploited the vsftpd 2.3.4 backdoor (CVE-2011-2523) to open a root reverse shell.</li>
            <li><b>When</b> Roughly 15 minutes to exploit; about 4 hours for the full, deliberately documented session.</li>
            <li><b>Where</b> A Metasploitable 2 VM on an isolated host-only network (Kali Linux ARM via UTM on Apple Silicon).</li>
            <li><b>Why</b> An intentionally vulnerable service, used to practice the enumeration → exploitation → documentation workflow safely.</li>
          </ul>
          <div className={styles.lbl}>Response summary</div>
          <p>
            Confirmed the vulnerability through service enumeration, exploited it in a controlled way,
            verified root access, then wrote up the methodology and findings — the same documentation
            discipline a real engagement requires.
          </p>
          <a href="/projects/metasploitable-lab" className={styles.entryLink}>
            Full lab write-up →
          </a>
        </div>
      </div>

      {/* Entry 3 */}
      <div className={styles.entry}>
        <div className={styles.entryHead}>
          <span className={styles.entryNo}>ENTRY 03</span>
          <span className={styles.entryDate}>2024–2025 · TryHackMe</span>
          <span className={`${styles.entryKind} ${styles.kindLab}`}>Forensics Lab</span>
        </div>
        <div className={styles.entryBody}>
          <div className={styles.entryTitle}>Windows host forensics — artifact reconstruction</div>
          <p>
            A hands-on forensics exercise reconstructing user and system activity on a Windows host from
            on-disk artifacts.
          </p>
          <div className={styles.lbl}>Tools used</div>
          <div className={styles.tools}>
            {['EZ Tools', 'MFT parsing', 'Prefetch', 'Registry', 'UAC'].map((t) => (
              <span key={t} className={styles.tool}>{t}</span>
            ))}
          </div>
          <div className={styles.lbl}>The 5 W&apos;s</div>
          <ul className={styles.wList}>
            <li><b>Who</b> The host&apos;s user account, whose activity I reconstructed from artifacts left behind on disk.</li>
            <li><b>What</b> Parsed the Master File Table and Prefetch with EZ Tools, navigated the registry, and recovered evidence of program execution and file activity.</li>
            <li><b>When</b> Across 2024–2025 TryHackMe modules; timeline rebuilt from artifact timestamps.</li>
            <li><b>Where</b> A Windows lab image — file system, Prefetch, and registry hives.</li>
            <li><b>Why</b> To build the muscle memory of pulling a coherent timeline out of host artifacts — the core of host-based investigation.</li>
          </ul>
          <div className={styles.lbl}>Response summary</div>
          <p>
            Translated raw artifacts into a readable activity timeline and a short findings note,
            reinforcing how forensic evidence supports an incident-response narrative.
          </p>
        </div>
      </div>
    </>
  )
}
