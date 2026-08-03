/**
 * Gallery.tsx — Image carousel.
 *
 * Layout:
 *   - A horizontal carousel showing 3 (lg) / 2 (sm) / 1 (xs) images at once.
 *     Left/right arrow buttons advance one slide at a time and loop around.
 */

import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Section } from "../components/SectionHeading"
import SectionHeading from "../components/SectionHeading"
import Reveal from "../components/Reveal"
import Button from "../components/Button"
import Icon from "../components/Icon"
import { galleryImages, site } from "../data/site"

// Page size at each breakpoint. Tailwind's responsive utilities switch the
// visible item count; these JS constants must match. We compute perPage from
// window width so the math is right on both desktop and mobile.
const PER_SMALL = 2
const PER_LARGE = 3

function usePerPage() {
  // Compute items-per-page from viewport width; matches the Tailwind
  // breakpoints used below (1 below 640px, 2 below 1024px, 3 otherwise).
  const compute = () =>
    typeof window !== "undefined" && window.innerWidth < 640
      ? 1
      : window.innerWidth < 1024
        ? PER_SMALL
        : PER_LARGE

  const [perPage, setPerPage] = useState<number>(compute)

  // Keep in sync on resize, and clean the listener up on unmount.
  useEffect(() => {
    const onResize = () => setPerPage(compute())
    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return perPage
}

export default function Gallery() {
  const perPage = usePerPage()
  const pages = Math.max(1, galleryImages.length - perPage + 1)
  const [page, setPage] = useState(0)

  const next = () => setPage((p) => (p + 1) % pages)
  const prev = () => setPage((p) => (p - 1 + pages) % pages)

  return (
    <Section id="gallery">
      <SectionHeading
        eyebrow="Gallery"
        title="Highlights From Recent Shows"
        subtitle="A glimpse of the displays we've designed for weddings, holidays, and private celebrations across Michigan."
      />

      {/* Carousel: overflow-hidden viewport + a translated flex track. */}
      <Reveal>
        <div className="relative">
          {/* Left arrow */}
          <button
            type="button"
            onClick={prev}
            aria-label="Previous images"
            className="absolute left-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-ink-500/90 bg-ink-900/90 text-cream-100 backdrop-blur-sm transition-colors hover:border-ember-400 hover:bg-ink-800 hover:text-ember-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-ember-400"
          >
            <Icon name="arrow" className="h-5 w-5 rotate-180" />
          </button>

          {/* Viewport */}
          <div className="overflow-hidden rounded-2xl">
            <motion.div
              className="flex gap-4"
              // Moving one slide over = (track width + one 16px gap) / perPage.
              // This is exact (accounts for the flex gap), so later pages
              // don't drift.
              animate={{ x: `calc(${-page} * (100% + 16px) / ${perPage})` }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              {galleryImages.map((img, i) => (
                <figure
                  key={img.src}
                  // Each slide is perPage fraction of the track width.
                  style={{ width: `calc((100% - ${(perPage - 1) * 16}px) / ${perPage})` }}
                  className="relative shrink-0 overflow-hidden rounded-2xl border border-ink-700/50"
                >
                  {/* Fixed-height wrapper that handles both landscape & portrait */}
                  <div className="h-[360px] w-full flex items-center justify-center bg-ink-950 relative">
                    <img
                      src={img.src}
                      alt={img.alt}
                      loading={i < perPage ? "eager" : "lazy"}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                </figure>
              ))}
            </motion.div>
          </div>

          {/* Right arrow */}
          <button
            type="button"
            onClick={next}
            aria-label="Next images"
            className="absolute right-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-ink-500/90 bg-ink-900/90 text-cream-100 backdrop-blur-sm transition-colors hover:border-ember-400 hover:bg-ink-800 hover:text-ember-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-ember-400"
          >
            <Icon name="arrow" className="h-5 w-5" />
          </button>
        </div>
      </Reveal>

      {/* Dot indicators */}
      <div className="mt-5 flex justify-center gap-2" role="tablist" aria-label="Gallery page">
        {Array.from({ length: pages }).map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Go to page ${i + 1}`}
            aria-selected={page === i}
            onClick={() => setPage(i)}
            className={`h-2 rounded-full transition-all ${
              page === i ? "w-6 bg-ember-400" : "w-2 bg-ink-600 hover:bg-ink-500"
            }`}
          />
        ))}
      </div>

      {/* Secondary CTA nudging toward social */}
      <Reveal className="mt-10 text-center">
        <Button as="a" href={site.facebookUrl} variant="secondary" target="_blank" rel="noopener noreferrer">
          See More on Facebook
          <Icon name="arrow" className="h-4 w-4" />
        </Button>
      </Reveal>
    </Section>
  )
}