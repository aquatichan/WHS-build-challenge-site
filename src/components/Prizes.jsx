import { PiSparkle } from 'react-icons/pi';
import { PRIZES } from '../content.js';
import { SectionHeader } from './SectionHeader.jsx';
import { Reveal } from './bits/Reveal.jsx';

function Medal({ tier, place }) {
  return (
    <span className={`medal medal--${tier}`} aria-hidden="true">
      <span className="medal__face">
        {place.replace(/\D/g, '')}
        <small>{place.replace(/\d/g, '')}</small>
      </span>
    </span>
  );
}

export function Prizes() {
  // Visual order on wide screens: 2nd · 1st · 3rd. DOM order stays 1st, 2nd, 3rd.
  return (
    <section id="prizes" className="section prizes" aria-labelledby="prizes-title">
      <div className="prizes__aura" aria-hidden="true" />
      <div className="container">
        <SectionHeader index="01" eyebrow="Prizes" id="prizes-title" align="center">
          Real prizes. <em className="gold-text">A real shot at changing Westside.</em>
        </SectionHeader>

        <ol className="podium">
          {PRIZES.podium.map((p, i) => (
            <Reveal as="li" key={p.track} delay={i * 110} className={`podium__slot podium__slot--${p.tier}`}>
              <article className={`prize-card prize-card--${p.tier}`}>
                {p.tier === 'gold' && <span className="prize-card__rays" aria-hidden="true" />}
                <Medal tier={p.tier} place={p.place} />
                <p className="prize-card__track">{p.track}</p>
                <h3 className="prize-card__prize">
                  <p.icon aria-hidden="true" className="prize-card__icon" />
                  {p.prize}
                </h3>
                {p.note && <p className="prize-card__note">{p.note}</p>}
              </article>
              <span className="podium__step" aria-hidden="true">
                <span>{p.place}</span>
              </span>
            </Reveal>
          ))}
        </ol>

        <ul className="prize-more">
          {PRIZES.more.map(({ title, prize, icon: Icon }, i) => (
            <Reveal as="li" key={title} delay={i * 80} className="prize-more__item">
              <span className="prize-more__icon" aria-hidden="true">
                <Icon />
              </span>
              <div>
                <h3 className="prize-more__title">{title}</h3>
                <p className="prize-more__prize">{prize}</p>
              </div>
            </Reveal>
          ))}
        </ul>

        <p className="prizes__foot">
          <PiSparkle aria-hidden="true" /> {PRIZES.footnote}
        </p>
      </div>
    </section>
  );
}
