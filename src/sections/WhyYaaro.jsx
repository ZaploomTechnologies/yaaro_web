import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ICONS, StarIcon } from '../components/Icons';
import { WHY_YAARO } from '../constants';

/* ─── Stay Consistent modal data ───────────────────────────────────── */
const streakDays = [
  { day: 'M', done: true }, { day: 'T', done: true }, { day: 'W', done: true },
  { day: 'T', done: true }, { day: 'F', done: true }, { day: 'S', done: false },
  { day: 'S', done: false },
];

const consistencyFeatures = [
  { label: 'Streak Tracking', desc: 'See your unbroken chain grow day by day' },
  { label: 'Smart Daily Reminders', desc: 'Nudges at the exact moment you need them' },
  { label: 'Habit Loop Engine', desc: 'Cue → action → reward, wired for you' },
  { label: 'Weekly Report Cards', desc: 'Know exactly where you showed up' },
];

/* ─── Earn Rewards modal data ───────────────────────────────────────── */
const recentEarnings = [
  { label: 'Morning Run · 5 km', pts: '+50 pts', color: 'bg-orange-500' },
  { label: 'Strength Session', pts: '+30 pts', color: 'bg-purple-500' },
  { label: '7-Day Streak Bonus', pts: '+100 pts', color: 'bg-amber-500' },
  { label: 'Community Challenge', pts: '+75 pts', color: 'bg-emerald-500' },
];

const rewardsFeatures = [
  { label: 'Points Per Activity', desc: 'Every workout adds to your balance' },
  { label: 'Real Gear Redemptions', desc: 'Shoes, bands, apparel — yours to claim' },
  { label: 'Partner Vouchers', desc: 'Discounts from brands you already love' },
  { label: 'Bonus Challenges', desc: 'Double points on special events' },
];

/* ─── Track Progress modal data ─────────────────────────────────────── */
const weeklyBars = [
  { day: 'Mon', km: 5.2, pct: 69 },
  { day: 'Tue', km: 3.8, pct: 51 },
  { day: 'Wed', km: 7.5, pct: 100 },
  { day: 'Thu', km: 6.1, pct: 81 },
  { day: 'Fri', km: 4.4, pct: 59 },
  { day: 'Sat', km: 2.0, pct: 27 },
  { day: 'Sun', km: 0,   pct: 0  },
];

const progressFeatures = [
  { label: 'Heart Rate Zones', desc: 'Train in the zone that actually moves the needle' },
  { label: 'Pace & Split Analysis', desc: 'Know which km slowed you down' },
  { label: 'Body Metrics Over Time', desc: 'Weight, VO₂ max, resting HR — all tracked' },
  { label: 'Performance Trends', desc: 'Weekly and monthly charts you can act on' },
];

/* ─── Shared helpers ─────────────────────────────────────────────────── */
const communityFeatures = [
  { label: 'Follow Other Athletes', desc: 'Discover people who push your limits' },
  { label: 'Like & Comment on Workouts', desc: 'Celebrate every rep, every mile' },
  { label: 'Save Athlete Routines', desc: 'Steal the best plans from the best people' },
  { label: 'Stay Accountable', desc: 'Your crew keeps you from skipping leg day' },
];

const mockFeed = [
  { initials: 'LD', name: 'LukeD', comment: 'Great session, @Priya! Your progress is fire 🔥', color: 'bg-blue-500' },
  { initials: 'OB', name: 'OliviaB', comment: 'Keep going, @Priya! Form is looking solid 💪💯', color: 'bg-rose-500' },
];

