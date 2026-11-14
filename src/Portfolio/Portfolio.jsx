import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Linkedin,
  Mail,
  Phone,
  GraduationCap,
  Star,
  GitBranch,
  Terminal,
  ChevronDown,
  Menu,
  X,
  Github
} from 'lucide-react';

// ---------------------------------------------------------------------------
// Colors live in the <style> block below as plain CSS classes (.text-gold,
// .bg-surface, .card, etc.) rather than Tailwind arbitrary-value classes
// like bg-[#0A0C0F]. That syntax needs Tailwind v3 JIT to compile — if your
// project is on an older Tailwind version or the content path isn't picking
// up this file, those classes silently do nothing and you get default
// black-on-white. Plain CSS always works, regardless of Tailwind setup.
//
// Palette: ink #0A0C0F · surface #12151A→#171B21 · line #23272E / #1A1D23
//          gold #C9A227 · goldBright #E0BB3E · teal #4E8B79
//          ivory #F3EFE4 · muted #9096A0 · dim #5B616C
//
// Fonts (add to public/index.html <head>):
// <link rel="preconnect" href="https://fonts.googleapis.com">
// <link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,500;0,9..144,600;0,9..144,700;0,9..144,900;1,9..144,400;1,9..144,500&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500;600;700&display=swap" rel="stylesheet">
// ---------------------------------------------------------------------------

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const calculateExperience = () => {
    const startDate = new Date('2023-06-01');
    const currentDate = new Date();
    const diffTime = Math.abs(currentDate - startDate);
    const diffMonths = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 30.44));
    const years = Math.floor(diffMonths / 12);
    const months = diffMonths % 12;
    return { years, months, total: (diffMonths / 12).toFixed(1) };
  };

  const experience = calculateExperience();
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'changelog', 'shipped', 'contact'];
      const current = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 120 && rect.bottom >= 120;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const fadeInUp = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }
  };

  const stagger = {
    visible: { transition: { staggerChildren: 0.08 } }
  };

  const skillGroups = [
    {
      category: 'Frontend',
      accent: 'text-teal',
      skills: [
        { name: 'React JS', level: 4 },
        { name: 'Next JS', level: 3 },
        { name: 'Angular', level: 3 },
        { name: 'TypeScript', level: 4 },
        { name: 'Tailwind CSS', level: 4 }
      ]
    },
    {
      category: 'Backend & APIs',
      accent: 'text-gold',
      skills: [
        { name: 'Node JS', level: 3 },
        { name: 'REST APIs', level: 4 },
        { name: 'GraphQL', level: 3 },
        { name: 'gRPC', level: 3 }
      ]
    },
    {
      category: 'Mobile',
      accent: 'text-teal',
      skills: [
        { name: 'React Native', level: 4 },
        { name: 'Ionic Framework', level: 3 }
      ]
    },
    {
      category: 'Craft',
      accent: 'text-gold',
      skills: [
        { name: 'Component Architecture', level: 4 },
        { name: 'Cross-team Delivery', level: 4 }
      ]
    }
  ];

  const jobs = [
    {
      version: 'v3.0.0',
      tag: 'MAJOR',
      current: true,
      role: 'Fullstack Developer',
      company: 'SAIntellect Solutions PVT LTD',
      location: 'Bhubaneswar, India',
      dates: 'May 2026 — Present',
      points: [
        'Building end-to-end web and mobile solutions using React JS, React Native, Node JS, and Ionic Framework.',
        'Shipping "Pratibhabatee" — a career platform for women with a job portal and an integrated marketplace.',
        'Designing backend APIs and services in Node JS powering both web and Ionic mobile experiences.',
        'Owning features from database to UI in a fast-moving product team.'
      ]
    },
    {
      version: 'v2.0.0',
      tag: 'MINOR',
      role: 'Frontend Developer',
      company: 'Ohhpro Technologies',
      location: 'Bhubaneswar, India',
      dates: 'Dec 2024 — May 2026',
      points: [
        'Built scalable applications in React JS and Angular, integrated with RESTful and GraphQL APIs.',
        'Designed reusable UI components with Bootstrap and Tailwind CSS across devices and browsers.',
        'Contributed to "Ohhpro Junction," a society management app with resident engagement tools.',
        'Built and maintained "Nuhealthmantra," a multi-role health and wellness platform.'
      ]
    },
    {
      version: 'v1.0.0',
      tag: 'INITIAL',
      role: 'Frontend Developer',
      company: 'Sulopa Technologies',
      location: 'Bangalore, India',
      dates: 'Jun 2023 — Nov 2024',
      points: [
        'Developed responsive web and mobile applications using React JS, React Native, and TypeScript.',
        'Shipped end-to-end features that improved user engagement and retention.',
        'Partnered with UX/UI, product, and QA to deliver on time.'
      ]
    }
  ];

  const featuredProjects = [
    {
      title: 'Pratibhabatee',
      description: 'A career and empowerment platform for women — a job portal for posting/applying, plus a marketplace for products and services.',
      technologies: ['React JS', 'Node JS', 'Tailwind']
    },
    {
      title: 'Society Connect',
      description: 'An upgraded rebuild of Ohhpro Junction with React JS and Tailwind CSS, wired to gRPC APIs for faster real-time communication.',
      technologies: ['React JS', 'Tailwind', 'gRPC']
    },
    {
      title: 'Carrmos',
      description: 'Educational guidance platform with 5+ modules helping students choose career paths, using D3.js for interactive roadmap visualizations.',
      technologies: ['React JS', 'D3.js', 'JWT/OAuth']
    }
  ];

  const otherProjects = [
    { title: 'Ohhpro Junction', type: 'WEB PLATFORM', description: 'Society management app helping residents manage homes and community with engagement tools.', technologies: ['Angular', 'TypeScript'] },
    { title: 'Nuhealthmantra', type: 'WEB PLATFORM', description: 'Health & wellness platform with modules for Admin, Doctors, Nutritionists, and Trainers.', technologies: ['React JS', 'Bootstrap'] },
    { title: 'Water Log (WLOG)', type: 'WEB & MOBILE', description: 'Water management platform with admin/user portals for data-driven level tracking and risk alerts.', technologies: ['React JS', 'React Native'] },
    { title: 'AITravelAssist', type: 'WEB APP', description: 'AI-powered chatbot platform enabling seamless flight bookings via conversational interface.', technologies: ['React JS', 'Tailwind'] },
    { title: 'DirectHire', type: 'MOBILE APP', description: 'Streamlined hiring platform with dual portals for clients posting jobs and candidates applying.', technologies: ['React Native', 'TypeScript'] }
  ];

  const ProficiencyDots = ({ level }) => (
    <span className="flex gap-1">
      {[0, 1, 2, 3, 4].map((i) => (
        <span key={i} className={i < level ? 'dot dot-gold' : 'dot dot-off'} />
      ))}
    </span>
  );

  const navItems = ['home', 'about', 'skills', 'changelog', 'shipped', 'contact'];

  const NavBar = () => (
    <nav className="site-nav">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        <a href="#home" className="font-display italic text-xl text-ivory" onClick={() => setMobileMenuOpen(false)}>
          HSP<span className="text-gold">.</span>
        </a>
        <div className="hidden md:flex items-center gap-8 font-mono text-xs tracking-wide uppercase">
          {navItems.map((id) => (
            <a key={id} href={`#${id}`} className={`nav-link ${activeSection === id ? 'active' : ''}`}>
              {id}
              {activeSection === id && <motion.span layoutId="nav-underline" className="nav-underline" />}
            </a>
          ))}
        </div>
        <a href="#contact" className="hidden md:inline-block btn-primary px-4 py-2 text-xs font-mono tracking-wide uppercase rounded">
          Let's talk →
        </a>

        {/* Mobile hamburger toggle */}
        <button
          type="button"
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileMenuOpen}
          onClick={() => setMobileMenuOpen((v) => !v)}
          className="md:hidden mobile-menu-btn"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu panel */}
      <motion.div
        initial={false}
        animate={{ height: mobileMenuOpen ? 'auto' : 0, opacity: mobileMenuOpen ? 1 : 0 }}
        transition={{ duration: 0.25, ease: 'easeInOut' }}
        className="md:hidden overflow-hidden mobile-menu-panel"
      >
        <div className="px-4 sm:px-6 py-4 flex flex-col gap-1">
          {navItems.map((id) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={() => setMobileMenuOpen(false)}
              className={`mobile-menu-link font-mono text-sm tracking-wide uppercase ${activeSection === id ? 'active' : ''}`}
            >
              {id}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="btn-primary mt-3 px-4 py-3 text-xs font-mono tracking-wide uppercase rounded text-center"
          >
            Let's talk →
          </a>
        </div>
      </motion.div>
    </nav>
  );

  return (
    <div className="bg-ink text-ivory min-h-screen overflow-x-hidden font-sans">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,500;0,9..144,600;0,9..144,700;0,9..144,900;1,9..144,400;1,9..144,500&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500;600;700&display=swap');

        .font-display{font-family:'Fraunces',serif;}
        .font-mono{font-family:'JetBrains Mono',monospace;}
        .font-sans{font-family:'Inter',sans-serif;}

        .bg-ink{background:#0A0C0F;}
        .bg-surface{background:#12151A;}
        .text-ivory{color:#F3EFE4;}
        .text-muted{color:#9096A0;}
        .text-dim{color:#5B616C;}
        .text-gold{color:#C9A227;}
        .text-gold-bright{color:#E0BB3E;}
        .text-teal{color:#4E8B79;}
        .text-ink-deep{color:#151206;}

        .fixed-header{position:fixed;top:0;left:0;right:0;z-index:50;}
        .site-nav{backdrop-filter:blur(8px);background:rgba(10,12,15,.92);border-bottom:1px solid #1A1D23;}
        .status-strip{border-bottom:1px solid #1A1D23;background:#0A0C0F;height:37px;display:flex;align-items:center;}

        .mobile-menu-btn{color:#F3EFE4;background:transparent;border:1px solid #23272E;border-radius:6px;padding:8px;display:flex;align-items:center;justify-content:center;transition:border-color .2s ease, color .2s ease;}
        .mobile-menu-btn:hover{border-color:#C9A227;color:#E0BB3E;}
        .mobile-menu-panel{background:#0A0C0F;border-bottom:1px solid #1A1D23;}
        @media (min-width: 768px){
          .mobile-menu-btn{display:none;}
          .mobile-menu-panel{display:none;}
        }
        .mobile-menu-link{color:#9096A0;padding:12px 4px;border-bottom:1px solid #1A1D23;transition:color .2s ease;}
        .mobile-menu-link:last-of-type{border-bottom:none;}
        .mobile-menu-link.active{color:#E0BB3E;}

        .social-link{width:38px;height:38px;border-radius:999px;border:1px solid #23272E;display:flex;align-items:center;justify-content:center;color:#9096A0;transition:border-color .25s ease, color .25s ease, transform .25s ease;}
        .social-link:hover{border-color:#C9A227;color:#E0BB3E;transform:translateY(-3px);}

        .nav-link{position:relative;color:#9096A0;padding-bottom:4px;transition:color .25s ease;}
        .nav-link:hover{color:#F3EFE4;}
        .nav-link.active{color:#E0BB3E;}
        .nav-underline{position:absolute;left:0;bottom:-1px;width:100%;height:1px;background:#C9A227;}

        .btn-primary{background:#C9A227;color:#151206;border:1px solid #C9A227;transition:background .25s ease, border-color .25s ease, transform .25s ease;}
        .btn-primary:hover{background:#E0BB3E;border-color:#E0BB3E;}
        .btn-ghost{border:1px solid #23272E;color:#F3EFE4;transition:border-color .25s ease, color .25s ease, transform .25s ease;background:transparent;}
        .btn-ghost:hover{border-color:#C9A227;color:#E0BB3E;}

        .link-muted{color:#9096A0;transition:color .25s ease;}
        .link-muted:hover{color:#E0BB3E;}

        .card{background:linear-gradient(180deg,#12151A,#171B21);border:1px solid #23272E;transition:border-color .3s ease, transform .3s ease, box-shadow .3s ease;}
        .card:hover{border-color:rgba(201,162,39,.45);transform:translateY(-4px);box-shadow:0 20px 40px -20px rgba(0,0,0,.6);}

        .border-hair{border-color:#23272E;}
        .border-hair-soft{border-color:#1A1D23;}
        .spec-row{border-bottom:1px solid #1A1D23;}

        .dot{width:7px;height:7px;border-radius:999px;display:inline-block;}
        .dot-gold{background:#C9A227;}
        .dot-off{background:#23272E;}
        .dot-teal{background:#4E8B79;}
        .dot-lg{width:11px;height:11px;}

        .tag{font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:.03em;border:1px solid #23272E;color:#9096A0;padding:4px 8px;border-radius:6px;display:inline-block;}
        .badge-gold{background:rgba(201,162,39,.12);border:1px solid rgba(201,162,39,.3);color:#E0BB3E;font-family:'JetBrains Mono',monospace;font-size:12px;padding:2px 8px;border-radius:6px;}
        .badge-gold-outline{border:1px solid rgba(201,162,39,.35);color:#E0BB3E;font-family:'JetBrains Mono',monospace;font-size:11px;padding:4px 8px;border-radius:6px;}
        .icon-badge{background:rgba(201,162,39,.12);border:1px solid rgba(201,162,39,.3);}

        .commit-dot{width:11px;height:11px;border-radius:999px;background:#0A0C0F;border:2px solid #23272E;}
        .commit-dot.current{border-color:#C9A227;}
        .rail{position:relative;}
        .rail::before{content:'';position:absolute;left:0;top:8px;bottom:8px;width:1px;background:linear-gradient(180deg,#C9A227,#23272E 85%);}

        .hero-glow{background:radial-gradient(circle at 22% 18%, rgba(201,162,39,.13), transparent 52%), radial-gradient(circle at 82% 66%, rgba(78,139,121,.10), transparent 50%);}
        .grid-overlay{
          background-image:linear-gradient(#1A1D23 1px, transparent 1px), linear-gradient(90deg, #1A1D23 1px, transparent 1px);
          background-size:56px 56px;
          -webkit-mask-image:radial-gradient(ellipse 75% 65% at 50% 0%, black 30%, transparent 85%);
          mask-image:radial-gradient(ellipse 75% 65% at 50% 0%, black 30%, transparent 85%);
          opacity:.55;
        }
        .glow-blob{position:absolute;border-radius:999px;filter:blur(60px);background:radial-gradient(circle, rgba(201,162,39,.22), transparent 70%);pointer-events:none;}
        .eyebrow-pill{display:inline-flex;align-items:center;gap:8px;border:1px solid rgba(201,162,39,.35);background:rgba(201,162,39,.07);border-radius:999px;padding:6px 14px 6px 10px;}
        .stat-block{border-left:1px solid #1A1D23;padding-left:20px;}
        .stat-block:first-child{border-left:none;padding-left:0;}
        .scroll-cue{color:#5B616C;transition:color .25s ease;}
        .scroll-cue:hover{color:#E0BB3E;}
        .terminal-window{background:#12151A;border:1px solid #23272E;box-shadow:0 40px 80px -30px rgba(0,0,0,.8);position:relative;z-index:1;}
        .terminal-chip{background:#12151A;border:1px solid #23272E;z-index:2;}
        .live-pulse{width:6px;height:6px;border-radius:999px;background:#4E8B79;box-shadow:0 0 0 rgba(78,139,121,.5);animation:pulse 2s infinite;}
        @keyframes pulse{
          0%{box-shadow:0 0 0 0 rgba(78,139,121,.5);}
          70%{box-shadow:0 0 0 6px rgba(78,139,121,0);}
          100%{box-shadow:0 0 0 0 rgba(78,139,121,0);}
        }

        @keyframes blink{50%{opacity:0;}}
        .blink{animation:blink 1.4s step-start infinite;}

        .marquee-wrap{border-top:1px solid #1A1D23;border-bottom:1px solid #1A1D23;background:#12151A;}
        .marquee-track{display:flex;width:max-content;animation:marquee 28s linear infinite;color:#5B616C;}
        @keyframes marquee{from{transform:translateX(0);}to{transform:translateX(-50%);}}

        ::selection{background:#C9A227;color:#0A0C0F;}
        ::-webkit-scrollbar{width:10px;}
        ::-webkit-scrollbar-track{background:#0A0C0F;}
        ::-webkit-scrollbar-thumb{background:#23272E;border-radius:6px;}
        ::-webkit-scrollbar-thumb:hover{background:#C9A227;}
      `}</style>

      {/* Fixed header (status strip + nav travel together, pinned) */}
      <div className="fixed-header">
        <div className="status-strip font-mono text-xs tracking-wide text-dim px-4">
          <div className="max-w-6xl mx-auto w-full flex items-center justify-between">
            <span className="flex items-center gap-2">
              <span className="dot dot-gold" /> AVAILABLE FOR HIRE
            </span>
            <span className="hidden sm:inline">BHUBANESWAR, IN · v{experience.total}</span>
          </div>
        </div>
        <NavBar />
      </div>
      {/* Spacer so fixed header doesn't overlap content (37px strip + 64px nav) */}
      <div style={{ height: '101px' }} />

      {/* HERO */}
      <section id="home" className="relative px-4 sm:px-6 pt-14 pb-8 overflow-hidden hero-glow">
        <div className="grid-overlay absolute inset-0 pointer-events-none" />
        <div className="glow-blob" style={{ top: '-120px', right: '-80px', width: '420px', height: '420px' }} />

        <div className="max-w-6xl mx-auto relative">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial="hidden" animate="visible" variants={stagger}>
              <motion.div variants={fadeInUp} className="eyebrow-pill font-mono text-xs tracking-widest uppercase mb-8 text-gold-bright">
                <span className="live-pulse" />
                Fullstack Engineer — React · Node · React Native
              </motion.div>

              <motion.h1
                variants={fadeInUp}
                className="font-display font-medium mb-8 tracking-tight"
                style={{ fontSize: 'clamp(2.75rem, 6.2vw, 4.25rem)', lineHeight: 1.05 }}
              >
                I build the
                <br />
                whole thing<span className="text-gold">,</span>
                <br />
                <span className="italic text-muted">front to back.</span>
              </motion.h1>

              <motion.p variants={fadeInUp} className="text-muted text-lg leading-relaxed max-w-md mb-10">
                Fullstack developer shipping production web and mobile products end to end — interfaces, APIs, and
                everything wired in between. <span className="text-ivory">{experience.total} years</span> in, still shipping.
              </motion.p>

              <motion.div variants={fadeInUp} className="flex flex-wrap gap-4 mb-14">
                <motion.a href="#shipped" whileHover={{ y: -2 }} className="btn-primary px-7 py-3.5 text-sm font-mono tracking-wide uppercase rounded">
                  View Shipped Work
                </motion.a>
                <motion.a href="#contact" whileHover={{ y: -2 }} className="btn-ghost px-7 py-3.5 text-sm font-mono tracking-wide uppercase rounded">
                  Get In Touch
                </motion.a>
              </motion.div>

              <motion.div variants={fadeInUp} className="flex max-w-md pt-8 border-t border-hair-soft">
                <div className="stat-block flex-1">
                  <div className="font-display text-3xl text-gold-bright">{experience.total}+</div>
                  <div className="font-mono text-xs uppercase tracking-wide text-dim mt-1">Years Exp.</div>
                </div>
                <div className="stat-block flex-1">
                  <div className="font-display text-3xl text-gold-bright">18+</div>
                  <div className="font-mono text-xs uppercase tracking-wide text-dim mt-1">Releases</div>
                </div>
                <div className="stat-block flex-1">
                  <div className="font-display text-3xl text-gold-bright">10+</div>
                  <div className="font-mono text-xs uppercase tracking-wide text-dim mt-1">Core Tools</div>
                </div>
              </motion.div>
            </motion.div>

            {/* Terminal panel */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="relative"
              >
                <div className="terminal-window rounded-xl overflow-hidden">
                  <div className="flex items-center justify-between px-5 py-3 border-b border-hair">
                    <div className="flex items-center gap-2">
                      <span className="dot dot-lg dot-gold" />
                      <span className="dot dot-lg dot-teal" />
                      <span className="dot dot-lg dot-off" style={{ border: '1px solid #23272E', background: 'transparent' }} />
                    </div>
                    <span className="font-mono text-xs text-dim">himansu.dev — release-notes</span>
                    <Terminal className="w-3.5 h-3.5" style={{ color: '#23272E' }} />
                  </div>
                  <div className="p-6 font-mono text-sm leading-7">
                    <div className="text-dim mb-3">$ git log --oneline --decorate</div>
                    {jobs.map((job) => (
                      <div key={job.version} className="mb-4 last:mb-5">
                        <div>
                          <span className={job.current ? 'text-gold-bright' : 'text-muted'}>{job.version}</span>{' '}
                          <span className={job.current ? 'text-ivory' : 'text-muted'}>{job.role}</span>
                        </div>
                        <div className="text-dim">└ {job.company} · {job.dates}</div>
                      </div>
                    ))}
                    <div className="pt-4 border-t border-hair">
                      <span className="text-dim">$</span> <span className="text-teal">status</span> --check
                      <br />
                      <span className="text-ivory">→ shipping consistently</span>
                      <span className="text-gold blink">_</span>
                    </div>
                  </div>
                </div>

                <motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                  className="absolute -bottom-5 -left-5 hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-xs terminal-chip"
                >
                  <span className="dot dot-teal" /> React Native · Ionic
                </motion.div>

                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
                  className="absolute -top-5 -right-4 hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-xs terminal-chip"
                >
                  <span className="dot dot-gold" /> TypeScript · Next JS
                </motion.div>
              </motion.div>
            </motion.div>
          </div>

          <motion.a
            href="#about"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="scroll-cue hidden sm:flex flex-col items-center gap-2 mx-auto w-fit mt-16 font-mono text-xs uppercase tracking-wide"
          >
            Scroll to explore
            <motion.span animate={{ y: [0, 6, 0] }} transition={{ duration: 1.6, repeat: Infinity }}>
              <ChevronDown className="w-4 h-4" />
            </motion.span>
          </motion.a>
        </div>
      </section>

      {/* Marquee */}
      <div className="marquee-wrap py-4 overflow-hidden">
        <div className="marquee-track font-mono text-sm tracking-widest uppercase">
          {[...Array(2)].flatMap(() =>
            ['React JS', 'Node JS', 'React Native', 'Next JS', 'TypeScript', 'GraphQL', 'gRPC', 'Angular']
          ).map((t, i) => (
            <React.Fragment key={i}>
              <span className="px-6">{t}</span>
              <span className="px-6 text-gold">•</span>
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* ABOUT */}
      <section id="about" className="py-28 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-start">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.div variants={fadeInUp} className="font-mono text-xs tracking-widest uppercase mb-4 text-gold">
              01 — About
            </motion.div>
            <motion.h2 variants={fadeInUp} className="font-display text-4xl sm:text-5xl mb-8">
              Not just the UI.
              <br />
              <span className="italic text-muted">The whole system.</span>
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-muted text-lg leading-relaxed mb-6">
              Versatile fullstack developer delivering responsive, high-performance web and mobile applications. I
              work across React JS, React Native, Next JS, and Angular on the front, Node JS on the back, and I'm
              comfortable being the one who owns a feature from database to pixel.
            </motion.p>
            <motion.p variants={fadeInUp} className="text-muted text-lg leading-relaxed mb-10">
              Fluent in JavaScript and TypeScript, and in wiring things together with REST, gRPC, and GraphQL. I
              write code meant to be read again — by me, six months later, and by whoever's next.
            </motion.p>
            <motion.div variants={fadeInUp} className="flex flex-wrap gap-6 font-mono text-sm">
              <a href="mailto:himansu72001@gmail.com" className="flex items-center gap-2 link-muted">
                <Mail className="w-4 h-4" /> Email
              </a>
              <a href="https://www.linkedin.com/in/himansu-sekhar-patra-540924227/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 link-muted">
                <Linkedin className="w-4 h-4" /> LinkedIn
              </a>
              <a href="tel:+917735048476" className="flex items-center gap-2 link-muted">
                <Phone className="w-4 h-4" /> Call
              </a>
            </motion.div>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="card rounded-xl p-8">
            <div className="font-mono text-xs uppercase tracking-wide text-dim mb-6">// spec sheet</div>
            {[
              ['Location', 'Bhubaneswar, India'],
              ['Experience', `${experience.total} years`],
              ['Focus', 'Web + Mobile, end to end'],
              ['Core stack', 'React · Node · React Native'],
              ['Projects shipped', '18+']
            ].map(([label, value]) => (
              <div key={label} className="spec-row flex justify-between py-4">
                <span className="font-mono text-sm text-dim">{label}</span>
                <span className="text-ivory text-right">{value}</span>
              </div>
            ))}
            <div className="flex justify-between py-4">
              <span className="font-mono text-sm text-dim">Availability</span>
              <span className="flex items-center gap-2 text-gold-bright">
                <span className="dot dot-gold" />
                Open to work
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" className="py-28 px-4 sm:px-6 bg-surface">
        <div className="max-w-6xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="mb-16">
            <div className="font-mono text-xs tracking-widest uppercase mb-4 text-gold">02 — Capabilities</div>
            <h2 className="font-display text-4xl sm:text-5xl">
              What I actually <span className="italic text-muted">work with.</span>
            </h2>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid md:grid-cols-2 gap-6">
            {skillGroups.map((group) => (
              <motion.div key={group.category} variants={fadeInUp} className="card rounded-xl p-7">
                <div className={`font-mono text-xs uppercase tracking-wide mb-5 ${group.accent}`}>{group.category}</div>
                <div className="space-y-4">
                  {group.skills.map((skill) => (
                    <div key={skill.name} className="flex items-center justify-between">
                      <span>{skill.name}</span>
                      <ProficiencyDots level={skill.level} />
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CHANGELOG / EXPERIENCE */}
      <section id="changelog" className="py-28 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="mb-16">
            <div className="font-mono text-xs tracking-widest uppercase mb-4 text-gold">03 — Changelog</div>
            <h2 className="font-display text-4xl sm:text-5xl mb-3">
              Career, <span className="italic text-muted">as releases.</span>
            </h2>
            <p className="text-dim font-mono text-sm">Most recent first.</p>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="rail pl-10">
            {jobs.map((job) => (
              <motion.div key={job.version} variants={fadeInUp} className="relative mb-14 last:mb-0">
                <div
                  className={`commit-dot absolute top-2 ${job.current ? 'current' : ''}`}
                  style={{ left: '-42px' }}
                />
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <span className={job.current ? 'badge-gold' : 'tag'}>
                    {job.version} · {job.tag}
                  </span>
                  <span className="font-mono text-xs text-dim">{job.dates}</span>
                </div>
                <h3 className="font-display text-2xl mb-1">{job.role}</h3>
                <p className="font-mono text-sm mb-4 text-muted">
                  {job.company} · {job.location}
                </p>
                <ul className={`space-y-2.5 ${job.current ? 'text-muted' : 'text-dim'}`}>
                  {job.points.map((point) => (
                    <li key={point} className="flex gap-3">
                      <span className="font-mono text-teal">+</span> {point}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SHIPPED / PROJECTS */}
      <section id="shipped" className="py-28 px-4 sm:px-6 bg-surface">
        <div className="max-w-6xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="mb-16">
            <div className="font-mono text-xs tracking-widest uppercase mb-4 text-gold">04 — Shipped</div>
            <h2 className="font-display text-4xl sm:text-5xl">
              Products in <span className="italic text-muted">production.</span>
            </h2>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid md:grid-cols-3 gap-6 mb-6">
            {featuredProjects.map((project) => (
              <motion.div key={project.title} variants={fadeInUp} className="card rounded-xl p-7 flex flex-col">
                <div className="flex items-center justify-between mb-5">
                  <span className="badge-gold-outline">FEATURED</span>
                  <Star className="w-4 h-4 text-gold" />
                </div>
                <h3 className="font-display text-xl mb-3">{project.title}</h3>
                <p className="text-muted text-sm leading-relaxed mb-6 flex-1">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="tag">{tech}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid md:grid-cols-3 gap-6">
            {otherProjects.map((project) => (
              <motion.div key={project.title} variants={fadeInUp} className="card rounded-xl p-6">
                <span className="tag inline-block mb-4">{project.type}</span>
                <h3 className="font-display text-lg mb-2">{project.title}</h3>
                <p className="text-dim text-sm leading-relaxed mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="tag">{tech}</span>
                  ))}
                </div>
              </motion.div>
            ))}
            <motion.div variants={fadeInUp} className="card rounded-xl p-6 flex flex-col items-center justify-center text-center">
              <GitBranch className="w-6 h-6 mb-3 text-gold" />
              <p className="font-mono text-sm text-dim">
                More on request —
                <br />
                ask for the full repo list.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* EDUCATION */}
      <section className="py-24 px-4 sm:px-6">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="max-w-3xl mx-auto">
          <div className="font-mono text-xs tracking-widest uppercase mb-4 text-gold">05 — Education</div>
          <div className="card rounded-xl p-8 flex items-start gap-6">
            <div className="icon-badge w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
              <GraduationCap className="w-5 h-5 text-gold-bright" />
            </div>
            <div className="flex-1">
              <h3 className="font-display text-xl mb-1">Bachelor of Technology, Computer Science</h3>
              <p className="text-muted mb-3">Biju Pattnayak University of Technology</p>
              <div className="flex flex-wrap items-center justify-between font-mono text-sm text-dim">
                <span>April 2019 – May 2023</span>
                <span className="text-gold-bright">SGPA 8.5</span>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-28 px-4 sm:px-6 bg-surface">
        <div className="max-w-4xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="mb-16 text-center">
            <div className="font-mono text-xs tracking-widest uppercase mb-4 text-gold">06 — Contact</div>
            <h2 className="font-display text-4xl sm:text-5xl mb-4">
              $ connect <span className="italic text-muted">--to himansu</span>
            </h2>
            <p className="text-dim font-mono text-sm">Open to fullstack roles and freelance builds.</p>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid md:grid-cols-3 gap-6">
            {[
              { href: 'mailto:himansu72001@gmail.com', icon: Mail, label: 'Email', value: 'himansu72001@gmail.com' },
              { href: 'tel:+917735048476', icon: Phone, label: 'Phone', value: '+91 77350 48476' },
              { href: 'https://www.linkedin.com/in/himansu-sekhar-patra-540924227/', icon: Linkedin, label: 'LinkedIn', value: "Let's connect" }
            ].map(({ href, icon: Icon, label, value }) => (
              <motion.a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                variants={fadeInUp}
                whileHover={{ y: -4 }}
                className="card rounded-xl p-7 text-center"
              >
                <div className="icon-badge w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-gold-bright" />
                </div>
                <h3 className="font-display text-lg mb-1">{label}</h3>
                <p className="font-mono text-xs text-dim">{value}</p>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </section>

      <footer className="py-12 px-4 border-t border-hair-soft">
        <div className="max-w-6xl mx-auto flex flex-col items-center gap-8">
          <div className="flex items-center gap-4">
            {/* TODO: replace with your real GitHub URL */}
            <a href="https://github.com/himansup27" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="GitHub">
              <Github className="w-4 h-4" />
            </a>
          </div>
          <div className="w-full max-w-6xl border-t border-hair-soft pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 font-mono text-xs text-dim">
            <span>portfolio@4.2.0 · built with React &amp; Tailwind</span>
            <span>© {currentYear} Himansu Sekhar Patra</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;