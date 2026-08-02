/**
 * FireworksBackground.tsx — Subtle animated fireworks behind the WHOLE page.
 *
 * Rendered once in App.tsx as a `fixed` full-viewport layer sitting behind
 * all content. As the user scrolls, the fireworks stay put (the canvas is
 * fixed, not absolute to the hero), so the ambient effect is constant.
 *
 * Tuned DOWN so it stays premium rather than garish:
 *   - capped particle count and emission rate (fewer bursts)
 *   - low opacity so it reads as background atmosphere, not a demo
 *   - detectRetina for crispness without burning a high-res canvas
 *   - firework blast sound kept very quiet (volume ~20%) so it's a subtle
 *     accent, never startling — browsers also gate audio behind user
 *     interaction, so it stays silent until the visitor engages
 *
 * It ignores pointer events so it never blocks clicks anywhere on the page.
 * Content sits above it via `z-10` on the main content wrapper in App.tsx.
 */

import { useMemo } from "react"
import { Particles, ParticlesProvider } from "@tsparticles/react"
import { loadFireworksPreset } from "@tsparticles/preset-fireworks"
import type { ISourceOptions } from "@tsparticles/engine"

export default function FireworksBackground() {
  // Merge the preset defaults (preset: "fireworks") with overrides that
  // keep it tasteful. `useMemo` so options stay referentially stable.
  const options = useMemo<ISourceOptions>(
    () => ({
      preset: "fireworks",
      fullScreen: { enable: false }, // we position it ourselves
      background: { color: "transparent" },
      detectRetina: true,
      fpsLimit: 60,
      // Reduce overall counts for a calmer, premium feel.
      particles: {
        number: { value: 0 }, // the emitters spawn particles dynamically
        opacity: { value: { min: 0.15, max: 0.45 } }, // keep it dim
      },
      emitters: {
        rate: { delay: 1, quantity: 3 }, // a burst roughly every 2.5s
        size: { width: 100, height: 100 },
      },
      // Keep the firework "blast" sound very quiet. Auto-plays are blocked
      // by most browsers until user interaction, so this is effectively
      // silent until the visitor clicks the sound icon to enable it.
      sounds: {
        enable: true,
        autoPlay: false,
        volume: 0.2,
      },
    }),
    [],
  )

  return (
    // Fixed full-viewport layer. opacity-40 keeps it firmly in the
    // background; z-0 places it behind content (App wraps content in z-10).
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden opacity-40"
      aria-hidden="true"
    >
      {/* Seed an identical key so StrictMode double-invocation remounts cleanly. */}
      <ParticlesProvider init={loadFireworksPreset}>
        <Particles id="hero-fireworks" options={options} className="h-full w-full" />
      </ParticlesProvider>
    </div>
  )
}
