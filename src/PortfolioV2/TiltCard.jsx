import React, { useRef } from 'react';

// Wraps any content and tilts it in 3D following the cursor position,
// like tilting a physical card toward your eye. Also exposes --mx/--my
// CSS custom properties (0-100%) so children can position a radial glow
// under the pointer via CSS (see .tilt-card::before in PortfolioV2.css).
const TiltCard = ({ children, className = '', intensity = 8, ...rest }) => {
  const ref = useRef(null);

  const handleMouseMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const rotX = (0.5 - py) * intensity;
    const rotY = (px - 0.5) * intensity;
    el.style.transform = `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
    el.style.setProperty('--mx', `${px * 100}%`);
    el.style.setProperty('--my', `${py * 100}%`);
  };

  const handleMouseLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg)';
  };

  return (
    <div
      ref={ref}
      className={className}
      data-cursor="hover"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...rest}
    >
      {children}
    </div>
  );
};

export default TiltCard;