'use client'

import { useLayoutEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { GoArrowUpRight } from 'react-icons/go'
import DHMark from './DHMark'
import './CardNav.css'

interface NavLink {
  label: string
  href: string
  ariaLabel?: string
  external?: boolean
}

interface NavItem {
  label: string
  bgColor?: string
  textColor?: string
  links: NavLink[]
}

interface CardNavBaseProps {
  items: NavItem[]
  className?: string
  ease?: string
  baseColor?: string
  menuColor?: string
  buttonBgColor?: string
  buttonTextColor?: string
}

const ITEMS: NavItem[] = [
  {
    label: 'Work',
    bgColor: 'oklch(30% 0.09 22 / 60%)',
    textColor: 'var(--text)',
    links: [
      { label: 'AD Purple-Team & SOC Lab', href: '/projects/active-directory-purple-lab' },
      { label: 'Hijack Investigation', href: '/projects/hijack-investigation' },
      { label: 'Metasploitable 2', href: '/projects/metasploitable-lab' },
      { label: 'SQL Investigation', href: '/projects/sql-investigation' },
      { label: 'Vulnerability Assessment', href: '/projects/vulnerability-assessment' },
      { label: "Incident Handler's Journal", href: '/projects/incident-journal' },
      { label: 'Foothold', href: 'https://foothold.sh', external: true },
      { label: 'All projects', href: '/projects' },
    ],
  },
  {
    label: 'About',
    bgColor: 'oklch(100% 0 0 / 6%)',
    textColor: 'var(--text)',
    links: [
      { label: 'About me', href: '/#about' },
      { label: 'Resume', href: '/resume' },
    ],
  },
  {
    label: 'Contact',
    bgColor: 'oklch(100% 0 0 / 6%)',
    textColor: 'var(--text)',
    links: [
      { label: 'Get in touch', href: '/#contact' },
      { label: 'LinkedIn', href: 'https://linkedin.com/in/devontehuckleberry', external: true },
    ],
  },
]

function CardNavBase({
  items,
  className = '',
  ease = 'power3.out',
  baseColor = 'oklch(100% 0 0 / 5%)',
  menuColor,
  buttonBgColor,
  buttonTextColor,
}: CardNavBaseProps) {
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const navRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<HTMLDivElement[]>([])
  const tlRef = useRef<gsap.core.Timeline | null>(null)

  const calculateHeight = () => {
    const navEl = navRef.current
    if (!navEl) return 260

    const contentEl = navEl.querySelector('.card-nav-content') as HTMLElement | null
    if (contentEl) {
      const wasVisible = contentEl.style.visibility
      const wasPointerEvents = contentEl.style.pointerEvents
      const wasPosition = contentEl.style.position
      const wasHeight = contentEl.style.height

      contentEl.style.visibility = 'visible'
      contentEl.style.pointerEvents = 'auto'
      contentEl.style.position = 'static'
      contentEl.style.height = 'auto'

      void contentEl.offsetHeight

      const topBar = 60
      const padding = 16
      const contentHeight = contentEl.scrollHeight

      contentEl.style.visibility = wasVisible
      contentEl.style.pointerEvents = wasPointerEvents
      contentEl.style.position = wasPosition
      contentEl.style.height = wasHeight

      return Math.max(260, topBar + contentHeight + padding)
    }
    return 260
  }

  const createTimeline = () => {
    const navEl = navRef.current
    if (!navEl) return null

    gsap.set(navEl, { height: 60, overflow: 'hidden' })
    gsap.set(cardsRef.current, { y: 50, opacity: 0 })

    const tl = gsap.timeline({ paused: true })

    tl.to(navEl, { height: calculateHeight, duration: 0.4, ease })
    tl.to(cardsRef.current, { y: 0, opacity: 1, duration: 0.4, ease, stagger: 0.08 }, '-=0.1')

    return tl
  }

  useLayoutEffect(() => {
    const tl = createTimeline()
    tlRef.current = tl

    return () => {
      tl?.kill()
      tlRef.current = null
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ease, items])

  useLayoutEffect(() => {
    const handleResize = () => {
      if (!tlRef.current) return

      if (isExpanded) {
        const newHeight = calculateHeight()
        gsap.set(navRef.current, { height: newHeight })
        tlRef.current.kill()
        const newTl = createTimeline()
        if (newTl) {
          newTl.progress(1)
          tlRef.current = newTl
        }
      } else {
        tlRef.current.kill()
        const newTl = createTimeline()
        if (newTl) tlRef.current = newTl
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isExpanded])

  const toggleMenu = () => {
    const tl = tlRef.current
    if (!tl) return
    if (!isExpanded) {
      setIsHamburgerOpen(true)
      setIsExpanded(true)
      tl.play(0)
    } else {
      setIsHamburgerOpen(false)
      tl.eventCallback('onReverseComplete', () => setIsExpanded(false))
      tl.reverse()
    }
  }

  const setCardRef = (i: number) => (el: HTMLDivElement | null) => {
    if (el) cardsRef.current[i] = el
  }

  return (
    <div className={`card-nav-container ${className}`}>
      <nav
        ref={navRef}
        className={`card-nav ${isExpanded ? 'open' : ''}`}
        style={{ backgroundColor: baseColor }}
      >
        <div className="card-nav-top">
          <div
            className={`hamburger-menu ${isHamburgerOpen ? 'open' : ''}`}
            onClick={toggleMenu}
            role="button"
            aria-label={isExpanded ? 'Close menu' : 'Open menu'}
            tabIndex={0}
            style={{ color: menuColor || 'var(--text)' }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                toggleMenu()
              }
            }}
          >
            <div className="hamburger-line" />
            <div className="hamburger-line" />
          </div>

          <div className="logo-container">
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
            <a href="/#hero" aria-label="Home" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
              <DHMark size={28} />
            </a>
          </div>

          {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
          <a
            className="card-nav-cta-button"
            href="/#contact"
            style={{ backgroundColor: buttonBgColor, color: buttonTextColor }}
          >
            Hire me
          </a>
        </div>

        <div className="card-nav-content" aria-hidden={!isExpanded}>
          {(items || []).slice(0, 3).map((item, idx) => (
            <div
              key={`${item.label}-${idx}`}
              className="nav-card"
              ref={setCardRef(idx)}
              style={{ backgroundColor: item.bgColor, color: item.textColor }}
            >
              <div className="nav-card-label">{item.label}</div>
              <div className="nav-card-links">
                {item.links?.map((lnk, i) => (
                  <a
                    key={`${lnk.label}-${i}`}
                    className="nav-card-link"
                    href={lnk.href}
                    aria-label={lnk.ariaLabel}
                    {...(lnk.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    onClick={() => { if (isExpanded) toggleMenu() }}
                  >
                    <GoArrowUpRight className="nav-card-link-icon" aria-hidden="true" />
                    {lnk.label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </nav>
    </div>
  )
}

export default function CardNav() {
  return (
    <CardNavBase
      items={ITEMS}
      baseColor="oklch(100% 0 0 / 5%)"
      menuColor="var(--text)"
      buttonBgColor="var(--red)"
      buttonTextColor="oklch(98% 0 0)"
    />
  )
}
