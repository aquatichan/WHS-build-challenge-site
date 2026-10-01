import { useEffect, useRef } from 'react';

/**
 * Writes `--lit` (0 → 1 → 0) onto the element as it scrolls through the
 * viewport: lights ramp up as it enters and fade after it leaves. Also toggles
 * `.is-lit` once it's mostly on. Mutates style directly, so no re-renders.
 */
export function useScrollLight() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.style.setProperty('--lit', '1');
      el.classList.add('is-lit');
      return;
    }
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // Fully lit once the top of the section is ~45% up the screen.
      const enter = (vh - r.top) / (vh * 0.55);
      const exit = r.bottom / (vh * 0.55);
      const lit = Math.max(0, Math.min(1, enter, exit));
      el.style.setProperty('--lit', lit.toFixed(3));
      el.classList.toggle('is-lit', lit > 0.55);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return ref;
}
