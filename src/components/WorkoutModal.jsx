import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';
import { ICONS } from './Icons';

/* ─── Per-activity modal data ──────────────────────────────────────── */
const MODAL_DATA = {
  1: {
    type: 'splits',
    accentColor: '#F97316',
    accentClass: 'text-orange-400',
    accentBg: 'bg-orange-500/10',
    accentBorder: 'border-orange-500/25',
    gradientFrom: 'from-orange-500/20',
    subtitle: 'Outdoor Run',
    summary: { '5.2 km': 'Distance', '28:34': 'Time', '312 kcal': 'Calories' },
    sections: [
      {
        name: 'Km Splits',
        note: 'Avg target 5:30 /km',
        columns: ['Km', 'Terrain', 'Pace', ''],
        rows: [
          { label: '1', hint: 'Flat road',      ref: '5:30', value: '5:22', done: true,  best: true  },
          { label: '2', hint: 'Slight climb',   ref: '5:30', value: '5:28', done: true,  best: false },
          { label: '3', hint: 'Downhill',       ref: '5:30', value: '5:35', done: true,  best: false },
          { label: '4', hint: 'Flat road',      ref: '5:30', value: '5:41', done: true,  best: false },
          { label: '5', hint: 'Final stretch',  ref: '5:30', value: '5:46', done: false, best: false },
        ],
      },
    ],
    progress: { label: 'Weekly Distance Goal', current: 22.1, target: 30, unit: 'km' },
  },
  2: {
    type: 'splits',
    accentColor: '#22C55E',
    accentClass: 'text-green-400',
    accentBg: 'bg-green-500/10',
    accentBorder: 'border-green-500/25',
    gradientFrom: 'from-green-500/20',
    subtitle: 'Evening Walk',
    summary: { '8,420': 'Steps', '3.1 km': 'Distance', '187 kcal': 'Calories' },
    sections: [
      {
        name: 'Hourly Breakdown',
        note: 'Goal: 1,500 steps / hr',
        columns: ['Time', 'Phase', 'Steps', ''],
        rows: [
          { label: '8AM',  hint: 'Morning commute', ref: '1,500', value: '1,840', done: true,  best: true  },
          { label: '9AM',  hint: 'Office walk',     ref: '1,500', value: '2,100', done: true,  best: false },
          { label: '12PM', hint: 'Lunch break',     ref: '1,500', value: '1,520', done: true,  best: false },
          { label: '3PM',  hint: 'Afternoon',       ref: '1,500', value: '1,680', done: true,  best: false },
          { label: '5PM',  hint: 'Evening stroll',  ref: '1,500', value: '1,280', done: false, best: false },
        ],
      },
    ],
    progress: { label: 'Daily Step Goal', current: 8420, target: 10000, unit: 'steps' },
  },
  3: {
    type: 'splits',
    accentColor: '#3B82F6',
    accentClass: 'text-blue-400',
    accentBg: 'bg-blue-500/10',
    accentBorder: 'border-blue-500/25',
    gradientFrom: 'from-blue-500/20',
    subtitle: 'Road Cycling',
    summary: { '18 km': 'Distance', '55:20': 'Time', '445 kcal': 'Calories' },
    sections: [
      {
        name: 'Route Segments',
        note: 'Avg target 20 km/h',
        columns: ['Seg', 'Terrain', 'Speed', ''],
        rows: [
          { label: '1', hint: '5 km · Flat',    ref: '20 km/h', value: '22.4', done: true,  best: false },
          { label: '2', hint: '4 km · Climb',   ref: '15 km/h', value: '14.8', done: true,  best: false },
          { label: '3', hint: '6 km · Descent', ref: '25 km/h', value: '28.6', done: true,  best: true  },
          { label: '4', hint: '3 km · Flat',    ref: '20 km/h', value: '21.2', done: false, best: false },
        ],
      },
    ],
    progress: { label: 'Monthly Cycling Goal', current: 64, target: 100, unit: 'km' },
  },
  4: {
    type: 'strength',
    accentColor: '#A855F7',
    accentClass: 'text-purple-400',
    accentBg: 'bg-purple-500/10',
    accentBorder: 'border-purple-500/25',
    gradientFrom: 'from-purple-500/20',
    summary: { duration: '6 min', volume: '320 kg', sets: 1 },
    exercises: [
      {
        name: 'Arnold Press',
        note: 'Dumbbell',
        sets: [
          { label: 'W', weight: 40, reps: 7, done: true, warmup: true },
          { label: '1', weight: 62, reps: 8, done: true, warmup: false },
          { label: '2', weight: 65, reps: 8, done: false, warmup: false },
          { label: '3', weight: 70, reps: 6, done: false, warmup: false },
        ],
      },
      {
        name: 'Incline Bench Press',
        note: 'Barbell',
        sets: [
          { label: '1', weight: 80, reps: 8, done: false, warmup: false },
          { label: '2', weight: 85, reps: 6, done: false, warmup: false },
        ],
      },
    ],
  },
};

