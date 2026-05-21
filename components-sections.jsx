// Experience, Projects, Skills sections
const { useState: useStateB, useEffect: useEffectB, useRef: useRefB } = React;

/* ─── Experience timeline ─── */
function Experience() {
  useReveal();
  const [openIdx, setOpenIdx] = useStateB(0); // first one open by default
  const r = window.RESUME;
  return (
    <section id="experience">
      <div className="container">
        <div className="section-head reveal">
          <span className="eyebrow">02 · Experience</span>
          <h2>Where I've worked.</h2>
          <p className="section-lede">
            From backend intern to lead consultant — building systems used by enterprise clients
            across America, Europe and the Middle East.
          </p>
        </div>
        <div className="timeline reveal">
          {r.experience.map((job, i) => (
            <div key={i}
                 className={'tl-item' + (openIdx === i ? ' open' : '')}
                 onClick={() => setOpenIdx(openIdx === i ? -1 : i)}>
              <div className="tl-period">
                {job.period}
                {job.current && <div className="tl-current">Current</div>}
              </div>
              <div>
                <div className="tl-role">{job.role}</div>
                <div className="tl-company">
                  <span>{job.company}</span>
                  <span className="sep">·</span>
                  <span>{job.location}</span>
                </div>
              </div>
              <button className="tl-toggle" aria-label="Toggle details">+</button>
              <div className="tl-expand">
                <ul>
                  {job.highlights.map((h, j) => <li key={j}>{h}</li>)}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Projects ─── */
function Projects() {
  useReveal();
  const [openProj, setOpenProj] = useStateB(null);
  const r = window.RESUME;

  // Close modal on Escape
  useEffectB(() => {
    if (openProj === null) return;
    const handler = (e) => { if (e.key === 'Escape') setOpenProj(null); };
    window.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [openProj]);

  const onMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mx', (e.clientX - rect.left) + 'px');
    e.currentTarget.style.setProperty('--my', (e.clientY - rect.top) + 'px');
  };

  return (
    <section id="projects">
      <div className="container">
        <div className="section-head reveal">
          <span className="eyebrow">03 · Selected work</span>
          <h2>Things I've built.</h2>
          <p className="section-lede">
            Custom integrations, reporting platforms, ERP modules — shipped to production for real teams.
          </p>
        </div>
        <div className="proj-grid reveal">
          {r.projects.map((p, i) => (
            <article key={i} className="proj-card" onMouseMove={onMove} onClick={() => setOpenProj(i)}>
              <div className="proj-region">{p.region}</div>
              <div>
                <h3 className="proj-title">{p.title}</h3>
                <p className="proj-summary">{p.summary}</p>
              </div>
              <div>
                <div className="proj-stack">
                  {p.stack.map((s, j) => <span key={j}>{s}</span>)}
                </div>
                <div className="proj-readmore">Read more →</div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {openProj !== null && (
        <div className="modal-backdrop" onClick={() => setOpenProj(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()} style={{ position: 'relative' }}>
            <button className="modal-close" onClick={() => setOpenProj(null)} aria-label="Close">×</button>
            <h3>{r.projects[openProj].title}</h3>
            <div className="modal-meta">{r.projects[openProj].region} · {r.projects[openProj].stack.join(' · ')}</div>
            <p style={{ fontSize: 16, lineHeight: 1.6, marginBottom: 20 }}>{r.projects[openProj].summary}</p>
            <ul>
              {r.projects[openProj].details.map((d, i) => <li key={i}>{d}</li>)}
            </ul>
          </div>
        </div>
      )}
    </section>
  );
}

/* ─── Skills ─── */
function Skills() {
  useReveal();
  const r = window.RESUME;
  const [active, setActive] = useStateB('All');
  const groups = r.skillGroups;
  const filters = ['All', ...groups.map(g => g.name)];
  const all = groups.flatMap(g => g.skills.map(s => ({ name: s, group: g.name })));

  return (
    <section id="skills">
      <div className="container">
        <div className="section-head reveal">
          <span className="eyebrow">04 · Toolkit</span>
          <h2>Skills & technologies.</h2>
          <p className="section-lede">
            Click a category to filter — the rest fade out.
          </p>
        </div>
        <div className="skills-filter reveal">
          {filters.map(f => (
            <button key={f}
                    className={active === f ? 'active' : ''}
                    onClick={() => setActive(f)}>
              {f}
            </button>
          ))}
        </div>
        <div className="skill-chips reveal">
          {all.map((s, i) => (
            <span key={i} className={'chip' + (active !== 'All' && active !== s.group ? ' dim' : '')}>
              {s.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { Experience, Projects, Skills });
