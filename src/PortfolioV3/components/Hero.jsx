import React from 'react';
import SkillSphere from './SkillSphere';
import { usePortraitParallax } from '../hooks/usePortraitParallax';
import { useHudCoordinates } from '../hooks/useHudCoordinates';
import { profile, skills } from '../data';
import HeroImg from '../../assets/images/hero.png';

// Placeholder bust, used only if HeroImg fails to resolve / is removed.
// Kept around so the component still renders something sensible without
// a real photo wired up.
const PortraitPlaceholder = React.forwardRef((_, ref) => (
  <svg ref={ref} className="portrait-figure" viewBox="0 0 340 560" preserveAspectRatio="xMidYMax meet">
    <defs>
      <linearGradient id="pv3-bust" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#4a4a52" />
        <stop offset="1" stopColor="#151517" />
      </linearGradient>
      <radialGradient id="pv3-rim" cx="30%" cy="20%" r="70%">
        <stop offset="0" stopColor="#6a6a74" />
        <stop offset="1" stopColor="#26262a" />
      </radialGradient>
    </defs>
    <path
      d="M20 560 C20 380 40 300 90 270 C60 250 45 205 60 165 C75 122 120 100 170 100 C220 100 265 122 280 165 C295 205 280 250 250 270 C300 300 320 380 320 560 Z"
      fill="url(#pv3-bust)"
    />
    <circle cx="170" cy="185" r="88" fill="url(#pv3-rim)" />
  </svg>
));
PortraitPlaceholder.displayName = 'PortraitPlaceholder';

const Hero = () => {
  const portraitRef = usePortraitParallax();
  const hudRef = useHudCoordinates();

  return (
    <section className="hero">
      <div className="portrait">
        {HeroImg ? (
          // .heroimg handles full-bleed cover + the fade mask — see
          // PortfolioV3.css. Adjust its object-position % to reframe the
          // face if the crop doesn't look right for your photo.
          <img ref={portraitRef} src={HeroImg} alt={profile.name} className="heroimg" />
        ) : (
          <PortraitPlaceholder ref={portraitRef} />
        )}
      </div>

      <SkillSphere skills={skills} />

      <div ref={hudRef} className="hud-label">x:0000 y:0000</div>

      <div className="hero-content">
        <div className="kicker"><b>{profile.name}</b> — {profile.role}, {profile.location}</div>
        <h1>
          <span className="name-line">I build the</span>
          <span className="name-line">whole thing<span className="accent">.</span></span>
        </h1>
        <div className="stack-line mono"><span className="accent">react</span> · node · <span className="accent">react native</span></div>
      </div>

      {/* <div className="scroll-cue">
        <span>SCROLL</span>
        <div className="track" />
      </div> */}
    </section>
  );
};

export default Hero;