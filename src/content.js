/*
 * ───────────────────────────────────────────────────────────────────────────
 *  SITE CONTENT: edit text, links, and dates here.
 *  Every section of the page reads from this file, so you rarely need to touch
 *  the components. See README.md for details.
 * ───────────────────────────────────────────────────────────────────────────
 */
import {
  PiCalendarBlank,
  PiUsersThree,
  PiStairs,
  PiPresentationChart,
  PiUsers,
  PiBookOpenText,
  PiBuildings,
  PiLinkSimple,
  PiVideoCamera,
  PiFileText,
  PiCode,
} from 'react-icons/pi';

/* ── Links & placeholders (fill these in later) ─────────────────────────── */
export const SITE = {
  name: 'Westside Build Challenge',
  school: 'Westside High School',
  club: 'Coding Club',
  city: 'Houston, TX',
  signupUrl: '[SIGNUP_FORM_URL]',
  room: '[ROOM]',
  contactEmail: '[CONTACT_EMAIL]',
  remindCode: '26code27',
};

/*
 * ── Countdown ─────────────────────────────────────────────────────────────
 * The hero clock counts down to `kickoff`, then switches to `deadline`.
 * Use full ISO timestamps with Houston's UTC offset:
 *   -05:00 (CDT) before the first Sunday of November, -06:00 (CST) after.
 */
export const DATES = {
  kickoff: '2026-11-05T00:00:00-06:00',
  kickoffLabel: 'Thu, Nov 5',
  deadline: '2026-11-30T23:59:00-06:00',
  deadlineLabel: 'Mon, Nov 30 · 11:59 PM',
  // Shown in place of the clock once the deadline passes.
  closedMessage: 'Submissions are closed. Thanks to every team that built something!',
};

/* ── Hero ──────────────────────────────────────────────────────────────── */
export const HERO = {
  eyebrow: 'Westside High School Coding Club · Houston, TX',
  // Rendered as: "Build something Westside will" + <em>"actually use."</em>
  headline: 'Build something Westside will',
  headlineAccent: 'actually use.',
  subhead: 'Westside HS Build Challenge · Nov 5 – Nov 30',
  primaryCta: 'Sign up',
  secondaryCta: 'See the rules',
};

/* ── Highlights band ───────────────────────────────────────────────────── */
export const HIGHLIGHTS = [
  { value: '4 weeks', caption: 'Nov 5 – Nov 30', icon: PiCalendarBlank },
  { value: 'Teams of 1–4', caption: 'Solo entries welcome', icon: PiUsersThree },
  { value: 'All skill levels', caption: 'First-timers welcome', icon: PiStairs },
  { value: 'Pitch to admins', caption: 'Finalists · Dec 3', icon: PiPresentationChart },
];

/* ── What it is (3 short sentences) ────────────────────────────────────── */
export const ABOUT = [
  'Students form teams of 1–4 and build an app or tool that improves life at Westside for students, teachers, or staff.',
  'Finalists pitch to school administrators on Dec 3, and we’re hoping the winning idea gets tried at our school.',
  'All skill levels welcome.',
];

/* ── Theme ─────────────────────────────────────────────────────────────── */
export const THEME = {
  title: 'Fix Westside',
  intro: 'Pick a problem you actually run into. Here’s where to start looking.',
  cards: [
    {
      title: 'Student life',
      icon: PiUsers,
      items: ['Clubs', 'Lunch lines', 'Lost and found', 'Event discovery'],
    },
    {
      title: 'Learning',
      icon: PiBookOpenText,
      items: ['Tutoring matching', 'Study tools', 'Course planning'],
    },
    {
      title: 'Campus operations',
      icon: PiBuildings,
      items: ['Hall passes', 'Room booking', 'Announcements', 'Facilities reporting'],
    },
  ],
};

/*
 * ── Timeline ──────────────────────────────────────────────────────────────
 * `start` / `end` are YYYY-MM-DD in the visitor's local time. The phase that
 * most recently started glows as "Now" (before the first one, the first phase
 * shows as "Up next").
 */
