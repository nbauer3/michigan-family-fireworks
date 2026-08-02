/**
 * Navbar.tsx — Sticky top navigation with scroll-aware styling.
 *
 * Behavior:
 *   - Transparent over the hero, then condenses to a solid blurred bar
 *     once the user scrolls down (tracked via a scroll listener).
 *   - Logo text links back to #top.
 *   - Mobile menu toggles open/closed (animated with Framer Motion).
 *
 * Accessibility:
 *   - Nav links render as anchors with `aria-label`s where needed.
 *   - Mobile toggle button has an accessible aria-expanded state.
 */

import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { navLinks, site } from "../data/site"

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  // Toggle the solid style after scrolling 40px.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll() // set initial state
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Lock body scroll when the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [menuOpen])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-ink-950/85 backdrop-blur-md border-b border-ink-700/50 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <nav className="container-site flex items-center justify-between" aria-label="Main navigation">
        {/* Logo / business name — full name shows on every breakpoint,
            shrunk slightly on the smallest screens so it fits portrait. */}
        <a href="#top" className="flex items-center gap-2.5 font-display text-cream-100">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-ember-400 text-ink-950 font-bold">
            {site.shortName.charAt(0)}
          </span>
          <span className="text-sm sm:text-lg md:text-xl">{site.businessName}</span>
        </a>

        {/* Desktop nav links */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm font-medium text-cream-200/80 transition-colors hover:text-ember-300"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="md:hidden flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-lg text-cream-100 hover:text-ember-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-ember-400"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span
            className={`block h-0.5 w-6 bg-current transition-transform duration-300 ${
              menuOpen ? "translate-y-2 rotate-45" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-current transition-opacity duration-300 ${
              menuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-current transition-transform duration-300 ${
              menuOpen ? "-translate-y-2 -rotate-45" : ""
            }`}
          />
        </button>
      </nav>

      {/* Mobile dropdown menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden overflow-hidden bg-ink-950/95 backdrop-blur-md border-t border-ink-700/50"
          >
            <ul className="container-site flex flex-col gap-1 py-4">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="block rounded-lg px-4 py-3 text-base font-medium text-cream-200/90 hover:bg-ink-800 hover:text-ember-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
