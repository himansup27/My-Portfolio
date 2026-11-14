import { useEffect, useState } from 'react';

// Lets fixed UI (the header) pick light or dark text depending on what is
// actually painted behind it as the page scrolls underneath.
//
// For each tracked element we look at the point at its center, find the
// topmost thing there that has an opaque background, and choose whichever
// text color (light or dark) has the better contrast against it. Each
// element is judged on its own: the curved transition after the hero is
// violet in the middle while its edges are still dark, so the logo and
// the Contact link can legitimately need different colors at the same
// moment.

// The two text colors the header can use. They must match the colors in
// Header.css (dark) and PortfolioV3.css (--text-on-dark).
const DARK_TEXT = { r: 21, g: 18, b: 32 };    // #151220
const LIGHT_TEXT = { r: 244, g: 242, b: 236 }; // #f4f2ec

export function parseColor(str) {
  if (!str) return null;
  const m = String(str).match(/^rgba?\(\s*([\d.]+)[,\s]+([\d.]+)[,\s]+([\d.]+)(?:\s*[,/]\s*([\d.]+%?))?\s*\)$/);
  if (!m) return null;
  let a = 1;
  if (m[4] !== undefined) a = m[4].endsWith('%') ? parseFloat(m[4]) / 100 : parseFloat(m[4]);
  return { r: parseFloat(m[1]), g: parseFloat(m[2]), b: parseFloat(m[3]), a };
}

const channel = (c) => {
  const s = c / 255;
  return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
};

// WCAG relative luminance
export const relativeLuminance = ({ r, g, b }) =>
  0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);

const contrastRatio = (l1, l2) => (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);

// true when dark text reads better than light text on this background
export function prefersDarkText(bg) {
  const L = relativeLuminance(bg);
  return contrastRatio(L, relativeLuminance(DARK_TEXT)) > contrastRatio(L, relativeLuminance(LIGHT_TEXT));
}

// The visible background color at a point, or null if it can't be told.
// elementsFromPoint lists every element under the point from the topmost
// down, so the first one with an opaque background is what you actually
// see. Elements drawn only with gradients or images are skipped, so those
// fall through to the solid color behind them.
export function backgroundAt(x, y, skip = () => false) {
  if (typeof document === 'undefined' || typeof document.elementsFromPoint !== 'function') return null;
  const stack = document.elementsFromPoint(x, y);
  for (let i = 0; i < stack.length; i += 1) {
    const el = stack[i];
    if (skip(el)) continue;
    const style = window.getComputedStyle(el);
    let color = null;
    if (el instanceof window.SVGElement) {
      // The only SVG that acts as a background here is the curved
      // transition (.peel). Other SVG shapes (diagram nodes, labels,
      // lines) are content, not backgrounds, and would make the header
      // flicker if a thin shape happened to pass under it.
      if (el.tagName.toLowerCase() === 'path' && el.closest('.peel')) color = parseColor(style.fill);
    } else {
      color = parseColor(style.backgroundColor);
    }
    if (color && color.a >= 0.5) return color;
  }
  return null;
}

// Tracks `count` elements. Attach refs[i] to each; onLight[i] is true when
// element i is currently over a light background (so it should use dark
// text).
export function useBackgroundContrast(count) {
  const [refs] = useState(() => Array.from({ length: count }, () => ({ current: null })));
  const [onLight, setOnLight] = useState(() => new Array(count).fill(false));

  useEffect(() => {
    let frame = 0;
    // never read the header's own box (or the tracked elements) as "background"
    const skip = (el) => el.tagName === 'HEADER' || refs.some((r) => r.current === el);

    const measure = () => {
      frame = 0;
      const next = refs.map((r) => {
        const el = r.current;
        if (!el) return false;
        const rect = el.getBoundingClientRect();
        const bg = backgroundAt(rect.left + rect.width / 2, rect.top + rect.height / 2, skip);
        return bg ? prefersDarkText(bg) : false;
      });
      // only re-render when something actually changed
      setOnLight((prev) => (prev.every((v, i) => v === next[i]) ? prev : next));
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [refs]);

  return { refs, onLight };
}