export const TIMELINE = [
  { date: 'Oct 29', start: '2026-10-29', title: 'Rules reveal', detail: 'At Coding Club.' },
  { date: 'Nov 5', start: '2026-11-05', title: 'Kickoff', detail: 'The build clock starts.' },
  { date: 'Nov 12', start: '2026-11-12', title: 'Checkpoint 1', detail: 'Idea plus sketch.' },
  { date: 'Nov 19', start: '2026-11-19', title: 'Checkpoint 2', detail: 'Something running.' },
  { date: 'Nov 23–27', start: '2026-11-23', end: '2026-11-27', title: 'Thanksgiving break', detail: 'School is out.' },
  { date: 'Nov 30', start: '2026-11-30', title: 'Submissions due', detail: 'Everything in by the deadline.' },
  { date: 'Dec 1–2', start: '2026-12-01', end: '2026-12-02', title: 'Round 1 judging', detail: 'Judges review every submission.' },
  { date: 'Dec 3', start: '2026-12-03', title: 'Finalists pitch to admins', detail: 'The top teams present to school administrators.' },
];

/* ── Rules ─────────────────────────────────────────────────────────────── */
export const RULES = [
  'Open to all Westside students, any grade. Teams of 1–4.',
  'Any language or platform (web, mobile, even a spreadsheet tool).',
  'Work must start on or after Nov 5. No old projects or Congressional App Challenge apps.',
  'AI coding tools are allowed, but every team member must be able to explain how their app works.',
  'No real student data. Use fake or sample data only.',
  'Keep content school-appropriate.',
  'Coding Club officers help run and judge the event and cannot compete.',
];

/* ── What to submit ────────────────────────────────────────────────────── */
export const SUBMIT = {
  due: 'Due Mon, Nov 30',
  items: [
    { title: 'Working link or demo', detail: 'A live link, or a demo the judges can try.', icon: PiLinkSimple },
    { title: '2-minute video', detail: 'Show it working and who it’s for.', icon: PiVideoCamera },
    {
      title: 'One-page writeup',
      detail: 'The problem, who it helps, how it works, and what the school would need to adopt it.',
      icon: PiFileText,
    },
    { title: 'Code link', detail: 'Where the judges can read your source.', icon: PiCode },
  ],
};

/* ── Judging (points should add up to 100) ─────────────────────────────── */
export const JUDGING = [
  { label: 'Impact on Westside', points: 30, detail: 'Does it solve a real problem for students, teachers, or staff?' },
  { label: 'Technical execution', points: 25, detail: 'Does it work, and is it built with care?' },
  { label: 'Realistic to adopt', points: 20, detail: 'Could the school actually start using it?' },
  { label: 'Design and ease of use', points: 15, detail: 'Is it clear and easy for anyone to pick up?' },
  { label: 'Pitch', points: 10, detail: 'Can you explain the problem, the fix, and how it works?' },
];

/* ── Prizes ────────────────────────────────────────────────────────────── */
export const PRIZES =
  'Prizes for the top three teams, recognition for all finalists, and the chance to have your idea tried at Westside.';

/*
 * ── Supporters ────────────────────────────────────────────────────────────
 * The logo shelf stays hidden while this list is empty. Put logo files in
 * /public/logos and add entries like:
 *   { name: 'Company Name', src: './logos/company.svg', href: 'https://example.com' }
 */
export const SPONSORS = [];

/* ── FAQ ───────────────────────────────────────────────────────────────── */
export const FAQ = [
  { q: 'Do I need experience?', a: 'No. All skill levels are welcome, and we’ll help you form a team.' },
  { q: 'Can I work alone?', a: 'Yes. Teams can be 1–4 people, so solo entries are welcome.' },
  { q: 'Can I use AI tools?', a: 'Yes, but you must be able to explain your code and how your app works.' },
  { q: 'Can I reuse a project?', a: 'No. All work starts on or after Nov 5.' },
  { q: 'When and where does Coding Club meet?', a: `Thursdays, ${SITE.room}.` },
  { q: 'How do I get updates?', a: `Join our Remind with the code ${SITE.remindCode}.` },
];

/* ── Footer ────────────────────────────────────────────────────────────── */
export const FOOTER = {
  runBy: 'Run by the Westside High School Coding Club',
  teaser: 'Spring hackathon coming soon.',
};

/* ── Nav links (id must match a section id) ────────────────────────────── */
export const NAV_LINKS = [
  { id: 'about', label: 'About' },
  { id: 'theme', label: 'Theme' },
  { id: 'timeline', label: 'Timeline' },
  { id: 'rules', label: 'Rules' },
  { id: 'judging', label: 'Judging' },
  { id: 'faq', label: 'FAQ' },
];
