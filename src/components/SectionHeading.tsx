/**
 * SectionHeading.tsx — Consistent eyebrow + title + subtitle block.
 *
 * Used at the top of every content section so titles line up visually
 * across the page. The Reveal wrapper handles the scroll-in animation.
 */

import Section from "./Section"
import Reveal from "./Reveal"

interface SectionHeadingProps {
  eyebrow: string
  title: string
  subtitle?: string
  align?: "center" | "left"
}

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
}: SectionHeadingProps) {
  const alignment = align === "center" ? "text-center mx-auto" : "text-left"

  return (
    <div className={`max-w-2xl ${alignment} mb-14`}>
      <Reveal>
        {/* Eyebrow: small gold label above the title */}
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-ember-400">
          {eyebrow}
        </p>
      </Reveal>
      <Reveal delay={0.1}>
        <h2 className="text-3xl md:text-4xl lg:text-5xl">{title}</h2>
      </Reveal>
      {subtitle && (
        <Reveal delay={0.2}>
          <p className="mt-5 text-base md:text-lg text-cream-200/80 leading-relaxed">
            {subtitle}
          </p>
        </Reveal>
      )}
    </div>
  )
}

// Re-export Section so sections that import both can pull from one place.
export { Section }
