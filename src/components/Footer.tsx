/**
 * Footer.tsx — Site footer with business info and quick links.
 *
 * Kept intentionally simple. All copy/contact info pulls from the central
 * `site` data object so there's a single place to update real details.
 * Contact methods are intentionally omitted — all correspondence goes
 * through the "Request a Quote" form in the Contact section.
 */

import { navLinks, site } from "../data/site"

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-ink-700/50 bg-ink-950">
      <div className="container-site py-14">
        <div className="mx-auto max-w-2xl">
          <div className="grid gap-10 md:grid-cols-2 md:grid-flow-col-dense">
            {/* Brand + tagline */}
            <div className="md:col-start-1 md:col-end-2 flex flex-col items-center md:items-start">
              <p className="font-display text-2xl text-cream-100 text-center md:text-left">{site.businessName}</p>
              <p className="mt-3 max-w-xs text-sm text-cream-200/70 leading-relaxed text-center md:text-left">
                {site.tagline}
              </p>
            </div>

            {/* Quick links */}
            <nav aria-label="Footer navigation" className="flex flex-col items-center md:items-end md:justify-self-center">
              <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-ember-400">
                Explore
              </p>
              <ul className="space-y-2.5 text-center md:text-right">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-sm text-cream-200/70 transition-colors hover:text-ember-300"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          {/* Bottom bar */}
          <div className="mt-12 border-t border-ink-700/40 pt-6">
            <p className="text-center text-xs text-cream-200/50">
              &copy; {year} {site.businessName}. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
