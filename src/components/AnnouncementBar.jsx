import { PiArrowUpRight } from 'react-icons/pi';
import { DATES, MILESTONES, MILESTONES_DONE, SITE, SUBMIT_LINK_FROM } from '../content.js';
import { useNow } from '../hooks/useNow.js';

// YYYY-MM-DD for a moment, in Houston time.
const dayFmt = new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Chicago' });
const houstonDay = (ms) => dayFmt.format(ms);
const dayNum = (ymd) => {
  const [y, m, d] = ymd.split('-').map(Number);
  return Date.UTC(y, m - 1, d) / 864e5;
};
const isTimed = (start) => start.includes('T');

function relative(m, today) {
  const startDay = isTimed(m.start) ? houstonDay(Date.parse(m.start)) : m.start;
  const diff = dayNum(startDay) - dayNum(today);
  if (diff < 0) return 'happening now';
  if (diff === 0) return 'today';
  if (diff === 1) return 'tomorrow';
  return `in ${diff} days`;
}

/** Next milestone, or null once they've all passed. */
function nextMilestone(now, today) {
  return (
    MILESTONES.find((m) =>
      isTimed(m.start) ? now <= Date.parse(m.start) : dayNum(today) <= dayNum(m.end ?? m.start),
    ) ?? null
  );
}

export function AnnouncementBar() {
  const now = useNow(60_000);
  let text = ' ';
  let links = [];

  if (now !== null) {
    const today = houstonDay(now);
    const m = nextMilestone(now, today);
    if (m) {
      text = [m.label, m.where ? `${m.when} in ${m.where}` : m.when, relative(m, today)].join(' · ');
      if (m.link === 'signup') links.push({ href: SITE.signupUrl, label: 'Sign up' });
      const submitWindow = dayNum(today) >= dayNum(SUBMIT_LINK_FROM) && now <= Date.parse(DATES.deadline);
      if (m.link === 'submit' || submitWindow) links.push({ href: SITE.submitUrl, label: 'Submit' });
    } else {
      text = MILESTONES_DONE;
    }
  }

  return (
    <aside className="announce" aria-label="Next milestone">
      <p className="announce__inner container">
        {now !== null && <span className="announce__tag">{text === MILESTONES_DONE ? 'Wrap' : 'Next up'}</span>}
        <span>{text}</span>
        {links.map((l) => (
          <a key={l.label} className="announce__link" href={l.href}>
            {l.label} <PiArrowUpRight aria-hidden="true" />
          </a>
        ))}
      </p>
    </aside>
  );
}
