import { PiEnvelopeSimple, PiBellRinging, PiInstagramLogo } from 'react-icons/pi';
import { FOOTER, INSTAGRAM_ACCOUNTS, SITE } from '../content.js';
import { LogoMark } from './Logo.jsx';
import { GwcMark } from './GwcMark.jsx';

export function Footer() {
  return (
    <footer className="footer">
      <span className="footer__aurora" aria-hidden="true" />
      <div className="container footer__inner">
        <div className="footer__brand">
          <span className="lockup">
            <LogoMark size={48} />
            <span className="lockup__x" aria-hidden="true">×</span>
            <GwcMark size={48} />
          </span>
          <p className="footer__name">{SITE.name}</p>
          <p className="footer__runby">{FOOTER.runBy}</p>
        </div>

        <div className="footer__col">
          <h2 className="footer__heading">Contact</h2>
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
                Coding Club Contact: <a href={`mailto:${SITE.contactEmail2}`}>{SITE.contactEmail2}</a>
              </span>
            </li>
            <li>
              <PiEnvelopeSimple aria-hidden="true" />
              <span>
                GWC Contact: <a href={`mailto:${SITE.contactEmail3}`}>{SITE.contactEmail3}</a>
              </span>
            </li>
            <li>
              <PiBellRinging aria-hidden="true" />
              <span>
                Remind code: <strong className="code">{SITE.remindCode}</strong>
              </span>
            </li>
          </ul>
        </div>

        <div className="footer__col">
          <h2 className="footer__heading">Follow along</h2>
          <ul className="follow">
            {INSTAGRAM_ACCOUNTS.map((a) => (
              <li key={a.handle}>
                <a className={`follow__card ${a.gwc ? 'follow__card--gwc' : ''}`} href={a.url} target="_blank" rel="noopener noreferrer">
                  {a.gwc ? <GwcMark size={40} /> : <LogoMark size={40} />}
                  <span className="follow__text">
                    <span className="follow__handle">@{a.handle}</span>
                    <span className="follow__club">{a.club}</span>
                  </span>
                  <span className="follow__btn">
                    <PiInstagramLogo aria-hidden="true" /> Follow
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
