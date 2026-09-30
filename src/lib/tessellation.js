/*
 * Animated geometric tessellation (vanilla canvas, no dependencies).
 *
 * The plane is covered with a flat-top hexagon grid. Each hexagon is split at
 * random into one hexagon, three rhombi, six triangles, or a mix of rhombi and
 * triangles, so the pieces always tile perfectly with no gaps.
 *
 * Layers:
 *   1. Base: every tile filled once into an offscreen canvas (cheap to blit).
 *   2. Fader: individual tiles slowly brighten and dim on their own cycles.
 *   3. Shimmer: every ~8s a diagonal band sweeps across like light on foil;
 *      a few edges catch a faint gold glint.
 *
 * Performance: capped at ~30fps, paused while the tab is hidden, fewer and
 * larger tiles on small screens, and a single static frame when
 * prefers-reduced-motion is set.
 */

const FRAME_MS = 1000 / 30;
const SHIMMER_PERIOD = 8000;
const SHIMMER_DURATION = 2400;
const SQRT3 = Math.sqrt(3);

// Shades of --royal, --navy and --black, weighted toward the dark end.
const FILLS = [
  '#000000', '#02040c', '#050a1e', '#070d2b', '#0a1446',
  '#0d185e', '#111e80', '#0f2440', '#152f4f', '#1e3d62',
];
const FILL_WEIGHTS = [3, 3, 3, 2, 2, 1.4, 1, 1.6, 1.2, 0.8];

function pickWeighted(rand) {
  const total = FILL_WEIGHTS.reduce((a, b) => a + b, 0);
  let r = rand() * total;
  for (let i = 0; i < FILLS.length; i++) {
    r -= FILL_WEIGHTS[i];
    if (r <= 0) return FILLS[i];
  }
  return FILLS[0];
}

// Small deterministic PRNG so a given screen size always gets the same layout.
function mulberry32(seed) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function splitHexagon(cx, cy, r, rand, out) {
  const v = [];
  for (let k = 0; k < 6; k++) {
    const a = (Math.PI / 3) * k;
    v.push([cx + r * Math.cos(a), cy + r * Math.sin(a)]);
  }
  const c = [cx, cy];
  const tri = (i) => [c, v[i % 6], v[(i + 1) % 6]];
  const rhombus = (i) => [c, v[i % 6], v[(i + 1) % 6], v[(i + 2) % 6]];

  const roll = rand();
  if (roll < 0.16) {
    out.push(v);
  } else if (roll < 0.44) {
    const o = rand() < 0.5 ? 0 : 1;
    out.push(rhombus(o), rhombus(o + 2), rhombus(o + 4));
  } else if (roll < 0.62) {
    for (let i = 0; i < 6; i++) out.push(tri(i));
  } else {
    // Mixed: walk the six wedges, pairing neighbours into rhombi at random.
    const start = Math.floor(rand() * 6);
    for (let i = 0; i < 6; ) {
      if (i < 5 && rand() < 0.5) {
        out.push(rhombus(start + i));
        i += 2;
      } else {
        out.push(tri(start + i));
        i += 1;
      }
    }
  }
}

function tracePath(ctx, pts) {
  ctx.beginPath();
  ctx.moveTo(pts[0][0], pts[0][1]);
  for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0], pts[i][1]);
  ctx.closePath();
}

