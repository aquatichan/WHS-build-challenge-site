import { useEffect, useState } from 'react';

/**
 * Current time in ms, refreshed every `interval` ms (aligned to the tick).
 * Returns null on the first render so prerendered HTML and the first client
 * render always match; time-dependent UI fills in right after hydration.
 */
export function useNow(interval = 1000) {
  const [now, setNow] = useState(null);

  useEffect(() => {
    let timer;
    const tick = () => {
      const t = Date.now();
      setNow(t);
      timer = setTimeout(tick, interval - (t % interval) + 5);
    };
    tick();
    return () => clearTimeout(timer);
  }, [interval]);

  return now;
}
