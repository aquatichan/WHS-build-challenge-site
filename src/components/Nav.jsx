import { useEffect, useRef, useState } from 'react';
import { PiList, PiX, PiArrowUpRight } from 'react-icons/pi';
import { NAV_LINKS, SITE } from '../content.js';
import { LogoMark } from './Logo.jsx';

export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState(null);
  const progressRef = useRef(null);

  // Scrolled state + reading-progress bar (written straight to the DOM, no re-render per frame).
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const y = window.scrollY;
      setScrolled(y > 12);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  // Highlight the nav link for the section currently in view.
  useEffect(() => {
    const sections = NAV_LINKS.map((l) => document.getElementById(l.id)).filter(Boolean);
    if (!('IntersectionObserver' in window) || !sections.length) return;
    const visible = new Map();
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => visible.set(e.target.id, e.isIntersecting));
        const current = NAV_LINKS.find((l) => visible.get(l.id));
        setActiveId(current ? current.id : null);
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    const onResize = () => window.innerWidth >= 1100 && setOpen(false);
    window.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', onResize);
    };
  }, [open]);

  return (
    <header className={`nav ${scrolled ? 'is-scrolled' : ''} ${open ? 'is-open' : ''}`}>
      <div className="nav__bar">
        <a className="nav__brand" href="#top" aria-label={`${SITE.name}, back to top`}>
          <LogoMark size={36} />
          <span className="nav__brand-text">
            <span className="nav__brand-small">Westside</span>
            <span className="nav__brand-big">Build Challenge</span>
          </span>
        </a>

        <nav className="nav__links" aria-label="Sections">
          <ul>
            {NAV_LINKS.map((l) => (
              <li key={l.id}>
                <a
                  href={`#${l.id}`}
                  className={activeId === l.id ? 'is-active' : undefined}
                  aria-current={activeId === l.id ? 'location' : undefined}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="nav__actions">
          <a className="btn btn--primary btn--sm" href={SITE.signupUrl}>
            Sign up <PiArrowUpRight aria-hidden="true" />
          </a>
          <button
            type="button"
            className="nav__toggle"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <PiX aria-hidden="true" /> : <PiList aria-hidden="true" />}
          </button>
        </div>
        <span className="nav__progress" aria-hidden="true">
          <span ref={progressRef} />
        </span>
      </div>

      {open && <div className="nav__scrim" aria-hidden="true" onClick={() => setOpen(false)} />}

      <nav id="mobile-menu" className="nav__menu" aria-label="Sections" hidden={!open}>
        <ul>
          {NAV_LINKS.map((l) => (
            <li key={l.id}>
              <a href={`#${l.id}`} onClick={() => setOpen(false)}>
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