export function createTessellation(canvas, { reducedMotion = false } = {}) {
  const ctx = canvas.getContext('2d', { alpha: false });
  const base = document.createElement('canvas');
  const bctx = base.getContext('2d', { alpha: false });

  let tiles = [];
  let width = 0;
  let height = 0;
  let dpr = 1;
  let projMax = 1;
  let raf = 0;
  let last = 0;
  let running = false;
  let t0 = performance.now();

  function build() {
    width = window.innerWidth;
    // Extra height covers mobile URL-bar show/hide without a rebuild.
    height = window.innerHeight + 160;
    const small = width < 720;
    dpr = Math.min(window.devicePixelRatio || 1, small ? 1.5 : 2);
    const r = small ? 64 : width < 1280 ? 76 : 88;

    canvas.width = base.width = Math.round(width * dpr);
    canvas.height = base.height = Math.round(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const rand = mulberry32(width * 7 + 11);
    const shapes = [];
    const dx = 1.5 * r;
    const dy = SQRT3 * r;
    for (let col = -1; col * dx < width + r; col++) {
      for (let row = -1; row * dy < height + dy; row++) {
        splitHexagon(col * dx, row * dy + (col & 1 ? dy / 2 : 0), r, rand, shapes);
      }
    }

    projMax = width * 0.8 + height * 0.6;
    tiles = shapes.map((pts) => {
      let x = 0;
      let y = 0;
      for (const p of pts) {
        x += p[0];
        y += p[1];
      }
      x /= pts.length;
      y /= pts.length;
      const edge = rand();
      return {
        pts,
        fill: pickWeighted(rand),
        skyEdge: edge < 0.22,
        goldGlint: edge > 0.93,
        proj: x * 0.8 + y * 0.6,
        facet: 0.35 + rand() * 0.65,
        phase: rand() * Math.PI * 2,
        speed: 0.00012 + rand() * 0.00028,
      };
    });

    drawBase();
    drawFrame(performance.now());
  }

  function drawBase() {
    bctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    bctx.fillStyle = '#000';
    bctx.fillRect(0, 0, width, height);
    bctx.lineJoin = 'round';
    for (const t of tiles) {
      tracePath(bctx, t.pts);
      bctx.fillStyle = t.fill;
      bctx.fill();
      bctx.lineWidth = 1;
      bctx.strokeStyle = 'rgba(0,0,0,0.55)';
      bctx.stroke();
    }
    for (const t of tiles) {
      if (!t.skyEdge) continue;
      tracePath(bctx, t.pts);
      bctx.lineWidth = 0.8;
      bctx.strokeStyle = 'rgba(71,178,217,0.30)';
      bctx.stroke();
    }
  }

  function drawFrame(now) {
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.drawImage(base, 0, 0);
    if (reducedMotion) return;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const time = now - t0;

    // Fader: each tile rides its own slow sine wave; only the peaks show.
    for (const t of tiles) {
      const s = Math.sin(time * t.speed + t.phase);
      if (s > 0.55) {
        const a = ((s - 0.55) / 0.45) ** 2;
        tracePath(ctx, t.pts);
        ctx.fillStyle = `rgba(56,120,210,${0.2 * a})`;
        ctx.fill();
        if (t.skyEdge) {
          ctx.lineWidth = 1;
          ctx.strokeStyle = `rgba(71,178,217,${0.45 * a})`;
          ctx.stroke();
        }
      } else if (s < -0.6) {
        const a = ((-s - 0.6) / 0.4) ** 2;
        tracePath(ctx, t.pts);
        ctx.fillStyle = `rgba(0,0,0,${0.45 * a})`;
        ctx.fill();
      }
    }

    // Shimmer: a diagonal band sweeps across, first pass ~1.5s after load.
    const cycle = (time + SHIMMER_PERIOD - 1500) % SHIMMER_PERIOD;
    if (cycle < SHIMMER_DURATION) {
      const p = cycle / SHIMMER_DURATION;
      const eased = p < 0.5 ? 2 * p * p : 1 - (-2 * p + 2) ** 2 / 2;
      const band = Math.max(160, width * 0.14);
      const pos = -band + eased * (projMax + band * 2);

      for (const t of tiles) {
        const d = Math.abs(t.proj - pos);
        if (d > band) continue;
        const k = (1 - d / band) ** 2;
        tracePath(ctx, t.pts);
        ctx.fillStyle = `rgba(170,215,255,${0.1 * k * t.facet})`;
        ctx.fill();
        if (t.goldGlint) {
          ctx.lineWidth = 1.1;
          ctx.strokeStyle = `rgba(245,224,138,${0.55 * k})`;
          ctx.stroke();
        } else if (t.skyEdge) {
          ctx.lineWidth = 1;
          ctx.strokeStyle = `rgba(120,205,240,${0.5 * k})`;
          ctx.stroke();
        }
      }

      // Soft light wash along the band direction (0.8, 0.6).
      const ux = 0.8;
      const uy = 0.6;
      const g = ctx.createLinearGradient(
        (pos - band) * ux, (pos - band) * uy,
        (pos + band) * ux, (pos + band) * uy,
      );
      g.addColorStop(0, 'rgba(255,255,255,0)');
      g.addColorStop(0.5, 'rgba(200,230,255,0.05)');
      g.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, width, height);
    }
  }

  function loop(now) {
    if (!running) return;
    raf = requestAnimationFrame(loop);
    if (now - last < FRAME_MS) return;
    last = now;
    drawFrame(now);
  }

  function start() {
    if (running || reducedMotion) return;
    running = true;
    last = 0;
    raf = requestAnimationFrame(loop);
  }

  function stop() {
    running = false;
    cancelAnimationFrame(raf);
  }

  function onVisibility() {
    if (document.hidden) stop();
    else start();
  }

  let resizeTimer = 0;
  function onResize() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      // Ignore height-only jitter from mobile browser toolbars.
      if (window.innerWidth === width && window.innerHeight + 160 <= height + 1) return;
      build();
    }, 180);
  }

  build();
  if (!document.hidden) start();
  document.addEventListener('visibilitychange', onVisibility);
  window.addEventListener('resize', onResize);

  return {
    setReducedMotion(value) {
      reducedMotion = value;
      if (value) {
        stop();
        drawFrame(performance.now());
      } else if (!document.hidden) {
        start();
      }
    },
    destroy() {
      stop();
      clearTimeout(resizeTimer);
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('resize', onResize);
    },
  };
}
