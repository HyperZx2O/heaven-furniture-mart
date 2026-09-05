'use client'

import Link from 'next/link'
import { useScrollTo } from '@/components/providers/LenisProvider'
import { spotlightMove } from '@/components/ui/spotlight'

interface CollectionCardProps {
  category: string
  products: string[]
  children: React.ReactNode
  isBespoke?: boolean
}

export function CollectionCard({ category, products, children, isBespoke = false }: CollectionCardProps) {
  const scrollTo = useScrollTo()
  return (
    <div
      onMouseMove={spotlightMove}
      className="group t-card-resize v2-grain-card relative flex h-full flex-col rounded-[var(--radius-card)] bg-[var(--color-surface)] border border-[var(--color-ivory)]/8 overflow-hidden hover:border-[var(--color-gold)]/30 hover:-translate-y-1 hover:shadow-[0_14px_36px_rgba(0,0,0,0.22)] min-w-0 cursor-pointer"
    >
      <div
        className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
        style={{
          background: `radial-gradient(500px circle at var(--x,50%) var(--y,50%), rgba(184,151,58,0.10), transparent 40%)`,
        }}
        aria-hidden="true"
      />
      <div className="h-[260px] md:h-[280px] flex items-center justify-center overflow-hidden bg-[var(--color-surface-2)] relative">
        {children}
        {/* soft vignette on hover — tokenized */}
        <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-[var(--duration-normal)] bg-[radial-gradient(ellipse_70%_50%_at_50%_30%,var(--color-wash-gold-08),transparent_70%)]" />
      </div>
      <div className="p-5 flex flex-1 flex-col min-w-0">
        <h3 className="text-[var(--color-ivory)] font-[var(--font-serif)] font-medium text-[1.22rem] leading-tight [overflow-wrap:anywhere] [word-break:break-word] hyphens-auto min-w-0">
          {category}
        </h3>
        <p className="mt-1.5 text-[var(--color-ivory-dim)] font-[var(--font-sans)] font-light text-[0.84rem] leading-relaxed [overflow-wrap:anywhere] [word-break:break-word] hyphens-auto min-w-0 min-h-[2.6rem] content-center">
          {products.join(' · ')}
        </p>
        <Link
          href="#cta"
          aria-label={isBespoke ? `Tell us what you need for ${category}` : `Explore ${category} collection`}
          onClick={(e) => {
            e.preventDefault()
            scrollTo('#cta')
            history.pushState(null, '', '#cta')
          }}
          className="mt-4 inline-flex items-center gap-1.5 min-h-[44px] py-2 text-[var(--color-gold)] font-[var(--font-sans)] text-[0.84rem] font-medium tracking-wide hover:gap-2.5 active:gap-1.5 transition-all duration-[var(--duration-normal)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] rounded-full"
        >
          {isBespoke ? 'Tell us what you need' : 'Explore'}
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </div>
  )
}
