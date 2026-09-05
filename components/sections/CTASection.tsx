'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/gsap'
import { WhatsAppButton } from '@/components/ui/WhatsAppButton'
import { useReveal } from '@/lib/useReveal'

export function CTASection() {
  const container = useRef<HTMLDivElement>(null)
  useReveal(container, { selector: '.cta-animate', y: 16, stagger: 0.08, duration: 0.4, start: 'top 78%' })

  // one decode moment — skipped entirely under reduced motion
  useGSAP(() => {
    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const el = container.current!.querySelector('.cta-scramble')
      if (!el) return
      gsap.to(el, {
        duration: 0.9,
        ease: 'none',
        scrambleText: { text: 'your space?', chars: 'upperCase', revealDelay: 0.3, speed: 0.4 },
        scrollTrigger: { trigger: container.current, start: 'top 75%', once: true },
      })
    })
  }, { scope: container })

  return (
    <section
      ref={container}
      id="cta"
      className="relative overflow-hidden px-5 md:px-8 lg:px-10 py-[clamp(3.5rem,8vw,6.5rem)] [content-visibility:auto] [contain-intrinsic-size:auto_600px]"
    >
      {/* Soft wash behind CTA — gentle, not harsh */}
      <div className="absolute inset-0 bg-[var(--color-surface)]" aria-hidden="true" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_20%,var(--color-wash-gold-08),transparent_65%)]" aria-hidden="true" />

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-[var(--color-gold)]/18 bg-[var(--color-bg)] px-3.5 py-1.5 mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-gold)]" aria-hidden="true" />
          <span className="text-[var(--color-ivory-dim)] font-[var(--font-sans)] text-[0.76rem] tracking-wide">Free design consultation · No commitment</span>
        </div>

        <h2 className="cta-animate text-display text-[var(--color-ivory)] font-[var(--font-serif)] font-light text-[clamp(2rem,4.4vw,3.3rem)] leading-[1.05]">
          Ready to design<br />
          <span className="cta-scramble text-[var(--color-gold-soft)] font-light underline decoration-[var(--color-gold)]/40 underline-offset-[6px] decoration-1">your space?</span>
        </h2>
        <p className="cta-animate mt-4 text-[var(--color-ivory-dim)] font-[var(--font-sans)] font-light text-[0.98rem] leading-[1.7] max-w-[52ch] mx-auto overflow-wrap-anywhere">
          Free design consultation. No commitment. Just a conversation about your space, your taste, and what comfort means to you.
        </p>

        <div className="cta-animate mt-8 flex flex-col items-center gap-4">
          <WhatsAppButton size="large" className="px-10 py-4 text-[1.02rem]" />
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-[var(--color-ivory-dim)] font-[var(--font-sans)] font-light text-[0.84rem]">
            <a href="tel:+8801960481983" className="hover:text-[var(--color-ivory)] underline-offset-4 hover:underline transition-colors">
              +880 1960-481983
            </a>
            <span className="hidden sm:inline opacity-40">·</span>
            <a href="mailto:heavenfurnituremart@gmail.com" className="hover:text-[var(--color-ivory)] underline-offset-4 hover:underline transition-colors">
              heavenfurnituremart@gmail.com
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
