import { motion } from 'framer-motion';
import { ANIMATED_ICONS } from './AnimatedIcons';
import { ICONS } from './Icons';

export default function ActivityCard({ activity, index }) {
  const IconComponent = ANIMATED_ICONS[activity.icon] ?? ICONS[activity.icon];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.03, y: -4 }}
      className="relative group overflow-hidden rounded-2xl h-72"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={activity.image}
          alt={activity.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      {/* Gradient Overlay */}
      <div className={`absolute inset-0 bg-gradient-to-t ${activity.color} via-black/40 to-transparent`} />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

      {/* Glow Effect on hover */}
      <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10 group-hover:ring-primary/40 transition-all duration-300" />

      {/* Content */}
      <div className="absolute inset-0 p-5 flex flex-col justify-between">
        {/* Top: Icon + Stats */}
        <div className="flex items-start justify-between">
          <div className="w-11 h-11 rounded-xl bg-white/15 backdrop-blur-sm flex items-center justify-center text-white border border-white/20 overflow-visible">
            {IconComponent && <IconComponent className="w-7 h-7" />}
          </div>
          <span className="bg-black/40 backdrop-blur-sm text-surface-text text-xs font-medium px-3 py-1.5 rounded-full border border-white/10">
            {activity.stats}
          </span>
        </div>

        {/* Bottom: Title + Description */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-1">{activity.title}</h3>
          <p className="text-white/70 text-sm leading-relaxed">{activity.description}</p>

        </div>
      </div>
    </motion.div>
  );
}
