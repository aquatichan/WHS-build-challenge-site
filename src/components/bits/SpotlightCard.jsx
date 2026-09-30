import { useRef } from 'react';

/**
 * Card with a soft light that follows the pointer.
 * Pattern adapted from React Bits' "Spotlight Card" (https://reactbits.dev).
 */
export function SpotlightCard({ as: Tag = 'div', className = '', children, ...rest }) {
  const ref = useRef(null);

  const onPointerMove = (e) => {
    const el = ref.current;
    if (!el || e.pointerType === 'touch') return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--spot-x', `${e.clientX - rect.left}px`);
    el.style.setProperty('--spot-y', `${e.clientY - rect.top}px`);
  };

  return (
    <Tag ref={ref} className={`spotlight ${className}`} onPointerMove={onPointerMove} {...rest}>
      {children}
    </Tag>
  );
}
