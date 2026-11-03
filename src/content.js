/*
 * ───────────────────────────────────────────────────────────────────────────
 *  SITE CONTENT: edit text, links, and dates here.
 *  Every section of the page reads from this file, so you rarely need to touch
 *  the components. See README.md for details.
 * ───────────────────────────────────────────────────────────────────────────
 */
import {
  PiCalendarBlank,
  PiCalendarCheck,
  PiUsersThree,
  PiPresentationChart,
  PiUsers,
  PiBookOpenText,
  PiBuildings,
  PiLinkSimple,
  PiVideoCamera,
  PiGithubLogo,
  PiMedal,
  PiCertificate,
} from 'react-icons/pi';

/* ── Links & placeholders (fill these in later) ─────────────────────────── */
export const SITE = {
  name: 'Westside Build Challenge',
  school: 'Westside High School',
  club: 'Coding Club',
  city: 'Houston, TX',
  signupUrl: 'https://forms.gle/3MM2VY8DjwcP7MJN8',
  submitUrl: 'https://forms.gle/8miy6xgJ9mMFYRfK8',
  room: 'N225',
  // Kickoff room for the announcement bar (N225 or Mini Theater). Leave '' to hide it.
  kickoffRoom: '',
  // Girls Who Code logo for the header and footer, e.g. './gwc-logo.png' in /public. Leave '' to show text instead.
  gwcLogo: './gwc-logo.png',
  contactEmail1: 'Neha.Chippagiri@houstonisd.org',
  contactEmail2: 's1834490@online.houstonisd.org',
  contactEmail3: 's2265162@online.houstonisd.org',
  remindCode: '26code27',
};

/*
 * ── Countdown ─────────────────────────────────────────────────────────────
 * The hero clock counts down to `kickoff`, then switches to `deadline`.
 * Use full ISO timestamps with Houston's UTC offset:
 *   -05:00 (CDT) before the first Sunday of November, -06:00 (CST) after.
 */
export const DATES = {
  kickoff: '2026-11-05T12:00:00-06:00',
  kickoffLabel: 'Thu, Nov 5',
  deadline: '2026-11-30T23:59:00-06:00',
  deadlineLabel: 'Mon, Nov 30 · 11:59 PM',
  // Shown in place of the clock once the deadline passes.
  closedMessage: 'Submissions are closed. Thanks to every team that built something!',
};

/* ── Hero ──────────────────────────────────────────────────────────────── */
export const HERO = {
  eyebrow: 'Westside High School Coding Club × Girls Who Code · Houston, TX',
  // Rendered as: "Build something Westside will" + <em>"actually use."</em>
  headline: 'Build something Westside will',
  headlineAccent: 'actually use.',
  subhead:
    'Teams of 1–4 build an app or tool that improves life at Westside for students, teachers or staff. Finalists pitch to administrators on Dec 3.',
  // Small callout under the buttons (links to the prizes section).
  prizeTeaser: 'Top prize: your app, used by all of Westside',
  primaryCta: 'Sign up',
  // Small print under the Sign up button.
  signupNote: 'Sign up as soon as you can (by Nov 30 at the latest). It’s how we count teams and send updates.',
  secondaryCta: 'See the rules',
};

