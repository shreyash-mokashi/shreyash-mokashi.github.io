'use client'

import { useEffect, useRef } from 'react'

/** Fraction of the element that must be on screen before it reveals. */
const VISIBILITY_THRESHOLD = 0.12
/** Reveal slightly before the element reaches the viewport edge. */
const ROOT_MARGIN = '0px 0px -8% 0px'

type Props = {
  children: React.ReactNode
  /** Stagger within a group, in milliseconds. */
  delay?: number
  as?: 'div' | 'li' | 'section' | 'article'
  className?: string
}

export default function Reveal({ children, delay = 0, as = 'div', className }: Props) {
  const ref = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    // No IntersectionObserver (or reduced motion) — show it immediately.
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced || typeof IntersectionObserver === 'undefined') {
      node.setAttribute('data-visible', 'true')
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.setAttribute('data-visible', 'true')
            observer.unobserve(entry.target)
          }
        }
      },
      { threshold: VISIBILITY_THRESHOLD, rootMargin: ROOT_MARGIN },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  const Tag = as as React.ElementType
  return (
    <Tag
      ref={ref}
      data-reveal=""
      className={className}
      style={{ ['--reveal-delay' as string]: `${delay}ms` }}
    >
      {children}
    </Tag>
  )
}
