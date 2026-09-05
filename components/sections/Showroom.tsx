'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { useReveal } from '@/lib/useReveal'

const MAPS_URL =
  'https://www.google.com/maps/search/?api=1&query=Heaven+Furniture+Mart+Agrabad+Chattogram'

export function Showroom() {
  const container = useRef<HTMLDivElement>(null)
  useReveal(container, { selector: '.showroom-visual', y: 18, duration: 0.4, start: 'top 72%', clip: true })
  useReveal(container, { selector: '.showroom-row', y: 12, stagger: 0.06, duration: 0.35, start: 'top 78%' })

  return (
    <section
      ref={container}
      id="showroom"
      className="py-[clamp(3.5rem,8vw,6.5rem)] px-5 md:px-8 lg:px-10 bg-[var(--color-surface)] border-y border-[var(--color-ivory)]/8 overflow-x-clip [content-visibility:auto] [contain-intrinsic-size:auto_700px]"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-12 items-center">
        {/* Copy */}
        <div className="min-w-0">
          <SectionHeading
            eyebrow="Visit us"
            title="See it before you believe it."
            subtitle="Our Agrabad showroom is where dimensions become decisions. Touch the wood, test the comfort, meet the people who will build your piece."
            align="left"
          />
          <ul className="mt-7 flex flex-col gap-4 list-none m-0 p-0">
            <li className="showroom-row flex items-start gap-3 min-w-0">
              <span className="mt-2 w-1.5 h-1.5 shrink-0 rounded-full bg-[var(--color-gold)]" aria-hidden="true" />
              <div className="min-w-0">
                <p className="text-[var(--color-ivory)] font-[var(--font-sans)] text-[0.9rem] font-normal">Agrabad Access Road, Chattogram</p>
                <p className="text-[var(--color-ivory-dim)] font-[var(--font-sans)] font-light text-[0.84rem]">Open daily · walk in or book ahead on WhatsApp</p>
              </div>
            </li>
            <li className="showroom-row flex items-start gap-3 min-w-0">
              <span className="mt-2 w-1.5 h-1.5 shrink-0 rounded-full bg-[var(--color-gold)]" aria-hidden="true" />
              <div className="min-w-0">
                <a href="tel:+8801960481983" className="block text-[var(--color-ivory)] font-[var(--font-sans)] text-[0.9rem] hover:text-[var(--color-gold)] transition-colors w-fit">+880 1960-481983</a>
                <a href="mailto:heavenfurnituremart@gmail.com" className="block text-[var(--color-ivory-dim)] font-[var(--font-sans)] font-light text-[0.84rem] hover:text-[var(--color-gold)] transition-colors w-fit overflow-wrap-anywhere">heavenfurnituremart@gmail.com</a>
              </div>
            </li>
          </ul>
          <p className="showroom-row mt-6 text-[var(--color-ivory-dim)] font-[var(--font-sans)] font-light text-[0.86rem]">
            <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className="text-[var(--color-gold)] font-normal hover:underline underline-offset-4">Get directions →</a>
            <span className="mx-2 opacity-40" aria-hidden="true">·</span>
            <a href="#cta" className="text-[var(--color-gold)] font-normal hover:underline underline-offset-4">Book a visit on WhatsApp →</a>
          </p>
        </div>

        {/* Visual */}
        <div className="showroom-visual min-w-0">
          <div className="relative rounded-[var(--radius-soft)] overflow-hidden bg-[var(--color-bg)] border border-[var(--color-ivory)]/10 shadow-[0_18px_48px_rgba(0,0,0,0.28)]">
            <div className="relative aspect-[4/3]">
              <Image
                src="/images/Emroiydery Sofa Set Heaven Furniture Mart.jpeg"
                alt="Embroidery sofa set on the Heaven Furniture Mart showroom floor"
                fill
                sizes="(max-width: 1024px) 100vw, 48vw"
                className="object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg)]/50 via-transparent to-transparent" aria-hidden="true" />
            <span className="absolute bottom-3 left-3 rounded-full bg-[var(--color-bg)]/80 backdrop-blur px-3.5 py-2 text-[var(--color-ivory)] font-[var(--font-sans)] text-[0.76rem] border border-[var(--color-ivory)]/10">
              On the floor now · Agrabad showroom
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
