// Core components: Nav, Hero, About + utility hooks
const { useState, useEffect, useRef, useCallback } = React;

/* ─── Reveal-on-scroll hook ─── */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal:not(.in)');
    if (!els.length) return;
    if (document.body.classList.contains('calm-motion')) {
      els.forEach(el => el.classList.add('in'));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  });
}

/* ─── Typing effect ─── */
function useTyping(strings, { speed = 60, hold = 1400, calm = false } = {}) {
  const [text, setText] = useState('');
  const idx = useRef(0);
  const charIdx = useRef(0);
  const deleting = useRef(false);

  useEffect(() => {
    if (calm) { setText(strings[0]); return; }
    let timer;
    const tick = () => {
      const cur = strings[idx.current];
      if (!deleting.current) {
        charIdx.current++;
        setText(cur.slice(0, charIdx.current));
        if (charIdx.current === cur.length) {
          deleting.current = true;
          timer = setTimeout(tick, hold);
          return;
        }
        timer = setTimeout(tick, speed + Math.random() * 30);
      } else {
        charIdx.current--;
        setText(cur.slice(0, charIdx.current));
        if (charIdx.current === 0) {
          deleting.current = false;
          idx.current = (idx.current + 1) % strings.length;
          timer = setTimeout(tick, 300);
          return;
        }
        timer = setTimeout(tick, speed / 2);
      }
    };
    timer = setTimeout(tick, 600);
    return () => clearTimeout(timer);
  }, [strings.join('|'), calm]);

  return text;
}

/* ─── Smooth scroll helper (renamed to avoid shadowing native window.scrollTo) ─── */
function smoothScrollTo(id) {
  const el = document.getElementById(id);
  if (el) {
    const top = el.getBoundingClientRect().top + window.pageYOffset - 60;
    window.scrollTo({ top, behavior: 'smooth' });
  }
}

/* ─── Navigation ─── */
function Nav({ active, onResume }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    ['about', 'About'],
    ['experience', 'Experience'],
    ['projects', 'Projects'],
    ['skills', 'Skills'],
    ['credentials', 'Credentials'],
    ['contact', 'Contact'],
  ];

  return (
    <nav className={'nav' + (scrolled ? ' scrolled' : '')}>
      <a className="nav-brand" href="#top" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
        taha.dev
      </a>
      <div className="nav-links">
        {links.map(([id, label]) => (
          <a key={id} href={'#' + id}
             className={'nav-link' + (active === id ? ' active' : '')}
             onClick={(e) => { e.preventDefault(); smoothScrollTo(id); }}>
            {label}
          </a>
        ))}
        <a className="btn btn-primary" href={window.RESUME.resumeUrl} download
           style={{ marginLeft: 8 }}
           onClick={onResume}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          Resume
        </a>
      </div>
    </nav>
  );
}

/* ─── Hero ─── */
function Hero({ calm }) {
  const r = window.RESUME;
  const typed = useTyping([
    'Lead Technical Consultant',
    'Full-Stack Developer',
    'NetSuite Architect',
    'Problem Solver',
    'Team Leader',
  ], { calm });

  return (
    <section className="hero" id="top">
      <div className="container">
        <div className="hero-grid">
          <div>
            {/* <div className="status-pill">
              <span className="dot"></span>
              <span>Open to new collaborations</span>
            </div> */}
            <h1 className="hero-name">
              Taha <span className="accent">Siddiqui.</span>
            </h1>
            <div className="hero-title">
              <span>{typed}</span>
              <span className="caret"></span>
            </div>
            <p className="hero-tagline">
              Architecting NetSuite solutions and full-stack platforms for enterprise clients across America, Europe and the Middle East.
            </p>
            <div className="hero-actions">
              <a className="btn btn-primary" href={r.resumeUrl} download>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                Download résumé
              </a>
              <a className="btn" href="#contact" onClick={(e) => { e.preventDefault(); smoothScrollTo('contact'); }}>
                Get in touch →
              </a>
            </div>
          </div>

          <div className="hero-meta">
            <div className="hero-meta-row">
              <span>Based in</span>
              <span>{r.location}</span>
            </div>
            <div className="hero-meta-row">
              <span>Currently</span>
              <span>Lead Technical Consultant @ Beyond Cloud Consulting</span>
            </div>
            <div className="hero-meta-row">
              <span>Experience</span>
              <span>7+ years · NetSuite & Full-Stack</span>
            </div>
            <div className="hero-meta-row">
              <span>Reach</span>
              <span>WhatsApp · LinkedIn · Email</span>
            </div>
          </div>
        </div>
      </div>

      <div className="hero-scrollhint">
        <span>Scroll</span>
        <span className="line"></span>
      </div>
    </section>
  );
}

/* ─── About ─── */
function About() {
  useReveal();
  const r = window.RESUME;
  return (
    <section id="about">
      <div className="container">
        <div className="section-head reveal">
          <span className="eyebrow">01 · About</span>
          <h2>A consultant who codes.</h2>
        </div>
        <div className="about-grid">
          <div className="about-body reveal">
            {r.about.map((p, i) => <p key={i}>{p}</p>)}
          </div>
          <div className="about-stats reveal">
            <div className="stat">
              <div className="stat-num">{r.yearsExperience}<small>+</small></div>
              <div className="stat-label">Years building NetSuite & Full-Stack</div>
            </div>
            <div className="stat">
              <div className="stat-num">3</div>
              <div className="stat-label">NetSuite certifications</div>
            </div>
            <div className="stat">
              <div className="stat-num">3</div>
              <div className="stat-label">Regions served (Americas · EU · ME)</div>
            </div>
            <div className="stat">
              <div className="stat-num">★</div>
              <div className="stat-label">Divisional Star Performer 2021</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { Nav, Hero, About, useReveal });
