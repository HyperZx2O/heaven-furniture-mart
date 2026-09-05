'use client'

import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/gsap'
import type { RefObject } from 'react'

type RevealOpts = {
  selector: string
  y?: number
  stagger?: number
  duration?: number
  trigger?: string // selector for ScrollTrigger trigger, defaults to container
  start?: string
  /** unveil through a shrinking clip-path inset as well as fade/rise */
  clip?: boolean
}

export function useReveal(container: RefObject<HTMLElement | null>, opts: RevealOpts) {
  const { selector, y = 14, stagger = 0.06, duration = 0.4, trigger, start = 'top 80%', clip = false } = opts
  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const els = container.current?.querySelectorAll<HTMLElement>(selector)
        if (!els?.length) return
        gsap.set(els, {
          opacity: 0,
          y,
          ...(clip ? { clipPath: 'inset(12% 8% 12% 8%)' } : {}),
        })
        gsap.to(els, {
          opacity: 1,
          y: 0,
          ...(clip ? { clipPath: 'inset(0% 0% 0% 0%)' } : {}),
          stagger,
          duration: clip ? 0.8 : duration,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: trigger ? container.current?.querySelector(trigger) ?? container.current : container.current,
            start,
          },
        })
      })
      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set(container.current?.querySelectorAll(selector) ?? [], { opacity: 1, y: 0, clipPath: 'inset(0% 0% 0% 0%)' })
      })
    },
    { scope: container }
  )
}
