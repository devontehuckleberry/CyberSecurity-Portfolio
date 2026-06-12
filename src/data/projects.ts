export interface ProjectDetail {
  tag: string
  body: string
  bullets: string[]
  chips: string[]
  secondaryBtn: { label: string; href: string } | null
}

export interface Project {
  id: string
  tag: string
  title: string
  summary: string
  meta: string
  ctaText: string
  ctaLink: string
  external?: boolean
  green?: boolean
  featured: boolean
  cover: { cmd: string; lines: string[] }
  detail: ProjectDetail
}

export const PROJECTS: Project[] = [
  {
    id: 'adlab',
    tag: 'Flagship · In progress',
    title: 'Active Directory Purple-Team & SOC Lab',
    summary:
      'A mini-enterprise on a spare laptop. Phase 1 is done: I built the AD domain — OUs, users, groups, Group Policy — and documented it with evidence screenshots. Sysmon, Splunk, and the attack-then-detect work come next.',
    meta: 'AD · Splunk · Sysmon · Kali',
    ctaText: 'Read the build',
    ctaLink: '/projects/active-directory-purple-lab',
    featured: true,
    cover: {
      cmd: 'PS C:\\> Get-ADDomain | Select Forest',
      lines: ['Forest : huckleberry.local', '→ phase 1 complete · detections next'],
    },
    detail: {
      tag: 'Flagship · Purple team · Phase 1 complete',
      body: "A self-built mini-enterprise in progress: a Windows Server 2022 domain controller and a domain-joined workstation on a spare laptop, with a Kali VM staged on an Apple Silicon Mac. Phase 1, the domain build, is finished and documented with 8 evidence screenshots. The phases ahead add Sysmon telemetry into Splunk, then attack the domain and write the detections.",
      bullets: [
        'Built and administered the domain: OUs, users, groups, Group Policy, least-privilege design',
        'Documented the build with 8 evidence screenshots, from Server Manager roles to the logon-banner GPO',
        'Next phase: Sysmon endpoint telemetry centralized in Splunk',
        'Then: Kerberoasting and a password spray from Kali, each with its own Splunk detection',
      ],
      chips: ['Active Directory', 'Group Policy', 'Splunk (planned)', 'Sysmon (planned)', 'Kali'],
      secondaryBtn: null,
    },
  },
  {
    id: 'hijack',
    tag: 'Live incident',
    title: 'Website Hijack & Malicious Redirect Investigation',
    summary:
      'An active CDN account takeover serving a fraudulent gambling platform under a live church domain. I ran the packet capture, traced it to a Cloudflare config compromise, and wrote the incident report. Not a lab.',
    meta: 'Wireshark · tshark · VirusTotal',
    ctaText: 'Read the write-up',
    ctaLink: '/projects/hijack-investigation',
    featured: true,
    cover: {
      cmd: 'tshark -r capture.pcapng -Y "quic"',
      lines: ['→ redirect: church domain → gambling host', '→ IOCs confirmed via VirusTotal'],
    },
    detail: {
      tag: 'Live incident · May 21, 2026',
      body: "An active CDN account takeover serving a fraudulent gambling platform under a live church domain. I ran packet capture, traced the attack to a Cloudflare config-level compromise, pulled the IOCs, and wrote a full incident report with remediation steps. This is the one project here that wasn't practice.",
      bullets: [
        'Packet capture and QUIC/TLS handshake tracing with Wireshark and tshark',
        'IOC identification and verification through VirusTotal and DNS analysis',
        'Full evidence package: timeline, captures, and analysis, end to end',
      ],
      chips: ['Wireshark', 'tshark', 'VirusTotal', 'DNS analysis', 'QUIC/TLS', 'Incident response'],
      secondaryBtn: {
        label: 'Evidence (Drive)',
        href: 'https://drive.google.com/drive/folders/1MiCHnl7v4U2SJ9kMAKGCCMRF7Dn_PV7R?usp=drive_link',
      },
    },
  },
  {
    id: 'msf',
    tag: 'Lab · Offense',
    title: 'Metasploitable 2 — vsftpd Backdoor',
    summary:
      'Root access in about 15 minutes via the vsftpd 2.3.4 backdoor (CVE-2011-2523), then a documented enumeration-to-exploitation write-up of the full path.',
    meta: 'Kali · Metasploit · Nmap',
    ctaText: 'Read the lab',
    ctaLink: '/projects/metasploitable-lab',
    featured: true,
    cover: {
      cmd: 'nmap -sV 192.168.56.101',
      lines: ['21/tcp open  ftp  vsftpd 2.3.4', '→ backdoor shell · uid=0(root)'],
    },
    detail: {
      tag: 'Lab · Offense',
      body: 'Gained full root access in about 15 minutes by exploiting the vsftpd 2.3.4 backdoor (CVE-2011-2523), confirming an interactive reverse shell on an isolated lab target. Then documented the complete enumeration-to-exploitation path across a deliberate 4-hour session.',
      bullets: [
        'Ping sweep, Nmap service enumeration, and version detection against the target VM',
        'Backdoor identification and manual verification before touching Metasploit',
        "Exploitation, post-exploitation enumeration, and a write-up I'd want to read in a pentest report",
      ],
      chips: ['Kali Linux', 'Nmap', 'Metasploit', 'CVE-2011-2523'],
      secondaryBtn: null,
    },
  },
  {
    id: 'sql',
    tag: 'Case file · SQL',
    title: 'SQL Filters & Joins — Security Investigation Queries',
    summary:
      'Six investigation queries against login and employee records in MariaDB — AND, OR, NOT, and LIKE used to isolate after-hours failures and scope security updates to the right machines.',
    meta: 'MariaDB · SQL',
    ctaText: 'See the queries',
    ctaLink: '/projects/sql-investigation',
    featured: false,
    cover: {
      cmd: 'SELECT * FROM log_in_attempts',
      lines: ["WHERE login_time > '18:00' AND success = 0;", '→ after-hours failures isolated'],
    },
    detail: {
      tag: 'Case file · SQL investigation',
      body: 'Security investigation queries written against real login and employee tables in MariaDB. Each query answers an actual investigation question — after-hours failed logins, activity on specific dates, scoping a security update to two departments — with the operator choice explained, not just the syntax.',
      bullets: [
        'Failed logins after 18:00 isolated with AND across time and status conditions',
        'Login activity matched across two investigation dates with OR',
        "Pattern exclusion with NOT + LIKE ('MEX%') to filter a country out of results",
        'Security-update scoping: department and office targeted with combined filters',
      ],
      chips: ['SQL', 'MariaDB', 'Filtering', 'AND/OR/NOT', 'LIKE'],
      secondaryBtn: null,
    },
  },
  {
    id: 'vuln',
    tag: 'Case file · Risk & GRC',
    title: 'Vulnerability Assessment — Exposed Database Server',
    summary:
      'A formal NIST SP 800-30 assessment of a MySQL server left publicly accessible for three years — risk scoring plus prioritized remediation written for decision-makers.',
    meta: 'NIST SP 800-30 · Risk scoring',
    ctaText: 'Read the assessment',
    ctaLink: '/projects/vulnerability-assessment',
    featured: false,
    cover: {
      cmd: 'assess --framework nist-800-30 db-server',
      lines: ['exposure: public · 3 years', '→ risk: HIGH · remediation drafted'],
    },
    detail: {
      tag: 'Case File 04 · Risk Assessment & GRC',
      body: 'As a newly hired analyst for an e-commerce company, I assessed a remote MySQL database server kept publicly accessible since launch three years earlier. The deliverable: a formal vulnerability assessment aligned with NIST SP 800-30, with risks scored and remediation written so decision-makers could act on it.',
      bullets: [
        'System description, scope, and purpose documented over a three-month assessment window',
        'Threat sources and events scored for likelihood and severity per NIST SP 800-30',
        'Prioritized remediation: RBAC, audit logging, IP allowlisting, network-level controls',
      ],
      chips: ['NIST SP 800-30', 'Risk Scoring', 'RBAC', 'Audit Logging', 'Allowlisting'],
      secondaryBtn: null,
    },
  },
  {
    id: 'journal',
    tag: 'Case file · IR documentation',
    title: "Incident Handler's Journal",
    summary:
      "A running journal across lab scenarios and one real incident. Each entry captures the 5 W's, tools, timeline, and response — the same structure a SOC analyst keeps in a live environment.",
    meta: "NIST IR framework · 5 W's",
    ctaText: 'Open the journal',
    ctaLink: '/projects/incident-journal',
    featured: false,
    cover: {
      cmd: 'cat incident-journal.md',
      lines: ['ENTRY 01 · live incident · CDN hijack', "→ 5 W's · timeline · response"],
    },
    detail: {
      tag: 'Case File 05 · IR Documentation',
      body: "A running journal across home-lab scenarios and one real incident. Each entry follows the structure a SOC analyst keeps in a live environment — the 5 W's, tools, timeline, response summary — drawn from the NIST IR framework. I add entries as new labs and incidents come in.",
      bullets: [
        'Entry 01: the live domain hijack — who/what/when/where/why, traced to the CDN config layer',
        'Tools logged per entry: Wireshark, tshark, VirusTotal, DNS analysis',
        'Response summaries written the way they would land in a real ticket',
      ],
      chips: ['Incident response', 'NIST IR', 'Documentation', 'SOC workflow'],
      secondaryBtn: null,
    },
  },
  {
    id: 'foothold',
    tag: 'Founder · Product',
    title: 'Foothold',
    summary:
      'I built Foothold for career changers like me: study, get your first cert, land the job. Different brand, same builder.',
    meta: 'foothold.sh',
    ctaText: 'Visit foothold.sh',
    ctaLink: 'https://foothold.sh',
    external: true,
    green: true,
    featured: true,
    cover: {
      cmd: 'foothold --start',
      lines: ['→ study · certify · get hired', '→ live at foothold.sh'],
    },
    detail: {
      tag: 'Founder · Product · Live',
      body: "I changed careers without a map, so I'm building one. Foothold helps career changers do what I did: study for their first cert, pass it, and land their first job in tech. Security+ study tools, resume and interview prep, built by someone actually walking the path.",
      bullets: [
        'Security+ study tools you can use the day you sign up',
        'Resume, LinkedIn, and interview prep aimed at first tech jobs',
        'Live now at foothold.sh',
      ],
      chips: ['Career changers', 'Security+ study', 'Job prep'],
      secondaryBtn: null,
    },
  },
]
