# Active Directory Purple-Team & SOC Lab

A self-built mini-enterprise running on a spare Windows laptop and an Apple Silicon Mac. I stand up an Active Directory domain, attack it from Kali, then catch the attack in Splunk. One lab, three skill areas I'm targeting for work: **identity (IAM)**, **detection (SOC)**, and **offensive technique (purple team)**.

Maps to Security+ SY0-701 domains: access control and identity (Domain 4), attacks and indicators (Domain 2), and security operations / monitoring (Domain 4).

---

## What this lab demonstrates

- Building and administering an Active Directory domain: OUs, users, groups, Group Policy, least-privilege design.
- Generating realistic endpoint telemetry with Sysmon and centralizing it in Splunk.
- Running a recognized AD attack (Kerberoasting) and a password-spray, end to end.
- Writing the detection for that attack in Splunk and stating the fix — the SOC analyst loop.
- Network segmentation in practice: an isolated lab segment, not just a flashcard definition.

---

## Architecture

**Host A — spare Windows laptop (16 GB RAM, low-power CPU): the "enterprise"**

| VM | Role | IP | RAM |
|----|------|----|-----|
| `DC01` — Windows Server 2022 (180-day eval) | Domain Controller, DNS for `lab.local`, Sysmon | `10.10.10.10` | 4 GB |
| `WS01` — Windows 10/11 (eval) | Domain-joined workstation, Sysmon, **Splunk** (SOC console) | `10.10.10.30` | 4–5 GB |

**Host B — Apple Silicon Mac (UTM): the attacker**

| VM | Role | IP |
|----|------|----|
| `KALI` — Kali Linux | Attacker, only reachable during attack exercises | `10.10.10.20` |

Subnet: `10.10.10.0/24`. Domain: `lab.local`.

### Why this shape
- The attacker runs on the fast Mac, keeping its CPU load off the slow laptop.
- A full SIEM (Security Onion) wants 16 GB by itself, so SOC capability comes from **Sysmon + Splunk Free** running inside the existing Windows VMs — no extra VM.
- The laptop's bottleneck is CPU, not RAM; VMs run, just unhurriedly.

### Network isolation
The two physical machines sit on the same home LAN (a separate VLAN/router is a planned upgrade). Isolation is layered instead:

- Each AD VM has **two adapters**. Adapter 1 is a VirtualBox **Internal Network** (`labnet`) carrying all domain/DNS/IAM traffic — sealed inside the laptop. Adapter 2 is **Bridged** and stays **disabled** except during an attack exercise, when Kali on the Mac needs to reach the targets.
- Phases 1–2 (building the domain) never touch the home network at all.
- Note for the record: Wi-Fi band (2.4 vs 5 GHz) does **not** isolate devices — both bands bridge to the same subnet. Real isolation is VLANs, client-isolation SSIDs, or a separate router.

### Safety rule
On home-LAN topology I practice credential and protocol attacks (enumeration, Kerberoasting, password spray) — my own tools against my own VMs. I do **not** detonate live malware or real C2 here, since those could pivot to other devices on the network.

---

## Prerequisites & downloads

- [ ] **VirtualBox** (free) — on the Windows laptop
- [ ] **Windows Server 2022 eval ISO** (180 days, free, Microsoft Eval Center)
- [ ] **Windows 10 or 11 eval ISO** (free, Microsoft)
- [ ] **Kali Linux** — already running in UTM on the Mac (ARM build)
- [ ] **Sysmon** (Microsoft Sysinternals) + a config (SwiftOnSecurity or Olaf Hartong)
- [ ] **Splunk Free** (free account at splunk.com) + the Splunk Add-on for Microsoft Windows and the Sysmon TA

---

## Phase 1 — Identity: stand up the domain (IAM)

Runs entirely on `labnet`, no internet needed.

1. Install VirtualBox on the laptop. Create an Internal Network named `labnet`.
2. Build `DC01` from the Server 2022 ISO (Desktop Experience edition for now — easier to learn on).
3. Network: Adapter 1 = Internal Network `labnet`. Set a **static IP** `10.10.10.10/24`, gateway blank, **DNS = 127.0.0.1** (a DC is its own DNS).
4. Add the **Active Directory Domain Services** role (Server Manager → Add Roles and Features).
5. **Promote** to a Domain Controller → *new forest* → root domain `lab.local`. Set a DSRM password. Reboot.
6. In **Active Directory Users and Computers**: create OUs (e.g. `Corp` > `Users`, `Workstations`, `ServiceAccounts`), a handful of users, and groups (`IT-Admins`, `Helpdesk`, `Finance`).
7. Create one **Group Policy Object** to feel the IAM workflow — e.g. a password policy or a logon banner — and link it to an OU.
8. Plant the attack surface for later: create a service account with an **SPN** and a deliberately weak password (this is the Kerberoasting target).

**Journal (2026-06-04 — Phase 1 done):**

