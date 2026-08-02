/**
 * About.tsx — Short brand story panel.
 *
 * Two-column layout on desktop: a headline + paragraph on the left and a
 * stat/trust strip on the right. Content is placeholder — edit the
 * `site` data file or replace this copy directly with the real story.
 */

import { Section } from "../components/SectionHeading"
import SectionHeading from "../components/SectionHeading"
import Reveal from "../components/Reveal"

// Placeholder stats — swap these for real figures when available.
const stats = [
  { value: "100+", label: "Shows delivered" },
  { value: "30+", label: "Years of family experience" },
  { value: "100%", label: "Permitted & insured" },
]

export default function About() {
  return (
    <Section id="about" ember>
      <SectionHeading
        eyebrow="About Us"
        title="A Michigan Family That Lights Up the Night"
        align="left"
      />

      <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
        <Reveal>
          <div className="space-y-5 text-base leading-relaxed text-cream-200/80">
            <p>
              Michigan Family Fireworks is a family-owned display company based in
              Leonard, bringing professional-caliber pyrotechnics to celebrations across
              the state for over 30 years. We believe a great show is equal parts
              artistry and safety — choreographed bursts that wow a crowd, fired by a crew
              that treats every site with care.
            </p>
            <p>
              From the first spark to the grand finale, we plan every display around your
              venue, your audience, and your vision. Licensed, insured, and proudly local,
              we're here to make your next event one people talk about for years.
            </p>
          </div>
        </Reveal>

        {/* Stat strip — a quick visual that reinforces trust. */}
        <Reveal delay={0.15}>
          <div className="grid grid-cols-3 gap-4 lg:gap-6">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-ink-700/60 bg-ink-800/40 p-6 text-center backdrop-blur-sm"
              >
                <p className="font-display text-3xl text-ember-400 md:text-4xl">{stat.value}</p>
                <p className="mt-2 text-xs uppercase tracking-wider text-cream-200/60">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </Section>
  )
}
