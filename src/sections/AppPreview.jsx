import { motion } from 'framer-motion';
import { RunIcon, BoltIcon, TrophyIcon } from '../components/Icons';

// ── Geometry ──────────────────────────────────────────────────────────────────
// Wider viewBox (600×440) gives room for side labels without overflow.
const VW = 600, VH = 440, CX = 300, CY = 220, R = 148;
const rad = (d) => (d * Math.PI) / 180;
const pt = (d) => ({
  x: parseFloat((CX + R * Math.cos(rad(d))).toFixed(2)),
  y: parseFloat((CY + R * Math.sin(rad(d))).toFixed(2)),
});

// Nodes at 120° intervals: top, bottom-right, bottom-left
const N = [pt(-90), pt(30), pt(150)];
// N[0] = (300, 72)   N[1] = (428.1, 294)   N[2] = (171.9, 294)

// Perfect circular arcs using the SVG "A" command (NOT bezier).
// sweep=1 → clockwise; large-arc=0 since each arc spans exactly 120°.
const ARCS = N.map((from, i) => {
  const to = N[(i + 1) % 3];
  return `M ${from.x} ${from.y} A ${R} ${R} 0 0 1 ${to.x} ${to.y}`;
});

const ARC_COLORS = ['#3b82f6', '#D0EA59', '#f97316'];
// Each dot travels the full circle starting from its own node position
// so they are always perfectly 120° apart with no stagger needed
const FULL_PATHS = [
  // Dot 0 (blue): N[0] → N[1] → N[2] → N[0]
  `M ${pt(-90).x} ${pt(-90).y} A ${R} ${R} 0 0 1 ${pt(30).x} ${pt(30).y} A ${R} ${R} 0 0 1 ${pt(150).x} ${pt(150).y} A ${R} ${R} 0 0 1 ${pt(-90).x} ${pt(-90).y}`,
  // Dot 1 (yellow): N[1] → N[2] → N[0] → N[1]
  `M ${pt(30).x} ${pt(30).y} A ${R} ${R} 0 0 1 ${pt(150).x} ${pt(150).y} A ${R} ${R} 0 0 1 ${pt(-90).x} ${pt(-90).y} A ${R} ${R} 0 0 1 ${pt(30).x} ${pt(30).y}`,
  // Dot 2 (orange): N[2] → N[0] → N[1] → N[2]
  `M ${pt(150).x} ${pt(150).y} A ${R} ${R} 0 0 1 ${pt(-90).x} ${pt(-90).y} A ${R} ${R} 0 0 1 ${pt(30).x} ${pt(30).y} A ${R} ${R} 0 0 1 ${pt(150).x} ${pt(150).y}`,
];
const DOT_DUR = '7.5s'; // full circle at same angular speed as before

// ── Icon/label data ───────────────────────────────────────────────────────────
const IR = 26; // icon radius in SVG units
const NODES = [
  {
    idx: 0,
    label: '01', title: 'Track Activity', sub: 'Every workout auto-logged',
    Icon: RunIcon,
    iconFill: 'rgba(59,130,246,0.12)', iconStroke: 'rgba(59,130,246,0.4)', textColor: '#3b82f6', glow: '#3b82f6',
    // text below icon, centred
    tx: N[0].x, ta: 'middle',
    ty0: N[0].y + IR + 18,  // label line
    ty1: N[0].y + IR + 32,  // title
    ty2: N[0].y + IR + 45,  // sub
  },
  {
    idx: 1,
    label: '02', title: 'Earn Points', sub: 'Auto-credited instantly',
    Icon: BoltIcon,
    iconFill: 'rgba(208,234,89,0.12)', iconStroke: 'rgba(208,234,89,0.4)', textColor: '#D0EA59', glow: '#D0EA59',
    // text right of icon
    tx: N[1].x + IR + 14, ta: 'start',
    ty0: N[1].y - 12,
    ty1: N[1].y + 3,
    ty2: N[1].y + 16,
  },
  {
    idx: 2,
    label: '03', title: 'Redeem Rewards', sub: 'Real gear & vouchers',
    Icon: TrophyIcon,
    iconFill: 'rgba(249,115,22,0.12)', iconStroke: 'rgba(249,115,22,0.35)', textColor: '#f97316', glow: '#f97316',
    // text left of icon
    tx: N[2].x - IR - 14, ta: 'end',
    ty0: N[2].y - 12,
    ty1: N[2].y + 3,
    ty2: N[2].y + 16,
  },
];

function RefreshIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
      <path d="M21 3v5h-5" />
      <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
      <path d="M8 21H3v-5" />
    </svg>
  );
}

