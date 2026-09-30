import { PiArrowUpRight, PiScroll, PiTrophyFill, PiArrowDown } from 'react-icons/pi';
import { HERO, SITE } from '../content.js';
import { FlipClock } from './FlipClock.jsx';
import { ShinyText } from './bits/ShinyText.jsx';

export function Hero() {
  return (
    <section id="top" className="hero" aria-labelledby="hero-title">
      <div className="container hero__inner">
        <p className="chip">
          <span className="chip__dot" aria-hidden="true" />
          <ShinyText>{HERO.eyebrow}</ShinyText>
        </p>

        <h1 id="hero-title" className="hero__title">
          {HERO.headline} <em className="gold-text">{HERO.headlineAccent}</em>
        </h1>

        <div className="hero__grid">
          <div className="hero__copy">
            <p className="hero__sub">
              {HERO.subhead.split(' · ').map((part, i) => (
                <span key={part}>
                  {i > 0 && ' · '}
                  <span className="hero__sub-part">{part}</span>
                </span>
              ))}
            </p>
            <div className="hero__ctas">
              <a className="btn btn--primary btn--lg" href={SITE.signupUrl}>
                {HERO.primaryCta} <PiArrowUpRight aria-hidden="true" />
              </a>
              <a className="btn btn--steel btn--lg" href="#rules">
                <PiScroll aria-hidden="true" /> {HERO.secondaryCta}
              </a>
            </div>
            <a className="prize-teaser" href="#prizes">
              <span className="prize-teaser__icon" aria-hidden="true">
                <PiTrophyFill />
              </span>
              <span>{HERO.prizeTeaser}</span>
              <PiArrowDown aria-hidden="true" className="prize-teaser__arrow" />
            </a>
          </div>
          <FlipClock />
        </div>
      </div>
    </section>
  );
}
