'use client'

import { useState, useRef, KeyboardEvent } from 'react'
import Wrap from '@/components/Wrap'
import styles from './Terminal.module.css'

interface HistoryEntry {
  type: 'cmd' | 'out'
  text: string
}

const COMMANDS: Record<string, string> = {
  help: `available commands:
  whoami    — who I am and where I'm based
  projects  — project list with one-line descriptions
  certs     — certifications and their status
  contact   — email and LinkedIn
  clear     — clear the terminal
  sudo      — don't`,

  whoami: 'Devonte Huckleberry — security · identity · IT operations. Chicago + remote.',

  projects: `active-directory-purple-lab  — AD domain + Kerberoasting + Splunk detections
hijack-investigation         — live CDN account takeover; packet capture to report
metasploitable-lab           — vsftpd backdoor (CVE-2011-2523), root in 15 min
foothold                     — security cert study platform for career changers`,

  certs: `[done]     Google Cybersecurity Certificate
[done]     ISC² Certified in Cybersecurity (CC)
[active]   CompTIA Security+ (SY0-701) — in progress via Per Scholas
[active]   Splunk Core Certified User — in progress`,

  contact: `email      DevonteHuckleberry@gmail.com
linkedin   linkedin.com/in/devonte-huckleberry-10197a215`,

  sudo: 'Nice try. I keep my privileges minimal.',
}

const INITIAL_HISTORY: HistoryEntry[] = [
  { type: 'cmd', text: 'whoami' },
  { type: 'out', text: 'Devonte Huckleberry — security · identity · IT operations. Chicago + remote.' },
]

export default function Terminal() {
  const [history, setHistory] = useState<HistoryEntry[]>(INITIAL_HISTORY)
  const [input, setInput] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const bodyRef = useRef<HTMLDivElement>(null)

  function scrollBottom() {
    requestAnimationFrame(() => {
      if (bodyRef.current) {
        bodyRef.current.scrollTop = bodyRef.current.scrollHeight
      }
    })
  }

  function handleKey(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key !== 'Enter') return
    const cmd = input.trim().toLowerCase()
    if (!cmd) return

    const newEntries: HistoryEntry[] = [{ type: 'cmd', text: cmd }]

    if (cmd === 'clear') {
      setHistory([])
      setInput('')
      return
    }

    const out = COMMANDS[cmd] ?? 'Command not found. Type help for available commands.'
    newEntries.push({ type: 'out', text: out })

    setHistory((prev) => [...prev, ...newEntries])
    setInput('')
    scrollBottom()
  }

  function focusInput() {
    inputRef.current?.focus()
  }

  return (
    <section id="terminal" className={styles.section}>
      <Wrap>
        <p className={styles.eyebrow}>Extra credit</p>
        <h2 className={styles.h2}>
          Prefer a command line? <b>Ask away.</b>
        </h2>
        <p className={styles.ssub}>
          Everything on this page, queryable. Type <code>help</code> to see the commands.
        </p>

        <div className={`glass glow srv ${styles.termWindow}`}>
          <div className={styles.termHead}>
            <i /><i /><i />
            <div className={styles.tTitle}>devonte@portfolio</div>
          </div>

          <div className={styles.termBody} ref={bodyRef} onClick={focusInput}>
            {history.map((entry, i) => {
              if (entry.type === 'cmd') {
                return (
                  <div key={i} className={styles.histCmd}>
                    <span className={styles.p}>devonte@portfolio</span>:~$ {entry.text}
                  </div>
                )
              }
              return (
                <div key={i} className={styles.out}>{entry.text}</div>
              )
            })}
            <div className={styles.termLine}>
              <span className={styles.p}>devonte@portfolio</span>
              <span>:~$&nbsp;</span>
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKey}
                autoComplete="off"
                spellCheck={false}
                aria-label="Terminal input"
              />
            </div>
          </div>
        </div>
      </Wrap>
    </section>
  )
}
