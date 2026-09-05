'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

declare global {
  interface Window {
    liquidGlass?: (el: Element, opts?: Record<string, number>) => { supported: boolean; refresh: () => void; destroy: () => void }
  }
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const pillRef = useRef<HTMLElement>(null)
  const glassRef = useRef<{ destroy: () => void } | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80)
      const p = document.getElementById('tape-progress')
      if (p) {
        const max = document.documentElement.scrollHeight - window.innerHeight
        const progress = max > 0 ? Math.min(Math.max(window.scrollY / max, 0), 1) : 0
        p.style.transform = `scaleX(${progress})`
      }
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Load liquid-glass script once
  useEffect(() => {
    if (document.querySelector('script[data-liquid-glass]')) return
    const s = document.createElement('script')
    s.src = '/liquid-glass.js'
    s.setAttribute('data-liquid-glass', '1')
    s.async = true
    document.head.appendChild(s)
  }, [])

  // Apply liquid glass to pill when scrolled
  useEffect(() => {
    if (!scrolled) {
      if (glassRef.current) {
        glassRef.current.destroy()
        glassRef.current = null
      }
      return
    }
    const el = pillRef.current
    if (!el) return
    let tries = 0
    const tryAttach = () => {
      if (window.liquidGlass && el) {
        // destroy previous
        if (glassRef.current) glassRef.current.destroy()
        glassRef.current = window.liquidGlass(el, {
          scale: -112,
          chroma: 6,
          border: 0.07,
          mapBlur: 12,
          blur: 3,
          saturate: 1.5,
          fallbackBlur: 16,
        })
      } else if (tries < 20) {
        tries++
        setTimeout(tryAttach, 100)
      }
    }
    // allow pill to paint with rounded-full before measuring radius
    requestAnimationFrame(() => setTimeout(tryAttach, 60))
    return () => {
      if (glassRef.current) {
        glassRef.current.destroy()
        glassRef.current = null
      }
    }
  }, [scrolled])

  return (
    <>
      <div className="tape-progress" id="tape-progress" aria-hidden="true" />
      <div
        className={`fixed top-0 left-0 right-0 z-[9990] flex justify-center pointer-events-none transition-[padding] duration-300 ease-[var(--ease-spring)] ${
          scrolled ? 'px-3 md:px-6 pt-3' : 'px-0 pt-0'
        }`}
        aria-hidden={false}
      >
      <nav
        ref={pillRef as React.RefObject<HTMLElement>}
        className={`pointer-events-auto flex items-center justify-between gap-4 w-full transition-[transform,background,border-color,padding,box-shadow] duration-300 ease-[var(--ease-spring)] ${
          scrolled
            ? 'max-w-5xl rounded-full px-5 md:px-7 py-3.5 bg-[linear-gradient(180deg,rgba(245,240,232,0.08),rgba(245,240,232,0.02))] border border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.10),inset_0_-1px_0_rgba(0,0,0,0.12),0_8px_28px_rgba(0,0,0,0.28),0_1px_0_rgba(184,151,58,0.12)] backdrop-blur-[3px]'
            : 'bg-transparent border-b border-transparent px-5 md:px-8 lg:px-10 py-6 rounded-none shadow-none'
        }`}
        style={
          scrolled
            ? {
                // hint for liquid-glass radius reading; fallback blur already set via JS
                // keep interior legible — rim refraction, not center smear
                WebkitBackdropFilter: undefined,
              }
            : undefined
        }
        aria-label="Main navigation"
      >
        <Link
          href="/"
          className="min-w-0 flex flex-col leading-none"
          style={{ viewTransitionName: 'masthead' } as React.CSSProperties}
        >
          <span className="text-[var(--color-ivory)] font-[var(--font-serif)] font-normal text-[1.15rem] md:text-[1.35rem] tracking-wide overflow-wrap-anywhere">
            Heaven Furniture Mart
          </span>
          <span className="text-[var(--color-gold-soft)] font-[var(--font-sans)] text-[0.66rem] md:text-[0.72rem] tracking-[0.14em] font-normal mt-0.5">
            Designed · Crafted · Customized
          </span>
        </Link>

        <div className="flex items-center gap-3 shrink-0">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--color-ivory)]/10 px-3 py-1.5 text-[var(--color-ivory-dim)] font-[var(--font-sans)] text-[0.72rem] tracking-wide">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-gold)] animate-pulse" aria-hidden="true" />
            Agrabad · Chattogram
          </span>
        </div>
      </nav>
    </div>
    </>
  )
}
