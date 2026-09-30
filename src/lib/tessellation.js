/*
 * Animated geometric tessellation (vanilla canvas, no dependencies).
 *
 * The plane is covered with a flat-top hexagon grid. Each hexagon is split at
 * random into one hexagon, three rhombi, six triangles, or a mix of rhombi and
 * triangles, so the pieces always tile with no gaps.
 *
 * Light layers, drawn over a pre-rendered base each frame:
 *   1. Fader:    every tile slowly brightens and dims on its own cycle.
 *   2. Pools:    a few soft light regions wander across the pattern. Each one
 *                lives for several seconds, fades out, and reappears somewhere
 *                else, so the lit regions keep changing.
 *   3. Flicker:  every fraction of a second a cluster of neighbouring tiles
 *                sputters on like a neon sign, then glows out.
 *   4. Pointer:  on desktop, tiles near the cursor catch a little light.
 *   5. Shimmer:  every ~8s a diagonal band sweeps across like light on foil;
 *                a few edges catch a faint gold glint.
 *
 * Performance: capped at ~30fps, paused while the tab is hidden, fewer and
 * larger tiles plus fewer light pools on small screens, and a single static
 * frame when prefers-reduced-motion is set.
 */

const FRAME_MS = 1000 / 30;
const SHIMMER_PERIOD = 8000;
const SHIMMER_DURATION = 2400;
const SQRT3 = Math.sqrt(3);
const EXTRA_H = 160;

// Shades of --royal, --navy and --black, weighted toward the dark end.
const FILLS = [
  '#000000', '#02040c', '#050a1e', '#070d2b', '#0a1446',
  '#0d185e', '#111e80', '#0f2440', '#152f4f', '#1e3d62',
];
const FILL_WEIGHTS = [3, 3, 3, 2, 2, 1.4, 1, 1.6, 1.2, 0.8];

// Light tints: royal-blue glow and --sky glow.
const TINTS = [
  [60, 92, 230],
  [71, 178, 217],
];

// Neon-style start-up pattern for flicker clusters (one slot = 55ms).
const FLICKER = [1, 0, 0.8, 0, 0, 1, 0.3, 1, 1, 0.6, 1];
const FLICKER_SLOT = 55;
const FLICKER_HOLD = 1300;

function pickWeighted(rand) {
  const total = FILL_WEIGHTS.reduce((a, b) => a + b, 0);
  let r = rand() * total;
  for (let i = 0; i < FILLS.length; i++) {
    r -= FILL_WEIGHTS[i];
    if (r <= 0) return FILLS[i];
  }
  return FILLS[0];
}

// Small deterministic PRNG so a given screen width always gets the same layout.
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

const smooth = (x) => x * x * (3 - 2 * x);

