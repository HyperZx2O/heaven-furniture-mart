import type { Metadata } from 'next'
import Link from 'next/link'
import { WhatsAppButton } from '@/components/ui/WhatsAppButton'

export const metadata: Metadata = {
  title: 'Page not found — Heaven Furniture Mart',
  description: 'This page does not exist. Return to Heaven Furniture Mart bespoke furniture, Chattogram.',
  robots: { index: false, follow: true },
}

export default function NotFound() {
  return (
    <main className="min-h-[100svh] flex items-center justify-center bg-[var(--color-bg)] px-5">
      <div className="text-center max-w-xl flex flex-col items-center gap-5">
        <p className="text-[var(--color-gold)] font-[var(--font-sans)] text-[0.76rem] font-medium tracking-[0.14em]">
          Heaven Furniture Mart
        </p>
        <h1 className="text-display text-[var(--color-ivory)] font-[var(--font-serif)] font-light text-[clamp(2.2rem,6vw,3.5rem)] leading-[1.05]">
          Lost in the showroom?
        </h1>
        <p className="text-[var(--color-ivory-dim)] font-[var(--font-sans)] font-light text-[0.98rem] leading-[1.7]">
          This page doesn&apos;t exist. Let&apos;s get you back to the furniture.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full border border-[var(--color-gold)] px-7 py-3 text-[var(--color-ivory)] font-[var(--font-sans)] text-[0.9rem] font-medium tracking-wide"
          >
            Back home
          </Link>
          <WhatsAppButton />
        </div>
      </div>
    </main>
  )
}
