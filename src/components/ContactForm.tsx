'use client'

import { useState, FormEvent } from 'react'
import GlowButton from './GlowButton'
import styles from './ContactForm.module.css'

const FORMSPREE = 'https://formspree.io/f/xredlbkp'

type Status = 'idle' | 'sending' | 'sent' | 'error'

export default function ContactForm() {
  const [status, setStatus] = useState<Status>('idle')

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('sending')

    const form = e.currentTarget
    const data = new FormData(form)

    // reCAPTCHA v3 — non-blocking: if grecaptcha isn't loaded we still submit
    try {
      const token = await (window as Window & { grecaptcha?: { execute: (k: string, o: object) => Promise<string> } })
        .grecaptcha?.execute('6LdlR_wsAAAAADqfJnLX3d0E65kv42C42Yg7rs9g', { action: 'contact' })
      if (token) data.append('g-recaptcha-response', token)
    } catch {
      // proceed without token; Formspree handles missing token gracefully
    }

    try {
      const res = await fetch(FORMSPREE, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      })
      if (res.ok) {
        setStatus('sent')
        form.reset()
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <form
      className={`glass glow ${styles.form}`}
      onSubmit={handleSubmit}
      noValidate
    >
      {/* Honeypot — bots fill this; Formspree rejects it */}
      <input type="text" name="_gotcha" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />

      <div className={styles.row}>
        <div className={styles.group}>
          <label htmlFor="cf-fn" className={styles.label}>First name</label>
          <input id="cf-fn" name="firstName" type="text" className={styles.input} placeholder="John" required />
        </div>
        <div className={styles.group}>
          <label htmlFor="cf-ln" className={styles.label}>Last name</label>
          <input id="cf-ln" name="lastName" type="text" className={styles.input} placeholder="Doe" required />
        </div>
      </div>

      <div className={styles.group}>
        <label htmlFor="cf-email" className={styles.label}>Email</label>
        <input id="cf-email" name="email" type="email" className={styles.input} placeholder="you@company.com" required />
      </div>

      <div className={styles.group}>
        <label htmlFor="cf-msg" className={styles.label}>Message</label>
        <textarea id="cf-msg" name="message" className={styles.textarea} placeholder="What's on your mind?" rows={5} required />
      </div>

      {status === 'sent' && (
        <p className={styles.success}>Message received. I'll get back to you soon.</p>
      )}
      {status === 'error' && (
        <p className={styles.errMsg}>Something went wrong. Email me directly at DevonteHuckleberry@gmail.com.</p>
      )}

      <GlowButton variant="primary">
        {status === 'sending' ? 'Sending…' : 'Send message'}
      </GlowButton>
    </form>
  )
}
