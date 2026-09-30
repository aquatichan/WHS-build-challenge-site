import { RULES } from '../content.js';
import { SectionHeader } from './SectionHeader.jsx';
import { Reveal } from './bits/Reveal.jsx';

export function Rules() {
  return (
    <section id="rules" className="section" aria-labelledby="rules-title">
      <div className="container">
        <SectionHeader index="05" eyebrow="Rules" id="rules-title">
          The fine print, <em>engraved.</em>
        </SectionHeader>
        <Reveal className="engraved">
          <span className="plate__screw plate__screw--tl" aria-hidden="true" />
          <span className="plate__screw plate__screw--tr" aria-hidden="true" />
          <span className="plate__screw plate__screw--bl" aria-hidden="true" />
          <span className="plate__screw plate__screw--br" aria-hidden="true" />
          <ol className="engraved__list">
            {RULES.map((r, i) => (
              <li key={r}>
                <span className="engraved__num" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="engraved__text">{r}</span>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}
