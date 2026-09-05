'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/gsap'
import { useSplitLines } from '@/lib/useSplitLines'
import { SectionHeading } from '@/components/ui/SectionHeading'

export function BrandIntro() {
  const container = useRef<HTMLDivElement>(null)

  // MD quote writes itself as you scroll — the page's one scrubbed-text moment
  useSplitLines(container, { selector: '.quote-text', splitType: 'words', scrub: 0.6 })

  useGSAP(() => {
    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.fromTo(container.current!.querySelector('.intro-visual'), { opacity: 0, y: 22, scale: 0.98, clipPath: 'inset(10% 6% 10% 6%)' }, {
        opacity: 1, y: 0, scale: 1, clipPath: 'inset(0% 0% 0% 0%)', duration: 0.9, ease: 'expo.out',
        scrollTrigger: { trigger: container.current, start: 'top 75%' },
      })
      gsap.fromTo(container.current!.querySelector('.quote-block'), { opacity: 0, x: -18 }, {
        opacity: 1, x: 0, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: container.current!.querySelector('.quote-block'), start: 'top 85%' },
      })
    })
    mm.add('(prefers-reduced-motion: reduce)', () => {
      gsap.set([container.current!.querySelector('.intro-visual'), container.current!.querySelector('.quote-block')], { opacity: 1, y: 0, x: 0, scale: 1, clipPath: 'inset(0% 0% 0% 0%)' })
    })
  }, { scope: container })

  return (
    <section ref={container} className="py-[clamp(3.5rem,8vw,6.5rem)] px-5 md:px-8 lg:px-10 bg-[var(--color-bg)] overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr] gap-10 lg:gap-12 items-center">
        {/* Visual — soft rounded, not centered blob */}
        <div className="intro-visual order-2 lg:order-1 min-w-0">
          <div className="relative rounded-[var(--radius-soft)] overflow-hidden bg-[var(--color-surface)] border border-[var(--color-ivory)]/8 lg:rotate-[-0.6deg] shadow-[0_16px_40px_rgba(0,0,0,0.22)]">
            <div className="relative aspect-[4/3]">
              <Image
                src="/images/Minimalist Bed Set by Heaven Furniture Mart.jpeg"
                alt="Minimalist bed set showing wood grain and craftsmanship detail"
                fill
                sizes="(max-width: 1024px) 100vw, 48vw"
                className="object-cover"
              />
            </div>
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-3">
              <span className="rounded-full bg-[var(--color-bg)]/88 backdrop-blur px-3.5 py-2 text-[var(--color-ivory)] font-[var(--font-sans)] text-[0.76rem] border border-[var(--color-ivory)]/10">
                Premium wood · In-house artisans
              </span>
              <span className="hidden sm:inline-flex h-9 w-9 items-center justify-center rounded-full bg-[var(--color-gold)] text-[var(--color-bg)]">✓</span>
            </div>
          </div>
          {/* Floating badge — playful soft touch */}
          <div className="hidden lg:flex relative -mt-8 ml-6 items-center gap-3 rounded-2xl bg-[var(--color-ivory)] text-[var(--color-bg)] px-4 py-3 shadow-[0_10px_30px_rgba(0,0,0,0.18)] w-fit rotate-[0.7deg]">
            <span className="w-9 h-9 rounded-full bg-[var(--color-gold)]/18 flex items-center justify-center text-[var(--color-brown)] font-[var(--font-serif)] font-medium">6+</span>
            <span className="font-[var(--font-sans)] text-[0.82rem] leading-tight">Years crafting<br /><span className="font-medium">for Chattogram homes</span></span>
          </div>
        </div>

        {/* Copy — left-aligned editorial, not centered 720px */}
        <div className="order-1 lg:order-2 min-w-0 flex flex-col gap-6">
          <SectionHeading
            eyebrow="Est. 2020, Chattogram"
            title="One of Chattogram's leading bespoke furniture brands."
            subtitle="We design and craft custom furniture, sofas, beds, dining sets and office pieces, built around what you actually want, not pulled off a shelf. Every piece reflects your lifestyle, your taste and your comfort."
            align="left"
          />

          <blockquote className="quote-block relative rounded-[var(--radius-card)] bg-[var(--color-surface)] border border-[var(--color-gold)]/18 p-6 md:p-7">
            <div className="absolute left-0 top-6 bottom-6 w-[3px] bg-[var(--color-gold)] rounded-full" aria-hidden="true" />
            <p className="quote-text pl-4 text-[var(--color-ivory)] font-[var(--font-serif)] font-light text-[1.08rem] md:text-[1.15rem] leading-[1.75]">
              &ldquo;At Heaven Furniture Mart, we believe furniture is more than just function; it is a reflection of lifestyle, taste, and comfort. Every piece we create is designed to bring lasting elegance into the homes of our clients.&rdquo;
            </p>
            <cite className="pl-4 mt-3 block text-[var(--color-gold)] font-[var(--font-sans)] font-medium text-[0.84rem] not-italic">
              — Abul Kalam Bhuiyan, Managing Director
            </cite>
          </blockquote>
        </div>
      </div>
    </section>
  )
}
