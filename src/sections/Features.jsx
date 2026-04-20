import { motion } from 'framer-motion';
import { ICONS, TrophyIcon } from '../components/Icons';
import { FEATURES, REWARDS_POINTS, REWARD_ITEMS, CHALLENGES, CLUBS, FEED_POSTS } from '../constants';

function PhoneMockup({ children }) {
  return (
    <div className="relative " style={{ width: 260 }}>
      {/* Phone outer frame */}
      <div className="relative bg-gray-900 rounded-[2.5rem] p-2 shadow-2xl ring-1 ring-white/10">
        {/* Notch */}
        <div className="absolute top-3.5 left-1/2 -translate-x-1/2 w-20 h-5 bg-gray-900 rounded-full z-10 flex items-center justify-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-gray-800" />
          <div className="w-1 h-1 rounded-full bg-gray-700" />
        </div>

        {/* Screen */}
        <div className="bg-[#0f0f0f] rounded-[2rem] overflow-hidden" style={{ height: 520 }}>
          {/* Status bar */}
          <div className="flex items-center justify-between px-5 pt-8 pb-2">
            <span className="text-white text-[10px] font-semibold">9:41</span>
            <div className="flex  items-center gap-1">
              <div className="flex gap-0.5 items-end h-3">
                <div className="w-1 h-1 bg-white rounded-sm" />
                <div className="w-1 h-1.5 bg-white rounded-sm" />
                <div className="w-1 h-2 bg-white rounded-sm" />
                <div className="w-1 h-2.5 bg-white/40 rounded-sm" />
              </div>
              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M1.5 8.5C5.5 4.5 18.5 4.5 22.5 8.5L20.5 10.5C17.5 7.5 6.5 7.5 3.5 10.5L1.5 8.5ZM5.5 12.5C8 10 16 10 18.5 12.5L16.5 14.5C15 13 9 13 7.5 14.5L5.5 12.5ZM9.5 16.5C10.8 15.2 13.2 15.2 14.5 16.5L12 19L9.5 16.5Z" />
              </svg>
              <div className="flex items-center gap-0.5">
                <div className="w-5 h-2.5 border border-white/50 rounded-sm flex items-center px-0.5">
                  <div className="w-3 h-1.5 bg-white rounded-sm" />
                </div>
              </div>
            </div>
          </div>

          {/* Scrollable content area */}
          <div className="overflow-y-auto px-3 pb-4 scrollbar-hide" style={{ height: 460 }}>
            {children}
          </div>
        </div>
      </div>

      {/* Side buttons */}
      <div className="absolute right-0 top-20 w-1 h-10 bg-gray-700 rounded-l-sm" />
      <div className="absolute left-0 top-16 w-1 h-7 bg-gray-700 rounded-r-sm" />
      <div className="absolute left-0 top-28 w-1 h-12 bg-gray-700 rounded-r-sm" />
      <div className="absolute left-0 top-44 w-1 h-12 bg-gray-700 rounded-r-sm" />
    </div>
  );
}

