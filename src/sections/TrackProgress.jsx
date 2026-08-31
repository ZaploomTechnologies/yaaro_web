'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { AppleIcon, PlayStoreIcon, FlameIcon, HeartIcon, FootprintIcon } from '../components/Icons';

/* -------------------------------------------------------------------------- */
/*  Reveal helper — matches the neighbouring light sections                    */
/* -------------------------------------------------------------------------- */
// Reveals on `active` (this panel becoming on-stage in SectionSnapStack)
// instead of native scroll-into-view.
const reveal = (active, delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  animate: active ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 },
  transition: { duration: 0.6, ease: 'easeOut', delay },
});

const APP_STORE_URL =
  'https://apps.apple.com/in/app/yaaro-fit-run-cycle-workout/id6763996078';
const PLAY_STORE_URL =
  'https://play.google.com/store/apps/details?id=com.yaaro.fit';

const DAILY_ROWS = [
  { Icon: FootprintIcon, label: 'Daily Activity Goal', value: '8,240 steps', done: true },
  { Icon: FlameIcon, label: 'Weekly Challenge', value: '12.4 km logged', done: true },
  { Icon: HeartIcon, label: 'Points This Week', value: '+640 pts', done: false },
];

function StoreButton({ href, kicker, name, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-3 bg-[#14140F] text-white px-5 py-3 rounded-2xl hover:-translate-y-0.5 transition-transform duration-200"
    >
      <span className="flex-shrink-0">{children}</span>
      <span className="text-left leading-tight">
        <span className="block text-[10px] text-white/60">{kicker}</span>
        <span className="block text-sm font-bold">{name}</span>
      </span>
    </a>
  );
}

/* Small line chart for the "Daily step" floating card */
function Sparkline({ className = '' }) {
  const pts = [4, 9, 6, 13, 10, 17, 14, 21];
  const max = Math.max(...pts);
  const d = pts
    .map((p, i) => {
      const x = (i / (pts.length - 1)) * 100;
      const y = 30 - (p / max) * 26;
      return `${i === 0 ? 'M' : 'L'}${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join(' ');
  return (
    <svg viewBox="0 0 100 32" className={className} fill="none" preserveAspectRatio="none">
      <path d={`${d} L100 32 L0 32 Z`} fill="#D0EA59" fillOpacity="0.18" />
      <path d={d} stroke="#14140F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function TrackProgress({ active }) {
  return (
    <section
      id="download"
      className="relative bg-[#F7F6F2] h-full flex flex-col justify-center py-16 md:py-24 overflow-hidden"
      aria-label="Start your fitness journey with Yaaro"
    >
      {/* dotted texture */}
      <div
        className="absolute inset-0 opacity-[0.35] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#14140F 0.6px, transparent 0.6px)',
          backgroundSize: '14px 14px',
        }}
      />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          {...reveal(active)}
          className="relative rounded-[2rem] bg-primary overflow-hidden shadow-[0_40px_80px_-40px_rgba(20,20,15,0.35)]"
        >
          <div className="grid lg:grid-cols-2">
            {/* ---------- Left: copy + store buttons + daily list ---------- */}
            <div className="p-6 sm:p-8 lg:p-10">
              <span className="block text-xs font-semibold tracking-[0.2em] uppercase text-[#14140F]/55 mb-3">
                Yaaro for iOS &amp; Android
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold leading-[1.05] tracking-tight text-[#14140F] mb-3">
                Start Your Fitness
                <br />
                Journey Today
              </h2>
              <p className="text-[#14140F]/70 text-sm sm:text-base leading-relaxed mb-6 max-w-md">
                Watch every run, ride and workout add up — and turn all that
                movement into points you can redeem for real rewards.
              </p>

              <div className="flex flex-wrap gap-3 mb-6">
                <StoreButton href={APP_STORE_URL} kicker="Download on the" name="App Store">
                  <AppleIcon className="w-5 h-5 text-white" />
                </StoreButton>
                <StoreButton href={PLAY_STORE_URL} kicker="Get it on" name="Google Play">
                  <PlayStoreIcon className="w-5 h-5" />
                </StoreButton>
              </div>

              <div className="max-w-sm rounded-2xl bg-[#14140F]/[0.05] border border-[#14140F]/10 p-3 space-y-2">
                {DAILY_ROWS.map(({ Icon, label, value, done }) => (
                  <div
                    key={label}
                    className="flex items-center gap-3 bg-white/70 rounded-xl px-3 py-2.5"
                  >
                    <span className="w-8 h-8 rounded-lg bg-[#14140F]/[0.06] flex items-center justify-center flex-shrink-0">
                      <Icon className="w-4 h-4 text-[#14140F]" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-[13px] font-semibold text-[#14140F] leading-none truncate">
                        {label}
                      </p>
                      <p className="text-[11px] text-[#6E6A5D] mt-1">{value}</p>
                    </div>
                    <span
                      className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold ${
                        done ? 'bg-[#14140F] text-primary' : 'bg-[#14140F]/10 text-[#14140F]/50'
                      }`}
                    >
                      {done ? '✓' : '·'}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* ---------- Right: photo + floating stat cards ---------- */}
            <div className="relative min-h-[20rem] lg:min-h-0">
              <Image
                src="/workout.jpg"
                alt="Athlete resting between sets, reviewing their session in Yaaro"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/30 via-transparent to-transparent lg:bg-gradient-to-l" />

              {/* Current-period cards */}
              <div className="absolute top-5 right-5 flex gap-3">
                {[
                  { label: 'Activity Log', date: 'Sep 08' },
                  { label: 'Activity Log', date: 'Oct 13' },
                ].map((c, i) => (
                  <div
                    key={i}
                    className="rounded-2xl bg-white/90 backdrop-blur-sm px-4 py-3 shadow-lg"
                  >
                    <p className="text-[10px] uppercase tracking-wide text-[#8A8574]">{c.label}</p>
                    <p className="text-base font-extrabold text-[#14140F] leading-tight mt-0.5">
                      {c.date}
                      <span className="text-[#8A8574] font-medium"> 2026</span>
                    </p>
                  </div>
                ))}
              </div>

              {/* Daily step card */}
              <div className="absolute bottom-5 left-5 right-5 sm:right-auto sm:w-64 rounded-2xl bg-white/[0.92] backdrop-blur-sm p-4 shadow-xl">
                <div className="flex items-baseline justify-between">
                  <p className="text-xs font-semibold text-[#6E6A5D]">Daily step</p>
                  <p className="text-2xl font-extrabold text-[#14140F] leading-none">83%</p>
                </div>
                <p className="text-[11px] text-[#8A8574] mb-2">8h 12m tracked</p>
                <Sparkline className="w-full h-10" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
