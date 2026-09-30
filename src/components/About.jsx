import { ABOUT } from '../content.js';
import { SectionHeader } from './SectionHeader.jsx';
import { Reveal } from './bits/Reveal.jsx';

export function About() {
  return (
    <section id="about" className="section" aria-labelledby="about-title">
      <div className="container about">
        <SectionHeader index="01" eyebrow="What it is" id="about-title">
          A month to build <em>for your school.</em>
        </SectionHeader>
        <Reveal className="about__body">
          <p className="about__lead">{ABOUT[0]}</p>
          {ABOUT.slice(1).map((s) => (
            <p key={s}>{s}</p>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
