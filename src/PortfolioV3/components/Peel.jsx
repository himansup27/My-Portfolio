import React from 'react';

// The curved "peel" divider used between a couple of section transitions.
// fill = the color of the section being revealed underneath.
const Peel = ({ fill = '#ece7de', className = '' }) => (
  <div className={`peel ${className}`}>
    <svg viewBox="0 0 1440 140" preserveAspectRatio="none">
      <path d="M0,140 L0,90 C360,10 1080,10 1440,90 L1440,140 Z" fill={fill} />
    </svg>
  </div>
);

export default Peel;