'use client'

import { useEffect } from 'react'
import ReactLenis, { useLenis } from 'lenis/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function LenisProvider({ children }: { children: React.ReactNode }) {
  const lenis = useLenis()

  useEffect(() => {
    if (!lenis) return
    const update = (time: number) => {
      // let the browser truly idle — only pump Lenis while scrolling or animating
      if (lenis.isScrolling || gsap.globalTimeline.isActive()) {
        lenis.raf(time * 1000)
      }
    }
    gsap.ticker.add(update)
    lenis.on('scroll', ScrollTrigger.update)

    return () => {
      gsap.ticker.remove(update)
      lenis.off('scroll', ScrollTrigger.update)
    }
  }, [lenis])

  return <ReactLenis root>{children}</ReactLenis>
}

/** Smooth in-page navigation through Lenis instead of native jumps. */
export function useScrollTo() {
  const lenis = useLenis()
  return (target: string) => {
    if (lenis) {
      lenis.scrollTo(target, { duration: 1.4 })
    } else {
      document.querySelector(target)?.scrollIntoView()
    }
  }
}
