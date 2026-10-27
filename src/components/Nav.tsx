'use client'

import { useEffect, useState } from 'react'
import { meta, nav } from '@/content/profile'
import styles from './nav.module.css'

/** Scroll distance after which the bar gains its backdrop. */
const CONDENSE_AFTER_PX = 24
/** Section is "current" once its top passes this fraction of the viewport. */
const ACTIVE_LINE = 0.35

export default function Nav() {
  const [condensed, setCondensed] = useState(false)
  const [active, setActive] = useState<string>('')
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const ids = nav.map((n) => n.href.slice(1))

    const onScroll = () => {
      setCondensed(window.scrollY > CONDENSE_AFTER_PX)

      const line = window.innerHeight * ACTIVE_LINE
      let current = ''
      for (const id of ids) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= line) current = id
      }
      setActive(current)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close the mobile menu on Escape.
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header className={`${styles.bar} ${condensed ? styles.condensed : ''}`}>
      <div className={`shell ${styles.inner}`}>
        <a href="#top" className={styles.brand}>
          <span className={styles.mark} aria-hidden="true" />
          <span>{meta.name}</span>
        </a>

        <nav className={styles.links} aria-label="Sections">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={styles.link}
              data-active={active === item.href.slice(1)}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          className={styles.toggle}
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          <span className={styles.toggleBars} data-open={open} aria-hidden="true" />
          <span className={styles.srOnly}>{open ? 'Close menu' : 'Open menu'}</span>
        </button>
      </div>

      <div id="mobile-nav" className={styles.sheet} data-open={open}>
        {nav.map((item) => (
          <a key={item.href} href={item.href} onClick={() => setOpen(false)}>
            {item.label}
          </a>
        ))}
      </div>
    </header>
  )
}
