import { PiCheckBold } from 'react-icons/pi';
import { TIMELINE } from '../content.js';
import { useNow } from '../hooks/useNow.js';
import { SectionHeader } from './SectionHeader.jsx';
import { Reveal } from './bits/Reveal.jsx';

function localDate(ymd) {
  const [y, m, d] = ymd.split('-').map(Number);
  return new Date(y, m - 1, d).getTime();
}

/** Index of the phase that most recently started; -1 before the first; length after the last ends. */
function currentIndex(now) {
  if (now === null) return null;
  const last = TIMELINE[TIMELINE.length - 1];
  const lastEnd = localDate(last.end ?? last.start) + 86400000;
  if (now >= lastEnd) return TIMELINE.length;
  let idx = -1;
  TIMELINE.forEach((p, i) => {
    if (now >= localDate(p.start)) idx = i;
  });
  return idx;
}

export function Timeline() {
  const now = useNow(60000);
  const cur = currentIndex(now);

  return (
    <section id="timeline" className="section" aria-labelledby="timeline-title">
      <div className="container">
        <SectionHeader index="03" eyebrow="Timeline" id="timeline-title">
          From reveal <em>to pitch.</em>
        </SectionHeader>

        <ol className="rail">
          {TIMELINE.map((p, i) => {
            let status = 'upcoming';
            if (cur !== null) {
              if (i < cur) status = 'past';
              else if (i === cur) status = 'current';
              else if (cur === -1 && i === 0) status = 'next';
            }
            const glowing = status === 'current' || status === 'next';
            return (
              <li
                key={p.title}
                className={`rail__stop is-${status}`}
                aria-current={status === 'current' ? 'step' : undefined}
              >
                <span className="rail__rivet" aria-hidden="true">
                  {status === 'past' && <PiCheckBold />}
                </span>
                <Reveal className="rail__card glass">
                  <p className="rail__date">
                    <time dateTime={p.start}>{p.date}</time>
                    {glowing && <span className="rail__now">{status === 'current' ? 'Now' : 'Up next'}</span>}
                    {status === 'past' && <span className="sr-only"> (done)</span>}
                  </p>
                  <h3 className="rail__title">{p.title}</h3>
                  {p.detail && <p className="rail__detail">{p.detail}</p>}
                </Reveal>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
