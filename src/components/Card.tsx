/**
 * Card.tsx — Generic static content surface.
 *
 * Resting state carries the warm ember border + slightly brighter background
 * (the look it used to show only on hover). No hover lift, since the cards
 * aren't interactive. Pair with an <Icon> and a title/description per the
 * section data.
 */

import type { ReactNode } from "react"

interface CardProps {
  children: ReactNode
  className?: string
}

export default function Card({ children, className = "" }: CardProps) {
  return (
    <div
      className={`group relative h-full rounded-2xl border border-ember-400/30 bg-ink-800/60 p-7 backdrop-blur-sm ${className}`}
    >
      {children}
    </div>
  )
}
