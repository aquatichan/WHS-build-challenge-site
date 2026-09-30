import { useId, useState } from 'react';
import {
  PiHandTap,
  PiTarget,
  PiUsersFour,
  PiCheckCircle,
  PiStack,
  PiDatabase,
  PiBuildings,
} from 'react-icons/pi';
import { THEME } from '../content.js';
import { useMediaQuery } from '../hooks/useMediaQuery.js';
import { useScrollLight } from '../hooks/useScrollLight.js';
import { Badge } from './Badge.jsx';
import { Reveal } from './bits/Reveal.jsx';

const num = (i) => String(i + 1).padStart(2, '0');

function Blueprint({ card, index, id, tabId, asTab }) {
  const ex = card.example;
  return (
    <div id={id} role={asTab ? 'tabpanel' : 'region'} aria-labelledby={tabId} className="blueprint" tabIndex={asTab ? 0 : -1}>
      <div key={index} className="blueprint__inner">
        <header className="blueprint__head">
          <p className="blueprint__kicker">
            Example project · Track {num(index)} · {card.title}
          </p>
          <h3 className="blueprint__name">
            {ex.name} <span>{ex.tagline}</span>
          </h3>
          <ul className="blueprint__meta" aria-label="Project size">
            <li>{ex.team}</li>
            <li>{ex.level}</li>
          </ul>
        </header>

        <dl className="blueprint__grid">
          <div className="blueprint__cell blueprint__cell--obj">
            <dt><PiTarget aria-hidden="true" /> Objective</dt>
            <dd>{ex.objective}</dd>
          </div>
          <div className="blueprint__cell blueprint__cell--who">
            <dt><PiUsersFour aria-hidden="true" /> Who it helps</dt>
            <dd>{ex.users}</dd>
          </div>
          <div className="blueprint__cell blueprint__cell--stack">
            <dt><PiStack aria-hidden="true" /> Tech stack</dt>
            <dd>
              <ul className="stack">
                {ex.stack.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </dd>
          </div>
          <div className="blueprint__cell blueprint__cell--feat">
            <dt><PiCheckCircle aria-hidden="true" /> Key features</dt>
            <dd>
              <ul className="checks">
                {ex.features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            </dd>
          </div>
          <div className="blueprint__cell blueprint__cell--data">
            <dt><PiDatabase aria-hidden="true" /> Data</dt>
            <dd>{ex.data}</dd>
          </div>
          <div className="blueprint__cell blueprint__cell--adopt">
            <dt><PiBuildings aria-hidden="true" /> What Westside needs to adopt it</dt>
            <dd>{ex.adoption}</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}

export function Theme() {
  const lightRef = useScrollLight();
  const [active, setActive] = useState(0);
  const wide = useMediaQuery('(min-width: 900px)');
  const finePointer = useMediaQuery('(hover: hover) and (pointer: fine)');
  const uid = useId();
  const tabId = (i) => `${uid}-tab-${i}`;
  const panelId = `${uid}-panel`;
  const [first, ...rest] = THEME.title.split(' ');

  const onKeyDown = (e) => {
    const n = THEME.cards.length;
    let next = null;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next = (active + 1) % n;
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') next = (active - 1 + n) % n;
    if (e.key === 'Home') next = 0;
    if (e.key === 'End') next = n - 1;
    if (next === null) return;
    e.preventDefault();
    setActive(next);
    document.getElementById(tabId(next))?.focus();
  };

  // Wide screens: a tab list with one shared panel below the cards.
  // Narrow screens: each card is a disclosure button and its example opens right under it.
  const panel = (
    <Blueprint card={THEME.cards[active]} index={active} id={panelId} tabId={tabId(active)} asTab={wide} />
  );

  return (
    <section id="theme" ref={lightRef} className="section theme-stage" aria-labelledby="theme-title">
      <div className="theme-stage__beam" aria-hidden="true" />
      <div className="container">
        <header className="theme-stage__head">
          <p className="theme-stage__kicker">
            <span className="plate__index">03</span>
            <span aria-hidden="true" className="plate__rule" />
            {THEME.kicker}
          </p>
          <h2 id="theme-title" className="theme-title">
            <span className="theme-title__word">{first}</span>{' '}
            <em className="theme-title__accent">{rest.join(' ')}</em>
          </h2>
          <p className="theme-stage__intro">{THEME.intro}</p>
        </header>

        <div
          className="tracks"
          role={wide ? 'tablist' : undefined}
          aria-label={wide ? 'Theme tracks' : undefined}
          onKeyDown={wide ? onKeyDown : undefined}
        >
          {THEME.cards.map(({ title, icon: Icon, items }, i) => {
            const selected = i === active;
            return (
              <Reveal key={title} delay={i * 90} className="tracks__cell" role={wide ? 'presentation' : undefined}>
                <button
                  type="button"
                  id={tabId(i)}
                  {...(wide
                    ? { role: 'tab', 'aria-selected': selected, tabIndex: selected ? 0 : -1 }
                    : { 'aria-expanded': selected })}
                  aria-controls={panelId}
                  className={`track glass ${selected ? 'is-active' : ''}`}
                  onClick={() => setActive(i)}
                  onPointerEnter={(e) => finePointer && e.pointerType === 'mouse' && setActive(i)}
                >
                  <span className="track__top">
                    <Badge>{num(i)}</Badge>
                    <span className="track__icon" aria-hidden="true">
                      <Icon />
                    </span>
                  </span>
                  <span className="track__title">{title}</span>
                  <span className="tags">
                    {items.map((it) => (
                      <span key={it} className="tag">
                        {it}
                      </span>
                    ))}
                  </span>
                  <span className="track__hint">
                    <PiHandTap aria-hidden="true" />
                    {selected ? `Showing example: ${THEME.cards[i].example.name}` : 'See an example project'}
                  </span>
                </button>
                {!wide && selected && panel}
              </Reveal>
            );
          })}
        </div>
        {wide && (
          <div className="blueprint-wrap" style={{ '--pointer': `${(active * 2 + 1) * (100 / 6)}%` }}>
            {panel}
          </div>
        )}
      </div>
    </section>
  );
}
