import React, { useEffect, useRef, useState } from 'react';
import { capabilities } from '../data';

// The diagram geometry lives here (positions, labels, icons); the words
// shown when you hover a node come from `capabilities` in data.jsx,
// matched by index.
const MONO = "'JetBrains Mono',monospace";

const NODES = [
  {
    x: 300, y: 90, delay: '.05s',
    label: { text: 'frontend', x: 300, y: 48, anchor: 'middle' },
    icon: <text y="6" textAnchor="middle" fontFamily={MONO} fontSize="14" fontWeight="700" fill="#f4f2ec" style={{ pointerEvents: 'none' }}>{'</>'}</text>
  },
  {
    x: 490, y: 190, delay: '.12s',
    label: { text: 'backend APIs', x: 528, y: 152, anchor: 'start' },
    icon: <text y="6" textAnchor="middle" fontFamily={MONO} fontSize="14" fontWeight="700" fill="#f4f2ec" style={{ pointerEvents: 'none' }}>{'{ }'}</text>
  },
  {
    x: 490, y: 410, delay: '.19s',
    label: { text: 'mobile apps', x: 528, y: 452, anchor: 'start' },
    icon: (
      <>
        <rect x="-7" y="-13" width="14" height="26" rx="3" className="cap-node-icon" />
        <circle cx="0" cy="8" r="1.3" fill="#f4f2ec" style={{ pointerEvents: 'none' }} />
      </>
    )
  },
  {
    x: 300, y: 510, delay: '.26s',
    label: { text: 'databases', x: 300, y: 562, anchor: 'middle' },
    icon: (
      <>
        <ellipse cx="0" cy="-7" rx="10" ry="3.6" className="cap-node-icon" />
        <path d="M-10,-7 L-10,7 A10,3.6 0 0,0 10,7 L10,-7" className="cap-node-icon" />
      </>
    )
  },
  {
    x: 110, y: 410, delay: '.33s',
    label: { text: 'cloud & devops', x: 72, y: 452, anchor: 'end' },
    icon: <path d="M-12,4 a6.5,6.5 0 0,1 1.4,-12.6 a8,8 0 0,1 15.2,-1.6 a5.6,5.6 0 0,1 -1.6,14.2 z" className="cap-node-icon" />
  },
  {
    x: 110, y: 190, delay: '.4s',
    label: { text: '3D & data viz', x: 72, y: 152, anchor: 'end' },
    icon: (
      <>
        <path d="M0,-11 L9.5,-5.5 L9.5,5.5 L0,11 L-9.5,5.5 L-9.5,-5.5 Z" className="cap-node-icon" />
        <path d="M0,0 L0,11 M0,0 L9.5,-5.5 M0,0 L-9.5,-5.5" className="cap-node-icon" />
      </>
    )
  }
];

// 32 tick marks around the slowly rotating dial ring
const TICKS = Array.from({ length: 32 }, (_, i) => {
  const a = (i / 32) * Math.PI * 2;
  return {
    x1: (300 + Math.cos(a) * 222).toFixed(1),
    y1: (300 + Math.sin(a) * 222).toFixed(1),
    x2: (300 + Math.cos(a) * 234).toFixed(1),
    y2: (300 + Math.sin(a) * 234).toFixed(1)
  };
});

// Shown in the side panel until you hover a node.
const INTRO = [
  'I work across the whole stack: interfaces in React and React Native, APIs and business logic in Node.js and Express, PostgreSQL underneath, and WebSockets wherever a product needs live data.',
  'Most of what I\'ve built sits in that overlap — a chatbot that triggers actions over WebSockets, dashboards fed by REST APIs, a mobile app backed by its own Node services.'
];

// Layout: the diagram sits on the left; the heading and the text panel
// are stacked in the right column, so the whole section is only as tall
// as the diagram and fits in one screen (see .capabilities in the CSS).
const Capabilities = () => {
  const diagramRef = useRef(null);
  const [inView, setInView] = useState(false);
  const [activeCap, setActiveCap] = useState(null); // which node is highlighted

  // Nodes pop in one after another the first time the diagram scrolls
  // into view.
  useEffect(() => {
    const el = diagramRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return undefined;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section className="capabilities" id="capabilities">
      <div className="cap-body">
        <div className={`cap-diagram${inView ? ' in-view' : ''}`} ref={diagramRef}>
          <svg viewBox="0 0 600 600" role="group" aria-label="Capability map">
            <circle cx="300" cy="300" r="150" fill="none" stroke="#141414" strokeOpacity=".12" />

            <g id="rotatingRing">
              <circle cx="300" cy="300" r="230" fill="none" stroke="#141414" strokeOpacity=".12" />
              {TICKS.map((t, i) => (
                <line key={i} className="cap-tick" x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2} />
              ))}
            </g>

            {NODES.map((n, i) => (
              <line
                key={`line-${i}`}
                className={`cap-line${activeCap === i ? ' active' : ''}`}
                x1="300" y1="300" x2={n.x} y2={n.y}
              />
            ))}

            <circle cx="300" cy="300" r="9" fill="#141414" />
            <text x="300" y="304" textAnchor="middle" fontFamily={MONO} fontSize="9" fill="#ece7de" fontWeight="700">FS</text>

            {NODES.map((n, i) => (
              <React.Fragment key={`node-${i}`}>
                <g className="cap-node-wrap" data-reveal-node="" style={{ transitionDelay: n.delay }}>
                  <g
                    className={`cap-node${activeCap === i ? ' active' : ''}`}
                    transform={`translate(${n.x},${n.y})`}
                    role="button"
                    tabIndex={0}
                    aria-label={capabilities[i].title}
                    onMouseEnter={() => setActiveCap(i)}
                    onMouseLeave={() => setActiveCap(null)}
                    onFocus={() => setActiveCap(i)}
                    onBlur={() => setActiveCap(null)}
                  >
                    <circle r="30" className="cap-node-bg" />
                    <circle r="40" className="cap-node-hit" />
                    {n.icon}
                  </g>
                </g>
                <text
                  className={`cap-label${activeCap === i ? ' active' : ''}`}
                  x={n.label.x} y={n.label.y} textAnchor={n.label.anchor}
                >
                  {n.label.text}
                </text>
              </React.Fragment>
            ))}
          </svg>
        </div>

        <div className="cap-side">
          <div className="cap-head">
            <div className="eyebrow"><span className="dot" />CAPABILITIES</div>
            <h2>Full stack,<br /><span className="accent">by necessity.</span></h2>
          </div>

          {/* Every layer is rendered and stacked in the same grid cell, so
              the panel keeps one fixed height; hovering only crossfades. */}
          <div className="cap-panel" aria-live="polite">
            <div className={`cap-panel-layer${activeCap === null ? ' show' : ''}`} aria-hidden={activeCap !== null}>
              <p>{INTRO[0]}</p>
              <p>{INTRO[1]}</p>
              <div className="cap-tagline">One stack, end to end.</div>
            </div>
            {capabilities.map((c, i) => (
              <div
                key={c.id}
                className={`cap-panel-layer${activeCap === i ? ' show' : ''}`}
                aria-hidden={activeCap !== i}
              >
                <div className="cap-detail-title">{c.title}</div>
                <p>{c.blurb}</p>
                <div className="cap-detail-tools">{c.tools}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Capabilities;