import React from 'react';
import { profile } from '../data';
import { useBackgroundContrast } from '../hooks/useBackgroundContrast';
import './Header.css';

// The three pieces of fixed text. Each one switches to dark text on its
// own when it's over a light background (the cream and violet sections).
const Header = () => {
  const { refs, onLight } = useBackgroundContrast(3);
  const [tagRef, logoRef, linkRef] = refs;
  const [tagLight, logoLight, linkLight] = onLight;

  return (
    <>
      <div ref={tagRef} className={`side-tag${tagLight ? ' on-light' : ''}`}>open to fullstack roles</div>
      <header>
        <div ref={logoRef} className={`logo${logoLight ? ' on-light' : ''}`}>
          {profile.firstName}<span className="dot accent-bg" />
        </div>
        <a ref={linkRef} href="#contact" className={linkLight ? 'on-light' : undefined}>Contact</a>
      </header>
    </>
  );
};

export default Header;