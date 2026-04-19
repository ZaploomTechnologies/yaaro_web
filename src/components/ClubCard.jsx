import { motion } from 'framer-motion';
import { ICONS } from './Icons';

const AVATAR_COLORS = [
  'bg-blue-500',
  'bg-purple-500',
  'bg-green-500',
  'bg-orange-500',
  'bg-pink-500',
];

export default function ClubCard({ club, index }) {
  const fakeAvatars = ['AK', 'RV', 'PS', 'MJ', 'SL'];
  const IconComponent = ICONS[club.icon];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ y: -4 }}
      className="gradient-border p-5 rounded-2xl hover:shadow-card-hover transition-all duration-300 group"
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
          {IconComponent && <IconComponent className="w-6 h-6 text-primary" />}
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-surface-text truncate">{club.name}</h4>
          <span className="text-xs text-primary bg-primary/10 px-2 py-0.5 rounded-full">{club.activity}</span>
        </div>
      </div>

      {/* Stats */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-xl font-bold text-surface-text">{club.members.toLocaleString()}</p>
          <p className="text-xs text-surface-secondary">Members</p>
        </div>
        <div className="text-right">
          <p className="text-sm font-medium text-success">{club.recentActivity}</p>
        </div>
      </div>

      {/* Member Avatars */}
      <div className="flex items-center justify-between">
        <div className="flex -space-x-2">
          {fakeAvatars.map((initials, i) => (
            <div
              key={i}
              className={`w-7 h-7 rounded-full ${AVATAR_COLORS[i]} border-2 border-surface-card flex items-center justify-center text-white text-xs font-bold`}
            >
              {initials[0]}
            </div>
          ))}
          <div className="w-7 h-7 rounded-full bg-surface-secondary/30 border-2 border-surface-card flex items-center justify-center text-surface-secondary text-xs">
            +{(club.members - 5).toLocaleString()}
          </div>
        </div>
        <button className="text-xs text-primary font-semibold hover:text-primary-container transition-colors group-hover:underline">
          Join Club
          <svg className="inline w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </button>
      </div>
    </motion.div>
  );
}
