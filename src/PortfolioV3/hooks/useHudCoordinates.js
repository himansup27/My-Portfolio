import { useEffect, useRef } from 'react';

// Small HUD-style "x:0000 y:0000" readout that trails the cursor and
// fades out after it's been idle for a moment. Returns a ref to attach
// to the label element.
export function useHudCoordinates() {
  const hudRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    function handleMove(e) {
      const el = hudRef.current;
      if (!el) return;
      el.style.opacity = 1;
      el.style.left = `${e.clientX + 18}px`;
      el.style.top = `${e.clientY - 30}px`;
      el.textContent = `x:${String(e.clientX).padStart(4, '0')} y:${String(e.clientY).padStart(4, '0')}`;
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        if (el) el.style.opacity = 0;
      }, 900);
    }
    window.addEventListener('mousemove', handleMove);
    return () => {
      window.removeEventListener('mousemove', handleMove);
      clearTimeout(timerRef.current);
    };
  }, []);

  return hudRef;
}