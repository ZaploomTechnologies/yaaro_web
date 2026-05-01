import { motion } from 'framer-motion';
import { ICONS, TrophyIcon } from '../components/Icons';
import { FEATURES, REWARDS_POINTS, REWARD_ITEMS, CHALLENGES, CLUBS, FEED_POSTS } from '../constants';

const TAB_ACTIVE_MAP = {
  feeds: 'Feed',
  rewards: 'Rewards',
  challenges: 'Social',
  clubs: 'Social',
};

function PhoneMockup({ children, activeTab = 'Feed' }) {
  const tabs = [
    {
      id: 'Feed',
      label: 'Feed',
      icon: (
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round">
          <path d="M4 6h16M4 10h16M4 14h10" />
        </svg>
      ),
    },
    {
      id: 'Social',
      label: 'Social',
      icon: (
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
    },
    {
      id: 'Rewards',
      label: 'Rewards',
      icon: (
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 9H3.5a2 2 0 0 0 0 4H6M18 9h2.5a2 2 0 0 1 0 4H18M4 3h16v7a8 8 0 0 1-16 0V3zM12 21v-5M8 21h8" />
        </svg>
      ),
    },
    {
      id: 'Profile',
      label: 'Profile',
      icon: (
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
        </svg>
      ),
    },
  ];

  // Split tabs around the center FAB
  const leftTabs = tabs.slice(0, 2);
  const rightTabs = tabs.slice(2);

  return (
    <div className="relative" style={{ width: 260 }}>
      {/* Phone outer frame */}
      <div className="relative bg-[#212121] rounded-[2.5rem] p-[10px] shadow-2xl ring-1 ring-white/10">
        {/* Notch */}
        <div className="absolute top-[14px] left-1/2 -translate-x-1/2 w-[72px] h-[22px] bg-[#212121] rounded-full z-10 flex items-center justify-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-[#1a1a1a]" />
          <div className="w-1.5 h-1.5 rounded-full bg-[#1a1a1a]" />
        </div>

        {/* Screen */}
        <div className="bg-[#0f0f0f] rounded-[2rem] overflow-hidden flex flex-col" style={{ height: 520 }}>
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

          {/* Scrollable content */}
          <div className="flex-1 overflow-y-auto px-3 pb-2" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            {children}
          </div>

          {/* Bottom nav */}
          <div className="flex-shrink-0 relative h-[52px]">
            {/* SVG arch background */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 240 52" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 0 L92 0 A27 27 0 0 1 148 0 L240 0 L240 52 L0 52 Z" fill="#0f0f0f" />
              <path d="M0 0.5 L92 0.5 A27 27 0 0 1 148 0.5 L240 0.5" stroke="#2a2a2a" strokeWidth="1" fill="none" />
            </svg>

            {/* Left + right tabs */}
            <div className="absolute inset-0 z-10 flex items-end justify-around px-2 pb-1.5">
              {leftTabs.map((tab) => (
                <div key={tab.id} className="flex flex-col items-center gap-0.5">
                  <div className={`w-4 h-4 ${activeTab === tab.id ? 'text-[#D0EA59]' : 'text-white/40'}`}>
                    {tab.icon}
                  </div>
                  <span className={`text-[8px] font-medium ${activeTab === tab.id ? 'text-[#D0EA59]' : 'text-white/40'}`}>
                    {tab.label}
                  </span>
                </div>
              ))}
              {/* FAB spacer */}
              <div className="w-10" />
              {rightTabs.map((tab) => (
                <div key={tab.id} className="flex flex-col items-center gap-0.5">
                  <div className={`w-4 h-4 ${activeTab === tab.id ? 'text-[#D0EA59]' : 'text-white/40'}`}>
                    {tab.icon}
                  </div>
                  <span className={`text-[8px] font-medium ${activeTab === tab.id ? 'text-[#D0EA59]' : 'text-white/40'}`}>
                    {tab.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Record FAB */}
            <div className="absolute -top-5 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-[#D0EA59] flex items-center justify-center shadow-lg">
                <svg className="w-3.5 h-3.5 text-black" viewBox="0 0 24 24" fill="currentColor">
                  <circle cx="12" cy="12" r="5" />
                </svg>
              </div>
              <span className="text-[8px] text-white/40 font-medium mt-0.5">Record</span>
            </div>
          </div>
        </div>
      </div>

      {/* Side buttons */}
      <div className="absolute right-0 top-20 w-1 h-10 bg-[#333] rounded-l-sm" />
      <div className="absolute left-0 top-16 w-1 h-7 bg-[#333] rounded-r-sm" />
      <div className="absolute left-0 top-28 w-1 h-12 bg-[#333] rounded-r-sm" />
      <div className="absolute left-0 top-44 w-1 h-12 bg-[#333] rounded-r-sm" />
    </div>
  );
}

function YaaroLogoIcon({ className = 'w-6 h-6' }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M11 12 L16 7 L21 12" stroke="#D0EA59" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="16" cy="21" r="6.5" stroke="#D0EA59" strokeWidth="4" />
    </svg>
  );
}

const MOCK_FEED_POSTS = [
  {
    id: 1,
    name: 'Kapil Ramkhiladi Singh',
    activityKey: 'workout',
    date: 'Apr 27 at 5:17PM',
    location: 'Surat - Gujarat',
    title: 'Morning Strength Session',
    desc: 'Crushed my personal record today. Feeling stronger every week with consistent training.',
    stats: [{ label: 'Time', value: '23min' }, { label: 'Volume', value: '672kg' }, { label: 'Set', value: '4' }],
    kudosText: 'You and 1 others gave kudos',
    kudosAvatarColor: 'bg-orange-500',
    kudosAvatarInitial: 'K',
  },
  {
    id: 2,
    name: 'Priya Sharma',
    activityKey: 'run',
    date: 'Apr 27 at 4:56PM',
    location: 'Mumbai',
    title: 'Evening Run',
    desc: 'Great pace today. Beat my personal best on the 5K route around the park.',
    stats: [{ label: 'Time', value: '28min' }, { label: 'Distance', value: '5.2km' }, { label: 'Pace', value: '5:24' }],
    kudosText: '5 others gave kudos',
    kudosAvatarColor: 'bg-purple-500',
    kudosAvatarInitial: 'P',
  },
];

function FeedPreview() {
  return (
    <div>
      {/* Screen header */}
      <div className="flex items-center justify-between mb-3 px-1">
        <h2 className="text-white font-bold text-base">Feeds</h2>
        <div className="flex items-center gap-3">
          <svg className="w-4 h-4 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
          </svg>
          <svg className="w-4 h-4 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
        </div>
      </div>

      {/* Feed cards */}
      <div className="space-y-3">
        {MOCK_FEED_POSTS.map((post) => {
          const ActivityIcon = ICONS[post.activityKey];
          return (
            <div key={post.id} className="bg-[#1c1c1e] rounded-2xl overflow-hidden">
              {/* User row */}
              <div className="flex items-center gap-2.5 px-3 pt-3 pb-2">
                <div className="w-9 h-9 rounded-xl bg-[#161a0d] flex-shrink-0 flex items-center justify-center border border-primary/20">
                  <YaaroLogoIcon className="w-6 h-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white font-semibold text-[11px] leading-tight">{post.name}</p>
                  <div className="flex items-center gap-1 mt-0.5">
                    {ActivityIcon && <ActivityIcon className="w-2.5 h-2.5 text-white/35" />}
                    <span className="text-white/35 text-[9px]">{post.date} • {post.location}</span>
                  </div>
                </div>
              </div>

              {/* Title + description */}
              <div className="px-3 pb-2">
                <p className="text-white font-bold text-[13px] mb-1">{post.title}</p>
                <p className="text-white/45 text-[10px] leading-snug">{post.desc}</p>
              </div>

              {/* Stats row */}
              <div className="flex items-center px-3 pb-2 gap-5">
                {post.stats.map(({ label, value }, i) => (
                  <div key={label}>
                    <p className="text-white/40 text-[9px]">{label}</p>
                    <p className="text-white font-bold text-[11px]">{value}</p>
                  </div>
                ))}
              </div>

              {/* Media placeholder with Yaaro logo */}
              <div className="mx-3 mb-3 h-[88px] bg-[#0f0f0f] rounded-xl flex items-center justify-center relative overflow-hidden">
                <YaaroLogoIcon className="w-14 h-14 opacity-70" />
                <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[#1c1c1e]/90 to-transparent" />
              </div>

              {/* Footer: kudos + actions */}
              <div className="flex items-center px-3 pb-3">
                <div className="flex -space-x-1.5 mr-2">
                  <div className={`w-5 h-5 rounded-full ${post.kudosAvatarColor} border border-[#1c1c1e] flex items-center justify-center text-white text-[7px] font-bold`}>
                    {post.kudosAvatarInitial}
                  </div>
                  <div className="w-5 h-5 rounded-full bg-[#161a0d] border border-[#1c1c1e] flex items-center justify-center">
                    <YaaroLogoIcon className="w-3.5 h-3.5" />
                  </div>
                </div>
                <span className="text-white/35 text-[9px] flex-1 leading-tight">{post.kudosText}</span>
                <div className="flex items-center gap-2.5">
                  {/* Thumbs up — active/lime */}
                  <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M2 20h2a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2H2v11zM20.71 9.29A1 1 0 0 0 20 9h-5.38l.95-3.8A1 1 0 0 0 14.6 4a1 1 0 0 0-.8.4l-5 6.5A1 1 0 0 0 9 11.5V18a2 2 0 0 0 2 2h7a2 2 0 0 0 1.95-1.56l1-5A1 1 0 0 0 20.71 9.29z" />
                  </svg>
                  {/* Share */}
                  <svg className="w-4 h-4 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8M16 6l-4-4-4 4M12 2v13" />
                  </svg>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const EARN_CHALLENGES = [
  { iconKey: 'star', title: 'DO 10 Like',  progress: 1, total: 10, points: 100 },
  { iconKey: 'run',  title: 'Run 10km',    progress: 0, total: 10, points: 100 },
];

const REWARD_CATEGORIES = [
  { category: 'Fashion', brand: 'Test Brand', name: 'Free Protein Shaker', useLogo: true,  cost: 1 },
  { category: 'Fitness', brand: 'Test Brand', name: 'Whey Protein 1kg',    useLogo: false, cost: 1 },
];

function CoinBadge({ count }) {
  return (
    <div className="flex items-center gap-0.5 bg-[#1c1c1e] border border-white/10 rounded-full px-1.5 py-0.5">
      <span className="text-[11px]">🪙</span>
      <span className="text-white text-[9px] font-bold">{count}</span>
    </div>
  );
}

function RewardsPreview() {
  return (
    <div>
      {/* Page header */}
      <div className="flex items-center justify-between mb-4 px-1">
        <h2 className="text-white font-bold text-base">Rewards</h2>
        <div className="flex items-center gap-1.5">
          <div className="flex items-center gap-0.5 bg-[#1c1c1e] border border-white/10 rounded-full px-1.5 py-0.5">
            <span className="text-[11px]">🪙</span><span className="text-white text-[9px] font-bold">1</span>
          </div>
          <div className="flex items-center gap-0.5 bg-[#1c1c1e] border border-white/10 rounded-full px-1.5 py-0.5">
            <span className="text-[11px]">🌿</span><span className="text-white text-[9px] font-bold">0</span>
          </div>
          <div className="flex items-center gap-0.5 bg-[#1c1c1e] border border-white/10 rounded-full px-1.5 py-0.5">
            <span className="text-[11px]">🎟️</span><span className="text-white text-[9px] font-bold">0</span>
          </div>
        </div>
      </div>

      {/* How you earn points */}
      <div className="flex items-start gap-2 mb-3">
        <span className="text-lg leading-none mt-0.5">🪙</span>
        <div>
          <p className="text-white font-semibold text-[12px] leading-tight">How you earn points</p>
          <p className="text-white/45 text-[9px] mt-0.5">Stay active, hit milestones to earn points.</p>
        </div>
      </div>

      {/* Earn challenge cards — 2 col grid */}
      <div className="grid grid-cols-2 gap-2 mb-4">
        {EARN_CHALLENGES.map((c) => {
          const Icon = ICONS[c.iconKey];
          const pct = (c.progress / c.total) * 100;
          return (
            <div key={c.title} className="bg-[#1c1c1e] rounded-2xl p-3 flex flex-col">
              {Icon && <Icon className="w-5 h-5 text-[#D0EA59] mb-2" />}
              <p className="text-white font-bold text-[11px] mb-2 leading-tight">{c.title}</p>
              <div className="h-1 bg-[#2a2a2a] rounded-full overflow-hidden mb-1">
                <div className="h-full bg-[#D0EA59] rounded-full" style={{ width: `${pct}%` }} />
              </div>
              <p className="text-white/40 text-[9px] text-right mb-3">{c.progress}/{c.total}</p>
              <div className="mt-auto bg-[#1e2710] border border-[#2d3d14] rounded-full py-1 text-center">
                <span className="text-[#D0EA59] text-[9px] font-semibold">+{c.points} Points</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Rewards section header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-start gap-2">
          <span className="text-lg leading-none mt-0.5">🎟️</span>
          <div>
            <p className="text-white font-semibold text-[12px] leading-tight">Rewards</p>
            <p className="text-white/45 text-[9px] mt-0.5">Use points to redeem rewards.</p>
          </div>
        </div>
        <span className="text-[#D0EA59] text-[9px] font-semibold">View all</span>
      </div>

      {/* Reward category cards */}
      {REWARD_CATEGORIES.map((r) => (
        <div key={r.category}>
          <p className="text-white font-bold text-[13px] mb-2">{r.category}</p>
          <div className="bg-[#1c1c1e] rounded-2xl overflow-hidden flex mb-3" style={{ minHeight: 80 }}>
            {r.useLogo ? (
              <>
                {/* Left logo panel */}
                <div className="w-[90px] flex-shrink-0 bg-[#161a0d] flex items-center justify-center relative">
                  <div className="absolute top-2 left-2">
                    <CoinBadge count={r.cost} />
                  </div>
                  <YaaroLogoIcon className="w-12 h-12" />
                </div>
                {/* Right info */}
                <div className="flex-1 px-3 flex flex-col justify-center">
                  <p className="text-white/45 text-[9px] mb-1">{r.brand}</p>
                  <p className="text-white font-bold text-[12px] leading-tight">{r.name}</p>
                </div>
              </>
            ) : (
              /* Full-width image placeholder */
              <div className="relative w-full h-20 bg-gradient-to-br from-[#3a2e1a] to-[#1c1a14] flex items-center justify-center">
                <p className="text-white/20 text-[10px]">{r.name}</p>
                <div className="absolute top-2 right-2">
                  <CoinBadge count={r.cost} />
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

function ChallengesPreview() {
  return (
    <div className="space-y-3">
      <p className="text-white/50 text-[10px] font-semibold uppercase tracking-wider px-1 mb-3">Active Challenges</p>
      {CHALLENGES.map((challenge) => {
        const CIcon = ICONS[challenge.icon];
        return (
          <div key={challenge.id} className="bg-white/5 rounded-xl border border-white/10 p-3">
            <div className="flex items-start justify-between mb-2.5">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-primary/15 border border-primary/20 flex items-center justify-center flex-shrink-0">
                  {CIcon && <CIcon className="w-3.5 h-3.5 text-primary" />}
                </div>
                <div>
                  <p className="text-white/90 text-[10px] font-semibold leading-tight">{challenge.title}</p>
                  <p className="text-white/40 text-[9px]">{challenge.type}</p>
                </div>
              </div>
              <span className="text-[9px] font-bold text-primary bg-primary/10 px-1.5 py-0.5 rounded-full border border-primary/20 whitespace-nowrap">
                {challenge.reward}
              </span>
            </div>
            <div className="mb-1.5">
              <div className="flex justify-between text-[9px] mb-1">
                <span className="text-white/40">Progress</span>
                <span className="text-primary font-semibold">{challenge.progress}%</span>
              </div>
              <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full" style={{ width: `${challenge.progress}%` }} />
              </div>
            </div>
            <div className="flex justify-between text-[9px] text-white/40">
              <span>{challenge.participants.toLocaleString()} joined</span>
              {challenge.daysLeft !== null ? (
                <span className="text-orange-400">{challenge.daysLeft}d left</span>
              ) : (
                <span className="text-green-400">Ongoing</span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

const AVATAR_COLORS = ['bg-blue-500', 'bg-purple-500', 'bg-green-500', 'bg-orange-500', 'bg-pink-500'];
const FAKE_AVATARS = ['AK', 'RV', 'PS', 'MJ', 'SL'];

const MOCK_CLUBS = [
  { id: 0, name: 'Nike workout club 0', members: 10,  location: 'Surat, Gujarat' },
  { id: 1, name: 'Nike workout club 1', members: 20,  location: 'Surat, Gujarat' },
  { id: 2, name: 'Nike workout club 2', members: 30,  location: 'Surat, Gujarat' },
  { id: 3, name: 'Nike workout club 3', members: 40,  location: 'Surat, Gujarat' },
];

function ClubLogoPlaceholder() {
  return (
    <div className="w-14 h-14 rounded-xl flex-shrink-0 overflow-hidden bg-gradient-to-br from-[#3ab5c4] to-[#1d7d8a] flex items-center justify-center">
      <svg className="w-8 h-8 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2L3 7v5c0 5.25 3.75 10.15 9 11.25C17.25 22.15 21 17.25 21 12V7L12 2z" opacity="0.3" />
        <path d="M12 2L3 7v5c0 5.25 3.75 10.15 9 11.25C17.25 22.15 21 17.25 21 12V7L12 2z" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <text x="12" y="15" textAnchor="middle" fontSize="5" fill="currentColor" fontWeight="bold">CLUB</text>
      </svg>
    </div>
  );
}

function ClubsPreview() {
  return (
    <div>
      {/* Page header */}
      <h2 className="text-white font-bold text-base mb-4 px-1">Social</h2>

      {/* Challenges | Clubs tab switcher */}
      <div className="flex mb-1 border-b border-white/10">
        <button className="flex-1 pb-2 text-[11px] font-medium text-white/40 text-center">Challenges</button>
        <button className="flex-1 pb-2 text-[11px] font-semibold text-[#D0EA59] text-center relative">
          Clubs
          <span className="absolute bottom-0 left-1/4 right-1/4 h-[2px] bg-[#D0EA59] rounded-full" />
        </button>
      </div>

      {/* Create club row */}
      <div className="flex items-center justify-between py-2.5 mb-2 border-b border-white/8">
        <span className="text-white text-[11px] font-medium">Create your own club</span>
        <span className="text-[#D0EA59] text-[11px] font-semibold">Create</span>
      </div>

      {/* Club list */}
      <div className="space-y-2 mt-2">
        {MOCK_CLUBS.map((club) => (
          <div key={club.id} className="flex items-center gap-3 bg-[#1c1c1e] rounded-2xl px-3 py-3">
            <ClubLogoPlaceholder />
            <div className="flex-1 min-w-0">
              <p className="text-white font-bold text-[12px] mb-1 leading-tight">{club.name}</p>
              <div className="flex items-center gap-1 mb-0.5">
                <svg className="w-3 h-3 text-white/45 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
                <span className="text-white/45 text-[10px]">{club.members} Members</span>
              </div>
              <div className="flex items-center gap-1">
                <svg className="w-3 h-3 text-white/45 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 1 1 18 0z" /><circle cx="12" cy="10" r="3" />
                </svg>
                <span className="text-white/45 text-[10px]">{club.location}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const FEATURE_PREVIEWS = {
  feeds: <FeedPreview />,
  rewards: <RewardsPreview />,
  challenges: <ChallengesPreview />,
  clubs: <ClubsPreview />,
};

const FEATURE_BULLETS = {
  feeds: [
    'Post workouts, photos & milestones',
    'Like, comment & cheer friends on',
    'Discover trending fitness content',
  ],
  rewards: [
    'Earn points on every activity',
    'Redeem for real fitness gear & vouchers',
    'Bonus points for streaks & challenges',
  ],
  challenges: [
    'Weekly & monthly community challenges',
    'Climb leaderboards & win rewards',
    'Create private challenges with friends',
  ],
  clubs: [
    'Browse & join clubs by sport or interest',
    'Plan group runs, rides & workouts',
    'Stay active and connected with your club',
  ],
};

function FeatureRow({ feature, index }) {
  const isEven = index % 2 === 0; // even = content left, mockup right
  const bullets = FEATURE_BULLETS[feature.id];

  const contentBlock = (
    <motion.div
      initial={{ opacity: 0, x: isEven ? -40 : 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      viewport={{ once: true }}
      className={`flex flex-col justify-center ${!isEven ? 'order-1 lg:order-2' : ''}`}
    >
      <span className={`inline-block text-xs font-semibold px-3 py-1.5 rounded-full mb-4 w-fit ${feature.badgeColor}`}>
        {feature.badge}
      </span>
      <h3 className="text-3xl sm:text-4xl font-bold text-surface-text mb-4 leading-tight">
        {feature.title}
      </h3>
      <p className="text-surface-secondary text-base leading-relaxed mb-6 max-w-md">
        {feature.description}
      </p>
      <ul className="space-y-3">
        {bullets.map((bullet, i) => (
          <li key={i} className="flex items-center gap-3 text-surface-secondary text-sm">
            <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
              <svg className="w-3 h-3 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            {bullet}
          </li>
        ))}
      </ul>
    </motion.div>
  );

  const mockupBlock = (
    <motion.div
      initial={{ opacity: 0, x: isEven ? 40 : -40 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      viewport={{ once: true }}
      className={`flex items-center justify-center lg:justify-start ${!isEven ? 'order-2 lg:order-1' : ''}`}
    >
      <PhoneMockup activeTab={TAB_ACTIVE_MAP[feature.id]}>
        {FEATURE_PREVIEWS[feature.id]}
      </PhoneMockup>
    </motion.div>
  );

  return (
    <div id={feature.id} className={`grid grid-cols-1 items-center gap-10 lg:gap-12 ${isEven ? 'lg:grid-cols-[3fr_2fr]' : 'lg:grid-cols-[2fr_3fr]'}`}>
      {isEven ? (
        <>
          {contentBlock}
          {mockupBlock}
        </>
      ) : (
        <>
          {mockupBlock}
          {contentBlock}
        </>
      )}
    </div>
  );
}

export default function Features() {
  return (
    <section id="features" className="py-12 md:py-24 relative" aria-label="Features section">
      <div className="absolute right-0 top-1/3 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute left-0 bottom-1/4 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-10 md:mb-20"
        >
          <span className="inline-block text-xs font-semibold text-primary bg-primary/10 border border-primary/20 px-4 py-1.5 rounded-full mb-4 tracking-wide uppercase">
            Features
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-surface-text mb-4">
            Everything You Need to{' '}
            <span className="text-gradient">Thrive</span>
          </h2>
          <p className="text-surface-secondary text-lg max-w-xl mx-auto">
            A complete fitness ecosystem — social, smart, and rewarding.
          </p>
        </motion.div>

        {/* Feature Rows */}
        <div className="space-y-14 md:space-y-28">
          {FEATURES.map((feature, index) => (
            <FeatureRow key={feature.id} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
