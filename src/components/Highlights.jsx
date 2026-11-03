import { HIGHLIGHTS } from '../content.js';
import { Reveal } from './bits/Reveal.jsx';

export function Highlights() {
  return (
    <section className="highlights" aria-label="Key dates">
      <div className="container">
        <ul className="highlights__band">
          {HIGHLIGHTS.map(({ label, value, icon: Icon }, i) => (
            <Reveal as="li" key={label} delay={i * 80} className="stat">
              <span className="stat__icon" aria-hidden="true">
                <Icon />
              </span>
              <span className="stat__caption">{label}</span>
              <span className="stat__value">{value}</span>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
