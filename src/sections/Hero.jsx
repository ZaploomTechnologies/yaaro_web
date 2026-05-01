import { motion } from 'framer-motion';
import {
  TrophyIcon,
  FlameIcon,
  RunIcon,
  CycleIcon,
  WalkIcon,
  DumbbellIcon,
  DanceIcon,
  UsersIcon,
  PlayStoreIcon,
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

const RECORD_SECTIONS = [
  {
    title: 'Strength',
    items: [
      { Icon: DumbbellIcon, name: 'Quick Workout', desc: 'Log exercises with sets, reps, and weights.' },
    ],
  },
  {
    title: 'Cardio',
    items: [
      { Icon: WalkIcon,     name: 'Walk',    desc: 'Track your steps and distance with GPS.' },
      { Icon: RunIcon,      name: 'Run',     desc: 'Monitor your pace, distance, and route.' },
      { Icon: CycleIcon,    name: 'Cycling', desc: 'Record your ride speed and distance.' },
      { Icon: DanceIcon,    name: 'Dance',   desc: 'Record your dance duration.' },
    ],
  },
];

function ChevronRight() {
  return (
    <svg className="w-3 h-3 text-surface-secondary flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 18l6-6-6-6" />
    </svg>
  );
}

function PhoneMockup() {
  return (
    <div className="relative mx-auto" style={{ width: 260 }}>
      {/* Phone Frame */}
      <div className="relative bg-[#212121] rounded-[2.5rem] p-[10px] shadow-2xl ring-1 ring-white/10">
        {/* Notch */}
        <div className="absolute top-[14px] left-1/2 -translate-x-1/2 w-[72px] h-[22px] bg-[#212121] rounded-full z-10 flex items-center justify-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-[#1a1a1a]" />
          <div className="w-1.5 h-1.5 rounded-full bg-[#1a1a1a]" />
        </div>

        {/* Screen */}
        <div className="bg-[#0f0f0f] rounded-[2rem] overflow-hidden h-[500px] relative flex flex-col">

          {/* Status bar */}
          <div className="flex items-center justify-between px-5 pt-8 pb-2 flex-shrink-0">
            <span className="text-white text-[10px] font-semibold">9:41</span>
            <div className="flex items-center gap-1">
              <div className="flex gap-0.5 items-end h-3">
                <div className="w-1 h-1 bg-white rounded-sm" />
                <div className="w-1 h-1.5 bg-white rounded-sm" />
                <div className="w-1 h-2 bg-white rounded-sm" />
                <div className="w-1 h-2.5 bg-white/40 rounded-sm" />
              </div>
              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M1.5 8.5C5.5 4.5 18.5 4.5 22.5 8.5L20.5 10.5C17.5 7.5 6.5 7.5 3.5 10.5L1.5 8.5ZM5.5 12.5C8 10 16 10 18.5 12.5L16.5 14.5C15 13 9 13 7.5 14.5L5.5 12.5ZM9.5 16.5C10.8 15.2 13.2 15.2 14.5 16.5L12 19L9.5 16.5Z" />
              </svg>
              <div className="w-5 h-2.5 border border-white/50 rounded-sm flex items-center px-0.5">
                <div className="w-3 h-1.5 bg-white rounded-sm" />
              </div>
            </div>
          </div>

          {/* Page title */}
          <div className="px-4 pb-2 flex-shrink-0">
            <h2 className="text-surface-text font-bold text-lg">Record</h2>
          </div>

          {/* Scrollable workout list */}
          <div className="flex-1 overflow-y-auto px-3 space-y-3 pb-2" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            {RECORD_SECTIONS.map((section) => (
              <div key={section.title}>
                <p className="text-surface-secondary text-[10px] font-medium mb-1.5 px-1">{section.title}</p>
                <div className="space-y-1.5">
                  {section.items.map((item) => (
                    <div key={item.name} className="flex items-center gap-2.5 bg-surface-card rounded-2xl px-3 py-3 border border-border">
                      <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <item.Icon className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-surface-text font-semibold text-xs leading-tight">{item.name}</p>
                        <p className="text-surface-secondary text-[10px] leading-snug mt-0.5">{item.desc}</p>
                      </div>
                      <ChevronRight />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Bottom nav */}
          <div className="flex-shrink-0 relative h-[52px]">
            {/* SVG nav background with smooth arch notch for FAB */}
            <svg
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 220 52"
              preserveAspectRatio="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M0 0 L84 0 A27 27 0 0 1 136 0 L220 0 L220 52 L0 52 Z" fill="#0F0F0F" />
              <path d="M0 0.5 L84 0.5 A27 27 0 0 1 136 0.5 L220 0.5" stroke="#363635" strokeWidth="1" fill="none" />
            </svg>

            {/* Feed / Social / Rewards / Profile */}
            <div className="absolute inset-0 z-10 flex items-end justify-around px-2 pb-1.5">
              <div className="flex flex-col items-center gap-0.5">
                <svg className="w-4 h-4 text-surface-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round">
                  <path d="M4 6h16M4 10h16M4 14h10" />
                </svg>
                <span className="text-[8px] text-surface-secondary">Feed</span>
              </div>
              <div className="flex flex-col items-center gap-0.5">
                <UsersIcon className="w-4 h-4 text-surface-secondary" />
                <span className="text-[8px] text-surface-secondary">Social</span>
              </div>
              {/* Spacer for FAB */}
              <div className="w-10" />
              <div className="flex flex-col items-center gap-0.5">
                <TrophyIcon className="w-4 h-4 text-surface-secondary" />
                <span className="text-[8px] text-surface-secondary">Rewards</span>
              </div>
              <div className="flex flex-col items-center gap-0.5">
                <svg className="w-4 h-4 text-surface-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                <span className="text-[8px] text-surface-secondary">Profile</span>
              </div>
            </div>

            {/* Record FAB — sits half above the nav bar edge, inside the arch */}
            <div className="absolute -top-5 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shadow-lg">
                <svg className="w-3.5 h-3.5 text-black" viewBox="0 0 24 24" fill="currentColor">
                  <circle cx="12" cy="12" r="5" />
                </svg>
              </div>
              <span className="text-[8px] text-primary font-semibold mt-0.5">Record</span>
            </div>
          </div>
        </div>
      </div>

      {/* Side buttons */}
      <div className="absolute right-0 top-20 w-1 h-10 bg-[#333] rounded-l-sm" />
      <div className="absolute left-0 top-16 w-1 h-7 bg-[#333] rounded-r-sm" />
      <div className="absolute left-0 top-28 w-1 h-12 bg-[#333] rounded-r-sm" />
      <div className="absolute left-0 top-44 w-1 h-12 bg-[#333] rounded-r-sm" />

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
      className="relative min-h-screen flex items-center pt-20 md:pt-32 lg:pt-40 pb-10 md:pb-16 overflow-hidden"
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

              <motion.a
                href="#"
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-3 bg-black border border-[#333] px-5 py-3.5 rounded-2xl shadow-lg hover:border-primary/40 transition-all duration-200"
              >
                <PlayStoreIcon className="w-[22px] h-[24px]" />
                <div className="text-left">
                  <p className="text-[10px] text-gray-400 leading-none">GET IT ON</p>
                  <p className="text-sm font-bold text-white leading-tight">Google Play</p>
                </div>
              </motion.a>
            </motion.div>

            {/* Stats */}
            {/* <motion.div */}
              {/* custom={4} */}
              {/* variants={fadeUp} */}
              {/* initial="hidden" */}
              {/* animate="visible" */}
              {/* className="flex items-center gap-8 pt-8 border-t border-border" */}
            {/* > */}
              {/* TODO: uncomment when stats are finalized */}
              {/* <StatBadge value="50K+" label="Active Users" />
              <div className="w-px h-10 bg-border" />
              <StatBadge value="5M+" label="Activities Logged" />
              <div className="w-px h-10 bg-border" />
              <StatBadge value="10K+" label="Rewards Redeemed" /> */}
            {/* </motion.div> */}
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
