import { PiInstagramLogo, PiArrowUpRight, PiEyeBold } from 'react-icons/pi';
import { INSTAGRAM } from '../content.js';
import { SectionHeader } from './SectionHeader.jsx';
import { LogoMark } from './Logo.jsx';
import { Reveal } from './bits/Reveal.jsx';
import { TiltedCard } from './bits/TiltedCard.jsx';

export function Instagram() {
  return (
    <section id="instagram" className="section" aria-labelledby="instagram-title">
      <div className="container ig">
        <div className="ig__copy">
          <SectionHeader index="08" eyebrow="Follow along" id="instagram-title">
            See what we <em>ship.</em>
          </SectionHeader>
          <Reveal className="ig-profile glass">
            <span className="ig-profile__avatar" aria-hidden="true">
              <span>
                <LogoMark size={62} />
              </span>
            </span>
            <div className="ig-profile__text">
              <p className="ig-profile__handle">@{INSTAGRAM.handle}</p>
              <p className="ig-profile__views">
                <PiEyeBold aria-hidden="true" />
                <strong>{INSTAGRAM.views}</strong> views
              </p>
              <p className="ig-profile__blurb">{INSTAGRAM.blurb}</p>
            </div>
            <a className="btn btn--ig" href={INSTAGRAM.url} target="_blank" rel="noopener noreferrer">
              <PiInstagramLogo aria-hidden="true" /> Follow @{INSTAGRAM.handle}
              <PiArrowUpRight aria-hidden="true" />
              <span className="sr-only">(opens Instagram)</span>
            </a>
          </Reveal>
        </div>

        <Reveal className="phone-stage" delay={120}>
          <TiltedCard className="phone">
            <span className="phone__notch" aria-hidden="true" />
            <div className="phone__screen">
              <div className="ig-facade">
                <div className="ig-facade__bar">
                  <PiInstagramLogo aria-hidden="true" />
                  <span>{INSTAGRAM.handle}</span>
                </div>
                <div className="ig-facade__profile" aria-hidden="true">
                  <span className="ig-facade__avatar">
                    <span>
                      <LogoMark size={54} />
                    </span>
                  </span>
                  <span className="ig-facade__stats">
                    {INSTAGRAM.stats.map((st) => (
                      <span key={st.label}>
                        <strong>{st.value}</strong>
                        {st.label}
                      </span>
                    ))}
                  </span>
                  <span className="ig-facade__name">WHS Coding Club</span>
                </div>
                <p className="ig-facade__bio" aria-hidden="true">
                  {INSTAGRAM.bio.map((line) => (
                    <span key={line}>{line}</span>
                  ))}
                </p>
                <div className="ig-facade__grid" aria-hidden="true">
                  {Array.from({ length: 9 }, (_, i) => (
                    <span key={i} style={{ '--i': i }} />
                  ))}
                </div>
                <div className="ig-facade__cta">
                  <a className="btn btn--primary" href={INSTAGRAM.url} target="_blank" rel="noopener noreferrer">
                    <PiInstagramLogo aria-hidden="true" /> See our posts
                    <span className="sr-only">(opens Instagram)</span>
                  </a>
                </div>
              </div>
            </div>
          </TiltedCard>
        </Reveal>
      </div>
    </section>
  );
}
