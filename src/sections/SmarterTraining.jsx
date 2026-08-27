'use client';

import { motion } from 'framer-motion';
import { MapPinIcon, FlameIcon } from '../components/Icons';

const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.6, ease: 'easeOut', delay },
});

const MACROS = [
  { label: 'Protein', value: '128 g', pct: 82, color: '#D0EA59' },
  { label: 'Carbs', value: '240 g', pct: 64, color: '#3b82f6' },
  { label: 'Fat', value: '56 g', pct: 40, color: '#f97316' },
  { label: 'Calories', value: '2,180', pct: 73, color: '#14140F' },
];

const ANALYSIS_BARS = [38, 62, 45, 80, 55, 92, 70];

function RouteCard() {
  return (
    <div className="rounded-[1.5rem] bg-white border border-[#14140F]/[0.06] p-5 shadow-[0_20px_40px_-24px_rgba(20,20,15,0.25)]">
      <p className="text-[13px] font-bold text-[#14140F] leading-snug mb-3 max-w-[12rem]">
        Commence at any location. Reach any objective.
      </p>
      <div className="relative h-20 rounded-xl bg-[#F1F0EA] overflow-hidden">
        <svg viewBox="0 0 200 80" className="absolute inset-0 w-full h-full" fill="none">
          <path
            d="M12 64 C 50 64, 44 20, 82 20 S 150 60, 188 24"
            stroke="#14140F"
            strokeOpacity="0.35"
            strokeWidth="2"
            strokeDasharray="4 5"
            strokeLinecap="round"
          />
          <circle cx="12" cy="64" r="4" fill="#14140F" />
        </svg>
        <span className="absolute right-2 top-2 w-7 h-7 rounded-full bg-primary flex items-center justify-center">
          <MapPinIcon className="w-4 h-4 text-[#14140F]" />
        </span>
      </div>
    </div>
  );
}

function KcalCard({ value }) {
  return (
    <div className="rounded-[1.25rem] bg-white border border-[#14140F]/[0.06] px-4 py-3 shadow-[0_16px_32px_-22px_rgba(20,20,15,0.25)]">
      <div className="flex items-center gap-1.5">
        <FlameIcon className="w-4 h-4 text-orange-500" />
        <p className="text-lg font-extrabold text-[#14140F] leading-none">{value}</p>
      </div>
      <p className="text-[11px] text-[#8A8574] mt-1">Kcal</p>
    </div>
  );
}

function AnalysisCard() {
  return (
    <div className="rounded-[1.5rem] bg-white border border-[#14140F]/[0.06] p-5 shadow-[0_20px_40px_-24px_rgba(20,20,15,0.25)]">
      <div className="flex items-center justify-between mb-3">
        <p className="text-[13px] font-bold text-[#14140F]">Calorie Analysis</p>
        <span className="text-[11px] font-semibold text-[#14140F] bg-primary rounded-full px-2 py-0.5">
          +20%
        </span>
      </div>
      <div className="flex items-end gap-1.5 h-16 mb-3">
        {ANALYSIS_BARS.map((h, i) => (
          <div
            key={i}
            className="flex-1 rounded-t-md"
            style={{
              height: `${h}%`,
              background: i === ANALYSIS_BARS.length - 2 ? '#D0EA59' : 'rgba(20,20,15,0.12)',
            }}
          />
        ))}
      </div>
      <p className="text-[11px] text-[#6E6A5D] leading-snug">
        Keep it up — you&apos;ve gained 2&nbsp;kg of lean mass in just 6 months.
      </p>
    </div>
  );
}

export default function SmarterTraining() {
  return (
    <section
      id="smarter-training"
      className="relative bg-[#F7F6F2] py-16 md:py-24 overflow-hidden"
      aria-label="Smarter, data-driven training"
    >
      <div
        className="absolute inset-0 opacity-[0.35] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#14140F 0.6px, transparent 0.6px)',
          backgroundSize: '14px 14px',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* ---------- Left: overlapping data cards ---------- */}
          <motion.div {...reveal()} className="relative">
            <div className="grid grid-cols-2 gap-4 sm:gap-5">
              <div className="col-span-2">
                <RouteCard />
              </div>
              <KcalCard value="350" />
              <KcalCard value="282" />
              <div className="col-span-2">
                <AnalysisCard />
              </div>
            </div>

            {/* floating accent badge — desktop only */}
            <div className="hidden lg:flex absolute -top-6 -right-6 w-16 h-16 rounded-2xl bg-[#14140F] items-center justify-center rotate-6 shadow-xl">
              <span className="text-primary text-lg font-extrabold">+20%</span>
            </div>
          </motion.div>

          {/* ---------- Right: heading + macro breakdown ---------- */}
          <motion.div {...reveal(0.15)}>
            <span className="block text-xs font-semibold tracking-[0.2em] uppercase text-[#8A8574] mb-3">
              Data-Driven Fitness for Everyone
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold leading-[1.05] tracking-tight text-[#14140F] mb-5">
              Training For Every
              <br />
              Body and Mind
            </h2>
            <p className="text-[#6E6A5D] text-base leading-relaxed mb-8 max-w-md">
              Yaaro reads your real activity, fuel and recovery — then adapts every
              plan to the person actually doing the work.
            </p>

            <div className="rounded-[1.5rem] bg-white border border-[#14140F]/[0.06] p-6 shadow-[0_24px_50px_-30px_rgba(20,20,15,0.3)] max-w-md">
              <p className="text-sm font-bold text-[#14140F] mb-4">Today&apos;s Balance</p>
              <div className="space-y-4">
                {MACROS.map((m) => (
                  <div key={m.label}>
                    <div className="flex items-center justify-between text-[13px] mb-1.5">
                      <span className="text-[#6E6A5D]">{m.label}</span>
                      <span className="font-semibold text-[#14140F]">{m.value}</span>
                    </div>
                    <div className="h-2 rounded-full bg-[#14140F]/[0.08] overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ background: m.color }}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${m.pct}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <a
              href="#download"
              className="inline-flex items-center justify-center bg-primary text-[#14140F] font-semibold text-base px-8 py-3.5 rounded-full mt-8 shadow-[0_10px_30px_-10px_rgba(208,234,89,0.6)] hover:-translate-y-0.5 transition-all duration-200"
            >
              Get Started
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
