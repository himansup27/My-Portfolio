import React from 'react';
import { profile } from '../data';
import { useBackgroundContrast } from '../hooks/useBackgroundContrast';
import './Header.css';

// The four pieces of fixed text. Each one switches to dark text on its
// own when it's over a light background (the cream and violet sections).
// The Resume button is tracked like the others, so its border and text
// follow the same color change (its border uses currentColor).
const Header = () => {
  const { refs, onLight } = useBackgroundContrast(4);
  const [tagRef, logoRef, linkRef, resumeRef] = refs;
  const [tagLight, logoLight, linkLight, resumeLight] = onLight;

  return (
    <>
      <div ref={tagRef} className={`side-tag${tagLight ? ' on-light' : ''}`}>open to fullstack roles</div>
      <header>
        <div ref={logoRef} className={`logo${logoLight ? ' on-light' : ''}`}>
          {profile.firstName}<span className="dot accent-bg" />
        </div>

        {/* Contact + Resume sit together on the right (the header lays out
            its direct children with space-between, so two loose links
            would push Contact into the middle). */}
        <div className="header-actions">
          <a ref={linkRef} href="#contact" className={linkLight ? 'on-light' : undefined}>Contact</a>
          <a
            ref={resumeRef}
            className={`resume-btn${resumeLight ? ' on-light' : ''}`}
            href={`${process.env.PUBLIC_URL}/Himansu_Sekhar_Patra_Resume.pdf`}
            download="Himansu_Sekhar_Patra_Resume.pdf"
            aria-label="Download resume (PDF)"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M8 2v8M4.5 6.5 8 10l3.5-3.5M3 13h10" />
            </svg>
            Resume
          </a>
        </div>
      </header>
    </>
  );
};

export default Header;