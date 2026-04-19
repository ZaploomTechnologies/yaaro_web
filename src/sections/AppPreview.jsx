import { motion } from 'framer-motion';
import {
  RunIcon,
  CycleIcon,
  DumbbellIcon,
  TrophyIcon,
  BottleIcon,
  WatchIcon,
  MapPinIcon,
  SmartphoneIcon,
  HeartIcon,
  MessageIcon,
  GpsIcon,
  BarChartIcon,
  BellIcon,
  MoonIcon,
} from '../components/Icons';

function ScreenCard({ title, TitleIcon, children, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
      className="relative"
    >
      {/* Phone Frame */}
      <div className="bg-surface-card border border-border rounded-[2.5rem] p-3 shadow-2xl mx-auto w-52">
        <div className="bg-surface-bg rounded-[2rem] overflow-hidden">
          {/* Notch */}
          <div className="flex justify-center pt-4 pb-2 px-4">
            <div className="w-16 h-4 bg-surface-card rounded-full" />
          </div>
          {/* Screen Content */}
          <div className="px-3 pb-4 min-h-72">
            <div className="flex items-center gap-2 mb-3">
              {TitleIcon && <TitleIcon className="w-4 h-4 text-primary" />}
              <span className="text-surface-text text-xs font-semibold">{title}</span>
            </div>
            {children}
          </div>
        </div>
      </div>
      <p className="text-center text-surface-secondary text-xs mt-3 font-medium">{title}</p>
    </motion.div>
  );
}

