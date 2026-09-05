'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/gsap'
import { Counter } from '@/components/ui/Counter'


const milestones = [
  { year: '2020', label: 'Founded by Abul Kalam Bhuiyan' },
  { year: '2021', label: 'Opened Agrabad Showroom' },
  { year: '2024–25', label: 'International Furniture Fair, Chattogram' },
  { year: '2025', label: 'Member, Chamber of Commerce' },
  { year: '2026', label: 'BFIOA Recognition (nationwide)' },
]

export function SocialProof() {
  const container = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.fromTo(container.current!.querySelector('.showcase-card'), { opacity: 0, y: 24, clipPath: 'inset(10% 6% 10% 6%)' }, {
        opacity: 1, y: 0, clipPath: 'inset(0% 0% 0% 0%)', duration: 0.9, ease: 'expo.out',
        scrollTrigger: { trigger: container.current!.querySelector('.showcase-card'), start: 'top 82%' },
      })
      gsap.fromTo(container.current!.querySelector('.quote-wrap'), { opacity: 0, y: 18 }, {
        opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: container.current!.querySelector('.quote-wrap'), start: 'top 82%' },
      })
      const items = container.current!.querySelectorAll('.timeline-item')
      gsap.set(items, { opacity: 0, y: 12 })
      gsap.to(items, {
        opacity: 1, y: 0, stagger: 0.07, duration: 0.5, ease: 'power3.out',
        scrollTrigger: { trigger: container.current!.querySelector('.timeline'), start: 'top 84%' },
      })
      gsap.fromTo(container.current!.querySelectorAll('.draw-line'), { drawSVG: '0%' }, {
        drawSVG: '100%', duration: 1.1, ease: 'expo.out',
        scrollTrigger: { trigger: container.current!.querySelector('.timeline'), start: 'top 84%' },
      })
      gsap.fromTo(container.current!.querySelector('.trust-number'), { opacity: 0, scale: 0.96 }, {
        opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.4)',
        scrollTrigger: { trigger: container.current!.querySelector('.trust-number'), start: 'top 88%' },
      })
    })
    mm.add('(prefers-reduced-motion: reduce)', () => {
      gsap.set([container.current!.querySelector('.showcase-card'), container.current!.querySelector('.quote-wrap'), container.current!.querySelector('.trust-number')], { opacity: 1, y: 0, scale: 1, clipPath: 'inset(0% 0% 0% 0%)' })
      gsap.set(container.current!.querySelectorAll('.timeline-item'), { opacity: 1, y: 0 })
    })
  }, { scope: container })

  return (
    <section ref={container} className="bg-[var(--color-bg)] overflow-x-clip">
      {/* Quote — full-bleed image with soft overlay, rounded inner card */}
      <div className="relative py-10 md:py-14 px-5 md:px-8 lg:px-10">
        <div className="showcase-card relative max-w-7xl mx-auto rounded-[var(--radius-soft)] overflow-hidden border border-[var(--color-ivory)]/10 shadow-[0_16px_40px_rgba(0,0,0,0.24)]">
          <div className="absolute inset-0">
            <Image
              src="/images/Luxury Showcase By Heaven Furniture Mart.jpeg"
              alt="Heaven Furniture Mart showroom interior with curated furniture"
              fill
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-[var(--color-bg)]/72" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_40%,transparent,rgba(28,37,38,0.35))]" />
          </div>
          <blockquote
            className="quote-wrap relative z-10 px-6 md:px-10 lg:px-14 py-10 md:py-14 max-w-[860px] mx-auto text-center"
          >
            <p className="text-[var(--color-ivory)] font-[var(--font-serif)] font-light italic text-[clamp(1.18rem,2.6vw,1.7rem)] leading-[1.7]">
              &ldquo;At Heaven Furniture Mart, we believe furniture is more than just function; it is a reflection of lifestyle, taste, and comfort. Every piece we create is designed to bring lasting elegance into the homes of our clients.&rdquo;
            </p>
            <cite className="mt-5 block text-[var(--color-gold-soft)] font-[var(--font-sans)] font-medium text-[0.86rem] not-italic tracking-wide">
              — Abul Kalam Bhuiyan, Managing Director
            </cite>
            <span className="mt-4 inline-flex gap-1.5 justify-center" aria-hidden="true">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-gold)]" />
              <span className="w-1.5 h-1.5 rounded-full bg-white/30" />
              <span className="w-1.5 h-1.5 rounded-full bg-white/30" />
            </span>
          </blockquote>
        </div>
      </div>

      {/* Timeline — editorial linear */}
      <div className="py-10 px-5 md:px-8 lg:px-10">
        <div className="max-w-5xl mx-auto">
          <p className="text-center text-[var(--color-gold)] font-[var(--font-sans)] text-[0.76rem] tracking-[0.14em] font-medium mb-6">Our journey</p>
          {/* Desktop horizontal */}
          <div className="timeline hidden md:flex items-start justify-between relative gap-4">
            <svg className="absolute top-[7px] left-0 right-0 h-[1px] w-full" preserveAspectRatio="none" viewBox="0 0 100 1" aria-hidden="true">
              <line x1="0" y1="0.5" x2="100" y2="0.5" stroke="var(--color-gold)" strokeOpacity="0.22" strokeWidth="1" vectorEffect="non-scaling-stroke" className="draw-line" />
            </svg>
            {milestones.map((m) => (
              <div key={m.year} className="timeline-item relative flex flex-col items-center text-center min-w-0 flex-1">
                <div className="w-3.5 h-3.5 rounded-full bg-[var(--color-gold)] border-2 border-[var(--color-bg)] shadow-[0_0_0_4px_var(--color-wash-gold-14)] relative z-10" aria-hidden="true" />
                <span className="mt-3 text-[var(--color-gold)] font-[var(--font-sans)] font-semibold text-[0.84rem] tracking-wide">
                  {m.year}
                </span>
                <span className="mt-1 text-[var(--color-ivory-dim)] font-[var(--font-sans)] font-light text-[0.78rem] leading-snug max-w-[150px] overflow-wrap-anywhere">
                  {m.label}
                </span>
              </div>
            ))}
          </div>
          {/* Mobile vertical */}
          <div className="md:hidden flex flex-col gap-5 relative pl-7">
            <svg className="absolute top-1 bottom-1 left-[7px] w-[1px] h-[calc(100%-8px)]" preserveAspectRatio="none" viewBox="0 0 1 100" aria-hidden="true">
              <line x1="0.5" y1="0" x2="0.5" y2="100" stroke="var(--color-gold)" strokeOpacity="0.22" strokeWidth="1" vectorEffect="non-scaling-stroke" className="draw-line" />
            </svg>
            {milestones.map((m) => (
              <div key={m.year} className="timeline-item relative flex flex-col min-w-0">
                <div className="absolute left-[-21px] top-1 w-3.5 h-3.5 rounded-full bg-[var(--color-gold)] border-2 border-[var(--color-bg)] shadow-[0_0_0_4px_var(--color-wash-gold-14)]" aria-hidden="true" />
                <span className="text-[var(--color-gold)] font-[var(--font-sans)] font-semibold text-[0.84rem]">{m.year}</span>
                <span className="text-[var(--color-ivory-dim)] font-[var(--font-sans)] font-light text-[0.82rem] mt-0.5 overflow-wrap-anywhere">{m.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Trust number — display stat with soft card */}
      <div className="py-10 px-5 md:px-8 lg:px-10 flex flex-col items-center text-center">
        <div className="trust-number rounded-[var(--radius-card)] bg-[var(--color-surface)] border border-[var(--color-ivory)]/8 px-10 md:px-14 py-8 md:py-10 shadow-[0_12px_32px_rgba(0,0,0,0.18)]">
          <span className="block text-[var(--color-gold)] font-[var(--font-serif)] font-light text-[clamp(3.2rem,8vw,5.2rem)] leading-none tracking-[-0.03em]">
            <Counter to={500} suffix="+" />
          </span>
          <span className="mt-2 block text-[var(--color-ivory-dim)] font-[var(--font-sans)] font-light text-[0.9rem] tracking-wide">
            Happy homeowners across Chattogram
          </span>
          <span className="mt-1 block text-[var(--color-ivory-dim)]/80 font-[var(--font-sans)] text-[0.74rem]">
            Bespoke builds · showroom visits · referrals
          </span>
        </div>
        <p className="mt-6 text-[var(--color-ivory-dim)] font-[var(--font-sans)] text-[0.82rem] font-light">
          Ready? <a href="#cta" className="text-[var(--color-gold)] hover:underline underline-offset-4">WhatsApp us →</a>
        </p>
      </div>
    </section>
  )
}

