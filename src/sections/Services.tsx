/**
 * Services.tsx — "What We Do" event types, shown as a simple list.
 *
 * Previously cards; now a clean multi-column list of the 12 event types the
 * business covers. To return to cards later, restore title/description/icon
 * data in `whatWeDo` and swap this grid back to <Card> components.
 */

import { Section } from "../components/SectionHeading"
import SectionHeading from "../components/SectionHeading"
import Reveal from "../components/Reveal"
import Button from "../components/Button"
import { whatWeDo } from "../data/site"

export default function Services() {
  return (
    <Section id="services" ember>
      <SectionHeading
        eyebrow="What We Do"
        title="Fireworks Displays Built for Your Moment"
        subtitle="From intimate backyard celebrations to choreographed community shows, every display is planned, permitted, and fired by our experienced crew. Here are the events we bring to life."
      />

      {/* Multi-column list of event types. Each row: a small ember dot +
          the event name. Columns collapse from 3 → 2 → 1 on smaller screens. */}
      <Reveal>
        <ul className="grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
          {whatWeDo.map((event) => (
            <li key={event} className="flex items-center gap-3 text-base text-cream-100">
              <span className="flex h-2 w-2 shrink-0 rounded-full bg-ember-400" />
              <span>{event}</span>
            </li>
          ))}
        </ul>
      </Reveal>

      <Reveal className="mt-10 text-center" delay={0.1}>
        <Button as="a" href="#contact" size="md">
          Request a Quote
        </Button>
      </Reveal>
    </Section>
  )
}
