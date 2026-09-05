'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from '@/lib/gsap'

export function Counter() {
  const to = 500
  const suffix = '+'
  const ref = useRef<HTMLSpanElement>(null)
  const [display, setDisplay] = useState('0')
  const reduce =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  useEffect(() => {
    if (reduce || !ref.current) {
      setDisplay(String(to))
      return
    }
    const obj = { v: 0 }
    const tween = gsap.to(obj, {
      v: to,
      duration: 1.4,
      ease: 'power2.out',
      scrollTrigger: { trigger: ref.current, start: 'top 90%', once: true },
      onUpdate: () => setDisplay(String(Math.round(obj.v))),
    })
    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [to, reduce])

  if (reduce) {
    return <span ref={ref}>{to}{suffix}</span>
  }

  return (
    <span ref={ref} aria-label={`${to}${suffix} happy homeowners`}>
      {display}
      {suffix}
    </span>
  )
}
