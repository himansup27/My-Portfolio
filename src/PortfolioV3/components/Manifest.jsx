import React from 'react';
import { manifest } from '../data';

// Full-bleed violet "philosophy" section.
const Manifest = () => (
  <section className="manifest">
    <svg
      className="manifest-hex"
      viewBox="0 0 200 200"
      fill="none"
      stroke="#151220"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <polygon points="100,5 182.3,52.5 182.3,147.5 100,195 17.7,147.5 17.7,52.5" />
      <line x1="100" y1="100" x2="100" y2="5" />
      <line x1="100" y1="100" x2="182.3" y2="52.5" />
      <line x1="100" y1="100" x2="182.3" y2="147.5" />
      <line x1="100" y1="100" x2="100" y2="195" />
      <line x1="100" y1="100" x2="17.7" y2="147.5" />
      <line x1="100" y1="100" x2="17.7" y2="52.5" />
    </svg>

    <div className="manifest-inner">
      <div className="eyebrow"><span className="dot" />{manifest.eyebrow}</div>

      <div className="manifest-grid">
        <h2 className="manifest-heading">
          {manifest.heading.map((line, i) => (
            <React.Fragment key={line}>
              {line}
              {i < manifest.heading.length - 1 && <br />}
            </React.Fragment>
          ))}
        </h2>

        <div className="manifest-copy">
          {manifest.paragraphs.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </div>

      <div className="manifest-closing">{manifest.closing}</div>
    </div>
  </section>
);

export default Manifest;