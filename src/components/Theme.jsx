import { THEME } from '../content.js';
import { SectionHeader } from './SectionHeader.jsx';
import { Badge } from './Badge.jsx';
import { SpotlightCard } from './bits/SpotlightCard.jsx';
import { Reveal } from './bits/Reveal.jsx';

export function Theme() {
  const [first, ...rest] = THEME.title.split(' ');
  return (
    <section id="theme" className="section" aria-labelledby="theme-title">
      <div className="container">
        <SectionHeader index="02" eyebrow="This year’s theme" id="theme-title" intro={THEME.intro}>
          {first} <em>{rest.join(' ')}</em>
        </SectionHeader>
        <ul className="theme-grid">
          {THEME.cards.map(({ title, icon: Icon, items }, i) => (
            <Reveal as="li" key={title} delay={i * 90}>
              <SpotlightCard as="article" className="glass theme-card">
                <div className="theme-card__top">
                  <Badge>{String(i + 1).padStart(2, '0')}</Badge>
                  <span className="theme-card__icon" aria-hidden="true">
                    <Icon />
                  </span>
                </div>
                <h3 className="theme-card__title">
                  <span className="sr-only">{String(i + 1).padStart(2, '0')}. </span>
                  {title}
                </h3>
                <ul className="tags" aria-label={`${title} ideas`}>
                  {items.map((it) => (
                    <li key={it} className="tag">
                      {it}
                    </li>
                  ))}
                </ul>
              </SpotlightCard>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