export function createTessellation(canvas, { reducedMotion = false } = {}) {
  const ctx = canvas.getContext('2d', { alpha: false });
  const base = document.createElement('canvas');
  const bctx = base.getContext('2d', { alpha: false });
  const fx = Math.random; // live effects are random each visit

  let tiles = [];
  let width = 0;
  let height = 0;
  let dpr = 1;
  let radius = 80;
  let projMax = 1;
  let raf = 0;
  let last = 0;
  let running = false;
  const t0 = performance.now();

  let pools = [];
  let clusters = [];
  let nextCluster = 0;
  const pointer = { x: -9999, y: -9999, a: 0, target: 0 };

  /* ── Light pools ─────────────────────────────────────────────────────── */
  function spawnPool(now, delay = 0) {
    return {
      born: now + delay,
      life: 5200 + fx() * 4200,
      cx: fx() * width,
      cy: fx() * (height - EXTRA_H),
      ax: (0.08 + fx() * 0.14) * width,
      ay: (0.06 + fx() * 0.12) * height,
      sx: 0.00018 + fx() * 0.00022,
      sy: 0.00015 + fx() * 0.0002,
      px: fx() * Math.PI * 2,
      py: fx() * Math.PI * 2,
      r: Math.max(200, Math.min(width, height) * (0.22 + fx() * 0.14)),
      tint: fx() < 0.55 ? 1 : 0,
      power: 0.7 + fx() * 0.3,
    };
  }

  function poolState(p, now) {
    const age = now - p.born;
    if (age < 0) return null;
    const fade = 1400;
    let a = 1;
    if (age < fade) a = smooth(age / fade);
    else if (age > p.life - fade) a = smooth(Math.max(0, (p.life - age) / fade));
    return {
      x: p.cx + Math.sin(age * p.sx + p.px) * p.ax,
      y: p.cy + Math.cos(age * p.sy + p.py) * p.ay,
      a: a * p.power,
    };
  }

  /* ── Flicker clusters ────────────────────────────────────────────────── */
  function spawnCluster(now) {
    const seed = tiles[Math.floor(fx() * tiles.length)];
    if (!seed) return;
    const reach = radius * (1.1 + fx() * 1.3);
    const members = [];
    for (let i = 0; i < tiles.length; i++) {
      const t = tiles[i];
      const d = Math.hypot(t.x - seed.x, t.y - seed.y);
      if (d < reach) members.push([i, 1 - (d / reach) * 0.6, d * 0.9]);
    }
    clusters.push({ born: now, members, tint: fx() < 0.6 ? 1 : 0 });
  }

  function clusterLevel(age) {
    if (age < 0) return 0;
    const slot = Math.floor(age / FLICKER_SLOT);
    if (slot < FLICKER.length) return FLICKER[slot];
    const t = (age - FLICKER.length * FLICKER_SLOT) / FLICKER_HOLD;
    return t >= 1 ? 0 : (1 - t) ** 1.6;
  }

  const clusterLifetime = FLICKER.length * FLICKER_SLOT + FLICKER_HOLD + 400;

  /* ── Build ───────────────────────────────────────────────────────────── */
  function build() {
    width = window.innerWidth;
    // Extra height covers mobile URL-bar show/hide without a rebuild.
    height = window.innerHeight + EXTRA_H;
    const small = width < 720;
    dpr = Math.min(window.devicePixelRatio || 1, small ? 1.5 : 2);
    radius = small ? 64 : width < 1280 ? 76 : 88;

    canvas.width = base.width = Math.round(width * dpr);
    canvas.height = base.height = Math.round(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const rand = mulberry32(width * 7 + 11);
    const shapes = [];
    const dx = 1.5 * radius;
    const dy = SQRT3 * radius;
    for (let col = -1; col * dx < width + radius; col++) {
      for (let row = -1; row * dy < height + dy; row++) {
        splitHexagon(col * dx, row * dy + (col & 1 ? dy / 2 : 0), radius, rand, shapes);
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
        x,
        y,
        fill: pickWeighted(rand),
        skyEdge: edge < 0.24,
        goldGlint: edge > 0.93,
        proj: x * 0.8 + y * 0.6,
        facet: 0.35 + rand() * 0.65,
        tint: rand() < 0.5 ? 0 : 1,
        phase: rand() * Math.PI * 2,
        speed: 0.00018 + rand() * 0.0005,
        light: 0,
        lightTint: 0,
      };
    });

    const now = performance.now();
    const poolCount = small ? 2 : 3;
    pools = [];
    for (let i = 0; i < poolCount; i++) pools.push(spawnPool(now, i * 900 - 1200));
    clusters = [];
    nextCluster = now + 300;

    drawBase();
    drawFrame(now);
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
      bctx.strokeStyle = 'rgba(71,178,217,0.26)';
      bctx.stroke();
    }
  }

  /* ── Frame ───────────────────────────────────────────────────────────── */
  function drawFrame(now) {
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.drawImage(base, 0, 0);
    if (reducedMotion) return;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.lineJoin = 'round';
    const time = now - t0;

    // Refresh pools (respawn elsewhere when one burns out).
    const live = [];
    for (let i = 0; i < pools.length; i++) {
      if (now - pools[i].born > pools[i].life) pools[i] = spawnPool(now, 300 + fx() * 1200);
      const s = poolState(pools[i], now);
      if (s && s.a > 0.01) live.push([s, pools[i]]);
    }

    // Spawn and age flicker clusters.
    if (now >= nextCluster) {
      spawnCluster(now);
      nextCluster = now + 380 + fx() * 700;
    }
    clusters = clusters.filter((c) => now - c.born < clusterLifetime);

    pointer.a += (pointer.target - pointer.a) * 0.12;
    const pr = radius * 2.6;

    // 1. Accumulate light per tile.
    for (const t of tiles) {
      let light = 0;
      let tint = t.tint;

      const s = Math.sin(time * t.speed + t.phase);
      if (s > 0.5) light += ((s - 0.5) / 0.5) ** 2 * 0.55;

      for (const [p, pool] of live) {
        const d = Math.hypot(t.x - p.x, t.y - p.y);
        if (d < pool.r) {
          const k = (1 - d / pool.r) ** 2 * p.a * (0.55 + 0.45 * t.facet);
          if (k > light * 0.6) tint = pool.tint;
          light += k;
        }
      }

      if (pointer.a > 0.01) {
        const d = Math.hypot(t.x - pointer.x, t.y - pointer.y);
        if (d < pr) light += (1 - d / pr) ** 2 * 0.5 * pointer.a;
      }

      t.light = light;
      t.lightTint = tint;
      t.dim = s < -0.65 ? ((-s - 0.65) / 0.35) ** 2 : 0;
    }

    for (const c of clusters) {
      const age = now - c.born;
      for (const [i, strength, delay] of c.members) {
        const lv = clusterLevel(age - delay);
        if (lv > 0) {
          const t = tiles[i];
          t.light += lv * strength * 1.1;
          t.lightTint = c.tint;
        }
      }
    }

    // 2. Paint lit and dimmed tiles.
    for (const t of tiles) {
      if (t.light > 0.02) {
        const a = Math.min(1, t.light);
        const [r, g, b] = TINTS[t.lightTint];
        tracePath(ctx, t.pts);
        ctx.fillStyle = `rgba(${r},${g},${b},${0.3 * a})`;
        ctx.fill();
        if (t.skyEdge || a > 0.45) {
          ctx.lineWidth = a > 0.7 ? 1.4 : 1;
          ctx.strokeStyle = `rgba(120,210,245,${0.75 * a * (t.skyEdge ? 1 : 0.55)})`;
          ctx.stroke();
        }
      } else if (t.dim > 0) {
        tracePath(ctx, t.pts);
        ctx.fillStyle = `rgba(0,0,0,${0.5 * t.dim})`;
        ctx.fill();
      }
    }

    // 3. Shimmer: a diagonal band sweeps across, first pass ~1.5s after load.
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
          ctx.strokeStyle = `rgba(245,224,138,${0.6 * k})`;
          ctx.stroke();
        } else if (t.skyEdge) {
          ctx.lineWidth = 1;
          ctx.strokeStyle = `rgba(120,205,240,${0.5 * k})`;
          ctx.stroke();
        }
      }

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
      if (window.innerWidth === width && window.innerHeight + EXTRA_H <= height + 1) return;
      build();
    }, 180);
  }

  const finePointer = window.matchMedia('(pointer: fine)').matches;
  function onPointerMove(e) {
    pointer.x = e.clientX;
    pointer.y = e.clientY;
    pointer.target = 1;
  }
  function onPointerLeave() {
    pointer.target = 0;
  }

  build();
  if (!document.hidden) start();
  document.addEventListener('visibilitychange', onVisibility);
  window.addEventListener('resize', onResize);
  if (finePointer) {
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    document.documentElement.addEventListener('pointerleave', onPointerLeave);
  }

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
      window.removeEventListener('pointermove', onPointerMove);
      document.documentElement.removeEventListener('pointerleave', onPointerLeave);
    },
  };
}
