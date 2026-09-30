import { useEffect, useState } from 'react';
import { PiList, PiX, PiArrowUpRight } from 'react-icons/pi';
import { NAV_LINKS, SITE } from '../content.js';
import { LogoMark } from './Logo.jsx';

export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    const onResize = () => window.innerWidth >= 960 && setOpen(false);
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
          <LogoMark size={30} />
          <span className="nav__brand-text">
            <span className="nav__brand-small">Westside</span>
            <span className="nav__brand-big">Build Challenge</span>
          </span>
        </a>

        <nav className="nav__links" aria-label="Sections">
          <ul>
            {NAV_LINKS.map((l) => (
              <li key={l.id}>
                <a href={`#${l.id}`}>{l.label}</a>
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
      </div>

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