export default function AppPreview() {
  return (
    <section id="how-it-works" className="py-24 relative overflow-hidden" aria-label="How it works section">
      {/* Ambient glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-primary/3 rounded-full blur-[120px]" />
        <div className="absolute top-8 right-1/4 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-8 left-1/4 w-64 h-64 bg-orange-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block text-xs font-semibold text-primary bg-primary/10 border border-primary/20 px-4 py-1.5 rounded-full mb-4 tracking-wide uppercase">
            How It Works
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-surface-text mb-4">
            A Loop That{' '}
            <span className="text-gradient">Never Stops</span>
          </h2>
          <p className="text-surface-secondary text-lg max-w-xl mx-auto">
            Move. Earn. Redeem. Repeat — every single day.
          </p>
        </motion.div>

        {/* Diagram */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="relative mx-auto"
          style={{ width: '100%', maxWidth: 760 }}
        >
          <svg
            viewBox={`0 0 ${VW} ${VH}`}
            className="w-full"
            fill="none"
            overflow="visible"
          >
            <defs>
              <filter id="glow" x="-60%" y="-60%" width="220%" height="220%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
              <filter id="dotglow" x="-100%" y="-100%" width="300%" height="300%">
                <feGaussianBlur stdDeviation="2.5" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
            </defs>

            {/* Faint orbit guide ring */}
            <circle cx={CX} cy={CY} r={R}
              stroke="white" strokeOpacity="0.07" strokeWidth="1" strokeDasharray="3 8" />

            {/* Hidden full-circle paths for dot travel */}
            {FULL_PATHS.map((d, i) => (
              <path key={`fullpath${i}`} id={`fullpath${i}`} d={d} fill="none" stroke="none" />
            ))}

            {/* Arcs: glow copy + animated dashed stroke */}
            {ARCS.map((d, i) => (
              <g key={i}>
                <path d={d} stroke={ARC_COLORS[i]} strokeWidth="10"
                  strokeOpacity="0.07" filter="url(#glow)" />

                <motion.path
                  d={d}
                  stroke={ARC_COLORS[i]}
                  strokeWidth="1.75"
                  strokeDasharray="5 4"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.0, delay: 0.5 + i * 0.2, ease: 'easeInOut' }}
                  viewport={{ once: true }}
                />
              </g>
            ))}

            {/* Travelling dots — color snaps to match the arc segment being traversed */}
            {ARC_COLORS.map((_, i) => {
              // Dot i starts on arc i, then arc (i+1)%3, then arc (i+2)%3
              const c0 = ARC_COLORS[i % 3];
              const c1 = ARC_COLORS[(i + 1) % 3];
              const c2 = ARC_COLORS[(i + 2) % 3];
              return (
                <circle key={`dot${i}`} r="4.5" fill={c0} filter="url(#dotglow)">
                  <animateMotion dur={DOT_DUR} repeatCount="indefinite" begin="0s">
                    <mpath href={`#fullpath${i}`} />
                  </animateMotion>
                  <animate
                    attributeName="fill"
                    values={`${c0};${c1};${c2};${c0}`}
                    keyTimes="0;0.333;0.667;1"
                    dur={DOT_DUR}
                    repeatCount="indefinite"
                    begin="0s"
                    calcMode="discrete"
                  />
                </circle>
              );
            })}

            {/* Node icon circles + labels (all in SVG so positions are exact) */}
            {NODES.map((node) => (
              <g key={node.idx}>
                {/* Soft glow halo behind icon */}
                <circle cx={N[node.idx].x} cy={N[node.idx].y} r={IR + 8}
                  fill={node.glow} fillOpacity="0.08" />

                {/* Icon circle */}
                <circle cx={N[node.idx].x} cy={N[node.idx].y} r={IR}
                  fill={node.iconFill} stroke={node.iconStroke} strokeWidth="1.5" />

                {/* React icon embedded via foreignObject */}
                <foreignObject
                  x={N[node.idx].x - 13}
                  y={N[node.idx].y - 13}
                  width="26" height="26"
                >
                  <div
                    // eslint-disable-next-line react/no-unknown-property
                    xmlns="http://www.w3.org/1999/xhtml"
                    style={{ width: 26, height: 26, display: 'flex', alignItems: 'center', justifyContent: 'center', color: node.textColor }}
                  >
                    <node.Icon className="w-[18px] h-[18px]" style={{ color: node.textColor }} />
                  </div>
                </foreignObject>

                {/* Step label */}
                <text
                  x={node.tx} y={node.ty0}
                  textAnchor={node.ta}
                  fontSize="10" fontWeight="700" letterSpacing="2"
                  fill={node.textColor} fillOpacity="0.55"
                  fontFamily="Inter, sans-serif"
                >
                  {node.label}
                </text>

                {/* Title */}
                <text
                  x={node.tx} y={node.ty1}
                  textAnchor={node.ta}
                  fontSize="13" fontWeight="700"
                  fill="#F2F2F2"
                  fontFamily="Inter, sans-serif"
                >
                  {node.title}
                </text>

                {/* Sub */}
                <text
                  x={node.tx} y={node.ty2}
                  textAnchor={node.ta}
                  fontSize="10.5" fontWeight="400"
                  fill="#81817E"
                  fontFamily="Inter, sans-serif"
                >
                  {node.sub}
                </text>
              </g>
            ))}

            {/* Centre hub — drawn in SVG too */}
            {/* Pulse ring (CSS animation via className) */}
            <circle cx={CX} cy={CY} r="38" stroke="#D0EA59" strokeOpacity="0.12" strokeWidth="1"
              strokeDasharray="4 5">
              <animateTransform attributeName="transform" type="rotate"
                from={`0 ${CX} ${CY}`} to={`360 ${CX} ${CY}`}
                dur="14s" repeatCount="indefinite" />
            </circle>
            <circle cx={CX} cy={CY} r="30"
              fill="#212121" stroke="#363635" strokeWidth="1" />

            {/* Refresh icon in centre via foreignObject */}
            <foreignObject x={CX - 12} y={CY - 12} width="24" height="24">
              <div
                // eslint-disable-next-line react/no-unknown-property
                xmlns="http://www.w3.org/1999/xhtml"
                style={{ width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#D0EA59' }}
              >
                <RefreshIcon className="w-5 h-5" style={{ color: '#D0EA59' }} />
              </div>
            </foreignObject>
          </svg>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 1.5 }}
          viewport={{ once: true }}
          className="flex items-center justify-center gap-3 mt-10"
        >
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-primary/25" />
          <span className="text-surface-secondary text-[11px] font-medium tracking-[0.18em] uppercase">
            Continuous cycle
          </span>
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-primary/25" />
        </motion.div>

      </div>
    </section>
  );
}
