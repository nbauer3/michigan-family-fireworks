/**
 * Section.tsx — Standard page section wrapper.
 *
 * Provides:
 *   - an `id` for anchor navigation
 *   - the shared `.container-site` width/padding
 *   - optional `.ember-gradient` accent background
 *   - vertical spacing tuned for rhythm between sections
 *
 * Pass `className` to override padding when a section needs to bleed
 * full-width internally (e.g. a Gallery). Most sections shouldn't need it.
 */

import type { ReactNode } from "react"

interface SectionProps {
  id?: string
  children: ReactNode
  /** Adds the soft radial ember glow behind the section. */
  ember?: boolean
  className?: string
}

export default function Section({ id, children, ember = false, className = "" }: SectionProps) {
  return (
    <section
      id={id}
      className={`relative py-20 md:py-28 ${ember ? "ember-gradient" : ""} ${className}`}
    >
      <div className="container-site">{children}</div>
    </section>
  )
}