/* ─── Animation variants ────────────────────────────────────────────── */
const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.25 } },
  exit: { opacity: 0, transition: { duration: 0.2, delay: 0.1 } },
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.82, y: 64, rotateX: 6 },
  visible: {
    opacity: 1, scale: 1, y: 0, rotateX: 0,
    transition: { type: 'spring', damping: 22, stiffness: 280, mass: 0.8 },
  },
  exit: {
    opacity: 0, scale: 0.88, y: 40,
    transition: { duration: 0.2, ease: 'easeIn' },
  },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.15 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
};

const slideRight = {
  hidden: { opacity: 0, x: 24 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } },
};

/* ─── Scan-line sweep animation ─────────────────────────────────────── */
function ScanLine({ color }) {
  return (
    <motion.div
      className="absolute top-0 left-0 h-[2px] rounded-t-2xl"
      style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }}
      initial={{ width: '0%', opacity: 0 }}
      animate={{ width: '100%', opacity: [0, 1, 1, 0] }}
      transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
    />
  );
}

/* ─── Progress bar ──────────────────────────────────────────────────── */
function ProgressBar({ label, current, target, unit, accentColor, accentClass }) {
  const pct = Math.min((current / target) * 100, 100);
  return (
    <motion.div variants={fadeUp} className="space-y-2">
      <div className="flex items-center justify-between text-xs">
        <span className="text-surface-secondary font-medium">{label}</span>
        <span className={`font-semibold ${accentClass}`}>
          {current} / {target} {unit}
        </span>
      </div>
      <div className="h-1.5 bg-surface-border rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ background: accentColor }}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
        />
      </div>
    </motion.div>
  );
}

