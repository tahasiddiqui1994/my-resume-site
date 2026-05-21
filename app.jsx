// Main App — composition, theme management, cursor follower, scroll-spy, Tweaks
const { useState: useStateA, useEffect: useEffectA, useRef: useRefA } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "theme": "minimal",
  "mode": "light",
  "layout": "classic",
  "motion": "lively",
  "cursor": false
}/*EDITMODE-END*/;

/* ─── Cursor follower ─── */
function CursorFollower() {
  const dotRef = useRefA(null);
  const ringRef = useRefA(null);
  useEffectA(() => {
    let raf;
    let mx = window.innerWidth / 2, my = window.innerHeight / 2;
    let rx = mx, ry = my;
    const onMove = (e) => { mx = e.clientX; my = e.clientY; if (dotRef.current) { dotRef.current.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`; } };
    const tick = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      if (ringRef.current) ringRef.current.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(tick);
    };
    const onOver = (e) => {
      const t = e.target;
      const interactive = t.closest('a, button, input, textarea, select, [role=button], .proj-card, .tl-item, .chip');
      if (ringRef.current) ringRef.current.classList.toggle('hover', !!interactive);
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseover', onOver);
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
      cancelAnimationFrame(raf);
    };
  }, []);
  return (
    <React.Fragment>
      <div ref={dotRef} className="cursor-dot"></div>
      <div ref={ringRef} className="cursor-ring"></div>
    </React.Fragment>
  );
}

/* ─── Scroll-spy ─── */
function useScrollSpy(ids) {
  const [active, setActive] = useStateA(ids[0]);
  useEffectA(() => {
    const onScroll = () => {
      const y = window.scrollY + 120;
      let cur = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= y) cur = id;
      }
      setActive(cur);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [ids.join('|')]);
  return active;
}

/* ─── Toast hook ─── */
function useToast() {
  const [toast, setToast] = useStateA(null);
  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2400);
  };
  return [toast, showToast];
}

/* ─── App ─── */
function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [toast, showToast] = useToast();
  const active = useScrollSpy(['top', 'about', 'experience', 'projects', 'skills', 'credentials', 'contact']);

  // Apply theme to body
  useEffectA(() => {
    document.body.setAttribute('data-theme', t.theme);
    document.body.setAttribute('data-mode', t.mode);
    document.body.setAttribute('data-layout', t.layout);
    document.body.classList.toggle('calm-motion', t.motion === 'calm');
    document.body.classList.toggle('cursor-custom', !!t.cursor);
  }, [t.theme, t.mode, t.layout, t.motion, t.cursor]);

  // Keyboard shortcut: Cmd/Ctrl+K opens tweaks via host
  useEffectA(() => {
    const h = (e) => {
      if ((e.metaKey || e.ctrlKey) && (e.key === 'k' || e.key === 'K')) {
        e.preventDefault();
        // dispatch activate to ourselves
        window.dispatchEvent(new MessageEvent('message', { data: { type: '__activate_edit_mode' } }));
      }
    };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, []);

  return (
    <React.Fragment>
      <Nav active={active === 'top' ? null : active} onResume={() => showToast('Downloading résumé…')} />
      <main>
        <Hero calm={t.motion === 'calm'} />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Credentials />
        <Contact showToast={showToast} />
      </main>
      <Footer />

      {t.cursor && <CursorFollower />}

      <TweaksPanel>
        <TweakSection label="Aesthetic" />
        <TweakSelect
          label="Theme"
          value={t.theme}
          options={[
            { value: 'minimal',  label: 'Minimal & Editorial' },
            { value: 'modern',   label: 'Modern Tech' },
            { value: 'terminal', label: 'Terminal / Dev' },
            { value: 'warm',     label: 'Warm & Personal' },
          ]}
          onChange={(v) => setTweak('theme', v)}
        />
        <TweakRadio
          label="Mode"
          value={t.mode}
          options={['light', 'dark']}
          onChange={(v) => setTweak('mode', v)}
        />

        <TweakSection label="Layout" />
        <TweakSelect
          label="Structure"
          value={t.layout}
          options={[
            { value: 'classic',   label: 'Classic — single column' },
            { value: 'split',     label: 'Split — sticky section rail' },
            { value: 'editorial', label: 'Editorial — centered' },
          ]}
          onChange={(v) => setTweak('layout', v)}
        />

        <TweakSection label="Motion" />
        <TweakRadio
          label="Energy"
          value={t.motion}
          options={['calm', 'lively']}
          onChange={(v) => setTweak('motion', v)}
        />
        <TweakToggle
          label="Custom cursor"
          value={t.cursor}
          onChange={(v) => setTweak('cursor', v)}
        />
      </TweaksPanel>

      <div className={'toast' + (toast ? ' show' : '')}>{toast}</div>
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
