import { useEffect, useState } from 'react';
import { DATES } from '../content.js';
import { useNow } from '../hooks/useNow.js';

const KICKOFF = new Date(DATES.kickoff).getTime();
const DEADLINE = new Date(DATES.deadline).getTime();

function FlipDigit({ digit }) {
  const [shown, setShown] = useState(digit);
  const [prev, setPrev] = useState(digit);

  useEffect(() => {
    if (digit === shown) return;
    setPrev(shown);
    setShown(digit);
    const t = setTimeout(() => setPrev(digit), 620);
    return () => clearTimeout(t);
  }, [digit]);

  const flipping = prev !== shown;

  return (
    <span className="flip">
      <span className="flip__half flip__half--top">
        <span>{shown}</span>
      </span>
      <span className="flip__half flip__half--bottom">
        <span>{prev}</span>
      </span>
      {flipping && (
        <>
          <span key={`t${shown}`} className="flip__half flip__half--top flip__leaf-top">
            <span>{prev}</span>
          </span>
          <span key={`b${shown}`} className="flip__half flip__half--bottom flip__leaf-bottom">
            <span>{shown}</span>
          </span>
        </>
      )}
      <span className="flip__hinge" />
    </span>
  );
}

function Unit({ value, label }) {
  const digits = value === null ? ['–', '–'] : String(value).padStart(2, '0').split('');
  return (
    <div className="clock__unit">
      <div className="clock__digits">
        {digits.map((d, i) => (
          // Index from the right so digits keep their identity if days drops from 3 to 2 digits.
          <FlipDigit key={digits.length - i} digit={d} />
        ))}
      </div>
      <span className="clock__label">{label}</span>
    </div>
  );
}

function split(ms) {
  const s = Math.max(0, Math.floor(ms / 1000));
  return {
    days: Math.floor(s / 86400),
    hours: Math.floor((s % 86400) / 3600),
    minutes: Math.floor((s % 3600) / 60),
    seconds: s % 60,
  };
}

const fmt = new Intl.DateTimeFormat('en-US', {
  weekday: 'long',
  month: 'long',
  day: 'numeric',
  hour: 'numeric',
  minute: '2-digit',
  timeZone: 'America/Chicago',
  timeZoneName: 'short',
});

export function FlipClock() {
  const now = useNow(1000);

  let phase = 'kickoff';
  if (now !== null && now >= KICKOFF) phase = now >= DEADLINE ? 'closed' : 'deadline';

  const target = phase === 'kickoff' ? KICKOFF : DEADLINE;
  const parts = now === null ? null : split(target - now);

  const title =
    phase === 'kickoff' ? 'Kickoff in' : phase === 'deadline' ? 'Submissions due in' : 'That’s a wrap';
  const srText =
    phase === 'closed'
      ? DATES.closedMessage
      : `${phase === 'kickoff' ? 'Kickoff' : 'Submission deadline'}: ${fmt.format(target)}`;

  return (
    <section className="clock" aria-labelledby="clock-title">
      <div className="clock__head">
        <span className={`clock__led ${phase === 'deadline' ? 'is-live' : ''}`} aria-hidden="true" />
        <h2 id="clock-title" className="clock__title">
          {title}
        </h2>
      </div>
      <p className="sr-only">{srText}</p>
      {phase === 'closed' ? (
        <p className="clock__closed">{DATES.closedMessage}</p>
      ) : (
        <div className="clock__face" aria-hidden="true">
          <Unit value={parts?.days ?? null} label="Days" />
          <Unit value={parts?.hours ?? null} label="Hours" />
          <Unit value={parts?.minutes ?? null} label="Min" />
          <Unit value={parts?.seconds ?? null} label="Sec" />
        </div>
      )}
      {phase !== 'closed' && (
        <p className="clock__target">
          {phase === 'kickoff' ? DATES.kickoffLabel : DATES.deadlineLabel}
        </p>
      )}
    </section>
  );
}
