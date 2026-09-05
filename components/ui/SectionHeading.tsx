'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/gsap'
import { useSplitLines } from '@/lib/useSplitLines'

interface SectionHeadingProps {
  eyebrow?: string
  title: string
  subtitle?: string
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
}: SectionHeadingProps) {
  const container = useRef<HTMLDivElement>(null)

  // masked line-rise on the title — one upgrade, every heading on the page
  useSplitLines(container, { selector: '.title', splitType: 'lines' })

  useGSAP(() => {
    const mm = gsap.matchMedia()

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const eyebrowEl = container.current?.querySelector('.eyebrow')
      if (eyebrow && eyebrowEl) {
        gsap.fromTo(eyebrowEl, { opacity: 0, y: 14 }, {
          opacity: 1, y: 0, duration: 0.6, ease: 'power3.out',
          scrollTrigger: { trigger: container.current, start: 'top 85%' },
        })
      }
      const subEl = container.current?.querySelector('.subtitle')
      if (subEl) {
        gsap.fromTo(subEl, { opacity: 0, y: 16 }, {
          opacity: 1, y: 0, duration: 0.6, delay: 0.3, ease: 'power3.out',
          scrollTrigger: { trigger: container.current, start: 'top 80%' },
        })
      }
    })
  }, { scope: container })

  return (
    <div
      ref={container}
      className="text-start items-start flex flex-col min-w-0"
    >
      {eyebrow && (
        <p className="eyebrow inline-flex items-center gap-2 text-[var(--color-gold)] text-[0.78rem] font-[var(--font-sans)] font-medium tracking-[0.14em] mb-4">
          <span className="hidden sm:inline-block w-6 h-[1px] bg-[var(--color-gold)]/50" aria-hidden="true" />
          {eyebrow}
        </p>
      )}
      <h2 className="title text-[var(--color-ivory)] font-[var(--font-serif)] font-normal text-[clamp(2rem,4.4vw,3.1rem)] leading-[1.12] overflow-wrap-anywhere max-w-[16ch]">
        {title}
      </h2>
      {subtitle && (
        <p className="subtitle mt-4 text-[var(--color-ivory-dim)] font-[var(--font-sans)] font-light text-[0.96rem] leading-[1.7] max-w-[60ch] overflow-wrap-anywhere">
          {subtitle}
        </p>
      )}
    </div>
  )
}
