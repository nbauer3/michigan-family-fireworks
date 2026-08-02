/**
 * App.tsx — Page composition root.
 *
 * The single-page layout is assembled here so the reading order matches the
 * user's scroll. To add or reorder sections, edit the list below — each
 * section is a self-contained component under src/sections/.
 *
 * Layering:
 *   - <FireworksBackground/> is a `fixed` full-viewport layer (z-0) behind
 *     everything, so the subtle fireworks stay consistent during scrolling
 *     across the whole page rather than only the hero.
 *   - All content sits in a `relative z-10` wrapper so it paints above the
 *     fireworks. Sections are transparent, letting the fixed fireworks show
 *     through behind their text/cards.
 */

import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import FloatingQuoteButton from "./components/FloatingQuoteButton"
import FireworksBackground from "./components/FireworksBackground"

import Hero from "./sections/Hero"
import Services from "./sections/Services"
import WhyChooseUs from "./sections/WhyChooseUs"
import About from "./sections/About"
import Gallery from "./sections/Gallery"
import Reviews from "./sections/Reviews"
import Social from "./sections/Social"
import Contact from "./sections/Contact"

function App() {
  return (
    <>
      {/* Page-wide animated fireworks, fixed behind all content */}
      <FireworksBackground />

      {/* Content layer sits above the fireworks */}
      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero />
          <Services />
          <WhyChooseUs />
          <About />
          <Gallery />
          <Reviews />
          <Social />
          <Contact />
        </main>
        <Footer />
      </div>

      <FloatingQuoteButton />
    </>
  )
}

export default App
