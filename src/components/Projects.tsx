'use client'

import { useRef } from 'react'
import GlassCard from '@/components/GlassCard'
import GlowButton from '@/components/GlowButton'
import Wrap from '@/components/Wrap'
import styles from './Projects.module.css'

interface ProjectDetail {
  tag: string
  body: string
  bullets: string[]
  chips: string[]
  primaryBtn: { label: string; href: string }
  secondaryBtn: { label: string; href: string } | null
}

interface Project {
  id: string
  tag: string
  title: string
  summary: string
  meta: string
  detail: ProjectDetail
  foothold: boolean
}

const PROJECTS: Project[] = [
  {
    id: 'adlab',
    tag: 'Flagship · Purple team',
    title: 'Active Directory Purple-Team & SOC Lab',
    summary:
      'A mini-enterprise on a spare laptop. I stand up an AD domain, Kerberoast it from Kali, then catch the attack in Splunk and write the detection.',
    meta: 'AD · Splunk · Sysmon · Kali',
    detail: {
      tag: 'Flagship · Purple team',
      body: "A self-built mini-enterprise: a Windows Server 2022 domain controller and a domain-joined workstation on a spare laptop, attacked from a Kali VM on an Apple Silicon Mac. One lab, three skill areas I'm targeting for work: identity, detection, offense. Phase 1 is done and documented with 8 evidence screenshots.",
      bullets: [
        'Built and administered the domain: OUs, users, groups, Group Policy, least-privilege design',
        'Generated endpoint telemetry with Sysmon, centralized it in Splunk',
        'Ran Kerberoasting and a password spray end to end, then wrote the Splunk detections for both',
        'Segmented the lab network on its own isolated subnet',
      ],
      chips: ['Active Directory', 'Splunk', 'Sysmon', 'Kerberoasting', 'Kali', 'Group Policy'],
      primaryBtn: { label: 'Read the full build', href: '/projects/active-directory-purple-lab' },
      secondaryBtn: null,
    },
    foothold: false,
  },
  {
    id: 'hijack',
    tag: 'Live incident',
    title: 'Website Hijack & Malicious Redirect Investigation',
    summary:
      "An active CDN account takeover serving a fraudulent gambling platform under a live church domain. I ran the packet capture, traced it to a Cloudflare config compromise, and wrote the incident report. Not a lab.",
    meta: 'Wireshark · tshark · VirusTotal',
    detail: {
      tag: 'Live incident · May 21, 2026',
      body: "An active CDN account takeover serving a fraudulent gambling platform under a live church domain. I ran packet capture, traced the attack to a Cloudflare config-level compromise, identified the indicators of compromise, and produced a full incident report with remediation steps. This is the one project here that wasn't practice.",
      bullets: [
        'Packet capture and QUIC/TLS handshake tracing with Wireshark and tshark',
        'IOC identification and verification through VirusTotal and DNS analysis',
        'Full evidence package: timeline, captures, and analysis, end to end',
      ],
      chips: ['Wireshark', 'tshark', 'VirusTotal', 'DNS analysis', 'QUIC/TLS', 'Incident response'],
      primaryBtn: { label: 'Read the write-up', href: '/projects/hijack-investigation' },
      secondaryBtn: {
        label: 'Evidence (Drive)',
        href: 'https://drive.google.com/drive/folders/1MiCHnl7v4U2SJ9kMAKGCCMRF7Dn_PV7R?usp=drive_link',
      },
    },
    foothold: false,
  },
  {
    id: 'msf',
    tag: 'Lab · Offense',
    title: 'Metasploitable 2 — vsftpd Backdoor',
    summary:
      'Root access in about 15 minutes via the vsftpd 2.3.4 backdoor (CVE-2011-2523), then a documented enumeration-to-exploitation write-up of the full path.',
    meta: 'Kali · Metasploit · Nmap',
    detail: {
      tag: 'Lab · Offense',
      body: "Gained full root access in about 15 minutes by exploiting the vsftpd 2.3.4 backdoor (CVE-2011-2523), confirming an interactive reverse shell on an isolated lab target. Then documented the complete enumeration-to-exploitation path across a deliberate 4-hour session.",
      bullets: [
        'Ping sweep, Nmap service enumeration, and version detection against the target VM',
        'Backdoor identification and manual verification before touching Metasploit',
        "Exploitation, post-exploitation enumeration, and a write-up I'd want to read in a pentest report",
      ],
      chips: ['Kali Linux', 'Nmap', 'Metasploit', 'CVE-2011-2523'],
      primaryBtn: { label: 'Read the lab write-up', href: '/projects/metasploitable-lab' },
      secondaryBtn: null,
    },
    foothold: false,
  },
  {
    id: 'foothold',
    tag: 'Founder · Product',
    title: 'Foothold',
    summary:
      "I built Foothold for career changers like me: study, get your first cert, land the job. Different brand, same builder.",
    meta: 'foothold.sh',
    detail: {
      tag: 'Founder · Product · Live',
      body: "I changed careers without a map, so I'm building one. Foothold helps career changers do what I did: study for their first cert, pass it, and land their first job in tech. Security+ study tools, resume and interview prep, built by someone actually walking the path.",
      bullets: [
        'Security+ study tools you can use the day you sign up',
        'Resume, LinkedIn, and interview prep aimed at first tech jobs',
        'Live now at foothold.sh',
      ],
      chips: ['Career changers', 'Security+ study', 'Job prep'],
      primaryBtn: { label: 'Visit foothold.sh', href: 'https://foothold.sh' },
      secondaryBtn: null,
    },
    foothold: true,
  },
]