/* ── Key dates (chips under the hero) ──────────────────────────────────── */
export const HIGHLIGHTS = [
  { label: 'Kickoff', value: 'Nov 5, 12 PM', icon: PiCalendarBlank },
  { label: 'Submissions due', value: 'Mon, Nov 30', icon: PiCalendarCheck },
  { label: 'Pitch to admins', value: 'Finalists · Dec 3', icon: PiPresentationChart },
  { label: 'Teams of 1–4', value: 'All skill levels', icon: PiUsersThree },
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
 * ── Announcement bar ──────────────────────────────────────────────────────
 * The bar at the top of the page shows the next milestone that hasn't passed.
 * `start` is either a full timestamp (passes at that moment) or YYYY-MM-DD
 * (passes at the end of that day, or of `end`). Days are counted in Houston time.
 * `link` adds a Sign up or Submit link.
 */
export const MILESTONES = [
  { start: DATES.kickoff, label: 'Kickoff', when: 'Thu, Nov 5, 12 PM', where: SITE.kickoffRoom, link: 'signup' },
  { start: '2026-11-12', label: 'Suggested: Checkpoint 1: idea plus sketch', when: 'Thu, Nov 12' },
  { start: '2026-11-19', label: 'Suggested: Checkpoint 2: something running', when: 'Thu, Nov 19' },
  { start: DATES.deadline, label: 'Submissions due', when: 'Mon, Nov 30, 11:59 PM', link: 'submit' },
  { start: '2026-12-01', end: '2026-12-02', label: 'Round 1 judging', when: 'Dec 1–2' },
  { start: '2026-12-03', label: 'Finalists pitch to admins', when: 'Thu, Dec 3' },
];
// From this day until the deadline, the Submit link shows whatever milestone is next.
export const SUBMIT_LINK_FROM = '2026-11-23';
export const MILESTONES_DONE = 'Thanks for building. Winners announced soon.';

/* ── Rules ─────────────────────────────────────────────────────────────── */
export const RULES = [
  'Open to all Westside students, any grade. Teams of 1–4.',
  'Any language or platform (web, mobile, even a spreadsheet tool).',
  'Work must start on or after Nov 5. No old projects or Congressional App Challenge apps.',
  'AI coding tools are allowed, but every team member must be able to explain how their app works.',
  'No real student data. Use fake or sample data only.',
  'Keep content school-appropriate.',
  'Coding Club and Girls Who Code officers help run and judge the event and cannot compete.',
];

/* ── What to submit ────────────────────────────────────────────────────── */
export const SUBMIT = {
  due: 'Due Mon, Nov 30 at 11:59 PM CST. Thanksgiving break is Nov 23–27, so plan to finish before it.',
  items: [
    { title: 'Public GitHub repo', detail: 'The judges read your source here. Make sure the repo is public.', icon: PiGithubLogo },
    {
      title: 'Working demo link',
      detail:
        'Host web apps on Firebase (recommended), Vercel, Render, Netlify or Cloudflare. For iOS or Android apps, link a video of your team using the app.',
      icon: PiLinkSimple,
    },
    {
      title: '2-minute pitch video',
      detail: 'The problem, who it helps and how it works. Upload it to YouTube or Google Drive and set it to public.',
      icon: PiVideoCamera,
    },
    {
      title: 'What Westside would need',
      detail: 'Anything the school would need to adopt your app, like projectors, teacher outreach or an engineering build.',
      icon: PiBuildings,
    },
  ],
  dueShort: 'Mon, Nov 30 at 11:59 PM',
  note: 'The form also asks which AI tools you used and what you used them for.',
  cta: 'Submit your project',
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
  headline: 'Real users. A real shot at changing Westside.',
  podium: [
    {
      place: '1st',
      track: 'Westside 1st',
      prize: 'Your app goes schoolwide',
      note: 'Used by every student and teacher, plus a 3D-printed trophy',
      icon: PiUsersThree,
      tier: 'gold',
    },
    {
      place: '2nd',
      track: 'Westside 2nd',
      prize: '3D-printed plaque',
      icon: PiMedal,
      tier: 'silver',
    },
    {
      place: '3rd',
      track: 'Westside 3rd',
      prize: '3D-printed plaque',
      icon: PiMedal,
      tier: 'bronze',
    },
  ],
  more: [
    { title: 'Finalists', prize: 'Pitch your app to administrators on Dec 3', icon: PiPresentationChart },
    {
      title: 'Everyone who submits',
      prize: 'A certificate signed by WHS admins, plus Hack Club stickers',
      icon: PiCertificate,
    },
  ],
};

/* ── Instagram follow cards (footer) ───────────────────────────────────── */
export const INSTAGRAM_ACCOUNTS = [
  {
    handle: 'whs_coderz',
    club: 'Westside Coding Club',
    url: 'https://www.instagram.com/whs_coderz/',
    blurb: 'Build logs, meeting recaps and winner announcements.',
  },
  {
    handle: 'gwc_whs',
    club: 'Girls Who Code at Westside',
    url: 'https://www.instagram.com/gwc_whs/',
    blurb: 'Meetings, events and projects from Westside’s GWC chapter.',
    gwc: true,
  },
];

/*
 * ── Supporters ────────────────────────────────────────────────────────────
 * The logo shelf stays hidden while this list is empty. Put logo files in
 * /public/logos and add entries like:
 *   { name: 'Company Name', src: './logos/company.svg', href: 'https://example.com' }
 */
export const SPONSORS = [];

/* ── FAQ ───────────────────────────────────────────────────────────────── */
// Optional `href` + `linkText` add a link after the answer.
export const FAQ = [
  { q: 'Who’s running this?', a: 'Westside Coding Club and Girls Who Code.' },
  { q: 'Do I need experience?', a: 'No. All skill levels are welcome, and we’ll help you form a team if you need one.' },
  { q: 'Can I work alone?', a: 'Yes. Teams can be 1–4 people, so solo entries are welcome.' },
  { q: 'Can I use AI tools?', a: 'Yes, but you must be able to explain your code and how your app works.' },
  { q: 'Can I reuse a project?', a: 'No. All work starts on or after Nov 5.' },
  { q: 'How do I submit?', a: 'Through the submission form, by Mon, Nov 30.', href: SITE.submitUrl, linkText: 'Click me!' },
  { q: 'When and where does Coding Club meet?', a: `Thursdays, second half of lunch, ${SITE.room}.` },
  { q: 'When and where does Girls Who Code meet?', a: `Every Other Tuesday, first half of lunch, ${SITE.room}.` },
  { q: 'How do I get updates?', a: `Join the Coding Club Remind with code ${SITE.remindCode}.` },
];

/* ── Footer ────────────────────────────────────────────────────────────── */
export const FOOTER = {
  runBy: 'Run by Westside High School Coding Club and Girls Who Code'
};

/* ── Nav links (id must match a section id) ────────────────────────────── */
export const NAV_LINKS = [
  { id: 'prizes', label: 'Prizes' },
  { id: 'theme', label: 'Theme' },
  { id: 'rules', label: 'Rules' },
  { id: 'judging', label: 'Judging' },
  { id: 'faq', label: 'FAQ' },
];
