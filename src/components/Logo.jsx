import { useId } from 'react';

export function LogoMark({ size = 32 }) {
  const id = useId();
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={`${id}g`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#8a6d1f" />
          <stop offset=".35" stopColor="#d4af37" />
          <stop offset=".55" stopColor="#f5e08a" />
          <stop offset="1" stopColor="#b8912e" />
        </linearGradient>
        <linearGradient id={`${id}f`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1b2aa0" />
          <stop offset="1" stopColor="#0a1150" />
        </linearGradient>
      </defs>
      <polygon
        points="32,3 57,17.5 57,46.5 32,61 7,46.5 7,17.5"
        fill={`url(#${id}f)`}
        stroke={`url(#${id}g)`}
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <path
        d="M18 23 L24 42 L32 29 L40 42 L46 23"
        fill="none"
        stroke="#47b2d9"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