/* ─── Set row (strength) ────────────────────────────────────────────── */
function SetRow({ set, index }) {
  const isActive = set.done;
  const isWarmup = set.warmup;

  return (
    <motion.div
      variants={slideRight}
      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl border transition-colors ${
        isWarmup && isActive
          ? 'bg-primary/10 border-primary/30'
          : isActive
          ? 'bg-success/8 border-success/25'
          : 'bg-surface-bg/40 border-surface-border/60'
      }`}
    >
      {/* Set badge */}
      <span
        className={`w-6 h-6 flex-shrink-0 rounded-lg flex items-center justify-center text-xs font-bold ${
          isWarmup
            ? 'bg-primary text-surface-lowest'
            : 'bg-surface-border text-surface-secondary'
        }`}
      >
        {set.label}
      </span>

      {/* Previous hint */}
      <span className="text-surface-secondary text-xs flex-1">
        {set.weight} kg × {set.reps}
      </span>

      {/* Current weight */}
      <span className={`text-sm font-bold w-10 text-center ${isActive ? 'text-surface-text' : 'text-surface-secondary'}`}>
        {set.weight}
      </span>

      {/* Current reps */}
      <span className={`text-sm font-bold w-6 text-center ${isActive ? 'text-surface-text' : 'text-surface-secondary'}`}>
        {set.reps}
      </span>

      {/* Done check */}
      <motion.div
        className={`w-7 h-7 flex-shrink-0 rounded-lg flex items-center justify-center border ${
          isActive ? 'bg-success border-success/50' : 'bg-surface-bg border-surface-border'
        }`}
        animate={isActive ? { scale: [1, 1.15, 1] } : {}}
        transition={{ duration: 0.3, delay: index * 0.08 + 0.3 }}
      >
        {isActive && (
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
        )}
      </motion.div>
    </motion.div>
  );
}

/* ─── Exercise block (strength) ─────────────────────────────────────── */
function ExerciseBlock({ exercise }) {
  return (
    <motion.div variants={fadeUp} className="space-y-2">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-1 h-5 bg-primary rounded-full" />
        <div>
          <p className="text-surface-text text-sm font-semibold">{exercise.name}</p>
          <p className="text-surface-secondary text-xs">{exercise.note}</p>
        </div>
      </div>

      {/* Column headers */}
      <div className="flex items-center gap-3 px-3 text-xs text-surface-secondary font-medium">
        <span className="w-6 flex-shrink-0">Set</span>
        <span className="flex-1">Previous</span>
        <span className="w-10 text-center">kg</span>
        <span className="w-6 text-center">Reps</span>
        <span className="w-7 flex-shrink-0" />
      </div>

      <motion.div variants={stagger} initial="hidden" animate="visible" className="space-y-1.5">
        {exercise.sets.map((set, i) => (
          <SetRow key={i} set={set} index={i} />
        ))}
      </motion.div>
    </motion.div>
  );
}

/* ─── Split row (cardio) ────────────────────────────────────────────── */
function SplitRow({ row, index }) {
  return (
    <motion.div
      variants={slideRight}
      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl border transition-colors ${
        row.best && row.done
          ? 'bg-primary/10 border-primary/30'
          : row.done
          ? 'bg-surface-bg/50 border-surface-border/60'
          : 'bg-surface-bg/30 border-surface-border/40'
      }`}
    >
      {/* Badge */}
      <span
        className={`w-8 flex-shrink-0 rounded-lg flex items-center justify-center text-[10px] font-bold py-1 ${
          row.best
            ? 'bg-primary text-surface-lowest'
            : 'bg-surface-border text-surface-secondary'
        }`}
      >
        {row.label}
      </span>

      {/* Hint */}
      <span className="text-surface-secondary text-xs flex-1 truncate">{row.hint}</span>

      {/* Reference */}
      <span className="text-surface-secondary text-xs w-14 text-center">{row.ref}</span>

      {/* Actual value */}
      <span
        className={`text-sm font-bold w-12 text-center ${row.done ? 'text-surface-text' : 'text-surface-secondary'}`}
      >
        {row.done ? row.value : '—'}
      </span>

      {/* Done check */}
      <motion.div
        className={`w-7 h-7 flex-shrink-0 rounded-lg flex items-center justify-center border ${
          row.done ? 'bg-success border-success/50' : 'bg-surface-bg border-surface-border'
        }`}
        animate={row.done ? { scale: [1, 1.15, 1] } : {}}
        transition={{ duration: 0.3, delay: index * 0.08 + 0.3 }}
      >
        {row.done && (
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
        )}
      </motion.div>
    </motion.div>
  );
}

/* ─── Split block (cardio section) ──────────────────────────────────── */
function SplitBlock({ section }) {
  return (
    <motion.div variants={fadeUp} className="space-y-2">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-1 h-5 bg-primary rounded-full" />
        <div>
          <p className="text-surface-text text-sm font-semibold">{section.name}</p>
          <p className="text-surface-secondary text-xs">{section.note}</p>
        </div>
      </div>

      {/* Column headers */}
      <div className="flex items-center gap-3 px-3 text-xs text-surface-secondary font-medium">
        <span className="w-8 flex-shrink-0">{section.columns[0]}</span>
        <span className="flex-1">{section.columns[1]}</span>
        <span className="w-14 text-center">{section.columns[2]}</span>
        <span className="w-12 text-center">Actual</span>
        <span className="w-7 flex-shrink-0" />
      </div>

      <motion.div variants={stagger} initial="hidden" animate="visible" className="space-y-1.5">
        {section.rows.map((row, i) => (
          <SplitRow key={i} row={row} index={i} />
        ))}
      </motion.div>
    </motion.div>
  );
}

