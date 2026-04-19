// Micro-animated activity icons.
// Run/Walk/Dumbbell: Framer Motion on the whole <svg> element.
// Cycle wheels: pure CSS keyframes (transform-box: fill-box) to reliably
// rotate each wheel around its own center without Framer Motion transform conflicts.
import { motion } from 'framer-motion';

const base = {
  xmlns: 'http://www.w3.org/2000/svg',
  fill: 'none',
  viewBox: '0 0 24 24',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': 'true',
};

// Whole figure bounces in a fast running stride
export function AnimatedRunIcon({ className = 'w-7 h-7' }) {
  return (
    <motion.svg
      {...base}
      className={className}
      animate={{ y: [0, -5, 0, -3, 0] }}
      transition={{ duration: 0.55, repeat: Infinity, ease: 'easeInOut' }}
    >
      <circle cx="14.5" cy="3.5" r="1.4" fill="currentColor" stroke="none" />
      <path d="M11 7.5l2 1.5 1.5-3M9 21l2-5 2 2 3-6M15 12l-2-3-4 1-2 3" />
    </motion.svg>
  );
}

// Slower, relaxed bob for walking
export function AnimatedWalkIcon({ className = 'w-7 h-7' }) {
  return (
    <motion.svg
      {...base}
      className={className}
      animate={{ y: [0, -4, 0] }}
      transition={{ duration: 1.0, repeat: Infinity, ease: 'easeInOut' }}
    >
      <circle cx="12" cy="4" r="1.5" fill="currentColor" stroke="none" />
      <path d="M10 9l2-2 2 1.5M9 21l1.5-5 2 2 2-5M14 10l1 3-3 1" />
    </motion.svg>
  );
}

// Wheels use CSS .wheel-spin class (transform-box: fill-box; transform-origin: center)
// so each wheel rotates around its own geometric center — not the SVG origin.
export function AnimatedCycleIcon({ className = 'w-7 h-7' }) {
  return (
    <svg {...base} className={className}>
      {/* Left wheel — circle + 2-spoke cross, wrapped so fill-box covers it */}
      <g className="wheel-spin">
        <circle cx="5.5" cy="17" r="3" />
        <line x1="5.5" y1="14.1" x2="5.5" y2="19.9" strokeWidth="1.2" />
        <line x1="2.6" y1="17"   x2="8.4" y2="17"   strokeWidth="1.2" />
        <line x1="3.38" y1="14.88" x2="7.62" y2="19.12" strokeWidth="1.2" />
        <line x1="7.62" y1="14.88" x2="3.38" y2="19.12" strokeWidth="1.2" />
      </g>

      {/* Right wheel */}
      <g className="wheel-spin">
        <circle cx="18.5" cy="17" r="3" />
        <line x1="18.5" y1="14.1" x2="18.5" y2="19.9" strokeWidth="1.2" />
        <line x1="15.6" y1="17"   x2="21.4" y2="17"   strokeWidth="1.2" />
        <line x1="16.38" y1="14.88" x2="20.62" y2="19.12" strokeWidth="1.2" />
        <line x1="20.62" y1="14.88" x2="16.38" y2="19.12" strokeWidth="1.2" />
      </g>

      {/* Static frame + rider */}
      <path d="M5.5 17l4-7h5l2 7" />
      <path d="M10.5 10l2-3" />
      <circle cx="12.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

// Whole dumbbell tilts like a curl rep
export function AnimatedDumbbellIcon({ className = 'w-7 h-7' }) {
  return (
    <motion.svg
      {...base}
      className={className}
      animate={{ rotate: [-14, 14, -14], y: [0, -3, 0] }}
      transition={{ duration: 0.9, repeat: Infinity, ease: 'easeInOut' }}
    >
      <path d="M6 4v16M18 4v16" />
      <path d="M3 8h3M18 8h3M3 16h3M18 16h3" />
      <path d="M6 12h12" />
    </motion.svg>
  );
}

export const ANIMATED_ICONS = {
  run: AnimatedRunIcon,
  walk: AnimatedWalkIcon,
  cycle: AnimatedCycleIcon,
  workout: AnimatedDumbbellIcon,
};
