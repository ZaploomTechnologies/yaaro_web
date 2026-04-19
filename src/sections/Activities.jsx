import { useState } from 'react';
import { motion } from 'framer-motion';
import ActivityCard from '../components/ActivityCard';
import WorkoutModal from '../components/WorkoutModal';
import { ACTIVITIES } from '../constants';

export default function Activities() {
  const [selectedActivity, setSelectedActivity] = useState(null);

  return (
    <section id="activities" className="py-24 relative" aria-label="Activities section">
      {/* Subtle background accent */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-72 h-72 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="inline-block text-xs font-semibold text-primary bg-primary/10 border border-primary/20 px-4 py-1.5 rounded-full mb-4 tracking-wide uppercase">
            Activities
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-surface-text mb-4">
            Every Move,{' '}
            <span className="text-gradient">Tracked</span>
          </h2>
          <p className="text-surface-secondary text-lg max-w-xl mx-auto">
            From sunrise runs to late-night lifts — Yaaro captures every activity with precision.
          </p>
        </motion.div>

        {/* Activity Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {ACTIVITIES.map((activity, index) => (
            <ActivityCard
              key={activity.id}
              activity={activity}
              index={index}
              onClick={() => setSelectedActivity(activity)}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <p className="text-surface-secondary text-sm">
            + More activities coming soon: Swimming, Yoga, Hiking & more
          </p>
        </motion.div>
      </div>

      <WorkoutModal
        activity={selectedActivity}
        onClose={() => setSelectedActivity(null)}
      />
    </section>
  );
}
