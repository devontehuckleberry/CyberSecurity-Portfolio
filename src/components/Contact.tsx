import Wrap from '@/components/Wrap'
import styles from './Contact.module.css'

const LINKS = [
  {
    icon: '@',
    label: 'Email',
    value: 'DevonteHuckleberry@gmail.com',
    href: 'mailto:DevonteHuckleberry@gmail.com',
    external: false,
  },
  {
    icon: 'in',
    label: 'LinkedIn',
    value: 'devonte-huckleberry',
    href: 'https://www.linkedin.com/in/devonte-huckleberry-10197a215/',
    external: true,
  },
  {
    icon: '✓',
    label: 'Credly',
    value: 'Verified badges',
    href: 'https://www.credly.com/users/devonte-huckleberry',
    external: true,
  },
  {
    icon: 'THM',
    label: 'TryHackMe',
    value: 'Profile',
    href: 'https://tryhackme.com/p/Devonte',
    external: true,
  },
  {
    icon: '↓',
    label: 'Resume',
    value: 'Download PDF',
    href: '/Devonte_Huckleberry_Resume.pdf',
    external: false,
  },
]

export default function Contact() {
  return (
    <section id="contact" className={styles.section}>
      <Wrap>
        <p className={styles.eyebrow}>Contact</p>
        <h2 className={styles.h2}>
          Get in <b>touch</b>
        </h2>
        <p className={styles.ssub}>
          Hiring for security, identity, IT support, or anything adjacent? I answer fast, and I show
          up prepared.
        </p>

        <div className={styles.grid}>
          <div>
            {LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`glass ${styles.clink}`}
                {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              >
                <span className={styles.icon}>{link.icon}</span>
                <span>
                  <p className={styles.linkLabel}>{link.label}</p>
                  <p className={styles.linkValue}>{link.value}</p>
                </span>
              </a>
            ))}
          </div>

          <div className={styles.formPlaceholder}>
            <p>
              Contact form coming in Phase 6.
              <br />
              <code>src/components/ContactForm.tsx</code>
            </p>
          </div>
        </div>
      </Wrap>
    </section>
  )
}
