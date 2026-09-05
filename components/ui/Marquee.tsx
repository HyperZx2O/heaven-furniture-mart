'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger } from '@/lib/gsap'

const WORDS = ['Designed', 'Crafted', 'Customized']

function Strip({ hidden }: { hidden?: boolean }) {
  return (
    <div className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {WORDS.concat(WORDS).map((w, i) => (
        <span key={i} className="flex items-center">
          <span className="px-6 text-[var(--color-ivory-dim)] font-[var(--font-serif)] font-light text-[1.05rem] md:text-[1.2rem] tracking-[0.08em] whitespace-nowrap">
            {w}
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-gold)]/70" aria-hidden="true" />
        </span>
      ))}
    </div>
  )
}

export function Marquee() {
  const container = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const mm = gsap.matchMedia()
    // perpetual loop — paused whenever the ribbon leaves the viewport
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const tween = gsap.to('.marquee-inner', {
        xPercent: -50,
        repeat: -1,
        duration: 22,
        ease: 'none',
      })
      ScrollTrigger.create({
        trigger: container.current,
        start: 'top bottom',
        end: 'bottom top',
        onToggle: (self) => (self.isActive ? tween.play() : tween.pause()),
      })
    })
  }, { scope: container })

  return (
    <div
      ref={container}
      className="relative overflow-hidden border-y border-[var(--color-wash-gold-14)] bg-[var(--color-surface-2)] py-4 md:py-5"
      aria-label="Designed, crafted, customized"
    >
      <div className="marquee-inner flex w-max will-change-transform">
        <Strip />
        <Strip hidden />
      </div>
    </div>
  )
}
