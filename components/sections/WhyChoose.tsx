'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { TrustCard } from '@/components/ui/TrustCard'
import {
  ConsultationIcon,
  CraftIcon,
  MaterialsIcon,
  ShowroomIcon,
  DeliveryIcon,
  PaymentIcon,
  TrustIcon,
} from '@/components/ui/icons'

const trustItems = [
  { icon: <ConsultationIcon />, heading: 'Free Design Consultation', body: 'Sit with our team. We understand your space before we touch a single plank.' },
  { icon: <CraftIcon />, heading: 'Fully Bespoke', body: 'Every piece built to your dimensions, material choice, and aesthetic. Nothing mass-produced.' },
  { icon: <MaterialsIcon />, heading: 'Premium Wood & Craftsmanship', body: 'Skilled in-house artisans. Premium wood and materials, selected for longevity.' },
  { icon: <ShowroomIcon />, heading: 'Large Physical Showroom', body: 'Visit us at Agrabad, Chattogram. See, touch, and feel the quality before you decide.' },
  { icon: <DeliveryIcon />, heading: 'Delivery & Installation Included', body: 'We bring it to your home and set it up. No extra charges, no logistics stress.' },
  { icon: <PaymentIcon />, heading: 'Easy Payment Options', body: 'Flexible payment plans designed to work with you.' },
  { icon: <TrustIcon />, heading: 'Trusted by Hundreds', body: 'Hundreds of happy homeowners across Chattogram have called Heaven their choice.' },
]

export function WhyChoose() {
  const container = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const cards = Array.from(container.current!.querySelectorAll<HTMLElement>('.trust-card'))
      // start from presentation value for interruptibility — read live transform
      cards.forEach((el) => {
        const y = Number(gsap.getProperty(el, 'y')) || 22
        el.style.opacity = '0'
        el.style.transform = `translateY(${y}px)`
      })
      // one batched trigger for the whole grid instead of a hand-rolled observer
      ScrollTrigger.batch(cards, {
        start: 'top 88%',
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, {
            opacity: 1, y: 0, stagger: 0.05, duration: 0.4, ease: 'expo.out', overwrite: true,
          }),
      })
      // quiet decode on the heading's accent word — its only entrance moment
      gsap.to('.why-feel', {
        duration: 0.6, ease: 'none',
        scrambleText: { text: 'feel,', chars: 'lowerCase', revealDelay: 0.15, speed: 0.5 },
        scrollTrigger: { trigger: container.current, start: 'top 82%', once: true },
      })
    })
    mm.add('(prefers-reduced-motion: reduce)', () => {
      gsap.set(container.current!.querySelectorAll('.trust-card'), { opacity: 1, y: 0 })
    })
  }, { scope: container })

  return (
    <section
      ref={container}
      id="why-choose"
      className="relative overflow-hidden py-[clamp(3.5rem,8vw,6.5rem)] px-5 md:px-8 lg:px-10 bg-[var(--color-bg)]"
    >
      {/* Signature motif — system's own wash, now at peak density */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_55%_at_50%_0%,var(--color-wash-gold-10),transparent_62%)]" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-24 top-1/3 w-[420px] h-[420px] rounded-full bg-[radial-gradient(circle,var(--color-wash-gold-08),transparent_68%)] blur-[0.5px] hidden lg:block" aria-hidden="true" />

      <div className="relative max-w-7xl mx-auto">
        {/* Head — now at system's full display strength, its own rhythm */}
        <div className="mb-10 max-w-2xl">
          <p className="inline-flex items-center gap-2 text-[var(--color-gold)] font-[var(--font-sans)] text-[0.76rem] font-medium tracking-[0.14em] mb-3">
            <span className="w-6 h-[1px] bg-[var(--color-gold)]/50 hidden sm:inline-block" aria-hidden="true" />
            Why Choose Heaven
          </p>
            <h2 className="text-display text-[var(--color-ivory)] font-[var(--font-serif)] font-light text-[clamp(2.1rem,4.6vw,3.4rem)] leading-[1.02] overflow-wrap-anywhere">
              Craft you can <span className="why-feel text-[var(--color-gold-soft)] underline decoration-[var(--color-gold)]/40 underline-offset-[7px] decoration-1">feel,</span> service you can trust.
            </h2>
          <p className="mt-3 text-[var(--color-ivory-dim)] font-[var(--font-sans)] font-light text-[0.98rem] leading-[1.7] max-w-[58ch] overflow-wrap-anywhere">
            Seven reasons families in Chattogram choose Heaven.
          </p>
        </div>

        {/* Bolder rhythm — 2 wide hero + 3 compact + 2 wide close. Featured card gets system's gold accent, own density. */}
        <div className="why-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5 md:gap-6">
          <div className="trust-card lg:col-span-6">
            <TrustCard {...trustItems[0]} />
          </div>
          <div className="trust-card lg:col-span-6 lg:-mt-3">
            <div className="rounded-[var(--radius-card)] border border-[var(--color-gold)]/35 bg-[var(--color-surface)] shadow-[0_16px_40px_rgba(0,0,0,0.18)] overflow-hidden">
              <div className="h-[3px] bg-[var(--color-gold)]" aria-hidden="true" />
              <TrustCard {...trustItems[1]} />
            </div>
            <p className="t-badge-pop mt-2 text-center text-[var(--color-gold)] font-[var(--font-sans)] text-[0.72rem] tracking-[0.08em]">Most requested, Fully Bespoke</p>
          </div>

          <div className="trust-card lg:col-span-4">
            <TrustCard {...trustItems[2]} />
          </div>
          <div className="trust-card lg:col-span-4 lg:translate-y-2">
            <TrustCard {...trustItems[3]} />
          </div>
          <div className="trust-card lg:col-span-4">
            <TrustCard {...trustItems[4]} />
          </div>

          <div className="trust-card lg:col-span-5">
            <TrustCard {...trustItems[5]} />
          </div>
          <div className="trust-card lg:col-span-7 lg:-mt-3">
            <div className="rounded-[var(--radius-card)] bg-[var(--color-ivory)] text-[var(--color-bg)] p-[1px]">
              <div className="rounded-[var(--radius-card)] bg-[var(--color-surface)]">
                <TrustCard {...trustItems[6]} />
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
