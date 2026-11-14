import { useEffect, useRef } from 'react';

// Slowly wanders the --hue CSS custom property through violet -> blue ->
// gold -> back to violet, forever. Every accent color in PortfolioV3.css
// reads from hsl(var(--hue) ...), so this one value drives the whole
// site's ambient color shift.
//
// Takes a ref to the scoped root element (the .pv3 div) rather than
// touching document.documentElement, so this component can be dropped
// into a larger app without bleeding a global CSS variable onto
// everything else on the page.
export function useHueCycle(rootRef) {
  const tRef = useRef(0);

  useEffect(() => {
    let frameId;
    function tick() {
      tRef.current += 0.06;
      const hue = 155 + Math.sin(tRef.current * 0.15) * 110 + Math.sin(tRef.current * 0.05) * 40;
      if (rootRef.current) {
        rootRef.current.style.setProperty('--hue', hue.toFixed(1));
      }
      frameId = requestAnimationFrame(tick);
    }
    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [rootRef]);
}