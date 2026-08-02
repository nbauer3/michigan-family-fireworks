/**
 * WhyChooseUs.tsx — Trust & safety features grid.
 *
 * Reinforces credibility with the four safety/experience pillars. Uses the
 * same Card primitive as Services so the visual language stays consistent.
 */

import { Section } from "../components/SectionHeading"
import SectionHeading from "../components/SectionHeading"
import Card from "../components/Card"
import Icon from "../components/Icon"
import Reveal from "../components/Reveal"
import { whyChooseUs } from "../data/site"

export default function WhyChooseUs() {
  return (
    <Section id="why-us">
      <SectionHeading
        eyebrow="Why Choose Us"
        title="Safety & Experience You Can Count On"
        subtitle="Fireworks are only memorable when they're safe. We handle the permits, planning, and firing so you can enjoy the show worry-free."
      />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {whyChooseUs.map((feature, i) => (
          <Reveal key={feature.title} delay={i * 0.08}>
            <Card>
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-ember-400/15 text-ember-400">
                <Icon name={feature.icon} className="h-6 w-6" />
              </div>
              <h3 className="text-lg text-cream-100">{feature.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-cream-200/70">
                {feature.description}
              </p>
            </Card>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
