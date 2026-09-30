import { useEffect, useRef } from 'react';
import { createTessellation } from '../lib/tessellation.js';
import { useReducedMotion } from '../hooks/useReducedMotion.js';

export function Background() {
  const canvasRef = useRef(null);
  const engineRef = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const engine = createTessellation(canvasRef.current, {
      reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    });
    engineRef.current = engine;
    return () => engine.destroy();
  }, []);

  useEffect(() => {
    engineRef.current?.setReducedMotion(reduced);
  }, [reduced]);

  return (
    <div className="bg" aria-hidden="true">
      <canvas ref={canvasRef} className="bg__canvas" />
      <div className="bg__overlay" />
    </div>
  );
}
