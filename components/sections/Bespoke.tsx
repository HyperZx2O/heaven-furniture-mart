'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/gsap'
import { useScrollTo } from '@/components/providers/LenisProvider'


export function Bespoke() {
  const container = useRef<HTMLDivElement>(null)
  const scrollTo = useScrollTo()
  const goCta = (e: React.MouseEvent) => {
    e.preventDefault()
    scrollTo('#cta')
    history.pushState(null, '', '#cta')
  }

  useGSAP(() => {
    const mm = gsap.matchMedia()

    // quiet decode on the headline's accent words — all viewports, motion-safe only
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.to('.bespoke-space', {
        duration: 0.6, ease: 'none',
        scrambleText: { text: 'your space.', chars: 'lowerCase', revealDelay: 0.15, speed: 0.5 },
        scrollTrigger: { trigger: container.current, start: 'top 75%', once: true },
      })
    })

    // desktop: pinned scrub — photos breathe, copy phases in with scroll
    mm.add('(prefers-reduced-motion: no-preference) and (min-width: 1024px)', () => {
      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: container.current,
          start: 'top top',
          end: () => `+=${Math.round(window.innerHeight * 2)}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      })
      tl.fromTo('.bespoke-visual',
        { scale: 0.94, opacity: 0 },
        { scale: 1.03, opacity: 1, duration: 1 }, 0)
        .fromTo('.bespoke-animate',
          { opacity: 0, y: 26 },
          { opacity: 1, y: 0, stagger: 0.12, duration: 0.5 }, 0.15)
    })

    // mobile + reduced motion: simple entrance, no pin
    mm.add('(prefers-reduced-motion: reduce), (max-width: 1023.5px)', () => {
      const items = container.current!.querySelectorAll('.bespoke-animate')
      const visual = container.current!.querySelector('.bespoke-visual')
      gsap.set([items, visual], { opacity: 1, y: 0, scale: 1, clipPath: 'inset(0% 0% 0% 0%)' })
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
      gsap.set(items, { opacity: 0, y: 14 })
      gsap.set(visual, { opacity: 0, y: 18, clipPath: 'inset(12% 8% 12% 8%)' })
      gsap.to(items, {
        opacity: 1, y: 0, stagger: 0.05, duration: 0.4, ease: 'expo.out',
        scrollTrigger: { trigger: container.current, start: 'top 65%' },
      })
      gsap.to(visual, {
        opacity: 1, y: 0, clipPath: 'inset(0% 0% 0% 0%)', duration: 0.8, ease: 'expo.out',
        scrollTrigger: { trigger: container.current, start: 'top 70%' },
      })
    })
  }, { scope: container })

  return (
    <section
      ref={container}
      id="bespoke"
      className="relative overflow-hidden bg-[var(--color-surface)] border-y border-[var(--color-ivory)]/8"
    >
      <div className="pointer-events-none absolute right-[-8%] top-1/2 -translate-y-1/2 w-[520px] h-[520px] md:w-[680px] md:h-[680px] rounded-full bg-[radial-gradient(circle,var(--color-wash-gold-10),transparent_68%)] blur-[0.5px]" aria-hidden="true" />

      <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-8 lg:px-10 py-[clamp(3.5rem,8vw,6.5rem)] grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr] gap-10 lg:gap-12 items-center">
        {/* Left — two stacked real photos, no 3D — DOM order = visual order at all breakpoints */}
        <div className="min-w-0">
          {/* static shell owns border + shadow so the scaling layer repaints less */}
          <div className="relative rounded-[var(--radius-soft)] border border-[var(--color-ivory)]/10 shadow-[0_18px_48px_rgba(0,0,0,0.28)]">
          <div className="bespoke-visual relative rounded-[var(--radius-soft)] overflow-hidden bg-[var(--color-bg)]">
            <div className="relative h-[260px] md:h-[300px] overflow-hidden">
              <Image
                src="/images/Luxury Dining Table Set.jpg"
                alt="Bespoke dining table set — custom built for client space"
                fill
                sizes="(max-width: 1024px) 100vw, 48vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg)]/40 to-transparent" />
              <span className="absolute top-3 left-3 rounded-full bg-[var(--color-ivory)] text-[var(--color-bg)] px-3 py-1.5 font-[var(--font-sans)] text-[0.72rem] font-medium tracking-wide">
                Bespoke, built to your dimensions
              </span>
            </div>
            <div className="relative h-[280px] overflow-hidden border-t border-[var(--color-ivory)]/8">
              <Image
                src="/images/Luxury Bed by Heaven Furniture Mart.jpg"
                alt="Luxury bed by Heaven Furniture Mart — bespoke bedroom piece"
                fill
                sizes="(max-width: 1024px) 100vw, 48vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg)]/50 to-transparent" />
              <span className="absolute bottom-3 left-3 rounded-full bg-[var(--color-bg)]/80 backdrop-blur px-3 py-1.5 text-[var(--color-ivory)] font-[var(--font-sans)] text-[0.72rem] tracking-wide border border-[var(--color-ivory)]/10">
                Hand-finished · Premium wood
              </span>
            </div>
          </div>
          </div>
          <p className="mt-3 text-center text-[var(--color-ivory-dim)] font-[var(--font-sans)] font-light text-[0.74rem]">Recent bespoke pieces from our Agrabad showroom</p>
        </div>

        {/* Right — copy */}
        <div className="min-w-0 flex flex-col gap-5">
          <p className="bespoke-animate inline-flex w-fit items-center gap-2 rounded-full border border-[var(--color-gold)]/20 bg-[var(--color-bg)] px-3.5 py-1.5 text-[var(--color-gold)] font-[var(--font-sans)] font-medium text-[0.76rem] tracking-[0.12em]">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-gold)]" aria-hidden="true" />
            Bespoke & Custom
          </p>
          <h2 className="bespoke-animate text-display text-[var(--color-ivory)] font-[var(--font-serif)] font-light text-[clamp(2.1rem,4.4vw,3.3rem)] leading-[1.02]">
            Built around<br />
            <span className="bespoke-space text-[var(--color-gold-soft)] underline decoration-[var(--color-gold)]/40 underline-offset-[6px] decoration-1">your space.</span>
          </h2>
          <p className="bespoke-animate text-[var(--color-ivory-dim)] font-[var(--font-sans)] font-light text-[1rem] leading-[1.72] max-w-[58ch] overflow-wrap-anywhere">
            You bring the vision, your room dimensions and the materials you prefer. We bring the craft. Every bespoke piece is designed from scratch, built by hand and delivered to fit exactly where it belongs. No catalog, no compromise.
          </p>

          <ul className="bespoke-animate grid grid-cols-1 sm:grid-cols-2 gap-3 mt-1">
            {[
              'Measured to your room',
              'Wood · fabric · finish — your pick',
              'Hand-built by in-house team',
              'Delivered & installed',
            ].map((item) => (
              <li key={item} className="flex items-center gap-2 text-[var(--color-ivory-dim)] font-[var(--font-sans)] text-[0.86rem]">
                <span className="w-6 h-6 rounded-full bg-[var(--color-gold)]/14 border border-[var(--color-gold)]/20 flex items-center justify-center text-[var(--color-gold)] text-[0.72rem]" aria-hidden="true">✓</span>
                {item}
              </li>
            ))}
          </ul>

          <p className="bespoke-animate text-[var(--color-ivory-dim)] font-[var(--font-sans)] text-[0.82rem] font-light">
            Have a room in mind? <a href="#cta" onClick={goCta} className="text-[var(--color-gold)] hover:underline underline-offset-4">chat on WhatsApp <span aria-hidden="true">→</span></a>
          </p>
        </div>
      </div>
    </section>
  )
}
