/**
 * Reviews.tsx — Customer reviews in a 3-row × 2-column grid.
 *
 * NOTE ON FACEBOOK REVIEWS:
 * Facebook does not expose page reviews publicly. The reviews URL requires
 * a login, and Meta's Graph API needs a Page access token + app review to
 * read ratings. So reviews are hand-maintained — copy real quotes from the
 * Facebook page into the `reviews` array in src/data/site.ts.
 *
 * Grid: max 2 columns (3 rows). On mobile it collapses to a single column.
 * Review order in the data array fills the grid row-by-row; see the comment
 * above `reviews` in site.ts for the balancing rationale.
 *
 * Placement: this sits between Social and Contact so social proof (reviews)
 * flows naturally from the Facebook call-to-action and lands right before the
 * "Request a Quote" form — a visitor who just read happy customers is in the
 * best moment to inquire.
 */

import { Section } from "../components/SectionHeading"
import SectionHeading from "../components/SectionHeading"
import Reveal from "../components/Reveal"
import Icon from "../components/Icon"
import Button from "../components/Button"
import { reviews, site } from "../data/site"

export default function Reviews() {
  return (
    <Section id="reviews" ember>
      <SectionHeading
        eyebrow="Reviews"
        title="What Our Clients Say"
        subtitle="Real words from the families and event organizers we've had the joy of working with."
      />

      {/* 3-row × 2-col grid of review cards (collapses to 1 col on mobile).
          Cards use `items-stretch` (grid default) so each row's two cards
          share the row height — keeps the longer review from leaving its
          shorter neighbor looking empty. */}
      <div className="grid gap-6 md:grid-cols-2">
        {reviews.map((review, i) => (
          <Reveal key={`${review.name}-${i}`} delay={(i % 2) * 0.08}>
            <figure className="flex h-full flex-col rounded-2xl border border-ember-400/30 bg-ink-800/70 p-6 backdrop-blur-sm">
              {/* Quotation mark accent */}
              <blockquote className="flex-1">
                <p className="text-sm leading-relaxed text-cream-200/85">
                  &ldquo;{review.text}&rdquo;
                </p>
              </blockquote>
              <figcaption className="mt-5 border-t border-ink-700/50 pt-4">
                <p className="text-sm font-semibold text-cream-100">&minus; {review.name}</p>
                {review.date && (
                  <p className="mt-0.5 text-xs text-cream-200/50">{review.date}</p>
                )}
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>

      {/* CTA to read more reviews on Facebook */}
      <Reveal className="mt-10 text-center">
        <Button
          as="a"
          href={`${site.facebookUrl}/reviews`}
          variant="secondary"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Icon name="facebook" className="h-4 w-4" />
          Read More Reviews on Facebook
        </Button>
      </Reveal>
    </Section>
  )
}
