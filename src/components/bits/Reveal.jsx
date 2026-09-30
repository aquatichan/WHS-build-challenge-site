import { useInView } from '../../hooks/useInView.js';

/**
 * Fades and lifts content in as it scrolls into view.
 * Pattern adapted from React Bits' "Fade Content" (https://reactbits.dev).
 * Content is fully visible without JS and under prefers-reduced-motion (see CSS).
 */
export function Reveal({ as: Tag = 'div', delay = 0, className = '', children, style, ...rest }) {
  const [ref, inView] = useInView();
  return (
    <Tag
      ref={ref}
      className={`reveal ${inView ? 'is-visible' : ''} ${className}`}
      style={{ ...style, '--reveal-delay': `${delay}ms` }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
