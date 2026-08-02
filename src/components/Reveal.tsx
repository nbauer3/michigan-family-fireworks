/**
 * Reveal.tsx — Framer Motion scroll-into-view wrapper.
 *
 * Wraps children in a motion.div that fades + slides up subtly when it
 * enters the viewport, then stays visible (animates only once). This is
 * the single animation primitive every section reuses, so motion stays
 * consistent and tasteful across the site.
 *
 * Respect prefers-reduced-motion: Framer Motion automatically reads the
 * `useReducedMotion` value, but we also gate the variants so users who
 * disable motion simply see content at rest with no transform.
 */

import { motion, useReducedMotion } from "framer-motion"
import type { ReactNode } from "react"

interface RevealProps {
  children: ReactNode
  /** Delay in seconds before the animation starts once in view. */
  delay?: number
  /** Vertical offset to slide from, in px. */
  y?: number
  className?: string
}

export default function Reveal({ children, delay = 0, y = 24, className }: RevealProps) {
  const reduce = useReducedMotion()

  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.22, 1, 0.36, 1], // matches --ease-smooth in index.css
      }}
    >
      {children}
    </motion.div>
  )
}
