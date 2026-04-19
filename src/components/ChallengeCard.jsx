import { motion } from 'framer-motion';
import { ICONS } from './Icons';

export default function ChallengeCard({ challenge, index }) {
  const IconComponent = ICONS[challenge.icon];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ y: -4, scale: 1.01 }}
      className="gradient-border p-5 rounded-2xl hover:shadow-card-hover transition-all duration-300"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
            {IconComponent && <IconComponent className="w-5 h-5 text-primary" />}
          </div>
          <div>
            <h4 className="font-semibold text-surface-text text-sm leading-tight">{challenge.title}</h4>
            <span className="text-xs text-surface-secondary">{challenge.type}</span>
          </div>
        </div>
        <span className="text-xs font-bold text-primary bg-primary/10 px-2.5 py-1 rounded-full border border-primary/20">
          {challenge.reward}
        </span>
      </div>

      {/* Progress */}
      <div className="mb-4">
        <div className="flex justify-between text-xs mb-1.5">
          <span className="text-surface-secondary">Progress</span>
          <span className="text-primary font-semibold">{challenge.progress}%</span>
        </div>
        <div className="h-2 bg-surface-secondary/20 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: `${challenge.progress}%` }}
            transition={{ duration: 1, delay: index * 0.1 + 0.3, ease: 'easeOut' }}
            viewport={{ once: true }}
            className="h-full bg-gradient-to-r from-primary to-primary-container rounded-full"
          />
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between text-xs text-surface-secondary">
        <div className="flex items-center gap-1.5">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span>{challenge.participants.toLocaleString()} joined</span>
        </div>
        {challenge.daysLeft !== null ? (
          <span className="text-orange-400 font-medium">{challenge.daysLeft}d left</span>
        ) : (
          <span className="text-success font-medium">Ongoing</span>
        )}
      </div>
    </motion.div>
  );
}
