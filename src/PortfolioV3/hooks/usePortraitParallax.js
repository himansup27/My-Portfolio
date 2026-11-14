import { useEffect, useRef } from 'react';

// The hero portrait drifts a few pixels toward/away from the cursor for a
// subtle depth effect. Returns a ref to attach to the portrait element.
// Deliberately separate from the 3D skill sphere, which does NOT move
// like this — only tilts in place.
export function usePortraitParallax() {
  const figureRef = useRef(null);

  useEffect(() => {
    let px = 0, py = 0, tx = 0, ty = 0;
    let frameId;

    function handleMove(e) {
      const nx = e.clientX / window.innerWidth - 0.5;
      const ny = e.clientY / window.innerHeight - 0.5;
      tx = nx * 22;
      ty = ny * 14;
    }
    window.addEventListener('mousemove', handleMove);

    function loop() {
      px += (tx - px) * 0.06;
      py += (ty - py) * 0.06;
      if (figureRef.current) {
        figureRef.current.style.transform = `translate(${px}px, ${py}px) scale(1.03)`;
      }
      frameId = requestAnimationFrame(loop);
    }
    frameId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', handleMove);
      cancelAnimationFrame(frameId);
    };
  }, []);

  return figureRef;
}