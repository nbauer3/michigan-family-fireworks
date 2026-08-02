/**
 * Social.tsx — Call-to-action band linking to Facebook.
 *
 * A compact, single-focus panel that encourages visitors to explore more
 * content on social. Kept light so it doesn't compete with the Gallery or
 * the Contact section.
 */

import { Section } from "../components/SectionHeading"
import Reveal from "../components/Reveal"
import Button from "../components/Button"
import Icon from "../components/Icon"
import { site } from "../data/site"

export default function Social() {
  return (
    <Section id="social" ember>
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl border border-ink-700/60 bg-ink-800/40 p-10 text-center md:p-16">
          <Icon name="facebook" className="mx-auto mb-6 h-12 w-12 text-ember-400" />
          <h2 className="text-2xl md:text-3xl">Follow the Shows</h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-cream-200/75 leading-relaxed">
            We share videos, photos, and behind-the-scenes content from our latest
            displays on Facebook. Tag along to see what's launching next.
          </p>
          <div className="mt-8">
            <Button
              as="a"
              href={site.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              size="lg"
            >
              <Icon name="facebook" className="h-5 w-5" />
              Visit Us on Facebook
            </Button>
          </div>
        </div>
      </Reveal>
    </Section>
  )
}
