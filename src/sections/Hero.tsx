/**
 * Hero.tsx — Top hero section.
 *
 * Layout: full-height panel with a centered headline, tagline, and primary
 * CTA. The animated fireworks background is rendered once at the App level
 * (see App.tsx) as a fixed layer behind the entire page, so it stays
 * consistent during scrolling — the hero simply lets it show through.
 * A soft gradient fade at the bottom blends the hero into the next section
 * so the scroll feels continuous.
 */

import { motion } from "framer-motion"
import Button from "../components/Button"
import { site } from "../data/site"

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden"
    >
      {/* Vignette + bottom fade so content reads cleanly and the section
          blends into the one below it. The page-wide fixed fireworks
          (rendered in App.tsx) show through the transparent center. */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink-950/60 via-transparent to-ink-950" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_40%,transparent,rgba(6,8,20,0.7))]" />

      {/* Hero content */}
      <div className="container-site relative z-10 text-center">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-5 text-sm font-semibold uppercase tracking-[0.25em] text-ember-400"
        >
          {site.location}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="text-4xl sm:text-6xl lg:text-7xl text-cream-100"
        >
          {site.businessName}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-6 max-w-2xl text-lg sm:text-xl text-cream-200/85 leading-relaxed"
        >
          {site.tagline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Button as="a" href="#contact" size="lg">
            Get a Quote
          </Button>
          <Button as="a" href="#services" variant="secondary" size="lg">
            Our Shows
          </Button>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.a
        href="#services"
        aria-label="Scroll to services"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        // Bigger + brighter than before so the scroll affordance is obvious;
        // the chevron still sits inside a gentle tap target.
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 rounded-full p-2 text-cream-200/70 hover:text-ember-300"
      >
        <motion.svg
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-12 w-12"
        >
          <path d="m6 9 6 6 6-6" />
        </motion.svg>
      </motion.a>
    </section>
  )
}
