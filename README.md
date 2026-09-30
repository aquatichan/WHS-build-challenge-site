# Westside Build Challenge

The single-page site for the **Westside High School Coding Club Build Challenge**, a month-long student app-building competition (Nov 5 – Nov 30).

It's built with **React + Vite**, uses **[react-icons](https://react-icons.github.io/react-icons/)** (Phosphor set), and includes a few effects adapted from **[React Bits](https://reactbits.dev)** (Spotlight Card, Shiny Text, Fade Content). The build **prerenders the whole page to static HTML**, so phones that open it from the poster QR code see the content right away, before any JavaScript runs. The output is a plain static folder (`dist/`) with no backend, no logins, and no analytics.

---

## Quick start

```bash
npm install
npm run dev       # local dev server at http://localhost:5173
npm run build     # production build → dist/
npm run preview   # serve the built dist/ locally
```

Requires Node 20+.

---

## Fill in the placeholders

Search the project for these and replace them. All of them live in **`src/content.js`**:

| Placeholder         | Where it shows up                           |
| ------------------- | ------------------------------------------- |
| `[SIGNUP_FORM_URL]` | Nav "Sign up" button and hero "Sign up" button |
| `[ROOM]`            | FAQ: "When and where does Coding Club meet?" |
| `[CONTACT_EMAIL]`   | Footer contact link (`mailto:`)             |

---

## Editing text

**Almost all of the copy is in `src/content.js`**, grouped by section (hero, highlights, what it is, theme, timeline, rules, submit, judging, prizes, sponsors, FAQ, footer, nav links). Edit the strings and save; the dev server reloads on its own.

Things that live in `content.js` and are worth knowing about:

- **`PRIZES`**: the podium (`podium`: 1st, 2nd, 3rd) plus the extra prize cards (`more`: finalists, every submitting team, public track).
- **`THEME.cards[].example`**: the sample project shown when someone hovers over (desktop) or taps (phone) a theme track. Each has a name, tagline, objective, who it helps, features, tech stack, data, what adoption needs, team size and level.
- **`JUDGING`**: the rubric. Each criterion has `points` (they should add up to 100) and `full` (what earns full marks). Weights are calculated from the points. `levels` are the four scoring bands.
- **`INSTAGRAM`**: the handle and profile link. See below.

Section headings (the serif titles on the metal plates, e.g. "Questions, *answered.*") are in each component in `src/components/`. The `<em>` part is the italic accent.

Page title and social-share description: `index.html`.

## Editing dates

In `src/content.js`:

- **Countdown clock** uses `DATES.kickoff` and `DATES.deadline`. These are full timestamps with Houston's UTC offset:
  ```js
  kickoff:  '2026-11-05T00:00:00-06:00',   // counts down to this first
  deadline: '2026-11-30T23:59:00-06:00',   // then switches to this after kickoff
  ```
  Use `-05:00` for dates before the first Sunday in November (daylight time) and `-06:00` after it. `kickoffLabel` / `deadlineLabel` are the small captions under the clock. After the deadline, the clock is replaced with `closedMessage`.
- **Timeline** is the `TIMELINE` list. Each stop has a display `date` (any text, e.g. `'Nov 23–27'`) plus a machine-readable `start` (and optional `end`) as `YYYY-MM-DD`. The stop that most recently started glows sky-blue and is labeled **Now**. Before the first stop, the first one is labeled **Up next**.

## Editing colors

All colors are CSS variables at the top of **`src/styles/tokens.css`**:

```css
--royal: #111e80;   /* primary deep blue */
--sky:   #47b2d9;   /* accent, glows, links */
--navy:  #1e3d62;   /* secondary surfaces */
--black: #000000;   /* base background */
--gold-1 … --gold-4 /* metallic gold gradient stops */
```

The animated background's tile colors are in `src/lib/tessellation.js` (`FILLS` array). Its sky edges and gold glints use `rgba(71,178,217,…)` and `rgba(245,224,138,…)` in the same file.

Fonts (Fraunces + Inter from Google Fonts) are loaded in `index.html` and set by `--font-display` / `--font-body` in `tokens.css`.

## Instagram

The Instagram section shows a profile card with a **Follow** button and a phone mockup. The phone only loads real Instagram content after a visitor taps **Load our posts**. That keeps the first load fast, and no Instagram cookies are set until someone chooses to load them.

- With `INSTAGRAM.posts` empty, the phone loads the profile grid (`instagram.com/whs_coderz/embed/`). Instagram doesn't officially support profile embeds, so this can occasionally show a "view on Instagram" card instead of the grid.
- For a guaranteed embed, paste specific post links into `posts`:
  ```js
  posts: ['https://www.instagram.com/p/POST_ID/', 'https://www.instagram.com/reel/REEL_ID/'],
  ```
  These use Instagram's official embed script.

## Adding sponsor logos

The "With support from" logo shelf is **hidden until you add logos**. Drop logo files into `public/logos/`, then add entries to `SPONSORS` in `src/content.js`:

```js
export const SPONSORS = [
  { name: 'Company Name', src: './logos/company.svg', href: 'https://example.com' },
];
```

`name` is used as the image alt text. `href` is optional. The markup lives in `src/components/Supporters.jsx`, where a comment marks the spot.

---

## Deploying (free)

### Option A: GitHub Pages
1. Push this repo to GitHub.
2. Go to **Settings → Pages → Build and deployment → Source** and choose **GitHub Actions**.
3. Push to `main`. The included workflow (`.github/workflows/deploy.yml`) builds and publishes the site. The URL shows up in the Actions run and under Settings → Pages.

Asset paths are relative (`base: './'` in `vite.config.js`), so the site works at `username.github.io/repo-name/` with no extra config.

### Option B: Vercel
1. Import the repo at [vercel.com/new](https://vercel.com/new).
2. Vercel detects Vite. Keep the defaults: build command `npm run build`, output directory `dist`.
3. Deploy. Every push to `main` redeploys.

### Option C: any static host
Run `npm run build` and upload the `dist/` folder (Netlify drop, school web server, etc.).

---

## Project map

```
index.html                 page shell, meta tags, font links
src/content.js             ← all text, links, dates, placeholders
src/styles/tokens.css      ← colors, fonts, shadows
src/styles/surfaces.css    glass cards, metal plates, badges, buttons
src/styles/sections.css    per-section layout
src/lib/tessellation.js    animated canvas background
src/components/            one file per section
src/components/bits/       React Bits–style effects
scripts/prerender.mjs      bakes the page into static HTML at build time
```

## Accessibility & performance notes

- Semantic landmarks and headings, a skip link, keyboard-operable menu and FAQ (`aria-expanded`), and gold `:focus-visible` rings throughout.
- All text meets WCAG AA contrast on its background.
- `prefers-reduced-motion`: the background renders as one static frame, and the flip animation, shimmer, flicker, scroll reveals and glow pulses are turned off. The "Fix Westside" heading stays fully lit.
- The background runs at about 30fps, pauses when the tab is hidden, and uses fewer, larger tiles and fewer light pools on phones. Its light pools, flicker bursts and cursor glow are all in `src/lib/tessellation.js` (see the comment at the top).
- Theme examples work without hover: on desktop the tracks are keyboard-navigable tabs (arrow keys), and on phones each track is a tap-to-open button.
- The judging rubric is a real `<table>` (it becomes stacked cards on phones), and the weight bar labels every segment directly, so color never carries meaning on its own.
- Content is fully visible without JavaScript (prerendered HTML).
