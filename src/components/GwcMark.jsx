import { SITE } from '../content.js';

/** Girls Who Code mark: the logo once SITE.gwcLogo is set, otherwise a pastel "GWC" disc. */
export function GwcMark({ size = 32 }) {
  if (SITE.gwcLogo) {
    return (
      <img className="gwc-mark" src={SITE.gwcLogo} width={size} height={size} alt="" aria-hidden="true" decoding="async" />
    );
  }
  return (
    <span className="gwc-mark gwc-mark--text" style={{ width: size, height: size }} aria-hidden="true">
      GWC
    </span>
  );
}
