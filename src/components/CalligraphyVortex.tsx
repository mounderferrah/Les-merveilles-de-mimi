'use client';

import { useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

// Abstract calligraphy strokes — inspired by Arabic letter silhouettes.
// Decorative, NOT readable text. Each path is drawn centered at local (0, 0).
const S = [
  // sin — triple hump
  'M-30,5 C-25,-8 -15,-8 -10,5 C-5,18 5,18 10,5 C15,-8 25,-8 30,5',
  // nun — deep bowl with tail
  'M-18,-2 C-18,-22 18,-22 18,-2 C18,12 6,18 0,18 C-6,18 -12,12 -12,6',
  // waw — loop and descending tail
  'M0,0 C10,-15 22,-10 18,2 C14,14 2,16 -6,10 C-10,4 -4,-4 0,0 M-6,10 C-10,20 -18,24 -22,20',
  // mim — closed loop
  'M0,-12 C14,-12 14,12 0,12 C-14,12 -14,-12 0,-12 M0,12 C-6,18 -10,20 -14,18',
  // lam — tall ascending arch
  'M-4,28 L-4,-20 C-4,-32 8,-38 16,-26 C20,-18 14,-8 8,-4',
  // ain — open eye
  'M-22,0 C-18,-20 18,-20 22,0 C18,20 -18,20 -22,0 M-6,-8 C-2,-14 2,-14 6,-8',
  // ya — wide horizontal sweep
  'M-28,6 C-12,-12 12,-12 28,6 C32,18 22,26 0,24 C-22,24 -32,18 -28,6',
  // ha — double-lobed form
  'M-22,-4 C-16,-22 2,-22 6,-10 C10,2 4,18 -6,18 M6,-10 C16,-16 26,-10 26,2 C26,18 16,22 6,18',
  // ta — wide oval
  'M0,-18 C20,-18 22,0 12,12 C4,22 -12,22 -20,12 C-28,2 -24,-18 0,-18',
  // fa — teardrop loop
  'M-6,-10 C2,-22 18,-20 20,-8 C22,4 12,12 0,12 C-12,12 -20,6 -20,-2 C-20,-12 -14,-18 -6,-18',
  // kaf — angular stroke with serif
  'M-20,10 C-8,-12 10,-14 22,-4 C30,4 26,18 16,20 M20,-4 L24,-16',
  // ra — sweeping descending curve
  'M-22,0 C-8,-5 8,-5 18,2 C26,8 26,20 20,24 C14,28 4,26 -4,22',
  // tah — bowl with vertical
  'M-20,12 C-20,-10 20,-10 20,12 M8,12 L8,-26',
  // dal — open angular hook
  'M-16,-14 C0,-18 16,-12 16,2 C16,14 6,18 -6,16',
];

const C = 350; // SVG viewBox center

// Darker companion tone for each brand color — used as the ribbon's
// shadow/edge underlay to fake layered paper-craft depth.
const SHADE: Record<string, string> = {
  '#FFFDF7': '#E4DBC2',
  '#F7F1E3': '#D7CDB1',
  '#FDC921': '#B98712',
  '#FDD85D': '#C99B2C',
  '#99D6EA': '#5E9CB8',
  '#6798C0': '#42678C',
  '#8D6B4F': '#56402B',
  '#6E5238': '#42301E',
};
const shadeOf = (c: string) => SHADE[c] ?? '#56402B';

type Ring = {
  id: number;
  radius: number;
  count: number;
  scale: number;
  dur: number;
  cw: boolean;
  opacity: number;
  sw: number;
  palette: string[];
  blur?: string;
};

// 7 concentric rings forming a tunnel: outer = large ivory ribbons,
// inner = small dark strokes receding into the void. Inner rings spin
// faster, creating the wormhole pull. Color zones blend ivory → blue →
// gold → brown from edge to core.
const RINGS: Ring[] = [
  { id: 0, radius: 332, count: 30, scale: 1.15, dur: 220, cw: true,  opacity: 0.85, sw: 3.0, palette: ['#FFFDF7', '#F7F1E3', '#FFFDF7', '#F7F1E3', '#99D6EA'], blur: 'cvb1' },
  { id: 1, radius: 270, count: 26, scale: 1.00, dur: 185, cw: false, opacity: 0.88, sw: 2.6, palette: ['#F7F1E3', '#FFFDF7', '#6798C0', '#FDD85D', '#F7F1E3'], blur: 'cvb2' },
  { id: 2, radius: 212, count: 22, scale: 0.85, dur: 150, cw: true,  opacity: 0.90, sw: 2.2, palette: ['#FDC921', '#FDD85D', '#6798C0', '#FDC921', '#F7F1E3'] },
  { id: 3, radius: 156, count: 18, scale: 0.70, dur: 120, cw: false, opacity: 0.90, sw: 1.8, palette: ['#FDC921', '#8D6B4F', '#FDD85D', '#6798C0', '#FDC921'] },
  { id: 4, radius: 108, count: 14, scale: 0.55, dur: 95,  cw: true,  opacity: 0.88, sw: 1.5, palette: ['#8D6B4F', '#FDC921', '#8D6B4F', '#FDD85D'] },
  { id: 5, radius: 70,  count: 11, scale: 0.42, dur: 72,  cw: false, opacity: 0.85, sw: 1.2, palette: ['#8D6B4F', '#6E5238', '#FDC921', '#8D6B4F'] },
  { id: 6, radius: 40,  count: 8,  scale: 0.30, dur: 55,  cw: true,  opacity: 0.80, sw: 1.0, palette: ['#6E5238', '#8D6B4F', '#FDC921'] },
];

function makeRing(radius: number, count: number) {
  return Array.from({ length: count }, (_, i) => {
    const a = (i / count) * Math.PI * 2;
    return {
      x: C + Math.cos(a) * radius,
      y: C + Math.sin(a) * radius,
      rotate: (i / count) * 360 + 90,
    };
  });
}

const RING_ITEMS = RINGS.map((r) => makeRing(r.radius, r.count));

// Golden-angle particle field — deterministic (no Math.random → SSR-safe).
// Gold flecks, lozenge ornaments and 8-point sparkles scattered through
// the calligraphy band, mirroring the reference's gilt specks.
const PARTICLES = Array.from({ length: 48 }, (_, i) => {
  const a = i * 2.399963; // golden angle ~137.5°
  const radius = 38 + (i * 1.93) % 300;
  return {
    cx:     C + Math.cos(a) * radius,
    cy:     C + Math.sin(a) * radius,
    r:      0.8 + (i % 4) * 0.5,
    type:   i % 3,
    baseOp: 0.12 + (i % 5) * 0.045,
    dur:    2.6 + (i % 5) * 1.1,
    delay:  (i % 7) * 0.6,
  };
});

const RING_RADII = RINGS.map((r) => r.radius);

export function CalligraphyVortex() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const px = useSpring(mx, { stiffness: 22, damping: 18 });
  const py = useSpring(my, { stiffness: 22, damping: 18 });

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      mx.set((e.clientX / window.innerWidth  - 0.5) * 3);
      my.set((e.clientY / window.innerHeight - 0.5) * 3);
    };
    window.addEventListener('mousemove', handler, { passive: true });
    return () => window.removeEventListener('mousemove', handler);
  }, [mx, my]);

  const renderRing = (ring: Ring) => (
    <motion.g
      key={ring.id}
      style={{
        transformOrigin: 'center',
        filter: ring.blur ? `url(#${ring.blur})` : undefined,
      }}
      animate={{ rotate: ring.cw ? 360 : -360 }}
      transition={{ duration: ring.dur, ease: 'linear', repeat: Infinity }}
      opacity={ring.opacity}
    >
      {RING_ITEMS[ring.id].map((it, ii) => {
        const color = ring.palette[ii % ring.palette.length];
        const path = S[(ii + ring.id) % S.length];
        return (
          <g
            key={ii}
            transform={`translate(${it.x},${it.y}) rotate(${it.rotate}) scale(${ring.scale})`}
          >
            {/* shadow/edge underlay — offset slightly for paper-craft depth */}
            <path
              d={path}
              fill="none"
              stroke={shadeOf(color)}
              strokeWidth={ring.sw * 2.2}
              strokeOpacity={0.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              transform="translate(0.9,1.3)"
            />
            {/* main ribbon */}
            <path
              d={path}
              fill="none"
              stroke={color}
              strokeWidth={ring.sw}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        );
      })}
    </motion.g>
  );

  return (
    <motion.div
      className="w-[350px] h-[350px] md:w-[500px] md:h-[500px] lg:w-[700px] lg:h-[700px] mx-auto pointer-events-none select-none"
      style={{ x: px, y: py }}
    >
      <svg
        viewBox="0 0 700 700"
        width="100%"
        height="100%"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="cvb1"><feGaussianBlur stdDeviation="0.6" /></filter>
          <filter id="cvb2"><feGaussianBlur stdDeviation="0.3" /></filter>

          {/* warm halo bleeding the disk edge into the cream background */}
          <radialGradient id="cvhalo" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="#FDC921" stopOpacity="0.05" />
            <stop offset="62%"  stopColor="#FDD85D" stopOpacity="0.03" />
            <stop offset="100%" stopColor="#F5EDD9" stopOpacity="0"    />
          </radialGradient>

          {/* the dark receding void — the heart of the wormhole */}
          <radialGradient id="cvcore" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="#160E07" stopOpacity="0.94" />
            <stop offset="22%"  stopColor="#2A1B0F" stopOpacity="0.82" />
            <stop offset="48%"  stopColor="#5C402A" stopOpacity="0.38" />
            <stop offset="78%"  stopColor="#8D6B4F" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#8D6B4F" stopOpacity="0"    />
          </radialGradient>

          {/* faint light at the end of the tunnel */}
          <radialGradient id="cvspark" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="#FDD85D" stopOpacity="0.55" />
            <stop offset="50%"  stopColor="#FDC921" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#FDC921" stopOpacity="0"    />
          </radialGradient>
        </defs>

        {/* ambient halo */}
        <circle cx={C} cy={C} r="345" fill="url(#cvhalo)" />

        {/* engraved guide circles (very faint) */}
        {RING_RADII.map((r, i) => (
          <circle
            key={r}
            cx={C} cy={C} r={r}
            fill="none"
            stroke={i < 2 ? '#8D6B4F' : '#FDC921'}
            strokeWidth="0.4"
            opacity={0.07}
          />
        ))}

        {/* outer rings (ivory / blue tapestry) */}
        {RINGS.slice(0, 3).map(renderRing)}

        {/* dark void — drawn over the outer rings' inner region so the
            deeper gold/brown strokes pop against shadow */}
        <circle cx={C} cy={C} r="172" fill="url(#cvcore)" />
        <circle cx={C} cy={C} r="34"  fill="url(#cvspark)" />

        {/* inner rings (gold → brown, receding into the dark) */}
        {RINGS.slice(3).map(renderRing)}

        {/* floating gilt particles & lozenge ornaments */}
        {PARTICLES.map((p, i) => (
          <motion.g
            key={i}
            animate={{ opacity: [p.baseOp, p.baseOp * 3.5, p.baseOp] }}
            transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}
          >
            {p.type === 0 && (
              <circle cx={p.cx} cy={p.cy} r={p.r} fill="#FDC921" />
            )}
            {p.type === 1 && (
              // lozenge ornament — gold diamond with dark center
              <g transform={`rotate(45,${p.cx},${p.cy})`}>
                <rect
                  x={p.cx - p.r * 1.4} y={p.cy - p.r * 1.4}
                  width={p.r * 2.8} height={p.r * 2.8}
                  fill="#FDC921"
                />
                <rect
                  x={p.cx - p.r * 0.45} y={p.cy - p.r * 0.45}
                  width={p.r * 0.9} height={p.r * 0.9}
                  fill="#5C402A"
                />
              </g>
            )}
            {p.type === 2 && (
              // 8-pointed star sparkle
              <path
                d={[
                  `M${p.cx},${p.cy - p.r * 2.8}`,
                  `L${p.cx + p.r * 0.6},${p.cy - p.r * 0.6}`,
                  `L${p.cx + p.r * 2.8},${p.cy}`,
                  `L${p.cx + p.r * 0.6},${p.cy + p.r * 0.6}`,
                  `L${p.cx},${p.cy + p.r * 2.8}`,
                  `L${p.cx - p.r * 0.6},${p.cy + p.r * 0.6}`,
                  `L${p.cx - p.r * 2.8},${p.cy}`,
                  `L${p.cx - p.r * 0.6},${p.cy - p.r * 0.6}`,
                  'Z',
                ].join(' ')}
                fill="#FDD85D"
              />
            )}
          </motion.g>
        ))}

        {/* center glint — a small counter-rotating ring of dots,
            the light glimmering deep in the tunnel */}
        <motion.g
          style={{ transformOrigin: 'center' }}
          animate={{ rotate: -360 }}
          transition={{ duration: 48, ease: 'linear', repeat: Infinity }}
          opacity={0.6}
        >
          {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => {
            const r = (a * Math.PI) / 180;
            return (
              <circle
                key={a}
                cx={C + Math.cos(r) * 11}
                cy={C + Math.sin(r) * 11}
                r="0.9"
                fill="#FDD85D"
              />
            );
          })}
        </motion.g>
      </svg>
    </motion.div>
  );
}
