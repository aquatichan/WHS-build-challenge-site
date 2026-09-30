import { SPONSORS } from '../content.js';

/**
 * Logo shelf. Hidden until SPONSORS in src/content.js has at least one entry.
 */
export function Supporters() {
  const empty = SPONSORS.length === 0;
  return (
    <section id="supporters" className="supporters" aria-labelledby="supporters-title" hidden={empty}>
      <div className="container">
        <h2 id="supporters-title" className="supporters__title">
          With support from
        </h2>
        <div className="shelf">
          {/* ── SPONSOR LOGOS GO HERE ──────────────────────────────────────────
              Add entries to SPONSORS in src/content.js; they render below.
              The shelf stays hidden while that list is empty. */}
          <ul className="shelf__logos">
            {SPONSORS.map((s) => (
              <li key={s.name}>
                {s.href ? (
                  <a href={s.href} target="_blank" rel="noopener noreferrer">
                    <img src={s.src} alt={s.name} loading="lazy" decoding="async" />
                  </a>
                ) : (
                  <img src={s.src} alt={s.name} loading="lazy" decoding="async" />
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
