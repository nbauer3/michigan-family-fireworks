/**
 * Gallery.tsx — Side-by-side image carousel + a local highlight video.
 *
 * Layout:
 *   - A horizontal carousel showing 3 (lg) / 2 (sm) / 1 (xs) images at once.
 *     Left/right arrow buttons advance one slide at a time and loop around.
 *   - Below the carousel, a locally-hosted fireworks highlight video
 *     (src/assets/fireworks.mp4) plays with native controls. Swap the file
 *     to change the clip — no embed URL needed.
 *
 * Implementation detail: the track is a flex row translated via a
 * percentage offset; arrow buttons compute the next page index from the
 * responsive `perPage` value. Deliberately lightweight (no carousel/lib)
 * so it stays easy to maintain.
 */

import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Section } from "../components/SectionHeading"
import SectionHeading from "../components/SectionHeading"
import Reveal from "../components/Reveal"
import Button from "../components/Button"
import Icon from "../components/Icon"
import { galleryImages, site } from "../data/site"
// Local video asset. Vite hashes & emits it to /assets at build time.
// `vite/client` types (see tsconfig.app.json) declare *.mp4 modules.
import fireworksVideo from "../assets/fireworks.mp4"

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

  // Highlight video: track playing state so a large overlay play button
  // can invite the first click and hide once playback starts.
  const videoRef = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)

  // Toggle play/pause. Used by the big overlay button.
  const togglePlay = () => {
    const v = videoRef.current
    if (!v) return
    if (v.paused) {
      void v.play()
    } else {
      v.pause()
    }
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
            className="absolute left-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-ink-700/70 bg-ink-950/70 text-cream-100 backdrop-blur-sm transition-colors hover:border-ember-400/60 hover:text-ember-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-ember-400"
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
                  <img
                    src={img.src}
                    alt={img.alt}
                    loading={i < perPage ? "eager" : "lazy"}
                    className="aspect-[4/3] w-full object-cover"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950/70 via-transparent to-transparent opacity-60" />
                  <figcaption className="absolute bottom-0 left-0 right-0 p-4 text-sm text-cream-100/90">
                    {img.alt}
                  </figcaption>
                </figure>
              ))}
            </motion.div>
          </div>

          {/* Right arrow */}
          <button
            type="button"
            onClick={next}
            aria-label="Next images"
            className="absolute right-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-ink-700/70 bg-ink-950/70 text-cream-100 backdrop-blur-sm transition-colors hover:border-ember-400/60 hover:text-ember-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-ember-400"
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

      {/* Locally-hosted highlight video.
          A large overlay play button sits centered before the first play so
          users don't have to hunt for the small native control. Once playing,
          the overlay fades out; native controls remain available for volume /
          scrubbing. Clicking the video toggles play/pause. */}
      <Reveal className="mt-12">
        <div className="group relative aspect-video w-full overflow-hidden rounded-2xl border border-ink-700/60 bg-ink-800/40">
          <video
            ref={videoRef}
            src={fireworksVideo}
            title=""
            controls
            playsInline
            preload="metadata"
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            onEnded={() => setPlaying(false)}
            className="h-full w-full"
          />

          {/* Big center play button — only visible before the video starts,
              fades out once playing. Clicking it starts playback. */}
          <AnimatePresence>
            {!playing && (
              <motion.button
                type="button"
                onClick={togglePlay}
                aria-label="Play highlight reel"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                // Dim the whole frame slightly so the gold button pops, then
                // the dim clears as the button fades out.
                className="absolute inset-0 flex items-center justify-center bg-ink-950/30 backdrop-blur-[1px] transition-colors hover:bg-ink-950/20"
              >
                <span className="flex h-20 w-20 items-center justify-center rounded-full bg-ember-400 text-ink-950 shadow-xl shadow-ember-500/40 ring-8 ring-ember-400/20 transition-transform duration-300 group-hover:scale-110">
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="ml-1 h-9 w-9"
                    aria-hidden="true"
                  >
                    <path d="m7 4 14 8L7 20V4Z" />
                  </svg>
                </span>
              </motion.button>
            )}
          </AnimatePresence>
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
