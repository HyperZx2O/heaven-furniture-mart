'use client'

import { spotlightMove } from '@/components/ui/spotlight'

interface TrustCardProps {
  icon: React.ReactNode
  heading: string
  body: string
}

export function TrustCard({ icon, heading, body }: TrustCardProps) {
  return (
    <div
      onMouseMove={spotlightMove}
      className="group v2-grain-card relative flex flex-col gap-4 rounded-[var(--radius-card)] bg-[var(--color-surface)] border border-[var(--color-ivory)]/8 p-6 md:p-7 transition-[transform,border-color,box-shadow] duration-[var(--duration-normal)] ease-[var(--ease-spring)] hover:border-[var(--color-gold)]/30 hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(0,0,0,0.18)] min-w-0 overflow-hidden"
    >
      <div
        className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(400px circle at var(--x,50%) var(--y,50%), rgba(184,151,58,0.14), transparent 40%)`,
        }}
        aria-hidden="true"
      />
      <div className="flex items-center gap-3">
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-gold)]/12 border border-[var(--color-gold)]/18 text-[var(--color-gold)] group-hover:bg-[var(--color-gold)] group-hover:text-[var(--color-bg)] transition-colors duration-[var(--duration-normal)]" aria-hidden="true">
          {icon}
        </span>
        <span className="h-[1px] flex-1 bg-[var(--color-gold)]/18 hidden sm:block" aria-hidden="true" />
      </div>
      <h3 className="text-[var(--color-ivory)] font-[var(--font-serif)] font-medium text-[1.35rem] leading-tight [overflow-wrap:anywhere] [word-break:break-word] hyphens-auto min-w-0">
        {heading}
      </h3>
      <p className="text-[var(--color-ivory-dim)] font-[var(--font-sans)] font-light text-[0.94rem] leading-[1.65] [overflow-wrap:anywhere] [word-break:break-word] hyphens-auto min-w-0">
        {body}
      </p>
    </div>
  )
}
