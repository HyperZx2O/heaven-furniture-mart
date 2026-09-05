'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

// weak devices skip the SVG displacement graph — frosted blur is enough
const allowGlass =
  typeof navigator === 'undefined' || (navigator.hardwareConcurrency || 8) > 4

declare global {
  interface Window {
    liquidGlass?: (el: Element, opts?: Record<string, number>) => { supported: boolean; refresh: () => void; destroy: () => void }
  }
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const pillRef = useRef<HTMLElement>(null)
  const glassRef = useRef<{ destroy: () => void } | null>(null)
  const glassTimer = useRef<number | null>(null)
  const glassReady = useRef(false)

  useEffect(() => {
    let ticking = false
    let raf = 0
    const render = () => {
      ticking = false
      const y = window.scrollY
      setScrolled(y > 80)
      const p = document.getElementById('tape-progress')
      if (p) {
        const max = document.documentElement.scrollHeight - window.innerHeight
        const progress = max > 0 ? Math.min(Math.max(y / max, 0), 1) : 0
        p.style.transform = `scaleX(${progress})`
      }
    }
    const handleScroll = () => {
      if (!ticking) {
        ticking = true
        raf = requestAnimationFrame(render)
      }
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  // Load liquid-glass script once — skip where it can only fall back (Safari/Firefox)
  useEffect(() => {
    const ua = navigator.userAgent
    if (/Safari/.test(ua) && !/Chrome|Chromium|Edg/.test(ua)) return
    if (/Firefox/.test(ua)) return
    if (document.querySelector('script[data-liquid-glass]')) return
    const s = document.createElement('script')
    s.src = '/liquid-glass.js'
    s.setAttribute('data-liquid-glass', '1')
    s.async = true
    document.head.appendChild(s)
  }, [])

  // Apply liquid glass to pill once — never destroy/re-attach on scroll toggles.
  // Weak devices keep the cheap frosted fallback instead of the SVG filter graph.
  useEffect(() => {
    const el = pillRef.current
    if (!el) return
    if (!allowGlass) {
      if (scrolled) {
        el.style.setProperty('backdrop-filter', 'blur(16px) saturate(1.5)')
        el.style.setProperty('-webkit-backdrop-filter', 'blur(16px) saturate(1.5)')
      } else {
        el.style.removeProperty('backdrop-filter')
        el.style.removeProperty('-webkit-backdrop-filter')
      }
      return
    }
    if (!scrolled || glassReady.current) return
    let tries = 0
    const tryAttach = () => {
      if (glassRef.current) return
      if (window.liquidGlass && pillRef.current) {
        glassRef.current = window.liquidGlass(pillRef.current, {
          scale: -112,
          chroma: 6,
          border: 0.07,
          mapBlur: 12,
          blur: 3,
          saturate: 1.5,
          fallbackBlur: 16,
        })
        glassReady.current = true
      } else if (tries < 20) {
        tries++
        glassTimer.current = window.setTimeout(tryAttach, 100)
      }
    }
    // allow pill to paint with rounded-full before measuring radius
    const raf = requestAnimationFrame(() => {
      glassTimer.current = window.setTimeout(tryAttach, 60)
    })
    return () => {
      cancelAnimationFrame(raf)
      if (glassTimer.current) clearTimeout(glassTimer.current)
    }
  }, [scrolled])

  // final teardown on unmount only
  useEffect(() => () => {
    if (glassTimer.current) clearTimeout(glassTimer.current)
    glassRef.current?.destroy()
    glassRef.current = null
  }, [])

  return (
    <>
      <div className="tape-progress" id="tape-progress" aria-hidden="true" />
      <div
        className={`fixed top-[env(safe-area-inset-top)] left-0 right-0 z-[9990] flex justify-center pointer-events-none transition-[padding] duration-300 ease-[var(--ease-spring)] ${
          scrolled ? 'px-3 md:px-6 pt-3' : 'px-0 pt-0'
        }`}
      >
      <nav
        ref={pillRef as React.RefObject<HTMLElement>}
        className={`pointer-events-auto flex items-center justify-between gap-4 w-full transition-[transform,background,border-color,padding,box-shadow] duration-300 ease-[var(--ease-spring)] ${
          scrolled
            ? 'max-w-5xl rounded-full px-5 md:px-7 py-3.5 bg-[linear-gradient(180deg,rgba(245,240,232,0.08),rgba(245,240,232,0.02))] border border-[var(--color-ivory)]/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.10),inset_0_-1px_0_rgba(0,0,0,0.12),0_8px_28px_rgba(0,0,0,0.28),0_1px_0_rgba(184,151,58,0.12)] backdrop-blur-[3px]'
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
          className="min-w-0 flex flex-col leading-none transition-transform active:scale-[0.98]"
        >
          <span className="text-[var(--color-ivory)] font-[var(--font-serif)] font-normal text-[1.15rem] md:text-[1.35rem] tracking-wide overflow-wrap-anywhere">
            Heaven Furniture Mart
          </span>
          <span className="text-[var(--color-gold-soft)] font-[var(--font-sans)] text-[0.66rem] md:text-[0.72rem] tracking-[0.14em] font-normal mt-0.5">
            Designed. Crafted. Customized.
          </span>
        </Link>

        <div className="flex items-center gap-3 shrink-0">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--color-ivory)]/10 px-3 py-1.5 text-[var(--color-ivory-dim)] font-[var(--font-sans)] text-[0.72rem] tracking-wide">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-gold)]" aria-hidden="true" />
            Agrabad · Chattogram
          </span>
        </div>
      </nav>
    </div>
    </>
  )
}
