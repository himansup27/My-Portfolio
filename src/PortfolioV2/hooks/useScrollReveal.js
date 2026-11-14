import { useEffect } from 'react';

// Adds the .pv2-visible class to every [data-reveal] element once it
// scrolls into view, matching the CSS transition defined in
// PortfolioV2.css. Runs once on mount; call it once from the top-level
// PortfolioV2 component after all sections have rendered.
export function useScrollReveal() {
  useEffect(() => {
    const elements = document.querySelectorAll('[data-reveal]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('pv2-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}