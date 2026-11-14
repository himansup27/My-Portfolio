import React, { useEffect, useRef, useState } from 'react';
import { bio, jobs, education } from '../data';

const SECTIONS = [
  { id: 'block-bio', label: 'Bio' },
  { id: 'block-exp', label: 'Experience' },
  { id: 'block-edu', label: 'Education' }
];

// Bio / Experience / Education. The headings on the left stay pinned
// (sticky, see .story-nav in the CSS) while the content on the right
// scrolls; whichever block is crossing the middle of the screen lights up
// its heading.
//
// Each block is styled as its own "chapter" (numbered tag, own visual
// treatment, big gap between them). The Experience block is a timeline:
// a vertical line fills in as you scroll through it, a glowing head leads
// the fill, and each job's dot lights up (and its text brightens) when the
// line reaches it.
const Story = () => {
  const [activeId, setActiveId] = useState(null);
  const [litCount, setLitCount] = useState(0); // how many jobs the line has reached
  const blockRefs = useRef({});
  const trackRef = useRef(null);
  const fillRef = useRef(null);
  const dotRefs = useRef([]);

  useEffect(() => {
    // No IntersectionObserver (very old browser): just light up the first.
    if (typeof IntersectionObserver === 'undefined') {
      setActiveId(SECTIONS[0].id);
      return undefined;
    }

    // The "trigger zone" is a thin band across the vertical middle of the
    // screen: -45% off the top and bottom leaves the middle 10%. Whichever
    // block overlaps that band is active. Unlike a "50% visible" threshold
    // this keeps working however tall a block gets, even taller than the
    // viewport (Experience is).
    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries.filter((e) => e.isIntersecting).pop();
        if (hit) setActiveId(hit.target.id);
      },
      { threshold: 0, rootMargin: '-45% 0px -45% 0px' }
    );

    SECTIONS.forEach(({ id }) => {
      const el = blockRefs.current[id];
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  // Timeline progress. The "reading line" sits at 55% of the screen height;
  // the fill grows from the top of the track down to that line, clamped to
  // the track. The fill's height is written straight to the DOM (no React
  // re-render per scroll frame); only the lit-job count lives in state, and
  // React skips the update whenever it hasn't changed.
  useEffect(() => {
    let raf = null;

    const update = () => {
      raf = null;
      const track = trackRef.current;
      const fill = fillRef.current;
      if (!track || !fill) return;

      const t = track.getBoundingClientRect();
      const readingLine = window.innerHeight * 0.55;
      const px = Math.max(0, Math.min(t.height, readingLine - t.top));
      fill.style.height = `${px}px`;

      let lit = 0;
      dotRefs.current.forEach((dot) => {
        if (!dot) return;
        const d = dot.getBoundingClientRect();
        if (d.top + d.height / 2 - t.top <= px) lit += 1;
      });
      setLitCount(lit);
    };

    const schedule = () => {
      if (raf === null) raf = requestAnimationFrame(update);
    };

    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    update();

    return () => {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      if (raf !== null) cancelAnimationFrame(raf);
    };
  }, []);

  const setBlockRef = (id) => (el) => {
    blockRefs.current[id] = el;
  };

  return (
    <section className="story" id="story">
      <div className="story-grid">
        <div className="story-nav">
          {SECTIONS.map(({ id, label }) => (
            <div
              key={id}
              className={`story-nav-item${activeId === id ? ' active' : ''}`}
              aria-current={activeId === id ? 'true' : undefined}
            >
              {label}
            </div>
          ))}
        </div>

        <div className="story-content">
          {/* 01 — Bio: a large lead paragraph, then regular text */}
          <div className="story-block" id="block-bio" ref={setBlockRef('block-bio')} role="region" aria-label="Bio">
            <div className="block-tag"><span className="num">01</span>Who I am</div>
            {bio.map((para, i) => (
              <p key={i} className={i === 0 ? 'bio-lead' : undefined}>{para}</p>
            ))}
          </div>

          {/* 02 — Experience: scroll-driven timeline */}
          <div className="story-block" id="block-exp" ref={setBlockRef('block-exp')} role="region" aria-label="Experience">
            <div className="block-tag"><span className="num">02</span>Where I&apos;ve worked</div>

            <div className="timeline">
              <div className="timeline-track" ref={trackRef} aria-hidden="true">
                <div className="timeline-fill" ref={fillRef} />
              </div>

              {jobs.map((job, i) => (
                <div className={`job-block${i < litCount ? ' lit' : ''}`} key={job.company}>
                  <span
                    className="job-dot"
                    ref={(el) => { dotRefs.current[i] = el; }}
                    aria-hidden="true"
                  />
                  <div className="job-body">
                    <div className="job-head">
                      <div>
                        <div className="exp-role">
                          {job.role}
                          {job.current && <span className="job-current-tag">current</span>}
                        </div>
                        <div className="exp-company">{job.company} · {job.location}</div>
                      </div>
                      <div className="exp-dates">{job.dates}</div>
                    </div>
                    <ul className="job-bullets">
                      {job.points.map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 03 — Education: glowing accent card */}
          <div className="story-block" id="block-edu" ref={setBlockRef('block-edu')} role="region" aria-label="Education">
            <div className="block-tag"><span className="num">03</span>Where I studied</div>
            <div className="edu-card">
              <div className="edu-degree">{education.degree}</div>
              <div className="edu-school">{education.school}</div>
              <div className="edu-meta">
                <span>{education.dates}</span>
                <span className="edu-score">{education.score}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Story;