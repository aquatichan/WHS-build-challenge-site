import { PiTrophyFill } from 'react-icons/pi';
import { PRIZES } from '../content.js';
import { SectionHeader } from './SectionHeader.jsx';
import { Reveal } from './bits/Reveal.jsx';

export function Prizes() {
  return (
    <section id="prizes" className="section" aria-labelledby="prizes-title">
      <div className="container">
        <SectionHeader index="07" eyebrow="Prizes" id="prizes-title" align="center">
          Worth <em>building for.</em>
        </SectionHeader>
        <Reveal className="plaque">
          <div className="plaque__inner">
            <span className="plate__screw plate__screw--tl plate__screw--gold" aria-hidden="true" />
            <span className="plate__screw plate__screw--tr plate__screw--gold" aria-hidden="true" />
            <span className="plate__screw plate__screw--bl plate__screw--gold" aria-hidden="true" />
            <span className="plate__screw plate__screw--br plate__screw--gold" aria-hidden="true" />
            <span className="plaque__medal" aria-hidden="true">
              <PiTrophyFill />
            </span>
            <p className="plaque__text">{PRIZES}</p>
            <span className="gold-rule" aria-hidden="true" />
            <p className="plaque__foot">Westside Build Challenge</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
