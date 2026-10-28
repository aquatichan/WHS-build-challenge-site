import { useEffect, useState } from 'react';
import { PiInstagramLogo, PiArrowUpRight, PiLockSimple, PiPlayFill, PiEyeBold } from 'react-icons/pi';
import { INSTAGRAM } from '../content.js';
import { SectionHeader } from './SectionHeader.jsx';
import { LogoMark } from './Logo.jsx';
import { Reveal } from './bits/Reveal.jsx';
import { TiltedCard } from './bits/TiltedCard.jsx';

const EMBED_JS = 'https://www.instagram.com/embed.js';

function loadEmbedScript() {
  if (window.instgrm) {
    window.instgrm.Embeds.process();
    return;
  }
  if (document.querySelector(`script[src="${EMBED_JS}"]`)) return;
  const s = document.createElement('script');
  s.src = EMBED_JS;
  s.async = true;
  document.body.appendChild(s);
}

function Feed() {
  const hasPosts = INSTAGRAM.posts.length > 0;
  useEffect(() => {
    if (hasPosts) loadEmbedScript();
  }, [hasPosts]);

  if (!hasPosts) {
    return (
      <iframe
        className="ig-frame"
        src={`https://www.instagram.com/${INSTAGRAM.handle}/embed/`}
        title={`Recent Instagram posts from @${INSTAGRAM.handle}`}
        loading="lazy"
      />
    );
  }
  return (
    <div className="ig-posts">
      {INSTAGRAM.posts.map((url) => (
        <blockquote key={url} className="instagram-media" data-instgrm-permalink={url} data-instgrm-version="14">
          <a href={url} target="_blank" rel="noopener noreferrer">
            View this post on Instagram
          </a>
        </blockquote>
      ))}
    </div>
  );
}

export function Instagram() {
  const [loaded, setLoaded] = useState(false);

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
              {loaded ? (
                <Feed />
              ) : (
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
                    <button type="button" className="btn btn--primary" onClick={() => setLoaded(true)}>
                      <PiPlayFill aria-hidden="true" /> Load our posts
                    </button>
                    <p>
                      <PiLockSimple aria-hidden="true" /> Loads content from Instagram, which may set cookies.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </TiltedCard>
        </Reveal>
      </div>
    </section>
  );
}
