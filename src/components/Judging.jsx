import { JUDGING } from '../content.js';
import { SectionHeader } from './SectionHeader.jsx';
import { Reveal } from './bits/Reveal.jsx';

const TOTAL = JUDGING.criteria.reduce((a, c) => a + c.points, 0);

export function Judging() {
  return (
    <section id="judging" className="section" aria-labelledby="judging-title">
      <div className="container">
        <SectionHeader index="04" eyebrow="How you’re judged" id="judging-title" intro={JUDGING.intro}>
          The rubric, <em>out of {TOTAL}.</em>
        </SectionHeader>

        <Reveal className="rubric glass">
          <table className="rubric__table">
            <caption className="sr-only">Judging rubric: category, weight, points, and what earns full marks</caption>
            <thead>
              <tr>
                <th scope="col">Category</th>
                <th scope="col" className="num">Weight</th>
                <th scope="col" className="num">Points</th>
                <th scope="col">Full marks look like</th>
              </tr>
            </thead>
            <tbody>
              {JUDGING.criteria.map((c, i) => (
                <tr key={c.label}>
                  <th scope="row">
                    <span className={`swatch swatch--${i}`} aria-hidden="true" />
                    {c.label}
                  </th>
                  <td className="num" data-label="Weight">
                    {Math.round((c.points / TOTAL) * 100)}%
                  </td>
                  <td className="num" data-label="Points">
                    <span className="pts">{c.points}</span>
                  </td>
                  <td className="rubric__full" data-label="Full marks">
                    {c.full}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <th scope="row">Total</th>
                <td className="num" data-label="Weight">100%</td>
                <td className="num" data-label="Points">
                  <span className="pts">{TOTAL}</span>
                </td>
                <td aria-hidden="true" />
              </tr>
            </tfoot>
          </table>
        </Reveal>
      </div>
    </section>
  );
}
