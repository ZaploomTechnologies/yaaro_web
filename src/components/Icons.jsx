// Centralized SVG icon library — no emojis anywhere in the app.
// All icons use currentColor and accept className for sizing/color.

const defaults = { xmlns: 'http://www.w3.org/2000/svg', fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' };
const Icon = ({ children, className = 'w-5 h-5', filled = false, ...props }) => (
  <svg {...defaults} fill={filled ? 'currentColor' : 'none'} className={className} aria-hidden="true" {...props}>
    {children}
  </svg>
);

export function RunIcon({ className }) {
  return (
    <Icon className={className}>
      {/* Head */}
      <circle cx="14.5" cy="3.5" r="1.4" fill="currentColor" stroke="none" />
      {/* Body + arms + legs as a runner silhouette */}
      <path d="M11 7.5l2 1.5 1.5-3M9 21l2-5 2 2 3-6M15 12l-2-3-4 1-2 3" />
    </Icon>
  );
}

export function WalkIcon({ className }) {
  return (
    <Icon className={className}>
      <circle cx="12" cy="4" r="1.5" fill="currentColor" stroke="none" />
      <path d="M10 9l2-2 2 1.5M9 21l1.5-5 2 2 2-5M14 10l1 3-3 1" />
    </Icon>
  );
}

export function CycleIcon({ className }) {
  return (
    <Icon className={className}>
      <circle cx="5.5" cy="17" r="3" />
      <circle cx="18.5" cy="17" r="3" />
      <path d="M5.5 17l4-7h5l2 7" />
      <path d="M10.5 10l2-3" />
      <circle cx="12.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </Icon>
  );
}

export function DumbbellIcon({ className }) {
  return (
    <Icon className={className}>
      <path d="M6 4v16M18 4v16" />
      <path d="M3 8h3M18 8h3M3 16h3M18 16h3" />
      <path d="M6 12h12" />
    </Icon>
  );
}

export function BoltIcon({ className }) {
  return (
    <Icon className={className} filled>
      <path d="M13 2 4.09 12.5H11L9.5 22 20 11.5H13L13 2z" />
    </Icon>
  );
}

export function MessageIcon({ className }) {
  return (
    <Icon className={className}>
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </Icon>
  );
}

export function TrophyIcon({ className }) {
  return (
    <Icon className={className}>
      <path d="M6 9H3.5a2 2 0 0 0 0 4H6" />
      <path d="M18 9h2.5a2 2 0 0 1 0 4H18" />
      <path d="M4 3h16v7a8 8 0 0 1-16 0V3z" />
      <path d="M12 21v-5" />
      <path d="M8 21h8" />
    </Icon>
  );
}

export function FootprintIcon({ className }) {
  return (
    <Icon className={className}>
      <path d="M8 19c1.5 0 3-1.5 3-4V8c0-2-1-3-2.5-3S6 6 6 8v7c0 2.5 1 4 2 4z" />
      <path d="M16 19c-1.5 0-3-1.5-3-4V8c0-2 1-3 2.5-3S18 6 18 8v7c0 2.5-1 4-2 4z" />
    </Icon>
  );
}

export function FlameIcon({ className }) {
  return (
    <Icon className={className}>
      <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 3z" />
    </Icon>
  );
}

export function TargetIcon({ className }) {
  return (
    <Icon className={className}>
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </Icon>
  );
}

export function UsersIcon({ className }) {
  return (
    <Icon className={className}>
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </Icon>
  );
}

export function BarChartIcon({ className }) {
  return (
    <Icon className={className}>
      <line x1="12" y1="20" x2="12" y2="10" />
      <line x1="18" y1="20" x2="18" y2="4" />
      <line x1="6" y1="20" x2="6" y2="16" />
    </Icon>
  );
}

export function BottleIcon({ className }) {
  return (
    <Icon className={className}>
      <path d="M9 3h6M10 3v3l-3 2v11a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V8l-3-2V3" />
      <path d="M9 12h6" />
    </Icon>
  );
}

export function WatchIcon({ className }) {
  return (
    <Icon className={className}>
      <rect x="5" y="7" width="14" height="14" rx="3" />
      <path d="M9 4l1 3M15 4l-1 3" />
      <path d="M9 21l1-3M15 21l-1-3" />
      <path d="M12 11v2l1.5 1.5" />
    </Icon>
  );
}

export function ShieldIcon({ className }) {
  return (
    <Icon className={className}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </Icon>
  );
}

export function MapPinIcon({ className }) {
  return (
    <Icon className={className}>
      <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 1 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </Icon>
  );
}

export function SmartphoneIcon({ className }) {
  return (
    <Icon className={className}>
      <rect x="5" y="2" width="14" height="20" rx="2" />
      <line x1="12" y1="18" x2="12.01" y2="18" strokeWidth="2.5" strokeLinecap="round" />
    </Icon>
  );
}

export function RocketIcon({ className }) {
  return (
    <Icon className={className}>
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
      <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    </Icon>
  );
}

export function AppleIcon({ className }) {
  return (
    <Icon className={className} filled>
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
    </Icon>
  );
}

export function PlayStoreIcon({ className }) {
  return (
    <Icon className={className} filled>
      <path d="M3 20.5v-17c0-.83.94-1.3 1.6-.8l14 8.5c.6.37.6 1.23 0 1.6l-14 8.5c-.66.5-1.6.03-1.6-.8z" />
    </Icon>
  );
}

export function StarIcon({ className }) {
  return (
    <Icon className={className} filled>
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </Icon>
  );
}

export function HeartIcon({ className }) {
  return (
    <Icon className={className}>
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </Icon>
  );
}

export function GpsIcon({ className }) {
  return (
    <Icon className={className}>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
      <path d="M4.93 4.93l2.12 2.12M16.95 16.95l2.12 2.12M4.93 19.07l2.12-2.12M16.95 7.05l2.12-2.12" />
    </Icon>
  );
}

export function BellIcon({ className }) {
  return (
    <Icon className={className}>
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </Icon>
  );
}

export function MoonIcon({ className }) {
  return (
    <Icon className={className}>
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </Icon>
  );
}

// Map from string key → component (used in constants data)
export const ICONS = {
  run: RunIcon,
  walk: WalkIcon,
  cycle: CycleIcon,
  workout: DumbbellIcon,
  bolt: BoltIcon,
  message: MessageIcon,
  trophy: TrophyIcon,
  footprint: FootprintIcon,
  flame: FlameIcon,
  target: TargetIcon,
  users: UsersIcon,
  chart: BarChartIcon,
  bottle: BottleIcon,
  watch: WatchIcon,
  shield: ShieldIcon,
  pin: MapPinIcon,
  phone: SmartphoneIcon,
  rocket: RocketIcon,
  apple: AppleIcon,
  playstore: PlayStoreIcon,
  star: StarIcon,
  heart: HeartIcon,
  gps: GpsIcon,
  bell: BellIcon,
  moon: MoonIcon,
};
