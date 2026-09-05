'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { SectionHeading } from '@/components/ui/SectionHeading'

const steps = [
  { n: '01', title: 'Free design consultation', body: 'Sit with our team. We understand your space before we touch a single plank.' },
  { n: '02', title: 'Free sketch within 24 hours', body: 'You see your piece on paper the next day — dimensions, material, finish.' },
  { n: '03', title: 'Hand-built in 14–21 days', body: 'In-house artisans build your piece from scratch. Nothing mass-produced.' },
  { n: '04', title: 'Delivered & installed', body: 'We bring it home and set it up. No extra charges, no logistics stress.' },
]

export function Process() {
  const container = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference) and (min-width: 1024px)', () => {
      const items = Array.from(container.current!.querySelectorAll<HTMLElement>('.process-step'))
      const dots = Array.from(container.current!.querySelectorAll<HTMLElement>('.process-dot'))
      const spine = container.current!.querySelector('.draw-line')
      gsap.set(items, { opacity: 0, y: 14 })
      gsap.set(dots, { scale: 0.6, opacity: 0.4 })
      if (spine) gsap.set(spine, { drawSVG: '0%' })

      // one scrubbed journey: steps ignite per quarter (spine fills via one-shot below)
      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: container.current,
          start: 'top top',
          end: () => `+=${Math.round(window.innerHeight * 1.5)}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      })
      items.forEach((step, i) => {
        tl.to(step, { opacity: 1, y: 0, duration: 1 }, i)
        if (dots[i]) tl.to(dots[i], { scale: 1, opacity: 1, duration: 0.5 }, i + 0.25)
      })
      // spine fills once on arrival — stroke geometry off the scrubbed repaint path
      if (spine) {
        gsap.to(spine, {
          drawSVG: '100%', duration: 1.1, ease: 'expo.out',
          scrollTrigger: { trigger: container.current, start: 'top 70%', once: true },
        })
      }
    })

    mm.add('(prefers-reduced-motion: no-preference) and (max-width: 1023.5px)', () => {
      const items = container.current!.querySelectorAll<HTMLElement>('.process-step')
      gsap.set(items, { opacity: 0, y: 18 })
      gsap.fromTo(container.current!.querySelector('.draw-line'), { drawSVG: '0%' }, {
        drawSVG: '100%', duration: 1.1, ease: 'expo.out',
        scrollTrigger: { trigger: container.current, start: 'top 80%' },
      })
      ScrollTrigger.batch(items, {
        start: 'top 86%',
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, { opacity: 1, y: 0, stagger: 0.09, duration: 0.55, ease: 'expo.out', overwrite: true }),
      })
    })
    mm.add('(prefers-reduced-motion: reduce)', () => {
      gsap.set(container.current!.querySelectorAll('.process-step'), { opacity: 1, y: 0 })
    })
  }, { scope: container })

  return (
    <section
      ref={container}
      id="process"
      className="relative py-[clamp(3.5rem,8vw,6.5rem)] px-5 md:px-8 lg:px-10 bg-[var(--color-bg)] overflow-x-clip"
    >
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          eyebrow="How it works"
          title="From measurement to move-in."
          subtitle="Four steps, one team. You always know what happens next — and what it costs."
        />
        {/* Editorial numeral row — hairline spine, not icon cards */}
        <div className="mt-10 md:mt-12 relative">
          <svg className="absolute top-[7px] left-0 right-0 h-[1px] w-full hidden md:block" preserveAspectRatio="none" viewBox="0 0 100 1" aria-hidden="true">
            <line x1="0" y1="0.5" x2="100" y2="0.5" stroke="var(--color-gold)" strokeOpacity="0.22" strokeWidth="1" vectorEffect="non-scaling-stroke" className="draw-line" />
          </svg>
          <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-6 lg:gap-8 list-none m-0 p-0">
            {steps.map((s) => (
              <li key={s.n} className="process-step relative min-w-0 md:pt-8">
                <span className="process-dot hidden md:block absolute top-0 left-0 w-3.5 h-3.5 rounded-full bg-[var(--color-gold)] border-2 border-[var(--color-bg)] shadow-[0_0_0_4px_var(--color-wash-gold-14)]" aria-hidden="true" />
                <span className="block text-[var(--color-gold)] font-[var(--font-serif)] font-light text-[clamp(2.4rem,4vw,3.2rem)] leading-none tracking-[-0.02em]" aria-hidden="true">
                  {s.n}
                </span>
                <h3 className="mt-3 text-[var(--color-ivory)] font-[var(--font-serif)] font-normal text-[1.15rem] leading-snug overflow-wrap-anywhere">
                  {s.title}
                </h3>
                <p className="mt-2 text-[var(--color-ivory-dim)] font-[var(--font-sans)] font-light text-[0.88rem] leading-[1.7] max-w-[34ch] overflow-wrap-anywhere">
                  {s.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
