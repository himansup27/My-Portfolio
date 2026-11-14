import React, { useState } from 'react';
import { projects } from '../data';

// One placeholder gradient per card until you have real screenshots.
// To use a real image for a project, add an `image` field to it in
// data.jsx (e.g. image: pratibhabateeImg) — the card shows that instead
// of the gradient automatically.
const GRADIENTS = [
  'linear-gradient(145deg,#6d4fe0,#2a1f55)',
  'linear-gradient(145deg,#2a7f7a,#123331)',
  'linear-gradient(145deg,#c77a2e,#4a2c0c)',
  'linear-gradient(145deg,#2e5fc7,#0c2048)',
  'linear-gradient(145deg,#c22e73,#4a0c2a)',
  'linear-gradient(145deg,#3fae5c,#0f3b1f)'
];

// The CSS grid in PortfolioV3.css only has layout slots for 6 cards
// (the .g-card:nth-child rules), so we show the first six projects.
const MAX_CARDS = 6;

const pad = (n) => String(n).padStart(2, '0');

// Direct selection: point at a project and it comes into focus. Hover
// (mouse), tap (touch), and Tab/Enter (keyboard) all select the card you
// aim at, so you can always land exactly on the one you want. The last
// selected project stays in focus when the pointer leaves the grid.
const Gallery = () => {
  const items = projects.slice(0, MAX_CARDS);
  const [active, setActive] = useState(0);
  const current = items[active];

  const handleKeyDown = (e, i) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setActive(i);
    }
  };

  return (
    <section className="gallery" id="work">
      <div className="gallery-head">
        <div className="eyebrow"><span className="dot" />SHIPPED</div>
        <h2>Selected work.</h2>
        <p
          className="mono"
          style={{ margin: '18px 0 0', fontSize: 12, letterSpacing: '.06em', color: 'rgba(244,242,236,.4)' }}
        >
          hover or tap a project to bring it into focus
        </p>
      </div>

      <div className="gallery-wrap">
        {items.map((project, i) => (
          <div
            key={project.title}
            className={`g-card${i === active ? ' active' : ''}`}
            role="button"
            tabIndex={0}
            aria-pressed={i === active}
            aria-label={`${project.title}, project ${i + 1} of ${items.length}`}
            onMouseEnter={() => setActive(i)}
            onClick={() => setActive(i)}
            onFocus={() => setActive(i)}
            onKeyDown={(e) => handleKeyDown(e, i)}
            style={{
              cursor: 'pointer',
              ...(project.image ? null : { background: GRADIENTS[i % GRADIENTS.length] })
            }}
          >
            {project.image && (
              <img
                src={project.image}
                alt=""
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
              />
            )}
            <div className="g-card-label">{project.title}</div>
          </div>
        ))}
      </div>

      <div className="gallery-info" aria-live="polite">
        <div
          className="mono"
          style={{ fontSize: 11, letterSpacing: '.08em', color: 'rgba(244,242,236,.4)', marginBottom: 12 }}
        >
          {pad(active + 1)} / {pad(items.length)}
        </div>
        <div className="g-title">{current.title}</div>
        <div className="g-desc">{current.desc}</div>
        <div className="g-tags">
          {current.tags.map((tag) => (
            <span key={tag} className="g-tag">{tag}</span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;