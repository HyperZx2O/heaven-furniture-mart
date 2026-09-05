'use client'

import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger, SplitText } from '@/lib/gsap'
import type { RefObject } from 'react'

type SplitLinesOpts = {
  /** selector for the text element to split, scoped to container */
  selector: string
  /** what to split into — lines for masked rises, words for scrubbed quotes */
  splitType?: 'lines' | 'words'
  /** play once on enter (false) or tie progress to scroll (true | lag seconds) */
  scrub?: boolean | number
  start?: string
  end?: string
  stagger?: number
  duration?: number
  /** dimmed floor for scrubbed text (e.g. 0.18); ignored when scrub is false */
  dimFloor?: number
}

export function useSplitLines(
  container: RefObject<HTMLElement | null>,
  opts: SplitLinesOpts
) {
  const {
    selector,
    splitType = 'lines',
    scrub = false,
    start = 'top 80%',
    end = 'bottom 45%',
    stagger = 0.08,
    duration = 0.7,
    dimFloor = 0.18,
  } = opts

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const el = container.current?.querySelector<HTMLElement>(selector)
        if (!el) return

        let split: SplitText | null = null
        let tween: gsap.core.Tween | null = null
        let live = true

        const build = () => {
          tween?.kill()
          split?.revert()
          split = SplitText.create(el, {
            type: splitType,
            mask: splitType === 'lines' ? 'lines' : undefined,
          })
          const units = splitType === 'lines' ? split.lines : split.words
          if (!units?.length) return

          if (scrub === false) {
            gsap.set(units, { yPercent: 110, opacity: 1 })
            tween = gsap.to(units, {
              yPercent: 0,
              stagger,
              duration,
              ease: 'expo.out',
              scrollTrigger: { trigger: el, start, once: true },
              onComplete: () => split?.revert(),
            })
          } else {
            tween = gsap.fromTo(
              units,
              { opacity: dimFloor },
              {
                opacity: 1,
                stagger: 0.06,
                ease: 'none',
                scrollTrigger: { trigger: el, start, end, scrub },
              }
            )
          }
        }

        build()

        // re-split once webfonts land — line breaks measured under the
        // fallback font go stale after the swap
        if (typeof document !== 'undefined' && document.fonts) {
          document.fonts.ready.then(() => {
            if (!live) return
            build()
            ScrollTrigger.refresh()
          })
        }

        return () => {
          live = false
          tween?.kill()
          split?.revert()
        }
      })

      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set(container.current?.querySelector(selector) ?? [], {
          opacity: 1,
          yPercent: 0,
        } as gsap.TweenVars)
      })
    },
    { scope: container }
  )
}
