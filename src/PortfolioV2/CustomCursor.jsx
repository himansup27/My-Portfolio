import React, { useEffect, useRef } from 'react';

// A small dot that tracks the cursor exactly, plus a lagging ring that
// eases toward it and grows when hovering anything interactive
// (data-cursor="hover" or a natural <a>/<button>). Disabled on touch
// devices via the CSS in PortfolioV2.css (.cursor-dot/.cursor-ring get
// display:none under a pointer:coarse media query).
const CustomCursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const mouse = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const ring = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });

  useEffect(() => {
    const handleMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.left = `${e.clientX}px`;
        dotRef.current.style.top = `${e.clientY}px`;
      }
    };
    window.addEventListener('mousemove', handleMove);

    const handleOver = (e) => {
      if (e.target.closest('a, button, [data-cursor="hover"]')) {
        ringRef.current?.classList.add('active');
      }
    };
    const handleOut = (e) => {
      if (e.target.closest('a, button, [data-cursor="hover"]')) {
        ringRef.current?.classList.remove('active');
      }
    };
    document.addEventListener('mouseover', handleOver);
    document.addEventListener('mouseout', handleOut);

    let frameId;
    const loop = () => {
      ring.current.x += (mouse.current.x - ring.current.x) * 0.18;
      ring.current.y += (mouse.current.y - ring.current.y) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.left = `${ring.current.x}px`;
        ringRef.current.style.top = `${ring.current.y}px`;
      }
      frameId = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      window.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseover', handleOver);
      document.removeEventListener('mouseout', handleOut);
      cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  );
};

export default CustomCursor;