function ActivityScreen() {
  return (
    <>
      {/* Map placeholder */}
      <div className="bg-surface-card rounded-xl h-24 mb-3 relative overflow-hidden border border-border">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              'repeating-linear-gradient(0deg, transparent, transparent 10px, #363635 10px, #363635 11px), repeating-linear-gradient(90deg, transparent, transparent 10px, #363635 10px, #363635 11px)',
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
            <MapPinIcon className="w-4 h-4 text-primary-lowest" />
          </div>
        </div>
        {/* Route line */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 60">
          <path d="M 10 50 Q 30 20 50 30 Q 70 40 90 15" stroke="#D0EA59" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.7" />
        </svg>
      </div>

      <div className="grid grid-cols-2 gap-1.5 mb-2">
        {[
          { label: 'Distance', value: '5.2 km' },
          { label: 'Pace', value: '5:12/km' },
          { label: 'Time', value: '27:02' },
          { label: 'Calories', value: '318' },
        ].map((s) => (
          <div key={s.label} className="bg-surface-card rounded-lg p-2 border border-border text-center">
            <p className="text-primary font-bold text-xs">{s.value}</p>
            <p className="text-surface-secondary text-xs">{s.label}</p>
          </div>
        ))}
      </div>

      <button className="w-full bg-primary text-primary-lowest rounded-xl py-2 text-xs font-bold">
        Stop Run
      </button>
    </>
  );
}

function FeedScreen() {
  return (
    <div className="space-y-2">
      {[
        { user: 'Priya S.', Icon: CycleIcon, activity: 'Cycling • 18km', likes: 42, bg: 'bg-blue-900/40' },
        { user: 'Rahul M.', Icon: DumbbellIcon, activity: 'Gym • 45 min', likes: 28, bg: 'bg-purple-900/40' },
      ].map((post, i) => (
        <div key={i} className="bg-surface-card rounded-xl overflow-hidden border border-border">
          <div className={`h-14 ${post.bg} relative flex items-center px-3 gap-2`}>
            <post.Icon className="w-4 h-4 text-white/70" />
            <span className="text-white text-xs font-semibold">{post.activity}</span>
          </div>
          <div className="px-2.5 py-2 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center text-primary-lowest text-xs font-bold">
                {post.user[0]}
              </div>
              <span className="text-surface-text text-xs">{post.user}</span>
            </div>
            <div className="flex items-center gap-1 text-surface-secondary">
              <HeartIcon className="w-3.5 h-3.5" />
              <span className="text-xs">{post.likes}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function RewardsScreen() {
  return (
    <>
      {/* Points */}
      <div className="bg-gradient-to-r from-primary/20 to-primary/5 rounded-xl p-3 mb-3 text-center border border-primary/20">
        <div className="flex items-center justify-center gap-1.5 mb-0.5">
          <TrophyIcon className="w-4 h-4 text-primary" />
          <p className="text-surface-secondary text-xs">Total Points</p>
        </div>
        <p className="text-primary font-bold text-2xl">2,100</p>
        <p className="text-surface-secondary text-xs">Points</p>
      </div>

      {/* Reward items */}
      <div className="space-y-2">
        {[
          { Icon: BottleIcon, name: 'Protein Voucher', pts: '1,200 pts', status: 'REDEEM', statusColor: 'text-primary' },
          { Icon: WatchIcon, name: 'Fitness Band', pts: '3,500 pts', status: 'LOCKED', statusColor: 'text-surface-secondary' },
        ].map((r, i) => (
          <div key={i} className="flex items-center gap-2 bg-surface-card rounded-lg p-2 border border-border">
            <div className="w-7 h-7 rounded-lg bg-surface-bg border border-border flex items-center justify-center flex-shrink-0">
              <r.Icon className="w-4 h-4 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-surface-text text-xs font-medium truncate">{r.name}</p>
              <p className="text-surface-secondary text-xs">{r.pts}</p>
            </div>
            <span className={`text-xs font-bold ${r.statusColor}`}>{r.status}</span>
          </div>
        ))}
      </div>
    </>
  );
}

export default function AppPreview() {
  return (
    <section className="py-24 relative overflow-hidden" aria-label="App preview section">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block text-xs font-semibold text-primary bg-primary/10 border border-primary/20 px-4 py-1.5 rounded-full mb-4 tracking-wide uppercase">
            App Preview
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-surface-text mb-4">
            See It In{' '}
            <span className="text-gradient">Action</span>
          </h2>
          <p className="text-surface-secondary text-lg max-w-xl mx-auto">
            A seamless experience across every screen — built for real athletes.
          </p>
        </motion.div>

        {/* Phone Screens */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 items-end justify-items-center">
          <ScreenCard title="Activity Tracking" TitleIcon={RunIcon} delay={0}>
            <ActivityScreen />
          </ScreenCard>

          {/* Center featured phone */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="sm:-mt-12 relative"
          >
            <div className="absolute -inset-4 bg-primary/10 rounded-[3rem] blur-xl" />
            <div className="relative bg-surface-card border border-primary/30 rounded-[2.5rem] p-3 shadow-primary-glow mx-auto w-52">
              <div className="bg-surface-bg rounded-[2rem] overflow-hidden">
                <div className="flex justify-center pt-4 pb-2 px-4">
                  <div className="w-16 h-4 bg-surface-card rounded-full" />
                </div>
                <div className="px-3 pb-4 min-h-72">
                  <div className="flex items-center gap-2 mb-3">
                    <SmartphoneIcon className="w-4 h-4 text-primary" />
                    <span className="text-surface-text text-xs font-semibold">Social Feed</span>
                  </div>
                  <FeedScreen />
                </div>
              </div>
            </div>
            <p className="text-center text-primary text-xs mt-3 font-semibold">Social Feed</p>
          </motion.div>

          <ScreenCard title="Rewards" TitleIcon={TrophyIcon} delay={0.2}>
            <RewardsScreen />
          </ScreenCard>
        </div>

        {/* Feature highlights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { Icon: GpsIcon, label: 'Real-time GPS' },
            { Icon: BarChartIcon, label: 'Advanced Analytics' },
            { Icon: BellIcon, label: 'Smart Reminders' },
            { Icon: MoonIcon, label: 'Dark Mode' },
          ].map(({ Icon, label }, i) => (
            <div key={i} className="flex items-center gap-3 bg-surface-card border border-border rounded-xl px-4 py-3">
              <Icon className="w-5 h-5 text-primary flex-shrink-0" />
              <span className="text-surface-text text-sm font-medium">{label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
