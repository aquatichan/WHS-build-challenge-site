/** Stamped-metal number badge with a gold rim. */
export function Badge({ children, size = 'md' }) {
  return (
    <span className={`badge badge--${size}`} aria-hidden="true">
      <span className="badge__face">{children}</span>
    </span>
  );
}
