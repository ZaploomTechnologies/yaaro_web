import { motion } from 'framer-motion';
import {
  TrophyIcon,
  FlameIcon,
  RunIcon,
  CycleIcon,
  FootprintIcon,
} from '../components/Icons';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.15, ease: 'easeOut' },
  }),
};

function StatBadge({ value, label }) {
  return (
    <div className="text-center">
      <p className="text-xl font-bold text-primary">{value}</p>
      <p className="text-xs text-surface-secondary">{label}</p>
    </div>
  );
}

function PhoneMockup() {
  return (
    <div className="relative w-64 mx-auto">
      {/* Phone Frame */}
      <div className="relative bg-surface-card border border-border rounded-[2.5rem] p-3 shadow-2xl">
        {/* Notch */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-20 h-5 bg-surface-bg rounded-full z-10" />

        {/* Screen */}
        <div className="bg-surface-bg rounded-[2rem] overflow-hidden h-[480px] relative">
          {/* Status bar */}
          <div className="flex items-center justify-between px-5 pt-7 pb-3">
            <span className="text-xs text-surface-secondary font-medium">9:41</span>
            <div className="flex gap-1.5">
              <div className="w-4 h-2 rounded-sm bg-primary" />
              <div className="w-1 h-2 rounded-sm bg-surface-secondary" />
            </div>
          </div>

          {/* App Header */}
          <div className="px-4 pb-4">
            <p className="text-surface-secondary text-xs mb-1">Good morning,</p>
            <p className="text-surface-text font-semibold text-base">Arjun</p>
          </div>

          {/* Activity Ring */}
          <div className="flex items-center justify-center mb-4">
            <div className="relative w-28 h-28">
              <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                <circle cx="50" cy="50" r="42" fill="none" stroke="#212121" strokeWidth="10" />
                <circle
                  cx="50" cy="50" r="42" fill="none" stroke="#D0EA59" strokeWidth="10"
                  strokeDasharray="264" strokeDashoffset="66"
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-primary font-bold text-lg">75%</span>
                <span className="text-surface-secondary text-xs">Daily Goal</span>
              </div>
            </div>
          </div>

          {/* Stat Pills */}
          <div className="flex gap-2 px-4 mb-4">
            {[
              { label: 'Steps', value: '7,524', Icon: FootprintIcon },
              { label: 'Calories', value: '320', Icon: FlameIcon },
            ].map((s) => (
              <div key={s.label} className="flex-1 bg-surface-card rounded-xl p-2.5 border border-border">
                <s.Icon className="w-4 h-4 text-primary mb-0.5" />
                <p className="text-surface-text font-semibold text-xs">{s.value}</p>
                <p className="text-surface-secondary text-xs">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Recent Activity */}
          <div className="px-4">
            <p className="text-surface-secondary text-xs mb-2 font-medium tracking-wide">RECENT ACTIVITY</p>
            {[
              { Icon: RunIcon, activity: 'Morning Run', distance: '5.2 km', time: '28 min' },
              { Icon: CycleIcon, activity: 'Evening Ride', distance: '12 km', time: '48 min' },
            ].map((a, i) => (
              <div key={i} className="flex items-center gap-2.5 mb-2 bg-surface-card rounded-xl p-2.5 border border-border">
                <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <a.Icon className="w-4 h-4 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-surface-text text-xs font-medium truncate">{a.activity}</p>
                  <p className="text-surface-secondary text-xs">{a.distance} • {a.time}</p>
                </div>
                <span className="text-primary text-xs font-semibold">+50pts</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating badge: points */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -left-10 top-24 bg-surface-card border border-primary/30 rounded-2xl px-3 py-2 shadow-primary-glow"
      >
        <p className="text-xs text-surface-secondary mb-0.5">Today's Points</p>
        <div className="flex items-center gap-1.5">
          <TrophyIcon className="w-4 h-4 text-primary" />
          <p className="text-primary font-bold text-sm">+125 pts</p>
        </div>
      </motion.div>

      {/* Floating badge: streak */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute -right-8 bottom-32 bg-surface-card border border-green-500/30 rounded-2xl px-3 py-2"
      >
        <p className="text-xs text-surface-secondary mb-0.5">Streak</p>
        <div className="flex items-center gap-1.5">
          <FlameIcon className="w-4 h-4 text-orange-400" />
          <p className="text-success font-bold text-sm">14 days</p>
        </div>
      </motion.div>
    </div>
  );
}

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-20 pb-16 overflow-hidden"
      aria-label="Hero section"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/3 rounded-full blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(#D0EA59 1px, transparent 1px), linear-gradient(90deg, #D0EA59 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text Content */}
          <div>
            {/* Badge */}
            <motion.div
              custom={0}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="inline-flex items-center gap-2 bg-primary/10 border border-primary/30 rounded-full px-4 py-2 mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse-slow" />
              <span className="text-primary text-xs font-semibold tracking-wide">
                Now available on iOS & Android
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              custom={1}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] mb-6"
            >
              Track.{' '}
              <span className="text-gradient">Share.</span>
              <br />
              Earn.{' '}
              <span className="text-gradient">Repeat.</span>
            </motion.h1>

            {/* Subtext */}
            <motion.p
              custom={2}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="text-surface-secondary text-lg leading-relaxed mb-8 max-w-lg"
            >
              Yaaro turns every workout into a rewarding experience. Track activities, share your
              journey with friends, earn real rewards, and build a fitness community that keeps you coming back.
            </motion.p>

            {/* CTAs */}
            <motion.div
              custom={3}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="flex flex-row flex-wrap items-center gap-4 mb-12"
            >
              {/* App Store */}
              <motion.a
                href="#"
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-3 bg-black border border-[#333] px-5 py-3.5 rounded-2xl shadow-lg hover:border-primary/40 transition-all duration-200"
              >
                <svg width="22" height="26" viewBox="0 0 20 24" fill="white" className="flex-shrink-0">
                  <path d="M16.462 12.482c-.028-3.21 2.618-4.76 2.738-4.835-1.493-2.183-3.815-2.482-4.641-2.513-1.974-.2-3.862 1.17-4.865 1.17-.999 0-2.541-1.143-4.181-1.112-2.147.033-4.133 1.252-5.237 3.167C-1.873 12.12.713 18.4 2.83 21.81c1.056 1.524 2.31 3.232 3.956 3.17 1.594-.065 2.193-1.024 4.117-1.024 1.924 0 2.473 1.024 4.15.99 1.714-.028 2.798-1.545 3.843-3.073a16.4 16.4 0 0 0 1.749-3.558c-.04-.016-3.35-1.283-3.383-5.833ZM13.23 3.387C14.1 2.327 14.69.938 14.524-.5c-1.193.05-2.64.797-3.491 1.835-.77.9-1.444 2.337-1.263 3.715 1.329.102 2.688-.67 3.46-1.663Z" />
                </svg>
                <div className="text-left">
                  <p className="text-[10px] text-gray-400 leading-none">Download on the</p>
                  <p className="text-sm font-bold text-white leading-tight">App Store</p>
                </div>
              </motion.a>

              {/* Google Play */}
              <motion.a
                href="#"
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-3 bg-black border border-[#333] px-5 py-3.5 rounded-2xl shadow-lg hover:border-primary/40 transition-all duration-200"
              >
                <svg width="22" height="24" viewBox="0 0 20 22" fill="none" className="flex-shrink-0">
                  <path d="M1.07.65C.67.87.4 1.3.4 1.85v18.3c0 .55.27.98.67 1.2l.1.06 10.25-10.25v-.24L1.17.59l-.1.06Z" fill="url(#hero-gp-a)" />
                  <path d="m14.83 14.57-3.41-3.42v-.24l3.41-3.42.08.04 4.04 2.3c1.15.65 1.15 1.72 0 2.38l-4.04 2.3-.08.06Z" fill="url(#hero-gp-b)" />
                  <path d="M14.91 14.51 11.42 11 1.07 21.35c.38.4.99.45 1.69.05l12.15-6.89" fill="url(#hero-gp-c)" />
                  <path d="M14.91 7.49 2.76.6C2.06.19 1.45.25 1.07.65L11.42 11l3.49-3.51Z" fill="url(#hero-gp-d)" />
                  <defs>
                    <linearGradient id="hero-gp-a" x1="10.64" y1="1.77" x2="-3.73" y2="16.14" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#00A0FF" /><stop offset="1" stopColor="#00F" stopOpacity="0" />
                    </linearGradient>
                    <linearGradient id="hero-gp-b" x1="20.3" y1="11" x2="9.76" y2="11" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#FFD900" /><stop offset="1" stopColor="#FF9100" />
                    </linearGradient>
                    <linearGradient id="hero-gp-c" x1="12.67" y1="12.83" x2="-2.83" y2="28.33" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#FF3A44" /><stop offset="1" stopColor="#C31162" />
                    </linearGradient>
                    <linearGradient id="hero-gp-d" x1="-1.07" y1="-3.82" x2="6.62" y2="3.87" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#32A071" /><stop offset="1" stopColor="#2DA771" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="text-left">
                  <p className="text-[10px] text-gray-400 leading-none">GET IT ON</p>
                  <p className="text-sm font-bold text-white leading-tight">Google Play</p>
                </div>
              </motion.a>
            </motion.div>

            {/* Stats */}
            <motion.div
              custom={4}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="flex items-center gap-8 pt-8 border-t border-border"
            >
              <StatBadge value="50K+" label="Active Users" />
              <div className="w-px h-10 bg-border" />
              <StatBadge value="5M+" label="Activities Logged" />
              <div className="w-px h-10 bg-border" />
              <StatBadge value="10K+" label="Rewards Redeemed" />
            </motion.div>
          </div>

          {/* Right: Phone Mockup */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
            className="relative hidden lg:flex justify-center items-center"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-64 h-64 bg-primary/20 rounded-full blur-3xl" />
            </div>
            <PhoneMockup />
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-surface-secondary text-xs tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-5 h-8 rounded-full border border-border flex items-start justify-center pt-1.5"
        >
          <div className="w-1 h-2 rounded-full bg-primary" />
        </motion.div>
      </motion.div>
    </section>
  );
}
