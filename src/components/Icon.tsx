/**
 * Icon.tsx — Lightweight inline SVG icon set.
 *
 * A single component that renders one of several line icons by name.
 * Keeping icons inline (instead of an icon library) avoids an extra
 * dependency and lets every icon inherit `currentColor` and size from
 * Tailwind classes. Add new icons by extending the `icons` map below.
 */

import type { JSX, SVGProps } from "react"

/** All icon keys used elsewhere in the app. */
export type IconName =
  | "sparkles"
  | "heart"
  | "flag"
  | "star"
  | "badge"
  | "shield"
  | "users"
  | "map"
  | "facebook"
  | "arrow"
  | "phone"
  | "mail"
  | "check"
  | "loader"

const icons: Record<IconName, JSX.Element> = {
  sparkles: (
    <>
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4" />
      <path d="M6.3 6.3 8.5 8.5M15.5 15.5l2.2 2.2M17.7 6.3 15.5 8.5M8.5 15.5l-2.2 2.2" />
    </>
  ),
  heart: <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8Z" />,
  flag: (
    <>
      <path d="M4 21V4M4 4h11l-2 4 2 4H4" />
    </>
  ),
  star: <path d="m12 3 2.7 5.5 6 .9-4.3 4.2 1 6L12 16.8 6.6 19.6l1-6L3.3 9.4l6-.9L12 3Z" />,
  badge: (
    <>
      <circle cx="12" cy="9" r="6" />
      <path d="m9 14-1.5 7L12 19l4.5 2L15 14" />
      <path d="m9.5 9 1.7 1.7 3.3-3.4" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3 4 6v6c0 4.5 3.4 8.3 8 9 4.6-.7 8-4.5 8-9V6l-8-3Z" />
      <path d="m9 12 2 2 4-4" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="8" r="3" />
      <path d="M3 20a6 6 0 0 1 12 0M16 5.5a3 3 0 0 1 0 5M17 20a6 6 0 0 0-3-5.2" />
    </>
  ),
  map: (
    <>
      <path d="M9 4 3 6v14l6-2 6 2 6-2V4l-6 2-6-2Z" />
      <path d="M9 4v14M15 6v14" />
    </>
  ),
  facebook: <path d="M14 8.5h2.5V5H14c-2 0-3.5 1.5-3.5 3.5V11H8v3.5h2.5V22h3.5v-7.5h2.5L17 11h-3V8.5c0-.6.4-1 1-1Z" />,
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  phone: <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" />,
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </>
  ),
  check: <path d="m5 12 5 5L20 7" />,
  loader: (
    <>
      <path d="M12 3v3M12 18v3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M3 12h3M18 12h3M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" />
    </>
  ),
}

interface IconProps extends SVGProps<SVGSVGElement> {
  name: IconName
  /** Tailwind size classes; defaults to a 24px box. */
  className?: string
}

export default function Icon({ name, className = "h-6 w-6", ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      {...props}
    >
      {icons[name]}
    </svg>
  )
}