`DC01` is live: Windows Server 2022 eval in VirtualBox on the spare laptop, 4 GB RAM, 2 vCPU, 60 GB dynamic disk. Adapter 1 sits on the `labnet` internal network with a static `10.10.10.10/24`, no gateway, and DNS pointed at itself (`127.0.0.1`). I renamed the box to `DC01` before promoting it, added the AD DS role, and promoted to a new forest `lab.local` (NetBIOS `LAB`).

Then I built out identity: the `Corp` OU with `Users`, `Workstations`, and `ServicesAccounts` under it. Three users, each placed in a group that matches their job — Bri Smith (`Bsmith`) in `Finance`, Michael Jordan (`MJordan`) in `IT-Admins`, Walter Payton (`WPayton`) in `Helpdesk`. A `Corp-Logo-Banner` GPO with a logon banner is linked to `Corp`. Last, the deliberately broken bit for Phase 3: `svc_sql`, an account carrying the SPN `MSSQLSvc/dc01.lab.local:1433` and a weak password (`Summer2024`) — the Kerberoast target.

A few things bit me along the way. My first install booted straight to `sconfig`, which meant I'd picked Server Core instead of Desktop Experience, and Core can't be upgraded to the GUI after the fact — so I reinstalled and chose Standard (Desktop Experience). The EFI "press any key to boot from CD" prompt only waits about five seconds; miss it and you get a black screen off the empty disk. `Ctrl+Alt+Del` never reaches the VM (it's the Secure Attention Sequence, so the host grabs it) — Right Ctrl + Del sends it in. The GUI consoles didn't come with the role, so I pulled them in with `Install-WindowsFeature -Name RSAT-ADDS,GPMC,RSAT-AD-AdminCenter,RSAT-AD-PowerShell` — and learned the names need commas, or PowerShell rejects them as stray arguments. The one that took longest to spot: `New-ADUser` kept failing with `Directory object not found` because my path said `ServiceAccounts` while the OU was actually `ServicesAccounts`. AD won't forgive a one-letter difference in a distinguished name, so now I query the real DN and reuse it instead of hand-typing the path.

Verified with `Get-ADDomain`, `Get-ADUser -Filter *`, `Get-ADGroup -Filter *`, and a check on `svc_sql`'s SPN.

Evidence (`evidence/`):
- `01-aduc-ou-tree-users.png` — the OU structure and all users in ADUC
- `02-server-manager-roles.png` — AD DS and DNS roles installed
- `03-get-addomain.png` — forest `lab.local` / NetBIOS `LAB`
- `04-svc_sql-spn-and-ipconfig.png` — the Kerberoast SPN, plus the static IP and loopback DNS
- `05-it-admins-membership.png` / `06-helpdesk-membership.png` / `07-finance-membership.png` — each user in the right group
- `08-logon-banner-gpo.png` — the logon-banner GPO firing at sign-in

---

## Phase 2 — Join a workstation + turn on telemetry (SOC foundation)

1. Build `WS01` from the Windows 10/11 ISO. Adapter 1 = `labnet`, static IP `10.10.10.30/24`, **DNS = 10.10.10.10** (point at the DC).
2. Join `WS01` to `lab.local`. Log in with a domain user to confirm identity flows.
3. Install **Sysmon** with a tuned config on both `DC01` and `WS01`.
4. Install **Splunk Free** on `WS01`. Install **Universal Forwarders** on both hosts shipping `WinEventLog:Security`, `System`, and `Microsoft-Windows-Sysmon/Operational` into Splunk.
5. Add the Splunk Windows + Sysmon add-ons so fields parse cleanly. Confirm events are searchable.

**Journal:** _<!-- index sizes, sample searches, screenshots -->_

---

## Phase 3 — Purple team: attack, then detect

1. Enable Adapter 2 (Bridged) on `DC01` and `WS01` so Kali on the Mac can reach `10.10.10.0/24`. (Disable again when done.)
2. From **Kali**: enumerate the domain (`nmap`, `enum4linux-ng`, `ldapsearch`), then with a low-priv domain credential run **Kerberoasting** (`GetUserSPNs` / Rubeus) against the SPN account from Phase 1, and crack the ticket offline (`hashcat`). Separately, try a small **password spray**.
3. Switch to the **SOC seat** in Splunk: find the attack. Kerberoasting shows as **Event ID 4769** (Kerberos service ticket requests) with weak encryption (RC4 / type 0x17); the spray shows as bursts of **4625** failures. Write a saved search that flags each.
4. State the fix for each: managed/long service-account passwords (gMSA), AES-only, tiering, and alerting thresholds.

**Journal:** _<!-- attack commands, the detection searches you wrote, the fixes -->_

---

## Outcomes (fill in as completed)

- [x] Domain `lab.local` live with users, groups, OUs, and a GPO
- [ ] Workstation domain-joined, Sysmon + Splunk ingesting from both hosts
- [ ] Kerberoasting executed and cracked from Kali
- [ ] Detection search written for EID 4769 weak-encryption tickets
- [ ] Password-spray detection written for EID 4625 bursts
- [ ] Remediation notes written for each finding

---

*Portfolio note: this README is the source for a future `projects/active-directory-purple-lab.html` page matching the site's existing lab writeups. Screenshots and evidence live in `evidence/`.*
