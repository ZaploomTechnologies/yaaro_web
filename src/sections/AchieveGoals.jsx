'use client';

import { motion } from 'framer-motion';
import { TargetIcon, HeartIcon, UsersIcon } from '../components/Icons';

// Cards/heading no longer reveal on native scroll-into-view — this section
// sits inside SectionSnapStack, which passes `active` once it becomes the
// on-stage panel, and the same staggered reveal replays from there instead.
function cardMotion(active, delay = 0) {
  return {
    initial: { opacity: 0, y: 40, scale: 0.94 },
    animate: active ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 40, scale: 0.94 },
    transition: { type: 'spring', stiffness: 260, damping: 18, mass: 0.8, delay },
  };
}

const LOG_ENTRIES = [
  { label: '10K Steps Challenge', status: 'Joined', tone: 'amber' },
  { label: 'Morning Run', status: '+120 pts earned', tone: 'primary' },
];

export default function AchieveGoals({ active }) {
  return (
    <section id="goals" className="relative bg-[#F7F6F2] h-full flex flex-col justify-center py-16 md:py-24 overflow-hidden" aria-label="Everything Yaaro offers">
      <div
        className="absolute inset-0 opacity-[0.35] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#14140F 0.6px, transparent 0.6px)',
          backgroundSize: '14px 14px',
        }}
      />
      <svg
        className="absolute -top-1/4 -right-1/4 w-[70%] h-[140%] text-[#14140F] pointer-events-none"
        viewBox="0 0 800 800"
        fill="none"
        aria-hidden="true"
      >
        <circle cx="400" cy="400" r="380" stroke="currentColor" strokeOpacity="0.05" strokeWidth="1" />
        <circle cx="440" cy="440" r="300" stroke="currentColor" strokeOpacity="0.06" strokeWidth="1" />
      </svg>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold leading-tight tracking-tight text-[#14140F] text-center mb-12 md:mb-16"
        >
          Everything You Need
          <br />
          to Thrive
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-5">
          <div className="grid grid-rows-2 gap-5">
            <motion.div
              {...cardMotion(active, 0)}
              className="bg-white/70 border border-[#14140F]/[0.06] rounded-[1.75rem] p-6 sm:p-7"
            >
              <div className="w-11 h-11 rounded-full bg-pink-500/15 flex items-center justify-center mb-5">
                <TargetIcon className="w-5 h-5 text-pink-500" />
              </div>
              <h3 className="text-lg font-bold text-[#14140F] mb-2">Share Your Journey</h3>
              <p className="text-[#6E6A5D] text-sm leading-relaxed">
                Post your workouts, photos and milestones. Like, comment and cheer friends on, and discover trending fitness content.
              </p>
            </motion.div>

            <motion.div
              {...cardMotion(active, 0.1)}
              className="bg-white/70 border border-[#14140F]/[0.06] rounded-[1.75rem] p-6 sm:p-7"
            >
              <div className="w-11 h-11 rounded-full bg-orange-500/15 flex items-center justify-center mb-5">
                <HeartIcon className="w-5 h-5 text-orange-500" />
              </div>
              <h3 className="text-lg font-bold text-[#14140F] mb-2">Earn While You Sweat</h3>
              <p className="text-[#6E6A5D] text-sm leading-relaxed">
                Earn points on every activity and redeem them for real fitness gear and vouchers, with bonus points for streaks and challenges.
              </p>
            </motion.div>
          </div>

          <motion.div
            {...cardMotion(active, 0.15)}
            className="bg-white/70 border border-[#14140F]/[0.06] rounded-[1.75rem] p-6 sm:p-7 flex flex-col"
          >
            <div className="w-11 h-11 rounded-full bg-emerald-500/15 flex items-center justify-center mb-5">
              <UsersIcon className="w-5 h-5 text-emerald-500" />
            </div>
            <h3 className="text-lg font-bold text-[#14140F] mb-2">Challenges &amp; Clubs</h3>
            <p className="text-[#6E6A5D] text-sm leading-relaxed mb-6">
              Take on weekly and monthly community challenges, climb the leaderboards, and join clubs built around the sports and people you love.
            </p>

            <div className="mt-auto space-y-3">
              {LOG_ENTRIES.map((entry) => (
                <div
                  key={entry.label}
                  className="flex items-center justify-between bg-white rounded-2xl px-4 py-3 shadow-sm border border-[#14140F]/5"
                >
                  <div className="flex items-center gap-2.5">
                    <span
                      className={`w-2 h-2 rounded-full ${
                        entry.tone === 'amber' ? 'bg-amber-400' : 'bg-primary'
                      }`}
                    />
                    <div>
                      <p className="text-sm font-semibold text-[#14140F] leading-none">{entry.label}</p>
                      <p className="text-xs text-[#8A8574] mt-1">{entry.status}</p>
                    </div>
                  </div>
                  <span className="w-6 h-6 rounded-full bg-primary/15 flex items-center justify-center text-[#14140F] text-sm font-bold">
                    {entry.tone === 'amber' ? '↗' : '✓'}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
