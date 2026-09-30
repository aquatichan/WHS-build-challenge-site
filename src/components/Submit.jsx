import { PiCalendarCheck } from 'react-icons/pi';
import { SUBMIT } from '../content.js';
import { SectionHeader } from './SectionHeader.jsx';
import { SpotlightCard } from './bits/SpotlightCard.jsx';
import { Reveal } from './bits/Reveal.jsx';

export function Submit() {
  return (
    <section id="submit" className="section" aria-labelledby="submit-title">
      <div className="container">
        <SectionHeader index="06" eyebrow="What to submit" id="submit-title">
          Four things, <em>one deadline.</em>
        </SectionHeader>
        <p className="due-chip">
          <PiCalendarCheck aria-hidden="true" /> {SUBMIT.due}
        </p>
        <ul className="submit-grid">
          {SUBMIT.items.map(({ title, detail, icon: Icon }, i) => (
            <Reveal as="li" key={title} delay={i * 70}>
              <SpotlightCard className="glass submit-card">
                <span className="submit-card__icon" aria-hidden="true">
                  <Icon />
                </span>
                <div>
                  <h3 className="submit-card__title">{title}</h3>
                  <p className="submit-card__detail">{detail}</p>
                </div>
              </SpotlightCard>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
