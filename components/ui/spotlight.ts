'use client'

import type { MouseEvent } from 'react'

/** Shared cursor-spotlight for hoverable cards — tracks --x/--y for the radial glow. */
export function spotlightMove(e: MouseEvent<HTMLElement>) {
  const r = e.currentTarget.getBoundingClientRect()
  e.currentTarget.style.setProperty('--x', `${e.clientX - r.left}px`)
  e.currentTarget.style.setProperty('--y', `${e.clientY - r.top}px`)
}
