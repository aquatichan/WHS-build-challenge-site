import { useEffect, useRef } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion.js';

const REST = { rx: 4, ry: -10 };

/**
 * 3D card that tilts toward the pointer and springs back to a slight resting angle,
 * with a glare highlight that tracks the tilt.
 * Pattern adapted from React Bits' "Tilted Card" (https://reactbits.dev).
 * Without a fine pointer (phones) it gently sways on its own instead; under
 * prefers-reduced-motion it stays at the resting angle.
 */
export function TiltedCard({ as: Tag = 'div', amplitude = 14, hoverScale = 1.03, className = '', children, ...rest }) {
  const ref = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return undefined;

    const cur = { rx: REST.rx, ry: REST.ry, s: 1 };
    const target = { ...cur };
    let hovering = false;
    let frame = 0;
    let t0 = performance.now();
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

    const tick = (now) => {
      if (!hovering && !fine) {
        // Idle sway so touch users still see the phone move.
        const t = (now - t0) / 1000;
        target.rx = REST.rx + Math.sin(t * 0.9) * 3;
        target.ry = REST.ry + Math.sin(t * 0.6) * 7;
      }
      // Critically-damped-ish spring: ease a fixed fraction toward the target each frame.
      cur.rx += (target.rx - cur.rx) * 0.12;
      cur.ry += (target.ry - cur.ry) * 0.12;
      cur.s += (target.s - cur.s) * 0.15;
      el.style.setProperty('--rx', `${cur.rx.toFixed(2)}deg`);
      el.style.setProperty('--ry', `${cur.ry.toFixed(2)}deg`);
      el.style.setProperty('--tilt-scale', cur.s.toFixed(4));
      el.style.setProperty('--glare-x', `${50 + cur.ry * 3}%`);
      el.style.setProperty('--glare-y', `${50 - cur.rx * 3}%`);
      frame = requestAnimationFrame(tick);
    };

    const onMove = (e) => {
      if (e.pointerType === 'touch') return;
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      hovering = true;
      target.rx = -y * 2 * amplitude;
      target.ry = x * 2 * amplitude;
      target.s = hoverScale;
    };
    const onLeave = () => {
      hovering = false;
      t0 = performance.now();
      target.rx = REST.rx;
      target.ry = REST.ry;
      target.s = 1;
    };

    // Only animate while on screen.
    const io = new IntersectionObserver(([entry]) => {
      cancelAnimationFrame(frame);
      if (entry.isIntersecting) frame = requestAnimationFrame(tick);
    });
    io.observe(el);
    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerleave', onLeave);
    return () => {
      io.disconnect();
      cancelAnimationFrame(frame);
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', onLeave);
    };
  }, [reduced, amplitude, hoverScale]);

  return (
    <div className="tilt">
      <Tag ref={ref} className={`tilt__inner ${className}`} {...rest}>
        {children}
        <span className="tilt__glare" aria-hidden="true" />
      </Tag>
    </div>
  );
}
