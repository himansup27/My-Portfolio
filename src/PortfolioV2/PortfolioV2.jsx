import React from 'react';
import ThreeBackground from './ThreeBackground';
import CustomCursor from './CustomCursor';
import GravityOrb from './GravityOrb';
import TiltCard from './TiltCard';
import { useScrollReveal } from './hooks/useScrollReveal';
import { profile, calculateExperience, facts, skillOrbit, jobs, projects } from './data';
import './PortfolioV2.css';

// A completely separate, standalone portfolio page. Nothing here touches
// Portfolio.jsx — mount this instead of (or alongside, via a route/toggle)
// the original component. See the bottom of this file for a usage note.
const PortfolioV2 = () => {
  useScrollReveal();
  const experience = calculateExperience();
  const currentYear = new Date().getFullYear();

  return (
    <div className="pv2">
      <ThreeBackground />
      <CustomCursor />

      <div className="pv2-content">
        <nav className="pv2-nav">
          <div className="pv2-logo">{profile.name.split(' ')[0]}.</div>
          <div className="pv2-nav-links">
            <a href="#about">About</a>
            <a href="#skills">Skills</a>
            <a href="#changelog">Experience</a>
            <a href="#projects">Projects</a>
            <a href="#contact">Contact</a>
          </div>
        </nav>

        {/* HERO */}
        <section className="pv2-section pv2-hero">
          <div className="pv2-hero-grid">
            <div>
              <div className="pv2-kicker">{profile.role}, based in {profile.location}</div>
              <h1>
                I turn ideas into
                <br />
                products that <span className="accent">move.</span>
              </h1>
              <p>
                React, Node and React Native, stitched into web and mobile experiences that ship.{' '}
                <span style={{ color: 'var(--ivory)' }}>{experience.total} years</span> in, still shipping.
              </p>
              <div className="pv2-cta-row">
                <a href="#projects" className="pv2-btn pv2-btn-solid">See the work</a>
                <a href="#contact" className="pv2-btn pv2-btn-outline">Get in touch</a>
              </div>
            </div>

            <GravityOrb />
          </div>
        </section>

        {/* ABOUT */}
        <section id="about" className="pv2-section pv2-about">
          <div className="pv2-about-grid">
            <div data-reveal className="pv2-about-copy">
              <div className="pv2-heading" style={{ marginBottom: 24 }}>
                <h2>Not just interfaces.</h2>
              </div>
              <p>
                I'm a <strong>fullstack developer</strong> who's comfortable owning a feature end to end — from the
                database schema to the pixel the user taps. Most of my recent work has been split between{' '}
                <strong>React / React Native</strong> on the front and <strong>Node</strong> on the back, wiring
                things together with REST, GraphQL and gRPC.
              </p>
              <p>I like building things that feel alive rather than static — which is basically the whole idea behind this page.</p>
            </div>
            <div data-reveal className="pv2-fact-grid">
              {facts.map((f) => (
                <div key={f.label} className="pv2-fact">
                  <div className="pv2-fact-num">{f.num}</div>
                  <div className="pv2-fact-label">{f.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SKILLS ORBIT */}
        <section id="skills" className="pv2-section pv2-skills">
          <div className="pv2-heading" style={{ margin: '0 auto 20px', textAlign: 'center' }}>
            <h2>The toolkit</h2>
            <p style={{ margin: '14px auto 0' }}>Orbiting the stuff I reach for most.</p>
          </div>
          <div className="pv2-orbit-wrap">
            <div className="pv2-orbit-ring" style={{ width: 220, height: 220 }} />
            <div className="pv2-orbit-ring" style={{ width: 380, height: 380 }} />
            <div className="pv2-orbit-ring" style={{ width: 540, height: 540 }} />
            <div className="pv2-orbit-core">
              {experience.total}+ years
              <br />
              shipping
            </div>
            {skillOrbit.map((s, i) => (
              <div
                key={s.name}
                className="pv2-chip pv2-glass"
                style={{ '--r': `${s.radius}px`, animationDuration: `${s.duration}s`, animationDelay: `${-i * 2}s` }}
              >
                {s.name}
              </div>
            ))}
          </div>
        </section>

        {/* CHANGELOG / EXPERIENCE */}
        <section id="changelog" className="pv2-changelog">
          <div className="pv2-heading">
            <h2>Where I've worked</h2>
          </div>
          {jobs.map((job) => (
            <div key={job.company} data-reveal className="pv2-job">
              <div className="pv2-job-dates">
                {job.dates}
                {job.current && <div style={{ color: 'var(--cyan)', marginTop: 4 }}>Current</div>}
              </div>
              <div>
                <div className="pv2-job-role">{job.role}</div>
                <div className="pv2-job-company">{job.company} · {job.location}</div>
                <ul>
                  {job.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </section>

        {/* PROJECTS */}
        <section id="projects" className="pv2-projects">
          <div className="pv2-heading">
            <h2>Recent work</h2>
            <p>A few things I've shipped end to end.</p>
          </div>
          <div className="pv2-project-grid">
            {projects.map((project) => (
              <TiltCard key={project.title} className="pv2-tilt-card pv2-glass" intensity={8}>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="pv2-tag-row">
                  {project.tags.map((tag) => (
                    <span key={tag} className="pv2-tag">{tag}</span>
                  ))}
                </div>
              </TiltCard>
            ))}
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="pv2-section pv2-contact">
          <h2>Got something worth building?</h2>
          <p>Open to fullstack roles and freelance work.</p>
          <div className="pv2-contact-links">
            <a href={`mailto:${profile.email}`} className="pv2-contact-chip pv2-glass">{profile.email}</a>
            <a href={`tel:${profile.phone.replace(/\s/g, '')}`} className="pv2-contact-chip pv2-glass">{profile.phone}</a>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="pv2-contact-chip pv2-glass">LinkedIn</a>
          </div>
        </section>

        <footer className="pv2-footer">
          © {currentYear} {profile.name} — built with React, Three.js and too much coffee.
        </footer>
      </div>
    </div>
  );
};

export default PortfolioV2;

// --- Usage ---
// This is fully independent of Portfolio.jsx. To try it, temporarily swap
// the import in App.js:
//
//   import Portfolio from './Portfolio/Portfolio';        // old
//   import Portfolio from './PortfolioV2/PortfolioV2';    // new
//
// Requires one new dependency: npm install three
// (WalkingCharacter.jsx and the model file are no longer used by this
// version — safe to delete, or keep around if you want that effect back
// on a different section later.)