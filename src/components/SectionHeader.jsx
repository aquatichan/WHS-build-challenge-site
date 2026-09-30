/** Section heading mounted on an engraved metal nameplate. */
export function SectionHeader({ index, eyebrow, id, children, intro, align = 'left' }) {
  return (
    <div className={`section-head section-head--${align}`}>
      <div className="plate">
        <span className="plate__screw plate__screw--tl" aria-hidden="true" />
        <span className="plate__screw plate__screw--tr" aria-hidden="true" />
        <span className="plate__screw plate__screw--bl" aria-hidden="true" />
        <span className="plate__screw plate__screw--br" aria-hidden="true" />
        <p className="plate__eyebrow">
          <span className="plate__index">{index}</span>
          <span aria-hidden="true" className="plate__rule" />
          {eyebrow}
        </p>
        <h2 id={id} className="plate__title">
          {children}
        </h2>
      </div>
      {intro && <p className="section-head__intro">{intro}</p>}
    </div>
  );
}
