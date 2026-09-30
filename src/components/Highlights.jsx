import { HIGHLIGHTS } from '../content.js';
import { Reveal } from './bits/Reveal.jsx';

export function Highlights() {
  return (
    <section className="highlights" aria-label="Highlights">
      <div className="container">
        <ul className="highlights__band">
          {HIGHLIGHTS.map(({ value, caption, icon: Icon }, i) => (
            <Reveal as="li" key={value} delay={i * 80} className="stat">
              <span className="stat__icon" aria-hidden="true">
                <Icon />
              </span>
              <span className="stat__value">{value}</span>
              <span className="stat__caption">{caption}</span>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
