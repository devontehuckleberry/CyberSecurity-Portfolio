import type { Metadata } from 'next'
import GlowButton from '@/components/GlowButton'
import styles from './resume.module.css'

export const metadata: Metadata = {
  title: 'Resume — Devonte Huckleberry',
  description:
    'Resume of Devonte Huckleberry — Security · Identity · IT Operations. Chicago, IL. Open to remote.',
}

export default function ResumePage() {
  return (
    <div className={styles.page}>
      <div className={styles.inner}>
        <header className={styles.header}>
          <h1 className={styles.name}>Devonte Huckleberry</h1>
          <div className={styles.role}>Security · Identity · IT Operations</div>
          <div className={styles.location}>Chicago, IL · Open to remote</div>
          <div className={styles.contact}>
            <span>Calumet City, IL</span>
            <a href="tel:8723059189">872-305-9189</a>
            <a href="mailto:DevonteHuckleberry@gmail.com">DevonteHuckleberry@gmail.com</a>
            <a href="https://www.linkedin.com/in/devonte-huckleberry/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          </div>
          <div className={styles.actions}>
            <GlowButton variant="primary" href="/Devonte_Huckleberry_Resume.pdf">
              Download PDF ↓
            </GlowButton>
          </div>
        </header>

        <h2 className={styles.section}>Summary</h2>
        <p className={styles.summary}>
          Cybersecurity student at Per Scholas Chicago with ten-plus years of self-taught IT experience and
          a background in physical security operations. Already comfortable with the tools a SOC runs on:
          Wireshark, Splunk, Linux, and TCP/IP analysis. Holds the Google Cybersecurity Professional
          Certificate and ISC2 CC; CompTIA Security+ and Splunk Core Certified User in progress. The
          physical security background isn&apos;t a detour. It built the habits that matter in a SOC:
          accurate documentation under pressure, clear escalation, and knowing when something is off before
          it becomes a full incident. Ready to bring that combination to a Tier 1 SOC role on day one.
        </p>

        <h2 className={styles.section}>Technical Skills</h2>
        <dl className={styles.skills}>
          <dt>Operating systems</dt><dd>Windows 10/11, Linux (Ubuntu, Kali), command-line administration</dd>
          <dt>SIEM / analysis</dt><dd>Splunk (log ingestion, search, basic dashboards), Wireshark, Tcpdump</dd>
          <dt>Networking</dt><dd>TCP/IP, DNS, DHCP, packet analysis, basic network troubleshooting</dd>
          <dt>Scripting / data</dt><dd>SQL (MySQL, BigQuery), Python (basic scripting), Bash</dd>
          <dt>Security concepts</dt><dd>Log analysis, access control, identity management, vulnerability fundamentals, incident response</dd>
          <dt>Ticketing</dt><dd>ServiceNow, Jira, Zendesk: logging, tracking, and escalating issues accurately</dd>
          <dt>Documentation</dt><dd>Incident reports, risk assessments, knowledge base articles, policy documentation</dd>
          <dt>Hardware</dt><dd>PC assembly, component replacement, peripheral setup, diagnostics</dd>
        </dl>

        <h2 className={styles.section}>Experience</h2>

        <div className={styles.job}>
          <div className={styles.jobHead}>
            <h3>Cybersecurity Student (Hybrid)</h3>
            <span className={styles.when}>May 2025 – present</span>
          </div>
          <div className={styles.org}>Per Scholas Chicago — full-time, employer-partnered training program. Graduates placed at JPMorgan Chase, Accenture, Cognizant, and other enterprise organizations.</div>
          <ul>
            <li>Perform packet capture and traffic analysis with Wireshark on live lab environments; identify anomalous traffic, flag suspicious connections, and document findings in a format ready for escalation.</li>
            <li>Work through hands-on Splunk labs covering log ingestion, SPL queries, and alert configuration.</li>
            <li>Apply the NIST Cybersecurity Framework and incident response lifecycle in lab scenarios; know where a Tier 1 analyst fits in the containment and escalation chain.</li>
            <li>Completing CompTIA Security+ and Splunk Core Certified User through the program.</li>
            <li>Maintain detailed lab notes and findings documentation, to the same standard used in physical security operations.</li>
          </ul>
        </div>

        <div className={styles.job}>
          <div className={styles.jobHead}>
            <h3>Security Guard</h3>
            <span className={styles.when}>Apr 2024 – Sep 2025</span>
          </div>
          <div className={styles.org}>Securitas Security Services USA, Chicago, IL</div>
          <ul>
            <li>Monitored access control and CCTV across high-traffic corporate sites; logged every anomaly and escalated with full context. Same workflow a Tier 1 analyst runs on alerts.</li>
            <li>Managed credentialing and visitor screening for 100+ daily visitors; zero unauthorized access incidents across the full assignment.</li>
            <li>Coordinated with law enforcement and site management during incidents; produced documentation that closed cases faster and held up under review.</li>
            <li>Assigned to priority client locations, including banks and financial offices, based on consistent performance and client trust.</li>
          </ul>
        </div>

        <div className={styles.job}>
          <div className={styles.jobHead}>
            <h3>Security Officer / Supervisor</h3>
            <span className={styles.when}>Nov 2022 – Jul 2023</span>
          </div>
          <div className={styles.org}>Titan Security Group, Chicago, IL</div>
          <ul>
            <li>Supervised security personnel across multiple sites; standardized shift handoffs, cutting coverage gaps by an estimated 30%.</li>
            <li>Documented anomalies that led to security protocol updates at two-plus client locations.</li>
            <li>Wrote incident reports and risk assessments that fed client security reviews; the format was adopted as the site-wide template.</li>
            <li>Primary liaison with law enforcement during active incidents.</li>
          </ul>
        </div>

        <div className={styles.job}>
          <div className={styles.jobHead}>
            <h3>Self-Directed IT Support</h3>
            <span className={styles.when}>Ongoing</span>
          </div>
          <div className={styles.org}>Friends and family</div>
          <ul>
            <li>Ten-plus years resolving hardware, software, and connectivity issues across Windows, Android, and iOS: PC builds, OS reinstalls, malware removal, driver updates, home network troubleshooting.</li>
          </ul>
        </div>

        <h2 className={styles.section}>Labs and Projects</h2>

        <div className={styles.job}>
          <div className={styles.jobHead}>
            <h3>TryHackMe</h3>
            <span className={styles.when}>2024 – 2025</span>
          </div>
          <ul>
            <li>Modules on Linux fundamentals, Windows administration, log analysis, Wireshark packet inspection, and Splunk — with written findings for each.</li>
            <li>Windows forensics: MFT and Prefetch parsing with EZ Tools, registry navigation, UAC, basic artifact recovery.</li>
            <li>Domain hijack investigation and Metasploitable 2 exploit lab documented in the portfolio with methodology and findings.</li>
          </ul>
        </div>

        <div className={styles.job}>
          <div className={styles.jobHead}>
            <h3>Cybersecurity Acronyms Reference Tool</h3>
            <span className={styles.when}>Live</span>
          </div>
          <ul>
            <li>Built and deployed a searchable terminology reference on GitHub Pages, for new analysts getting up to speed on domain vocabulary.</li>
          </ul>
        </div>

        <h2 className={styles.section}>Certifications and Education</h2>
        <div className={styles.certs}>
          <div className={styles.cert}>
            <div className={styles.certName}>ISC² Certified in Cybersecurity (CC)</div>
            <div className={styles.certStatus}>Earned</div>
          </div>
          <div className={styles.cert}>
            <div className={styles.certName}>Google Cybersecurity Professional Certificate</div>
            <div className={styles.certStatus}>Earned</div>
          </div>
          <div className={styles.cert}>
            <div className={styles.certName}>CompTIA Security+ (SY0-701)</div>
            <div className={styles.certStatus}>In progress · Per Scholas</div>
          </div>
          <div className={styles.cert}>
            <div className={styles.certName}>Splunk Core Certified User</div>
            <div className={styles.certStatus}>In progress · Per Scholas</div>
          </div>
          <div className={`${styles.cert} ${styles.certFull}`}>
            <div className={styles.certName}>Per Scholas Chicago — Cybersecurity Program</div>
            <div className={styles.certStatus}>May 2025 cohort · In progress</div>
          </div>
        </div>
      </div>
    </div>
  )
}
