import { PiEnvelopeSimple, PiBellRinging, PiInstagramLogo } from 'react-icons/pi';
import { FOOTER, INSTAGRAM, SITE } from '../content.js';
import { LogoMark } from './Logo.jsx';
import { ShinyText } from './bits/ShinyText.jsx';

export function Footer() {
  return (
    <footer className="footer">
      <span className="gold-rule gold-rule--wide" aria-hidden="true" />
      <div className="container footer__inner">
        <div className="footer__brand">
          <LogoMark size={48} />
          <div>
            <p className="footer__name">{SITE.name}</p>
            <p className="footer__runby">{FOOTER.runBy}</p>
          </div>
        </div>

        <ul className="footer__list">
          <li>
            <PiEnvelopeSimple aria-hidden="true" />
            <span>
              Sponsor Contact: <a href={`mailto:${SITE.contactEmail1}`}>{SITE.contactEmail1}</a>
            </span>
          </li>
          <li>
            <PiEnvelopeSimple aria-hidden="true" />
            <span>
              Student Contact: <a href={`mailto:${SITE.contactEmail2}`}>{SITE.contactEmail2}</a>
            </span>
          </li>
          <li>
            <PiBellRinging aria-hidden="true" />
            <span>
              Remind code: <strong className="code">{SITE.remindCode}</strong>
            </span>
          </li>
          <li>
            <PiInstagramLogo aria-hidden="true" />
            <span>
              Instagram:{' '}
              <a href={INSTAGRAM.url} target="_blank" rel="noopener noreferrer">
                @{INSTAGRAM.handle}
              </a>
            </span>
          </li>
        </ul>
      </div>
      <p className="footer__legal container">
        © {SITE.school} {SITE.club} · {SITE.city}
      </p>
    </footer>
  );
}
