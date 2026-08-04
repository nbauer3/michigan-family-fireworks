/**
 * Gallery.tsx — Image carousel.
 *
 * Layout:
 *   - A horizontal carousel showing 3 (lg) / 2 (sm) / 1 (xs) images at once.
 *     Left/right arrow buttons advance one slide at a time and loop around.
 */

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { Section } from "../components/SectionHeading"
import SectionHeading from "../components/SectionHeading"
import Reveal from "../components/Reveal"
import Button from "../components/Button"
import Icon from "../components/Icon"
import { galleryImages, site } from "../data/site"
import lakeVideo from "../assets/videos/Lake-Neppesing-compressed.mp4"

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
  const [videoPlaying, setVideoPlaying] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const next = () => setPage((p) => (p + 1) % pages)
  const prev = () => setPage((p) => (p - 1 + pages) % pages)

  const toggleVideo = () => {
    if (!videoRef.current) return
    if (videoPlaying) {
      videoRef.current.pause()
    } else {
      videoRef.current.play()
    }
    setVideoPlaying(!videoPlaying)
  }

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

      {/* Video showcase */}
      <Reveal className="mt-10">
        <div className="flex justify-center">
          <div className="relative rounded-2xl overflow-hidden border border-ink-700/50 bg-ink-950 max-w-md mx-auto">
            <video
              ref={videoRef}
              src={lakeVideo}
              controls
              loop
              muted
              className="w-full h-auto object-contain"
              poster="/og-image.jpg"
              onPlay={() => setVideoPlaying(true)}
              onPause={() => setVideoPlaying(false)}
            />
            {!videoPlaying && (
              <>
                {/* Caption overlay - positioned just above play button */}
                <div className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-full mb-6 z-10 px-3 py-1 rounded-full bg-ink-950/80 text-cream-100 text-xs font-medium backdrop-blur-sm pointer-events-none">
                  Lake Neppesing — 4th of July '26
                </div>
                {/* Play button overlay */}
                <button
                  type="button"
                  onClick={toggleVideo}
                  aria-label="Play video"
                  className="absolute inset-0 flex items-center justify-center bg-ink-950/50 hover:bg-ink-950/30 transition-colors"
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-ember-400/90 text-ink-950 shadow-xl shadow-ember-500/30 hover:bg-ember-400 hover:scale-105 transition-transform" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="h-8 w-8 ml-1">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </button>
              </>
            )}
          </div>
        </div>
      </Reveal>

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