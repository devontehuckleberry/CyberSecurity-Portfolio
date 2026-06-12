'use client'

import { useState } from 'react'
import type React from 'react'
import GlowButton from './GlowButton'
import styles from './ContactForm.module.css'

const FORMSPREE = 'https://formspree.io/f/xredlbkp'
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

type Status = 'idle' | 'sending' | 'sent' | 'error'

export default function ContactForm() {
  const [status, setStatus] = useState<Status>('idle')
  const [emailError, setEmailError] = useState<string | null>(null)

  function validateEmail(value: string): boolean {
    if (!EMAIL_RE.test(value.trim())) {
      setEmailError('Enter a valid email address, like you@company.com.')
      return false
    }
    setEmailError(null)
    return true
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)

    if (!validateEmail(String(data.get('email') ?? ''))) {
      setStatus('idle')
      ;(form.elements.namedItem('email') as HTMLInputElement | null)?.focus()
      return
    }

    setStatus('sending')

    try {
      const SITE_KEY = '6LdlR_wsAAAAADqfJnLX3d0E65kv42C42Yg7rs9g'
      type GRecaptcha = { ready: (cb: () => void) => void; execute: (k: string, o: object) => Promise<string> }
      const gr = (window as Window & { grecaptcha?: GRecaptcha }).grecaptcha
      if (gr) {
        const token = await new Promise<string>((resolve, reject) => {
          gr.ready(async () => {
            try { resolve(await gr.execute(SITE_KEY, { action: 'contact' })) }
            catch (err) { reject(err) }
          })
        })
        data.append('g-recaptcha-response', token)
      }
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
      className={`glass glow srv ${styles.form}`}
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
        <input
          id="cf-email"
          name="email"
          type="email"
          className={styles.input}
          placeholder="you@company.com"
          required
          aria-invalid={emailError ? true : undefined}
          aria-describedby={emailError ? 'cf-email-err' : undefined}
          onBlur={(e) => { if (e.target.value) validateEmail(e.target.value) }}
          onChange={() => { if (emailError) setEmailError(null) }}
        />
        {emailError && (
          <p id="cf-email-err" className={styles.fieldError} role="alert">{emailError}</p>
        )}
      </div>

      <div className={styles.group}>
        <label htmlFor="cf-msg" className={styles.label}>Message</label>
        <textarea id="cf-msg" name="message" className={styles.textarea} placeholder="What's on your mind?" rows={5} required />
      </div>

      {status === 'sent' && (
        <p className={styles.success}>Message received. I&apos;ll get back to you soon.</p>
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
