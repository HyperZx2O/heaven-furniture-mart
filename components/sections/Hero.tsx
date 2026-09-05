'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { useGSAP } from '@gsap/react'
import { gsap, SplitText } from '@/lib/gsap'
import { WhatsAppButton } from '@/components/ui/WhatsAppButton'

export function Hero() {
  const container = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const mm = gsap.matchMedia()

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const headline = container.current?.querySelector('.headline')
      if (!headline) return
      // SplitText chars — soft reveal
      const split = new SplitText(headline as HTMLElement, { type: 'chars,words', wordsClass: 'word', charsClass: 'char' })
      const tl = gsap.timeline({ delay: 0.35 })

      gsap.set(split.chars, { opacity: 0, y: 44 })
      tl.to(split.chars, {
        opacity: 1, y: 0, stagger: 0.018, duration: 0.5, ease: 'expo.out',
        onComplete: () => split.revert(),
      }, 0)
        // closing beat — "you." decodes in the background once the split is reverted.
        // Copy cascade uses absolute positions so it never queues behind the decode.
        .to('.hero-you', {
          duration: 2.5, ease: 'none',
          scrambleText: { text: 'you.', chars: 'lowerCase', revealDelay: 1.2, speed: 0.3 },
        }, 1.05)
        .fromTo(container.current!.querySelector('.tagline'), { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.35, ease: 'expo.out' }, 0.7)
        .fromTo(container.current!.querySelector('.subcopy'), { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.35, ease: 'expo.out' }, 0.85)
        .fromTo(container.current!.querySelector('.cta-btn'), { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.35, ease: 'expo.out' }, 1.0)
        .fromTo(container.current!.querySelector('.hero-meta'), { opacity: 0 }, { opacity: 1, duration: 0.4, ease: 'power2.out' }, 1.15)

      // layered exit — scrim deepens, content lifts away
      gsap.to('.hero-dim', {
        opacity: 0.35, ease: 'none',
        scrollTrigger: { trigger: container.current, start: 'top top', end: 'bottom top', scrub: true },
      })
      gsap.to('.hero-content', {
        y: -48, opacity: 0, ease: 'none',
        scrollTrigger: { trigger: container.current, start: 'top top', end: '40% top', scrub: true },
      })
    })

    mm.add('(prefers-reduced-motion: reduce)', () => {
      gsap.set(['.headline', '.tagline', '.subcopy', '.cta-btn', '.hero-meta'], { opacity: 1, y: 0 })
    })
  }, { scope: container })

  return (
    <section
      ref={container}
      className="relative min-h-[100svh] flex items-end overflow-hidden bg-[var(--color-bg)]"
      aria-label="Hero"
    >
      {/* Cover — the LCP element */}
      <div className="absolute inset-0" aria-hidden="false">
        <div className="absolute inset-0">
          <Image
            src="/images/Luxury Embroidery Sofa Set By Heaven Furniture Mart.jpeg"
            alt="Royal-blue embroidered sofa with gold carving by Heaven Furniture Mart"
            fill
            priority
            fetchPriority="high"
            sizes="100vw"
            className="object-cover"
          />
        </div>
      </div>
      {/* Scrim — solid where the type sits, dissolving upward */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 bg-[var(--color-bg)]/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg)] via-[var(--color-bg)]/72 to-transparent" />
        <div className="hero-dim absolute inset-0 bg-[var(--color-bg)] opacity-0" />
      </div>

      <div className="hero-content relative z-10 w-full max-w-7xl mx-auto px-5 md:px-8 lg:px-10 pt-32 md:pt-36 pb-[10vh] md:pb-[12vh]">
        <div className="flex flex-col gap-5 md:gap-6 min-w-0 max-w-3xl">
          <div className="hero-meta inline-flex flex-wrap items-center gap-2 text-[var(--color-ivory-dim)] font-[var(--font-sans)] text-[0.76rem] tracking-[0.12em]">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--color-gold)]/20 bg-[var(--color-surface)] px-3 py-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-gold)]" aria-hidden="true" />
              Est. 2020 · Agrabad, Chattogram
            </span>
            <span className="hidden sm:inline-flex items-center rounded-full border border-[var(--color-ivory)]/10 bg-[var(--color-bg)]/60 backdrop-blur px-3 py-1.5">
              Showroom open daily
            </span>
          </div>

          <h1 className="headline text-display text-[var(--color-ivory)] font-[var(--font-serif)] font-light text-[clamp(2.6rem,6.4vw,5rem)] leading-[1.0]">
            Furniture,<br />
            <span className="font-light text-[var(--color-ivory)]">crafted around</span>{' '}
            <span className="hero-you font-light text-[var(--color-gold-soft)] underline decoration-[var(--color-gold)]/40 underline-offset-[6px] decoration-1">you.</span>
          </h1>

          <p className="tagline text-[var(--color-gold)] font-[var(--font-serif)] font-normal italic text-[1.02rem] md:text-[1.18rem] tracking-wide">
            Designed. Crafted. Customized.
          </p>

          <p className="subcopy text-[var(--color-ivory-dim)] font-[var(--font-sans)] font-light text-[0.96rem] md:text-[1.03rem] leading-[1.7] max-w-[56ch] overflow-wrap-anywhere">
            Bespoke sofas, beds, dining and office pieces, built to your space, taste and comfort. Real wood, real craft, no catalog compromises.
          </p>

          <div className="cta-btn flex flex-wrap items-center gap-4 pt-1">
            <WhatsAppButton size="large" />
            <span className="text-[var(--color-ivory-dim)] font-[var(--font-sans)] text-[0.82rem] font-light">
              Free design consultation · No commitment
            </span>
          </div>

          {/* Social proof micro */}
          <div className="flex items-center gap-3 pt-2 text-[var(--color-ivory-dim)] font-[var(--font-sans)] text-[0.78rem]">
            <span className="inline-flex -space-x-1.5" aria-hidden="true">
              <span className="w-7 h-7 rounded-full bg-[var(--color-surface)] border border-[var(--color-bg)] flex items-center justify-center text-[0.62rem]">500+</span>
              <span className="w-7 h-7 rounded-full bg-[var(--color-gold)]/20 border border-[var(--color-bg)] flex items-center justify-center">
                <svg viewBox="0 0 28 28" className="w-7 h-7" aria-hidden="true">
                  <path d="M9 23 V15 a5 5 0 0 1 10 0 V23 Z" fill="none" stroke="var(--color-gold)" strokeWidth="2" />
                </svg>
              </span>
              <span className="w-7 h-7 rounded-full bg-[var(--color-ivory-dim)]/30 border border-[var(--color-bg)] flex items-center justify-center">
                <svg viewBox="0 0 28 28" className="w-7 h-7" aria-hidden="true">
                  <path d="M8 20 a6 6 0 0 1 12 0 Z" fill="var(--color-wood)" opacity="0.85" />
                  <path d="M11 17.5 a3.2 3.2 0 0 1 6 0" fill="none" stroke="var(--color-ivory)" strokeWidth="1.4" opacity="0.8" />
                </svg>
              </span>
            </span>
            Trusted by hundreds across Chattogram
          </div>
        </div>
      </div>
    </section>
  )
}
