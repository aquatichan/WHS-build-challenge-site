import { JUDGING } from '../content.js';
import { SectionHeader } from './SectionHeader.jsx';
import { Reveal } from './bits/Reveal.jsx';

const TOTAL = JUDGING.criteria.reduce((a, c) => a + c.points, 0);

export function Judging() {
  return (
    <section id="judging" className="section" aria-labelledby="judging-title">
      <div className="container">
        <SectionHeader index="07" eyebrow="How you’re judged" id="judging-title" intro={JUDGING.intro}>
          The rubric, <em>out of {TOTAL}.</em>
        </SectionHeader>

        <Reveal className="rubric glass">
          {/* Share-of-total bar: each segment is sized by its points and labeled directly. */}
          <div className="weightbar" role="img" aria-label={`Point weights: ${JUDGING.criteria.map((c) => `${c.label} ${c.points}`).join(', ')}`}>
            {JUDGING.criteria.map((c, i) => (
              <span key={c.label} className={`weightbar__seg weightbar__seg--${i}`} style={{ flexGrow: c.points }}>
                <strong>{c.points}</strong>
              </span>
            ))}
          </div>
          <div className="weightbar__scale" aria-hidden="true">
            <span>0</span>
            <span>{TOTAL} pts</span>
          </div>

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

          <div className="levels">
            <p className="levels__title">Each category is scored on four levels</p>
            <ol className="levels__list">
              {JUDGING.levels.map((l, i) => (
                <li key={l.name} className={`level level--${i}`}>
                  <span className="level__name">{l.name}</span>
                  <span className="level__range">{l.range} of the category’s points</span>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
