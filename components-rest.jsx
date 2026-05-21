// Credentials, Contact, Feedback, Footer
const { useState: useStateC, useRef: useRefC } = React;

/* ─── Credentials (certs + achievements + education + languages) ─── */
function Credentials() {
  useReveal();
  const r = window.RESUME;
  return (
    <section id="credentials">
      <div className="container">
        <div className="section-head reveal">
          <span className="eyebrow">05 · Credentials</span>
          <h2>Certifications, wins & education.</h2>
        </div>
        <div className="cred-grid reveal">
          <div className="cred-block">
            <h3>Certifications</h3>
            <ul className="cred-list">
              {r.certifications.map((c, i) => <li key={i}>{c}</li>)}
            </ul>
          </div>
          <div className="cred-block">
            <h3>Achievements</h3>
            <ul className="cred-list">
              {r.achievements.map((a, i) => (
                <li key={i}>
                  {a.title}
                  {(a.year || a.org) && (
                    <span className="sub">{[a.year, a.org].filter(Boolean).join(' · ')}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
          <div className="cred-block">
            <h3>Education & Languages</h3>
            <ul className="cred-list">
              <li>
                {r.education.degree}
                <span className="sub">{r.education.school} · {r.education.period}</span>
              </li>
              {r.languages.map((l, i) => (
                <li key={i}>
                  {l.name}
                  <span className="sub">{l.level}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Contact + Feedback ─── */
function Contact({ showToast }) {
  useReveal();
  const r = window.RESUME;
  const [topic, setTopic] = useStateC('Feedback on your site');
  const [name, setName] = useStateC('');
  const [message, setMessage] = useStateC('');

  const submit = (e) => {
    e.preventDefault();
    if (!message.trim()) {
      showToast('Add a quick message before sending', 'warn');
      return;
    }
    const text =
      `Hi Taha 👋\n\n` +
      `*Topic:* ${topic}\n` +
      (name.trim() ? `*From:* ${name.trim()}\n\n` : '\n') +
      `${message.trim()}\n\n` +
      `— sent from taha.dev`;
    const url = `https://wa.me/${r.whatsapp}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener');
    showToast('Opening WhatsApp…');
    setMessage('');
    setName('');
  };

  return (
    <section id="contact">
      <div className="container">
        <div className="section-head reveal">
          <span className="eyebrow">06 · Reach out</span>
          <h2>Let's talk.</h2>
          <p className="section-lede">
            Best on WhatsApp for quick threads. Long-form goes through the feedback form below.
          </p>
        </div>
        <div className="contact-grid">
          <div className="contact-channels reveal">
            <a className="contact-link" href={`https://wa.me/${r.whatsapp}`} target="_blank" rel="noopener">
              <div>
                <div className="label">WhatsApp</div>
                <div className="val">{r.phone}</div>
              </div>
              <div className="arrow">↗</div>
            </a>
            <a className="contact-link" href={`mailto:${r.email}`}>
              <div>
                <div className="label">Email</div>
                <div className="val">{r.email}</div>
              </div>
              <div className="arrow">↗</div>
            </a>
            <a className="contact-link" href={r.linkedin} target="_blank" rel="noopener">
              <div>
                <div className="label">LinkedIn</div>
                <div className="val">{r.linkedinHandle}</div>
              </div>
              <div className="arrow">↗</div>
            </a>
            <a className="contact-link" href={r.resumeUrl} download>
              <div>
                <div className="label">Résumé</div>
                <div className="val">Download PDF</div>
              </div>
              <div className="arrow">↓</div>
            </a>
          </div>

          <form className="feedback reveal" onSubmit={submit}>
            <h3>Send feedback</h3>
            <p className="helper">This opens WhatsApp with your message pre-filled — review and hit send.</p>

            <div className="field">
              <label htmlFor="fb-topic">Topic</label>
              <select id="fb-topic" value={topic} onChange={(e) => setTopic(e.target.value)}>
                <option>Feedback on your site</option>
                <option>Project / work opportunity</option>
                <option>NetSuite consulting inquiry</option>
                <option>Just saying hi</option>
                <option>Something else</option>
              </select>
            </div>

            <div className="field">
              <label htmlFor="fb-name">Your name (optional)</label>
              <input id="fb-name" type="text" placeholder="What should I call you?" value={name} onChange={(e) => setName(e.target.value)} />
            </div>

            <div className="field">
              <label htmlFor="fb-msg">Message</label>
              <textarea id="fb-msg" placeholder="What's on your mind?" value={message} onChange={(e) => setMessage(e.target.value)} required></textarea>
            </div>

            <button type="submit" className="btn btn-primary" style={{ alignSelf: 'flex-start', marginTop: 4 }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.16 5.335 5.495 0 12.05 0c3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
              Send via WhatsApp
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

/* ─── Footer ─── */
function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div>© {new Date().getFullYear()} Taha Siddiqui</div>
        <div>Karachi · GMT+5</div>
        <div>Designed & coded with intent.</div>
      </div>
    </footer>
  );
}

Object.assign(window, { Credentials, Contact, Footer });