function ConsistencyModal({ onClose }) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      <motion.div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      <motion.div
        className="relative z-10 w-full max-w-3xl rounded-3xl overflow-hidden"
        style={{ background: '#171717', border: '1px solid rgba(208,234,89,0.15)' }}
        initial={{ scale: 0.85, opacity: 0, rotateY: -15 }}
        animate={{ scale: 1, opacity: 1, rotateY: 0 }}
        exit={{ scale: 0.85, opacity: 0, rotateY: 15 }}
        transition={{ type: 'spring', stiffness: 260, damping: 22 }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full flex items-center justify-center text-[#F2F2F2]/50 hover:text-[#F2F2F2] hover:bg-white/10 transition-all duration-200"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M12 4L4 12M4 4l8 8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left — streak visual */}
          <div className="p-8 flex flex-col gap-5" style={{ background: '#1E1E1E', borderRight: '1px solid rgba(255,255,255,0.06)' }}>
            <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: '#D0EA59' }}>
              This Week
            </p>

            {/* Day rings */}
            <div className="flex items-center justify-between">
              {streakDays.map((d, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.07 }}
                  className="flex flex-col items-center gap-1.5"
                >
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold"
                    style={{
                      background: d.done ? '#D0EA59' : '#252525',
                      color: d.done ? '#0F0F0F' : '#555',
                      border: d.done ? 'none' : '1px solid #333',
                    }}
                  >
                    {d.done ? (
                      <svg width="14" height="11" viewBox="0 0 14 11" fill="none">
                        <path d="M1 5.5l3.5 3.5L13 1" stroke="#0F0F0F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    ) : d.day}
                  </div>
                  <span className="text-[10px]" style={{ color: '#555' }}>{d.day}</span>
                </motion.div>
              ))}
            </div>

            {/* Streak badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, type: 'spring', stiffness: 220, damping: 18 }}
              className="flex items-center gap-4 p-4 rounded-2xl"
              style={{ background: 'rgba(208,234,89,0.08)', border: '1px solid rgba(208,234,89,0.2)' }}
            >
              <div className="text-3xl">🔥</div>
              <div>
                <p className="text-2xl font-bold" style={{ color: '#D0EA59' }}>18-Day Streak</p>
                <p className="text-xs" style={{ color: '#666' }}>Personal best: 23 days</p>
              </div>
            </motion.div>

            {/* Reminder preview */}
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.65, type: 'spring', stiffness: 200, damping: 20 }}
              className="flex items-center gap-3 p-3 rounded-xl"
              style={{ background: '#252525' }}
            >
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-base flex-shrink-0" style={{ background: '#2a2a2a' }}>⏰</div>
              <div>
                <p className="text-xs font-semibold" style={{ color: '#F2F2F2' }}>Daily reminder · 7:00 AM</p>
                <p className="text-xs" style={{ color: '#888' }}>"Your streak is waiting. Don't break it!"</p>
              </div>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.75 }}
              className="flex gap-4 mt-auto"
            >
              {[['87%', 'Stay consistent'], ['3.2×', 'More likely to hit goals'], ['21 days', 'Avg habit formed']].map(([val, lbl], i) => (
                <div key={i} className="text-center">
                  <p className="text-lg font-bold" style={{ color: '#D0EA59' }}>{val}</p>
                  <p className="text-[10px]" style={{ color: '#666' }}>{lbl}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — content */}
          <div className="p-8 flex flex-col justify-center gap-6">
            <div>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="inline-block text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-4"
                style={{ background: 'rgba(208,234,89,0.1)', color: '#D0EA59', border: '1px solid rgba(208,234,89,0.2)' }}
              >
                Stay Consistent
              </motion.span>
              <motion.h3
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.18 }}
                className="text-2xl sm:text-3xl font-bold mb-3 leading-tight"
                style={{ color: '#F2F2F2' }}
              >
                Show Up.{' '}
                <span style={{ color: '#D0EA59' }}>Every Single Day.</span>
              </motion.h3>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.26 }}
                className="text-sm leading-relaxed"
                style={{ color: '#888' }}
              >
                The secret to results isn't motivation — it's consistency. Yaaro builds the habits and loops that keep you coming back, no matter what.
              </motion.p>
            </div>

            <ul className="flex flex-col gap-3">
              {consistencyFeatures.map((f, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.32 + i * 0.08, type: 'spring', stiffness: 200, damping: 22 }}
                  className="flex items-start gap-3"
                >
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ background: '#D0EA59' }}
                  >
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                      <path d="M1 4l2.5 2.5L9 1" stroke="#0F0F0F" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold" style={{ color: '#F2F2F2' }}>{f.label}</p>
                    <p className="text-xs" style={{ color: '#666' }}>{f.desc}</p>
                  </div>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function EarnRewardsModal({ onClose }) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      <motion.div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      <motion.div
        className="relative z-10 w-full max-w-3xl rounded-3xl overflow-hidden"
        style={{ background: '#171717', border: '1px solid rgba(208,234,89,0.15)' }}
        initial={{ scale: 0.85, opacity: 0, rotateY: -15 }}
        animate={{ scale: 1, opacity: 1, rotateY: 0 }}
        exit={{ scale: 0.85, opacity: 0, rotateY: 15 }}
        transition={{ type: 'spring', stiffness: 260, damping: 22 }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full flex items-center justify-center text-[#F2F2F2]/50 hover:text-[#F2F2F2] hover:bg-white/10 transition-all duration-200"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M12 4L4 12M4 4l8 8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left — wallet + earnings */}
          <div className="p-8 flex flex-col gap-5" style={{ background: '#1E1E1E', borderRight: '1px solid rgba(255,255,255,0.06)' }}>
            <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: '#D0EA59' }}>
              Your Wallet
            </p>

            {/* Balance card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.15, type: 'spring', stiffness: 220, damping: 18 }}
              className="p-4 rounded-2xl flex items-center justify-between"
              style={{ background: 'rgba(208,234,89,0.08)', border: '1px solid rgba(208,234,89,0.2)' }}
            >
              <div>
                <p className="text-xs" style={{ color: '#888' }}>Total Balance</p>
                <p className="text-3xl font-bold" style={{ color: '#D0EA59' }}>2,450 pts</p>
              </div>
              <div className="text-3xl">🏆</div>
            </motion.div>

            {/* Recent earnings */}
            <div className="flex flex-col gap-2">
              <p className="text-[10px] font-semibold uppercase tracking-widest" style={{ color: '#555' }}>Recent Earnings</p>
              {recentEarnings.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.25 + i * 0.1, type: 'spring', stiffness: 200, damping: 20 }}
                  className="flex items-center justify-between p-2.5 rounded-xl"
                  style={{ background: '#252525' }}
                >
                  <div className="flex items-center gap-2.5">
                    <div className={`w-2 h-2 rounded-full flex-shrink-0 ${item.color}`} />
                    <span className="text-xs" style={{ color: '#F2F2F2' }}>{item.label}</span>
                  </div>
                  <span className="text-xs font-bold" style={{ color: '#D0EA59' }}>{item.pts}</span>
                </motion.div>
              ))}
            </div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.75 }}
              className="flex gap-4 mt-auto"
            >
              {[['10K+', 'Rewards redeemed'], ['₹500', 'Avg monthly value'], ['30+', 'Brand partners']].map(([val, lbl], i) => (
                <div key={i} className="text-center">
                  <p className="text-lg font-bold" style={{ color: '#D0EA59' }}>{val}</p>
                  <p className="text-[10px]" style={{ color: '#666' }}>{lbl}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — content */}
          <div className="p-8 flex flex-col justify-center gap-6">
            <div>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="inline-block text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-4"
                style={{ background: 'rgba(208,234,89,0.1)', color: '#D0EA59', border: '1px solid rgba(208,234,89,0.2)' }}
              >
                Earn Rewards
              </motion.span>
              <motion.h3
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.18 }}
                className="text-2xl sm:text-3xl font-bold mb-3 leading-tight"
                style={{ color: '#F2F2F2' }}
              >
                Sweat More,{' '}
                <span style={{ color: '#D0EA59' }}>Earn More.</span>
              </motion.h3>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.26 }}
                className="text-sm leading-relaxed"
                style={{ color: '#888' }}
              >
                Every workout you log turns into real value. Redeem your points for gear, supplements, and vouchers from brands that fuel your grind.
              </motion.p>
            </div>

            <ul className="flex flex-col gap-3">
              {rewardsFeatures.map((f, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.32 + i * 0.08, type: 'spring', stiffness: 200, damping: 22 }}
                  className="flex items-start gap-3"
                >
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ background: '#D0EA59' }}
                  >
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                      <path d="M1 4l2.5 2.5L9 1" stroke="#0F0F0F" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold" style={{ color: '#F2F2F2' }}>{f.label}</p>
                    <p className="text-xs" style={{ color: '#666' }}>{f.desc}</p>
                  </div>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function TrackProgressModal({ onClose }) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      <motion.div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      <motion.div
        className="relative z-10 w-full max-w-3xl rounded-3xl overflow-hidden"
        style={{ background: '#171717', border: '1px solid rgba(208,234,89,0.15)' }}
        initial={{ scale: 0.85, opacity: 0, rotateY: -15 }}
        animate={{ scale: 1, opacity: 1, rotateY: 0 }}
        exit={{ scale: 0.85, opacity: 0, rotateY: 15 }}
        transition={{ type: 'spring', stiffness: 260, damping: 22 }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full flex items-center justify-center text-[#F2F2F2]/50 hover:text-[#F2F2F2] hover:bg-white/10 transition-all duration-200"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M12 4L4 12M4 4l8 8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left — analytics chart */}
          <div className="p-8 flex flex-col gap-5" style={{ background: '#1E1E1E', borderRight: '1px solid rgba(255,255,255,0.06)' }}>
            <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: '#D0EA59' }}>
              Weekly Distance
            </p>

            {/* Bar chart */}
            <div className="flex items-end gap-2 h-28">
              {weeklyBars.map((b, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <motion.div
                    className="w-full rounded-t-md"
                    style={{ background: b.pct > 0 ? (b.pct === 100 ? '#D0EA59' : 'rgba(208,234,89,0.4)') : '#252525' }}
                    initial={{ height: 0 }}
                    animate={{ height: `${Math.max(b.pct, 8)}%` }}
                    transition={{ delay: 0.15 + i * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  />
                  <span className="text-[9px]" style={{ color: '#555' }}>{b.day}</span>
                </div>
              ))}
            </div>

            {/* Metric chips */}
            <div className="grid grid-cols-3 gap-2">
              {[
                { label: 'Distance', value: '34.5 km', icon: '🏃' },
                { label: 'Calories', value: '2,840', icon: '🔥' },
                { label: 'Active min', value: '318', icon: '⚡' },
              ].map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + i * 0.09 }}
                  className="p-2.5 rounded-xl text-center"
                  style={{ background: '#252525' }}
                >
                  <p className="text-base mb-0.5">{m.icon}</p>
                  <p className="text-xs font-bold" style={{ color: '#F2F2F2' }}>{m.value}</p>
                  <p className="text-[10px]" style={{ color: '#666' }}>{m.label}</p>
                </motion.div>
              ))}
            </div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.75 }}
              className="flex gap-4 mt-auto"
            >
              {[['5M+', 'Activities logged'], ['12+', 'Tracked metrics'], ['↑18%', 'Avg improvement']].map(([val, lbl], i) => (
                <div key={i} className="text-center">
                  <p className="text-lg font-bold" style={{ color: '#D0EA59' }}>{val}</p>
                  <p className="text-[10px]" style={{ color: '#666' }}>{lbl}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — content */}
          <div className="p-8 flex flex-col justify-center gap-6">
            <div>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="inline-block text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-4"
                style={{ background: 'rgba(208,234,89,0.1)', color: '#D0EA59', border: '1px solid rgba(208,234,89,0.2)' }}
              >
                Track Progress
              </motion.span>
              <motion.h3
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.18 }}
                className="text-2xl sm:text-3xl font-bold mb-3 leading-tight"
                style={{ color: '#F2F2F2' }}
              >
                Data That{' '}
                <span style={{ color: '#D0EA59' }}>Drives Results.</span>
              </motion.h3>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.26 }}
                className="text-sm leading-relaxed"
                style={{ color: '#888' }}
              >
                Stop guessing, start knowing. Yaaro's analytics turn raw activity into clear insights — so every session is smarter than the last.
              </motion.p>
            </div>

            <ul className="flex flex-col gap-3">
              {progressFeatures.map((f, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.32 + i * 0.08, type: 'spring', stiffness: 200, damping: 22 }}
                  className="flex items-start gap-3"
                >
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ background: '#D0EA59' }}
                  >
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                      <path d="M1 4l2.5 2.5L9 1" stroke="#0F0F0F" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold" style={{ color: '#F2F2F2' }}>{f.label}</p>
                    <p className="text-xs" style={{ color: '#666' }}>{f.desc}</p>
                  </div>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function CommunityModal({ onClose }) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      {/* Modal panel */}
      <motion.div
        className="relative z-10 w-full max-w-3xl rounded-3xl overflow-hidden"
        style={{ background: '#171717', border: '1px solid rgba(208,234,89,0.15)' }}
        initial={{ scale: 0.85, opacity: 0, rotateY: -15 }}
        animate={{ scale: 1, opacity: 1, rotateY: 0 }}
        exit={{ scale: 0.85, opacity: 0, rotateY: 15 }}
        transition={{ type: 'spring', stiffness: 260, damping: 22 }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full flex items-center justify-center text-[#F2F2F2]/50 hover:text-[#F2F2F2] hover:bg-white/10 transition-all duration-200"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M12 4L4 12M4 4l8 8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left — social mockup */}
          <div className="p-8 flex flex-col gap-5" style={{ background: '#1E1E1E', borderRight: '1px solid rgba(255,255,255,0.06)' }}>
            <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: '#D0EA59' }}>
              Live Feed
            </p>

            {/* Avatars row */}
            <div className="flex items-center gap-3">
              {['PR', 'LD', 'OB', 'KS', '+'].map((a, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.07 }}
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold text-white ring-2 ${
                    i === 0 ? 'ring-[#D0EA59]' : 'ring-[#2a2a2a]'
                  } ${['bg-violet-500', 'bg-blue-500', 'bg-rose-500', 'bg-amber-500', 'bg-[#2a2a2a]'][i]}`}
                >
                  {a}
                </motion.div>
              ))}
            </div>

            {/* Comment cards */}
            <div className="flex flex-col gap-3">
              {mockFeed.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.12, type: 'spring', stiffness: 200, damping: 20 }}
                  className="flex items-start gap-3 p-3 rounded-xl"
                  style={{ background: '#252525' }}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0 ${item.color}`}>
                    {item.initials}
                  </div>
                  <div>
                    <span className="text-xs font-semibold" style={{ color: '#F2F2F2' }}>{item.name} </span>
                    <span className="text-xs" style={{ color: '#888' }}>{item.comment}</span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex gap-4 mt-auto"
            >
              {[['50K+', 'Members'], ['12K+', 'Posts/day'], ['98%', 'Come back']].map(([val, lbl], i) => (
                <div key={i} className="text-center">
                  <p className="text-lg font-bold" style={{ color: '#D0EA59' }}>{val}</p>
                  <p className="text-[10px]" style={{ color: '#666' }}>{lbl}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — content */}
          <div className="p-8 flex flex-col justify-center gap-6">
            <div>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="inline-block text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-4"
                style={{ background: 'rgba(208,234,89,0.1)', color: '#D0EA59', border: '1px solid rgba(208,234,89,0.2)' }}
              >
                Build Community
              </motion.span>
              <motion.h3
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.18 }}
                className="text-2xl sm:text-3xl font-bold mb-3 leading-tight"
                style={{ color: '#F2F2F2' }}
              >
                Train Together,{' '}
                <span style={{ color: '#D0EA59' }}>Grow Together</span>
              </motion.h3>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.26 }}
                className="text-sm leading-relaxed"
                style={{ color: '#888' }}
              >
                Fitness is better with people who get it. Yaaro's community keeps you motivated, accountable, and celebrated every step of the way.
              </motion.p>
            </div>

            <ul className="flex flex-col gap-3">
              {communityFeatures.map((f, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.32 + i * 0.08, type: 'spring', stiffness: 200, damping: 22 }}
                  className="flex items-start gap-3"
                >
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ background: '#D0EA59' }}
                  >
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                      <path d="M1 4l2.5 2.5L9 1" stroke="#0F0F0F" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold" style={{ color: '#F2F2F2' }}>{f.label}</p>
                    <p className="text-xs" style={{ color: '#666' }}>{f.desc}</p>
                  </div>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function WhyYaaro() {
  const [communityOpen, setCommunityOpen] = useState(false);
  const [consistencyOpen, setConsistencyOpen] = useState(false);
  const [rewardsOpen, setRewardsOpen] = useState(false);
  const [progressOpen, setProgressOpen] = useState(false);

  return (
    <section id="why-yaaro" className="py-12 md:py-24 relative" aria-label="Why Yaaro section">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-64 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-8 md:mb-16"
        >
          <span className="inline-block text-xs font-semibold text-primary bg-primary/10 border border-primary/20 px-4 py-1.5 rounded-full mb-4 tracking-wide uppercase">
            Why Yaaro
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-surface-text mb-4">
            Built for People Who{' '}
            <span className="text-gradient">Actually Train</span>
          </h2>
          <p className="text-surface-secondary text-lg max-w-xl mx-auto">
            We built Yaaro because fitness is better when it's social, consistent, and rewarding.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {WHY_YAARO.map((item, index) => {
            const IconComponent = ICONS[item.icon];
            const modalOpener = {
              'Stay Consistent': () => setConsistencyOpen(true),
              'Earn Rewards':    () => setRewardsOpen(true),
              'Build Community': () => setCommunityOpen(true),
              'Track Progress':  () => setProgressOpen(true),
            }[item.title];

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.03, y: -4 }}
                onClick={modalOpener}
                className="relative group overflow-hidden rounded-2xl cursor-pointer h-72 select-none"
              >
                {/* Background Image */}
                <div className="absolute inset-0">
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>

                {/* Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-t ${item.color} via-black/40 to-transparent`} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                {/* Glow ring on hover */}
                <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10 group-hover:ring-primary/40 transition-all duration-300" />

                {/* Content */}
                <div className="absolute inset-0 p-5 flex flex-col justify-between">
                  {/* Top: Icon + Stat */}
                  <div className="flex items-start justify-between">
                    <div className="w-11 h-11 rounded-xl bg-white/15 backdrop-blur-sm flex items-center justify-center border border-white/20">
                      {IconComponent && <IconComponent className="w-6 h-6 text-white" />}
                    </div>
                    <span className="bg-black/40 backdrop-blur-sm text-white text-xs font-medium px-3 py-1.5 rounded-full border border-white/10">
                      {item.stat}
                    </span>
                  </div>

                  {/* Bottom: Title + Description + CTA */}
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-1">{item.title}</h3>
                    <p className="text-white/70 text-sm leading-relaxed">{item.description}</p>
                    <div className="mt-3 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                      <span className="inline-flex items-center gap-1.5 text-primary text-sm font-semibold">
                        Tap to explore
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Trust indicators */}
        {/* TODO: uncomment when stats are finalized */}
        {/* <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 flex flex-wrap items-center justify-center gap-8"
        >
          {[
            { value: '4.8', label: 'App Store Rating' },
            { value: '4.7', label: 'Play Store Rating' },
            { value: '50K+', label: 'Active Users' },
            { value: '#1', label: 'Fitness App India' },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="flex items-center justify-center gap-1 mb-0.5">
                <p className="text-2xl font-bold text-primary">{stat.value}</p>
                {i < 2 && <StarIcon className="w-5 h-5 text-primary" />}
              </div>
              <p className="text-surface-secondary text-xs">{stat.label}</p>
            </div>
          ))}
        </motion.div> */}
      </div>

      {/* Modals */}
      <AnimatePresence>
        {consistencyOpen && <ConsistencyModal onClose={() => setConsistencyOpen(false)} />}
      </AnimatePresence>
      <AnimatePresence>
        {rewardsOpen && <EarnRewardsModal onClose={() => setRewardsOpen(false)} />}
      </AnimatePresence>
      <AnimatePresence>
        {communityOpen && <CommunityModal onClose={() => setCommunityOpen(false)} />}
      </AnimatePresence>
      <AnimatePresence>
        {progressOpen && <TrackProgressModal onClose={() => setProgressOpen(false)} />}
      </AnimatePresence>
    </section>
  );
}
