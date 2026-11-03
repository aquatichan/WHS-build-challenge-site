import { PiArrowUpRight, PiCalendarCheck } from 'react-icons/pi';
import { SITE, SUBMIT } from '../content.js';
import { Reveal } from './bits/Reveal.jsx';

/** Closing call to action: the one place the submission form lives. */
export function SubmitCta() {
  return (
    <section id="ship" className="section ship" aria-labelledby="ship-title">
      <div className="container">
        <Reveal className="ship__panel">
          <div className="ship__copy">
            <p className="ship__kicker">Last step</p>
            <h2 id="ship-title" className="ship__title">
              Done building? <em>Ship it.</em>
            </h2>
            <p className="ship__due">
              <PiCalendarCheck aria-hidden="true" /> Due {SUBMIT.dueShort}
            </p>
          </div>
          <a className="btn btn--primary btn--lg ship__btn" href={SITE.submitUrl}>
            {SUBMIT.cta} <PiArrowUpRight aria-hidden="true" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
