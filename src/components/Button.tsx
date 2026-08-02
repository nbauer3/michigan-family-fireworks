/**
 * Button.tsx — Reusable button that can render as a real <button>
 * or as an <a> (for anchor links / smooth scroll).
 *
 * Variants:
 *   primary   — solid ember/gold, used on dark backgrounds
 *   secondary  — transparent with border, light text
 *   ghost      — minimal, for less prominent actions
 *
 * Sizes:
 *   sm | md | lg
 */

import type { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from "react"

type Variant = "primary" | "secondary" | "ghost"
type Size = "sm" | "md" | "lg"

const base =
  "inline-flex items-center justify-center gap-2 font-medium rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-ember-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950 disabled:opacity-60 disabled:pointer-events-none"

const variants: Record<Variant, string> = {
  // Solid gold — dark text reads well on the warm fill.
  primary:
    "bg-ember-400 text-ink-950 hover:bg-ember-500 shadow-lg shadow-ember-500/20 hover:shadow-ember-500/30",
  // Outlined — for use over busy/hero backgrounds.
  secondary:
    "border border-ink-600/80 text-cream-100 hover:border-ember-400/80 hover:text-ember-300",
  // Low-emphasis text button.
  ghost: "text-cream-200 hover:text-ember-300",
}

const sizes: Record<Size, string> = {
  sm: "text-sm px-4 py-2",
  md: "text-base px-6 py-3",
  lg: "text-lg px-8 py-3.5",
}

interface CommonProps {
  variant?: Variant
  size?: Size
  children: ReactNode
  className?: string
}

// `children` is defined on CommonProps (required) and again on the built-in
// attribute types (optional) — Omit it from the built-ins so the intersection
// doesn't collide. `className` is compatible on both sides (optional string).
interface ButtonAsButton
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children">,
    CommonProps {
  as?: "button"
}
interface ButtonAsAnchor
  extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "children">,
    CommonProps {
  as: "a"
  href: string
}

type ButtonProps = ButtonAsButton | ButtonAsAnchor

export default function Button({
  as = "button",
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...rest
}: ButtonProps) {
  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`

  if (as === "a") {
    return (
      <a className={classes} {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {children}
      </a>
    )
  }

  return (
    <button className={classes} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  )
}
