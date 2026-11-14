import React, { useRef } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Manifest from './components/Manifest';
import Gallery from './components/Gallery';
import Capabilities from './components/Capabilities';
import Story from './components/Story';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Peel from './components/Peel';
import { useHueCycle } from './hooks/useHueCycle';
import './PortfolioV3.css';

// Page order: Header, Hero, Manifest, Gallery, Capabilities, Story,
// Contact, Footer. Each section is its own file in components/; this
// file only decides the order and owns the ambient hue cycle.
//
// Requires: npm install three

const MANIFEST_COLOR = 'hsl(258 82% 66%)';

const PortfolioV3 = () => {
  const rootRef = useRef(null);
  useHueCycle(rootRef);

  return (
    // overflow-x: clip, not hidden — the stylesheet's `overflow-x: hidden`
    // would turn this wrapper into a scroll container, and a sticky
    // element (the Story headings) sticks to its nearest scroll container,
    // not the screen, so it would never stick. `clip` crops horizontal
    // overflow the same way without creating a scroll container.
    <div className="pv3" ref={rootRef} style={{ overflowX: 'clip' }}>
      <Header />
      <Hero />

      {/* The curve is filled with the color of the section it leads into
          (the manifest's violet). Filling it with anything else leaves a
          visible band of the wrong color between the two sections. */}
      <Peel fill={MANIFEST_COLOR} />
      <Manifest />

      {/* This peel's CSS (.peel-out) already paints the violet backdrop
          and the dark curve, so it needs no fill prop. */}
      <Peel className="peel-out" />

      <Gallery />

      <Capabilities />

      <Story />

      <Contact />
      <Footer />
    </div>
  );
};

export default PortfolioV3;

// --- Usage ---
// import PortfolioV3 from './PortfolioV3/PortfolioV3';
// Requires one dependency: npm install three