function FeedPreview() {
  return (
    <div className="space-y-3">
      <p className="text-white/50 text-[10px] font-semibold uppercase tracking-wider px-1 mb-3">Your Feed</p>
      {FEED_POSTS.map((post) => (
        <div key={post.id} className="bg-white/5 rounded-xl border border-white/10 overflow-hidden">
          <div className="relative h-28 overflow-hidden">
            <img src={post.image} alt={post.activity} loading="lazy" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <div className="absolute bottom-2 left-3">
              <span className="text-white text-[10px] font-semibold">{post.activity}</span>
            </div>
          </div>
          <div className="p-2.5">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-[8px] font-bold text-white">
                {post.avatar}
              </div>
              <div>
                <p className="text-white text-[10px] font-medium">{post.user}</p>
                <p className="text-white/40 text-[9px]">{post.time}</p>
              </div>
            </div>
            <div className="flex gap-2 flex-wrap mb-2">
              {Object.entries(post.stats).map(([key, val]) => (
                <span key={key} className="text-[9px] text-white/40">
                  <span className="text-white/80 font-medium">{val}</span>
                </span>
              ))}
            </div>
            <div className="flex gap-3 pt-1.5 border-t border-white/10">
              <button className="flex items-center gap-1 text-white/40 text-[9px]">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                {post.likes}
              </button>
              <button className="flex items-center gap-1 text-white/40 text-[9px]">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                {post.comments}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function RewardsPreview() {
  return (
    <div className="space-y-3">
      <div className="bg-gradient-to-r from-primary/20 to-primary/5 border border-primary/20 rounded-xl p-3 flex items-center justify-between">
        <div>
          <p className="text-white/50 text-[9px] mb-0.5">Your Balance</p>
          <p className="text-primary font-bold text-xl">2,100 pts</p>
        </div>
        <TrophyIcon className="w-7 h-7 text-primary" />
      </div>
      <div className="space-y-1.5">
        <p className="text-white/40 text-[9px] font-semibold uppercase tracking-wider">How to Earn</p>
        {REWARDS_POINTS.map((item, i) => {
          const PointIcon = ICONS[item.icon];
          return (
            <div key={i} className="flex items-center justify-between bg-white/5 rounded-lg px-2.5 py-2 border border-white/10">
              <div className="flex items-center gap-2">
                <div className={`w-5 h-5 flex items-center justify-center flex-shrink-0 ${item.color}`}>
                  {PointIcon && <PointIcon className="w-3.5 h-3.5" />}
                </div>
                <span className="text-white/80 text-[10px] font-medium">{item.label}</span>
              </div>
              <span className={`text-[10px] font-bold ${item.color}`}>{item.points}</span>
            </div>
          );
        })}
      </div>
      <div>
        <p className="text-white/40 text-[9px] font-semibold uppercase tracking-wider mb-2">Redeem</p>
        <div className="space-y-1.5">
          {REWARD_ITEMS.map((reward) => {
            const RewardIcon = ICONS[reward.icon];
            const isLocked = reward.status === 'locked';
            return (
              <div key={reward.id} className={`flex items-center justify-between bg-white/5 rounded-lg px-2.5 py-2 border border-white/10 ${isLocked ? 'opacity-60' : ''}`}>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 flex items-center justify-center flex-shrink-0">
                    {RewardIcon && <RewardIcon className={`w-3.5 h-3.5 ${isLocked ? 'text-white/40' : 'text-primary'}`} />}
                  </div>
                  <div>
                    <p className="text-white/80 text-[10px] font-medium">{reward.title}</p>
                    <p className="text-white/40 text-[9px]">{reward.brand}</p>
                  </div>
                </div>
                <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${isLocked ? 'bg-white/10 text-white/40' : 'bg-primary/20 text-primary'}`}>
                  {reward.points.toLocaleString()} pts
                </span>
              </div>
            );
          })}
        </div>
      </div>
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

function ClubsPreview() {
  return (
    <div className="space-y-3">
      <p className="text-white/50 text-[10px] font-semibold uppercase tracking-wider px-1 mb-3">Popular Clubs</p>
      {CLUBS.map((club) => {
        const CIcon = ICONS[club.icon];
        return (
          <div key={club.id} className="bg-white/5 rounded-xl border border-white/10 p-3">
            <div className="flex items-center gap-2 mb-2.5">
              <div className="w-8 h-8 rounded-lg bg-primary/15 border border-primary/20 flex items-center justify-center flex-shrink-0">
                {CIcon && <CIcon className="w-4 h-4 text-primary" />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white/90 text-[10px] font-semibold truncate">{club.name}</p>
                <span className="text-[9px] text-primary bg-primary/10 px-1.5 py-0.5 rounded-full">{club.activity}</span>
              </div>
            </div>
            <div className="flex items-center justify-between mb-2">
              <div>
                <p className="text-white font-bold text-sm">{club.members.toLocaleString()}</p>
                <p className="text-white/40 text-[9px]">Members</p>
              </div>
              <p className="text-green-400 text-[9px] font-medium text-right">{club.recentActivity}</p>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex -space-x-1.5">
                {FAKE_AVATARS.slice(0, 4).map((initials, j) => (
                  <div key={j} className={`w-5 h-5 rounded-full ${AVATAR_COLORS[j]} border border-black flex items-center justify-center text-white text-[7px] font-bold`}>
                    {initials[0]}
                  </div>
                ))}
              </div>
              <button className="text-[9px] text-primary font-semibold">Join Club →</button>
            </div>
          </div>
        );
      })}
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
      className="flex flex-col justify-center"
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
      className={`flex items-center ${isEven ? 'lg:justify-start' : 'lg:justify-start'} justify-center`}
    >
      <PhoneMockup>
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
    <section id="features" className="py-24 relative" aria-label="Features section">
      <div className="absolute right-0 top-1/3 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute left-0 bottom-1/4 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
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
        <div className="space-y-28">
          {FEATURES.map((feature, index) => (
            <FeatureRow key={feature.id} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
