/**
 * FloatingQuoteButton.tsx — Floating "Get a Quote" CTA.
 *
 * A rounded pill button fixed to the bottom-right corner that appears once
 * the user scrolls past the hero (so it doesn't fight with the hero's own
 * CTA). Smooth-scrolls to the contact section.
 *
 * This is the primary persistent call-to-action across the whole page, so
 * it's a labeled button (not a tiny icon) for clarity.
 */

import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"

export default function FloatingQuoteButton() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href="#contact"
          aria-label="Get a quote"
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-6 right-6 z-40 flex items-center gap-2 rounded-full bg-ember-400 px-6 py-3.5 text-sm font-semibold text-ink-950 shadow-lg shadow-ember-500/40 ring-4 ring-ember-400/20 hover:bg-ember-500 hover:scale-105 transition-transform focus:outline-none focus-visible:ring-2 focus-visible:ring-ember-300 md:bottom-8 md:right-8 md:text-base"
        >
          {/* A small sparkburst glyph next to the label */}
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4"
            aria-hidden="true"
          >
            <path d="M12 4v3M12 17v3M4 12h3M17 12h3M6.3 6.3 8.3 8.3M15.7 15.7l2 2M17.7 6.3l-2 2M8.3 15.7l-2 2" />
            <circle cx="12" cy="12" r="1.5" />
          </svg>
          Get a Quote
        </motion.a>
      )}
    </AnimatePresence>
  )
}
