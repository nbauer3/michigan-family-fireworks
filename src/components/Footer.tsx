/**
 * Footer.tsx — Site footer with business info and quick links.
 *
 * Kept intentionally simple. All copy/contact info pulls from the central
 * `site` data object so there's a single place to update real details.
 */

import { navLinks, site } from "../data/site"
import Icon from "./Icon"

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-ink-700/50 bg-ink-950">
      <div className="container-site py-14">
        <div className="grid gap-10 md:grid-cols-3">
          {/* Brand + tagline */}
          <div>
            <p className="font-display text-2xl text-cream-100">{site.businessName}</p>
            <p className="mt-3 max-w-xs text-sm text-cream-200/70 leading-relaxed">
              {site.tagline}
            </p>
            <p className="mt-4 inline-flex items-center gap-2 text-sm text-cream-200/60">
              <Icon name="map" className="h-4 w-4 text-ember-400" />
              {site.location}
            </p>
          </div>

          {/* Quick links */}
          <nav aria-label="Footer navigation" className="md:justify-self-center">
            <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-ember-400">
              Explore
            </p>
            <ul className="space-y-2.5">
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
    </footer>
  )
}
