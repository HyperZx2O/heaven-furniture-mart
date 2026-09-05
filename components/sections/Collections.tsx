'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/gsap'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { CollectionCard } from '@/components/ui/CollectionCard'
import { useReveal } from '@/lib/useReveal'

const collections = [
  { category: 'Living Room', products: ['Sofas', 'Coffee Tables', 'TV Units', 'Consoles'], image: '/images/Classic Furniture Sofa set by Heaven Furniture Mart.jpeg', alt: 'Living room collection — classic sofa set' },
  { category: 'Bedroom', products: ['Beds', 'Wardrobes', 'Dressing Tables', 'Bedside Tables'], image: '/images/Minimalist Bed Set by Heaven Furniture Mart.jpeg', alt: 'Bedroom collection — minimalist bed set' },
  { category: 'Dining', products: ['Dining Tables', 'Chairs', 'Cabinets'], image: '/images/Luxury Dining Set By Heaven Furniture Mart.jpeg', alt: 'Dining collection — luxury dining set' },
  { category: 'Office & Study', products: ['Executive Tables', 'Bookshelves', 'Workstations'], image: '/images/Minimal Shoe Box by Heaven Furniture Mart.jpeg', alt: 'Office & Study collection — minimal shoe box and storage' },
]

export function Collections() {
  const container = useRef<HTMLDivElement>(null)
  useReveal(container, { selector: '.collection-card', y: 14, stagger: 0.06, duration: 0.35, trigger: '.collections-wrap', start: 'top 80%' })

  // desktop: pinned vertical-to-horizontal scrub (native swipe strip stays as fallback)
  useGSAP(() => {
    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference) and (min-width: 1024px)', () => {
      const viewport = container.current!.querySelector<HTMLElement>('.collections-viewport')
      const track = container.current!.querySelector<HTMLElement>('.collections-track')
      if (!viewport || !track) return
      gsap.set(viewport, { overflow: 'visible' })
      const dist = () => Math.max(0, track.scrollWidth - window.innerWidth + 80)
      // the track travel is the effect — images stay glued to their frames
      // (per-card drift used to make picture gaps breathe unevenly)
      gsap.to(track, {
        x: () => -dist(),
        ease: 'none',
        scrollTrigger: {
          trigger: viewport,
          start: 'top top+=88',
          end: () => `+=${dist()}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })
    })
  }, { scope: container })

  return (
    <section
      ref={container}
      id="collections"
      className="relative py-[clamp(2rem,4vw,3.25rem)] bg-[var(--color-bg)] overflow-x-clip"
    >
      <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
          <SectionHeading
            eyebrow="What we make"
            title="Our Collections"
            subtitle="Not a catalog — curated sets we build every week."
          />
        </div>
      </div>

      <div className="collections-wrap max-w-7xl mx-auto px-5 md:px-8 lg:px-10">
        {/* Mobile/Tablet: 1 / 2 col grid — stretch equal height */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6 lg:hidden auto-rows-fr items-stretch">
          {collections.map((col) => (
            <div key={col.category} className="collection-card min-w-0">
              <CollectionCard category={col.category} products={col.products}>
                <div className="relative w-full h-full overflow-hidden">
                  <Image src={col.image} alt={col.alt} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
                </div>
              </CollectionCard>
            </div>
          ))}
          <div className="collection-card min-w-0">
            <CollectionCard category="Bespoke / Custom" products={['Any piece', 'Any size', 'Any material']} isBespoke>
              <div className="w-full h-full relative overflow-hidden bg-[var(--color-surface)] flex flex-col items-center justify-center p-6 text-center">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_30%,var(--color-wash-gold-12),transparent_70%)]" aria-hidden="true" />
                <span className="relative text-[var(--color-gold)] font-[var(--font-serif)] text-[1.15rem] font-light">Your vision,</span>
                <span className="relative text-[var(--color-ivory)] font-[var(--font-serif)] text-[1.4rem] font-normal -mt-1">our craft</span>
                <span className="relative mt-2 text-[var(--color-ivory-dim)] font-[var(--font-sans)] text-[0.78rem]">Any dimension · Any material</span>
              </div>
            </CollectionCard>
          </div>
        </div>

        {/* Desktop: pinned horizontal travel — native swipe strip is the fallback */}
        <div className="collections-viewport hidden lg:block overflow-x-auto no-scrollbar pb-4 -mx-10 px-10">
          <div className="collections-track flex gap-4 w-max items-stretch">
          {collections.map((col) => (
            <div key={col.category} className="collection-card shrink-0 w-[320px] min-w-0 flex">
              <CollectionCard category={col.category} products={col.products}>
                <div className="relative w-full h-full overflow-hidden">
                  <Image src={col.image} alt={col.alt} fill sizes="320px" className="object-cover" />
                </div>
              </CollectionCard>
            </div>
          ))}
          <div className="collection-card shrink-0 w-[320px] min-w-0 flex">
            <CollectionCard category="Bespoke / Custom" products={['Any piece', 'Any size', 'Any material']} isBespoke>
              <div className="w-full h-full relative overflow-hidden bg-[var(--color-surface)] flex flex-col items-center justify-center p-6 text-center">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_30%,var(--color-wash-gold-12),transparent_70%)]" aria-hidden="true" />
                <span className="relative text-[var(--color-gold)] font-[var(--font-serif)] text-[1.15rem] font-light">Your vision,</span>
                <span className="relative text-[var(--color-ivory)] font-[var(--font-serif)] text-[1.4rem] font-normal -mt-1">our craft</span>
                <span className="relative mt-3 inline-flex rounded-full border border-[var(--color-gold)]/30 px-3 py-1 text-[var(--color-gold)] font-[var(--font-sans)] text-[0.72rem] tracking-wide">Bespoke in 14–21 days</span>
              </div>
            </CollectionCard>
          </div>
          </div>
        </div>
        <p className="lg:hidden mt-3 text-center text-[var(--color-ivory-dim)] font-[var(--font-sans)] text-[0.74rem] tracking-wide">Tap Explore to start a WhatsApp conversation</p>
      </div>
    </section>
  )
}