/* ─── Main modal ────────────────────────────────────────────────────── */
export default function WorkoutModal({ activity, onClose }) {
  const data = MODAL_DATA[activity?.id];
  const Icon = ICONS[activity?.icon];

  // Close on Escape + lock body scroll while open
  useEffect(() => {
    if (!activity) return;
    const handler = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [activity, onClose]);

  if (!data) return null;

  return (
    <AnimatePresence>
      {activity && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              key="modal"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              style={{ perspective: 1000 }}
              className="relative w-full max-w-md bg-surface-card rounded-2xl border border-surface-border overflow-hidden shadow-2xl pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Animated scan line */}
              <ScanLine color={data.accentColor} />

              {/* Top gradient glow */}
              <div className={`absolute top-0 left-0 right-0 h-32 bg-gradient-to-b ${data.gradientFrom} to-transparent pointer-events-none`} />

              {/* ── Header ── */}
              <div className="relative px-5 pt-5 pb-4 flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <motion.div
                    initial={{ scale: 0, rotate: -30 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', damping: 15, stiffness: 300, delay: 0.2 }}
                    className={`w-11 h-11 rounded-xl ${data.accentBg} border ${data.accentBorder} flex items-center justify-center ${data.accentClass}`}
                  >
                    {Icon && <Icon className="w-5 h-5" />}
                  </motion.div>
                  <div>
                    <motion.h2
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2, duration: 0.3 }}
                      className="text-surface-text text-lg font-bold"
                    >
                      {activity.title}
                    </motion.h2>
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      className="text-surface-secondary text-xs"
                    >
                      {data.subtitle ?? (data.type === 'strength' ? 'Strength Training' : 'Cardio Activity')}
                    </motion.p>
                  </div>
                </div>

                {/* Close */}
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                  onClick={onClose}
                  className="w-8 h-8 rounded-lg bg-surface-bg border border-surface-border flex items-center justify-center text-surface-secondary hover:text-surface-text hover:border-surface-text/30 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </motion.button>
              </div>

              {/* Divider */}
              <div className="h-px bg-surface-border mx-5" />

              {/* ── Body ── */}
              <div className="px-5 py-4 overflow-y-auto max-h-[60vh] space-y-5 scrollbar-hide">

                {/* ── SPLITS LAYOUT (Running / Walking / Cycling) ── */}
                {data.type === 'splits' && (
                  <motion.div variants={stagger} initial="hidden" animate="visible" className="space-y-5">
                    {/* Summary chips */}
                    <motion.div variants={fadeUp} className="flex items-center gap-2 flex-wrap">
                      {Object.entries(data.summary).map(([k, v]) => (
                        <span
                          key={k}
                          className={`text-xs font-semibold px-3 py-1.5 rounded-full ${data.accentBg} ${data.accentClass} border ${data.accentBorder}`}
                        >
                          {k} <span className="opacity-60 font-normal">{v}</span>
                        </span>
                      ))}
                    </motion.div>

                    {/* Split sections */}
                    <div className="space-y-5">
                      {data.sections.map((section, i) => (
                        <SplitBlock key={i} section={section} />
                      ))}
                    </div>

                    {/* Progress */}
                    <div className={`p-3.5 rounded-xl bg-surface-bg/50 border ${data.accentBorder}`}>
                      <ProgressBar
                        label={data.progress.label}
                        current={data.progress.current}
                        target={data.progress.target}
                        unit={data.progress.unit}
                        accentColor={data.accentColor}
                        accentClass={data.accentClass}
                      />
                    </div>
                  </motion.div>
                )}

                {/* ── STRENGTH LAYOUT ── */}
                {data.type === 'strength' && (
                  <motion.div variants={stagger} initial="hidden" animate="visible" className="space-y-5">
                    {/* Summary chips */}
                    <motion.div variants={fadeUp} className="flex items-center gap-2">
                      {Object.entries(data.summary).map(([k, v]) => (
                        <span
                          key={k}
                          className={`text-xs font-semibold px-3 py-1.5 rounded-full ${data.accentBg} ${data.accentClass} border ${data.accentBorder}`}
                        >
                          {v} <span className="opacity-60 font-normal capitalize">{k}</span>
                        </span>
                      ))}
                    </motion.div>

                    {/* Exercises */}
                    <div className="space-y-5">
                      {data.exercises.map((ex, i) => (
                        <ExerciseBlock key={i} exercise={ex} />
                      ))}
                    </div>

                    {/* Add Set row */}
                    <motion.button
                      variants={fadeUp}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-2.5 rounded-xl border border-dashed border-surface-border text-surface-secondary text-sm font-medium hover:border-primary/40 hover:text-primary transition-colors"
                    >
                      + Add Set
                    </motion.button>
                  </motion.div>
                )}
              </div>

              {/* ── Footer CTA ── */}
              <div className="px-5 pb-5 pt-3 border-t border-surface-border space-y-2.5">
                <motion.button
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.4 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full py-3 rounded-xl bg-primary text-surface-lowest text-sm font-bold tracking-wide hover:bg-primary-container transition-colors"
                >
                  {data.type === 'strength' ? 'Finish Workout' : 'Start Session'}
                </motion.button>
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onClose}
                  className="w-full py-2.5 rounded-xl border border-surface-border text-surface-secondary text-sm font-medium hover:text-surface-text hover:border-surface-text/30 transition-colors"
                >
                  View History
                </motion.button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
