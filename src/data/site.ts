/**
 * site.ts — Single source of truth for site content & config.
 *
 * Edit the values here (text, links, service cards, etc.) and the
 * changes propagate across the whole site. Keeping content in one file
 * makes thesections/ and components/ folders hold pure layout/logic.
 */

export const site = {
  businessName: "Michigan Family Fireworks",
  shortName: "MFF",
  tagline: "Professional Fireworks Displays for Any Occasion",
  location: "Leonard, Michigan",
  email: "hello@michiganfamilyfireworks.com", // replace with real address
  phone: "(XXX) XXX-XXXX", // replace with real number
  facebookUrl: "https://www.facebook.com/michiganfamilyfireworks", // replace with real page URL
  videoEmbedUrl: 'https://www.facebook.com/plugins/video.php?height=314&href=https%3A%2F%2Fwww.facebook.com%2Freel%2F1545430607253778%2F&show_text=false&width=560&t=53',
} as const

/** Nav links used by the sticky navbar and footer. */
export const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Why Us", href: "#why-us" },
  { label: "About", href: "#about" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
] as const

/** Why-Choose-Us feature data. */
export const whyChooseUs = [
  {
    title: "Licensed & Compliant",
    description:
      "Fully insured and permitted. We follow all Michigan and federal regulations for outdoor displays.",
    icon: "badge",
  },
  {
    title: "Safety-Focused Operations",
    description:
      "Every show is planned with clear safety zones, setbacks, and a trained firing crew.",
    icon: "shield",
  },
  {
    title: "30+ Years of Family Experience",
    description:
      "Over three decades of family-run displays for private, municipal, and corporate events.",
    icon: "users",
  },
  {
    title: "Local Michigan Business",
    description:
      "Family-owned and proud to light up communities across the Great Lakes State.",
    icon: "map",
  },
] as const

/**
 * "What We Do" — the full list of event types the business covers.
 * Rendered as a simple list (not cards) in the Services section. To go back
 * to feature cards, restore a title/description/icon structure and update
 * Services.tsx to use <Card> again.
 */
export const whatWeDo = [
  "4th of July",
  "New Year's",
  "Graduations",
  "Birthdays",
  "Weddings",
  "Memorials",
  "Reunions",
  "Festivals",
  "Sporting Events",
  "Private Parties",
  "Gender Reveals",
  "Grand Openings",
] as const

/**
 * Customer reviews shown in the Reviews section (3-row × 2-column grid).
 *
 * NOTE ON FACEBOOK REVIEWS:
 * Facebook does not expose page reviews publicly — the reviews URL requires
 * a login, and Meta's Graph API needs a Page access token + app review to
 * read ratings. So reviews are hand-maintained: copy real quotes from the
 * Facebook page into this array.
 *
 * ORDERING: the grid fills row-by-row (two per row). The two long reviews
 * sit in separate columns of row 1 (David | Becky), with the four shorter
 * reviews filling rows 2–3 so each column ends up with one long + two short
 * and the columns stay ~equal height:
 *   Row 1: David (long)  | Becky (long)
 *   Row 2: Mike (short)  | Carol (short)
 *   Row 3: Susan (short) | Jeremy (short)
 */
export interface Review {
  name: string
  date?: string
  rating: number
  text: string
}

export const reviews: Review[] = [
  {
    name: "David",
    rating: 5,
    text: "Michigan Family Fireworks put on the best firework show I have ever seen. I had the opportunity to see them shoot a show for a graduation party and it was better than any 4th of July show I have ever seen. It was over 10 years ago and people still talk about it today!!!!",
  },
  {
    name: "Becky",
    rating: 5,
    text: "Michigan Family Fireworks has top quality fireworks and experienced staff. They do a great job at a reasonable price. Overall, great experience. I highly recommend them for private firework shows as well as large scale events!",
  },
  {
    name: "Mike",
    rating: 5,
    text: "Best firework show I've ever seen.",
  },
  {
    name: "Carol",
    rating: 5,
    text: "Thanks for providing a fabulous show! Definitely a crowd pleaser!",
  },
  {
    name: "Susan",
    rating: 5,
    text: "Great shows, reasonable cost, and reliable, professional people.",
  },
  {
    name: "Jeremy",
    rating: 5,
    text: "Shows I have attended have been top of the line! Outstanding displays and choreography!",
  },
]

/**
 * Gallery images. These use Unsplash "Source" style URLs so you get real
 * fireworks photos without an API key. Swap these for your own photos by
 * replacing the `src` values with local imports from src/assets.
 */
export const galleryImages = [
  {
    src: "https://images.unsplash.com/photo-1533230408708-8f9f91d1235a?auto=format&fit=crop&w=800&q=80",
    alt: "Attica Placeholder",
  },
  {
    src: "https://images.unsplash.com/photo-1533219057257-4bb9ed5d2cc6?auto=format&fit=crop&w=800&q=80",
    alt: "Valley View Placeholder",
  },
  {
    src: "https://images.unsplash.com/photo-1531686264889-56fdcabd163f?auto=format&fit=crop&w=800&q=80",
    alt: "Lake Neppesing Placeholder",
  },
  {
    src: "https://images.unsplash.com/photo-1549194400-06e6874c2fd1?auto=format&fit=crop&w=800&q=80",
    alt: "Placeholder 4",
  },
  {
    src: "https://images.unsplash.com/photo-1503803508152-7790ae3cb125?auto=format&fit=crop&w=800&q=80",
    alt: "Placeholder 5",
  },
  {
    src: "https://images.unsplash.com/photo-1560986752-2e31d9507413?auto=format&fit=crop&w=800&q=80",
    alt: "Placeholder 6",
  },
  {
    src: "https://images.unsplash.com/photo-1545505567-7327366a634d?auto=format&fit=crop&w=800&q=80",
    alt: "Placeholder 7",
  },
] as const

/** Options for the Event Type dropdown on the contact form. */
export const eventTypes = [
  "Private Event",
  "Wedding",
  "Holiday Display",
  "Custom Show",
  "Other",
] as const
