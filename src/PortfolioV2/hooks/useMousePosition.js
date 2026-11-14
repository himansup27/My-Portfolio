import { useEffect, useRef } from 'react';

// Tracks raw client mouse coordinates in a ref (no re-renders) plus
// normalized -1..1 values, so consumers like the Three.js background can
// read the latest position each animation frame without React re-rendering
// on every mousemove.
export function useMousePosition() {
  const position = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2, nx: 0, ny: 0 });

  useEffect(() => {
    const handleMove = (e) => {
      position.current.x = e.clientX;
      position.current.y = e.clientY;
      position.current.nx = e.clientX / window.innerWidth - 0.5;
      position.current.ny = e.clientY / window.innerHeight - 0.5;
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  return position;
}