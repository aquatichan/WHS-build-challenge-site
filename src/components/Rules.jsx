import { PiCalendarCheck } from 'react-icons/pi';
import { RULES, SUBMIT } from '../content.js';
import { SectionHeader } from './SectionHeader.jsx';
import { Reveal } from './bits/Reveal.jsx';

export function Rules() {
  return (
    <section id="rules" className="section" aria-labelledby="rules-title">
      <div className="container">
        <SectionHeader index="03" eyebrow="Rules & submitting" id="rules-title">
          The fine print, <em>engraved.</em>
        </SectionHeader>
        <div className="rules-stack">
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

          <div id="submit" className="submit">
            <div className="submit__head">
              <h3 className="submit__title">
                Four things, <em>one deadline.</em>
              </h3>
              <p className="due-chip">
                <PiCalendarCheck aria-hidden="true" /> {SUBMIT.due}
              </p>
            </div>
            <ul className="submit-list">
              {SUBMIT.items.map(({ title, detail, icon: Icon }, i) => (
                <Reveal as="li" key={title} delay={i * 70} className="submit-card glass">
                  <span className="submit-card__icon" aria-hidden="true">
                    <Icon />
                  </span>
                  <div>
                    <h4 className="submit-card__title">{title}</h4>
                    <p className="submit-card__detail">{detail}</p>
                  </div>
                </Reveal>
              ))}
            </ul>
            <p className="submit-note">{SUBMIT.note}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
