import { motion } from 'framer-motion';
import { ICONS } from './Icons';

export default function RewardCard({ reward, index }) {
  const isLocked = reward.status === 'locked';
  const IconComponent = ICONS[reward.icon];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={!isLocked ? { y: -4 } : {}}
      className={`gradient-border p-5 rounded-2xl relative overflow-hidden transition-all duration-300 ${isLocked ? 'opacity-60 grayscale' : 'hover:shadow-card-hover'
        }`}
    >
      {/* Status Badge */}
      <div
        className={`absolute top-3 right-3 text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1 ${isLocked
            ? 'bg-surface-secondary/20 text-surface-secondary border border-border'
            : 'bg-primary text-primary-lowest'
          }`}
      >
        {isLocked ? (
          <>
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <rect x="3" y="11" width="18" height="11" rx="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            LOCKED
          </>
        ) : (
          <>
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
              <polyline points="20 6 9 17 4 12" />
            </svg>
            REDEEM
          </>
        )}
      </div>

      {/* Icon */}
      <div className="w-12 h-12 rounded-xl bg-surface-bg border border-border flex items-center justify-center mb-3">
        {IconComponent && (
          <IconComponent className={`w-6 h-6 ${isLocked ? 'text-surface-secondary' : 'text-primary'}`} />
        )}
      </div>

      {/* Info */}
      <h4 className="font-semibold text-surface-text text-base mb-0.5">{reward.title}</h4>
      <p className="text-surface-secondary text-sm mb-3">{reward.brand}</p>

      {/* Points + Discount */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <span className="text-primary font-bold text-sm">{reward.points.toLocaleString()}</span>
          <span className="text-surface-secondary text-xs">pts</span>
        </div>
        <span
          className={`text-xs font-semibold px-2 py-0.5 rounded-full ${isLocked
              ? 'bg-surface-secondary/10 text-surface-secondary'
              : 'bg-primary/15 text-primary'
            }`}
        >
          {reward.discount}
        </span>
      </div>

      {/* Progress bar for locked items */}
      {isLocked && (
        <div className="mt-3">
          <div className="flex justify-between text-xs text-surface-secondary mb-1">
            <span>Your points: 2,100</span>
            <span>{reward.points.toLocaleString()} needed</span>
          </div>
          <div className="h-1.5 bg-surface-secondary/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-primary/40 rounded-full"
              style={{ width: `${Math.min((2100 / reward.points) * 100, 100)}%` }}
            />
          </div>
        </div>
      )}
    </motion.div>
  );
}
