import { JUDGING } from '../content.js';
import { useInView } from '../hooks/useInView.js';
import { SectionHeader } from './SectionHeader.jsx';

const MAX = Math.max(...JUDGING.map((c) => c.points));
const TOTAL = JUDGING.reduce((a, c) => a + c.points, 0);

export function Judging() {
  const [ref, inView] = useInView({ threshold: 0.25 });

  return (
    <section id="judging" className="section" aria-labelledby="judging-title">
      <div className="container">
        <SectionHeader
          index="06"
          eyebrow="How you’re judged"
          id="judging-title"
          intro={`${TOTAL} points total. Impact on Westside counts the most.`}
        >
          Built to matter, <em>then to impress.</em>
        </SectionHeader>

        <ul ref={ref} className={`gauges glass ${inView ? 'is-filled' : ''}`}>
          {JUDGING.map((c, i) => (
            <li key={c.label} className="gauge">
              <div className="gauge__head">
                <h3 className="gauge__label">{c.label}</h3>
                <p className="gauge__points">
                  <strong>{c.points}</strong> <span>pts</span>
                </p>
              </div>
              <div
                className="tube"
                role="img"
                aria-label={`${c.points} of ${TOTAL} points`}
                style={{ '--fill': `${(c.points / MAX) * 100}%`, '--delay': `${i * 120}ms` }}
              >
                <span className="tube__cap tube__cap--l" aria-hidden="true" />
                <span className="tube__glass" aria-hidden="true">
                  <span className="tube__liquid" />
                  <span className="tube__ticks" />
                </span>
                <span className="tube__cap tube__cap--r" aria-hidden="true" />
              </div>
              <p className="gauge__detail">{c.detail}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