function ProjectCard({ project }: { project: Project }) {
  const dialogRef = useRef<HTMLDialogElement>(null)

  function open() {
    dialogRef.current?.showModal()
  }

  function close() {
    dialogRef.current?.close()
  }

  const glowColor = project.foothold ? 'oklch(80% 0.21 152)' : undefined

  return (
    <>
      <GlassCard
        className={styles.summaryCard}
        glowColor={glowColor}
        onClick={open}
        style={{ cursor: 'pointer' }}
      >
        <span className={`${styles.tag} ${project.foothold ? styles.tagGreen : ''}`}>
          {project.tag}
        </span>
        <h3>{project.title}</h3>
        <p>{project.summary}</p>
        <div className={styles.metaRow}>
          <span>{project.meta}</span>
          <span className={styles.openHint}>Expand +</span>
        </div>
      </GlassCard>

      <dialog ref={dialogRef} className={styles.dialog}>
        <div className={styles.dialogInner}>
          <p className={`${styles.dialogTag} ${project.foothold ? styles.dialogTagGreen : ''}`}>
            {project.detail.tag}
          </p>
          <h3>{project.title}</h3>
          <p className={styles.dialogBody}>{project.detail.body}</p>
          <ul className={styles.bullets}>
            {project.detail.bullets.map((b, i) => (
              <li key={i}>{b}</li>
            ))}
          </ul>
          <div className={styles.chips}>
            {project.detail.chips.map((c) => (
              <span key={c} className={styles.chip}>{c}</span>
            ))}
          </div>
          <div className={styles.dialogFooter}>
            <div className={styles.dialogBtns}>
              <GlowButton href={project.detail.primaryBtn.href} variant="primary">
                {project.detail.primaryBtn.label}
              </GlowButton>
              {project.detail.secondaryBtn && (
                <GlowButton href={project.detail.secondaryBtn.href} variant="ghost">
                  {project.detail.secondaryBtn.label}
                </GlowButton>
              )}
            </div>
            <button className={styles.closeBtn} onClick={close} type="button">
              Close · Esc
            </button>
          </div>
        </div>
      </dialog>
    </>
  )
}

export default function Projects() {
  return (
    <section id="projects" className={styles.section}>
      <Wrap>
        <p className={styles.eyebrow}>Proof</p>
        <h2 className={styles.h2}>Projects</h2>
        <p className={styles.ssub}>
          Real incidents and labs I built to prove I can do the job. Click a card for the full story.
        </p>
        <div className={styles.grid}>
          {PROJECTS.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>
        <p className={styles.alsoOnFile}>
          Also on file:{' '}
          <a href="/projects/sql-investigation">SQL investigation</a>
          {' · '}
          <a href="/projects/vulnerability-assessment">vulnerability assessment</a>
          {' · '}
          <a href="/projects/incident-journal">incident journal</a>
        </p>
      </Wrap>
    </section>
  )
}
