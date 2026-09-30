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
  PiKeyboard,
  PiCpu,
  PiTrophy,
  PiSticker,
  PiGlobeHemisphereWest,
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
  // Small callout under the buttons (links to the prizes section).
  prizeTeaser: 'Top prize: mechanical keyboard, Pi kit, or earbuds',
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

/*
 * ── Theme ─────────────────────────────────────────────────────────────────
 * Each card has an `example`: a sample project shown when a visitor hovers,
 * focuses or taps the card. These are illustrations only, not requirements.
 */
export const THEME = {
  title: 'Fix Westside',
  kicker: 'This year’s theme',
  intro:
    'Pick a problem you actually run into at Westside. Hover or tap a track to see a sample project with everything a strong entry covers.',
  cards: [
    {
      title: 'Student life',
      icon: PiUsers,
      items: ['Clubs', 'Lunch lines', 'Lost and found', 'Event discovery'],
      example: {
        name: 'LineLight',
        tagline: 'Live lunch-line wait times',
        objective:
          'Cut the time students spend standing in lunch lines by showing which serving line is shortest right now.',
        users: 'Students at lunch, plus cafeteria staff who run the lines.',
        features: [
          'One-tap line updates from a cafeteria tablet',
          'Live wait estimate for every serving line',
          'Today’s menu with “sold out” flags',
          'Works on phones and on the hallway TVs',
        ],
        stack: ['React', 'Vite', 'Firebase Realtime DB', 'Vercel'],
        data: 'Simulated line counts and a sample menu. No student information is collected.',
        adoption: 'One tablet per line, the cafeteria manager’s OK, and a link on the hallway TVs.',
        team: '2–3 people',
        level: 'Intermediate',
      },
    },
    {
      title: 'Learning',
      icon: PiBookOpenText,
      items: ['Tutoring matching', 'Study tools', 'Course planning'],
      example: {
        name: 'PeerPath',
        tagline: 'Match students with peer tutors',
        objective:
          'Make it easy to get help by pairing students with peer tutors who know the subject and share a free period.',
        users: 'Students who want help, peer tutors, and the tutoring sponsor.',
        features: [
          'Request help by subject and class period',
          'Tutor availability calendar',
          'Automatic matching with a confirm step',
          'Hours log tutors can export for service hours',
        ],
        stack: ['Python', 'Flask', 'SQLite', 'HTML/CSS'],
        data: 'A fake roster of 40 sample students and tutors.',
        adoption: 'A teacher sponsor manages the tutor list; runs on a free host with school logins added later.',
        team: '1–3 people',
        level: 'Beginner friendly',
      },
    },
    {
      title: 'Campus operations',
      icon: PiBuildings,
      items: ['Hall passes', 'Room booking', 'Announcements', 'Facilities reporting'],
      example: {
        name: 'FixIt Westside',
        tagline: 'Report broken stuff in seconds',
        objective:
          'Get broken water fountains, lights and desks fixed faster by making reports quick and easy to track.',
        users: 'Anyone on campus who spots a problem, and the facilities team.',
        features: [
          'QR sticker in each room opens a pre-filled report',
          'Photo, location and category in under 30 seconds',
          'Status tracking: reported → in progress → fixed',
          'Triage dashboard that flags duplicate reports',
        ],
        stack: ['React Native', 'Expo', 'Supabase', 'QR codes'],
        data: 'A sample campus room list and made-up reports.',
        adoption: 'Print QR stickers and give the facilities lead dashboard access.',
        team: '2–4 people',
        level: 'Intermediate',
      },
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

/*
 * ── Judging rubric ────────────────────────────────────────────────────────
 * `points` should add up to 100. `full` = what earns full marks.
 */
export const JUDGING = {
  intro:
    'Every project is scored on the same 100-point rubric. Here’s each category’s weight and what earns full marks.',
  criteria: [
    {
      label: 'Impact on Westside',
      points: 30,
      full: 'Solves a real, specific problem that students, teachers or staff have, and you can show who it helps.',
    },
    {
      label: 'Technical execution',
      points: 25,
      full: 'The core features work in the demo, and every team member can explain how the app works.',
    },
    {
      label: 'Realistic to adopt',
      points: 20,
      full: 'Clear about what the school would need (people, devices, cost, rules) to start using it.',
    },
    {
      label: 'Design and ease of use',
      points: 15,
      full: 'Someone new can use it without help, and it’s clear, readable and accessible.',
    },
    {
      label: 'Pitch',
      points: 10,
      full: 'Explains the problem, the fix and the impact clearly within the time limit.',
    },
  ],
  // Scoring levels applied within each category (share of that category's points).
  levels: [
    { name: 'Exceptional', range: '90–100%' },
    { name: 'Strong', range: '70–89%' },
    { name: 'Developing', range: '40–69%' },
    { name: 'Beginning', range: '0–39%' },
  ],
};

/* ── Prizes ────────────────────────────────────────────────────────────── */
export const PRIZES = {
  headline: 'Real prizes. A real shot at changing Westside.',
  podium: [
    {
      place: '1st',
      track: 'Westside 1st',
      prize: 'Mechanical keyboard, Pi kit, or earbuds',
      note: 'Winner picks',
      icon: PiKeyboard,
      tier: 'gold',
    },
    {
      place: '2nd',
      track: 'Westside 2nd',
      prize: 'Arduino kit or tech accessories',
      icon: PiCpu,
      tier: 'silver',
    },
    {
      place: '3rd',
      track: 'Westside 3rd',
      prize: 'Arduino kit or tech accessories',
      icon: PiCpu,
      tier: 'bronze',
    },
  ],
  more: [
    { title: 'Finalists', prize: '3D-printed trophy', icon: PiTrophy },
    {
      title: 'Every submitting team',
      prize: 'Hack Club stickers, plus a free entry in a drawing for comfort items',
      icon: PiSticker,
    },
    {
      title: 'Public track',
      prize: 'E-gift cards: $25–50 for 1st, $15–25 for 2nd and 3rd, plus any credits you land',
      icon: PiGlobeHemisphereWest,
    },
  ],
  footnote: 'Plus the chance to have your idea tried at Westside.',
};

/*
 * ── Instagram ─────────────────────────────────────────────────────────────
 * The feed only loads when a visitor clicks "Load posts" (keeps the page fast
 * and avoids Instagram cookies until they choose to). To show specific posts,
 * paste their links into `posts`, e.g. 'https://www.instagram.com/p/ABC123/'.
 * With no posts listed, the profile grid embed is shown.
 */
export const INSTAGRAM = {
  handle: 'whs_coderz',
  url: 'https://www.instagram.com/whs_coderz/',
  blurb: 'Build logs, meeting recaps, demo clips and winner announcements. Follow along.',
  posts: [],
};

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
  { id: 'prizes', label: 'Prizes' },
  { id: 'theme', label: 'Theme' },
  { id: 'timeline', label: 'Timeline' },
  { id: 'rules', label: 'Rules' },
  { id: 'judging', label: 'Judging' },
  { id: 'instagram', label: 'Instagram' },
  { id: 'faq', label: 'FAQ' },
];
