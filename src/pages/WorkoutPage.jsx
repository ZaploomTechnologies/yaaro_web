import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';

// Mock data — replace with API call later
const MOCK_WORKOUT = {
  user: {
    username: 'kapil',
    displayName: 'Kapil Ramkhiladi Singh',
    avatar: null,
    activities: 453,
    followers: 757,
    following: 1154,
  },
  title: 'Test ttt',
  description: 'Hhgguuc jjvivgig biggivu bibibih',
  createdAt: 'Mar 18 at 4:38PM',
  location: 'Azamgarh - Uttar Pradesh',
  duration: '23min',
  volume: '1,119kg',
  setsCount: 8,
  muscleGroups: [
    { label: 'Back', percentage: 41 },
    { label: 'Shoulders', percentage: 6 },
    { label: 'Other', percentage: 53 },
  ],
  exercises: [
    {
      id: 1,
      name: 'Back Extension (Hyperextension)',
      supersetColor: null,
      sets: [
        { type: 'working', number: 1, reps: '6' },
        { type: 'working', number: 2, reps: '5' },
      ],
      columns: ['SET', 'REPS'],
    },
    {
      id: 2,
      name: 'Back Extension (Machine)',
      supersetColor: null,
      sets: [
        { type: 'working', number: 1, weight: '60kg', reps: '3' },
        { type: 'working', number: 2, weight: '45kg', reps: '5' },
      ],
      columns: ['SET', 'KG', 'REPS'],
    },
    {
      id: 3,
      name: 'Band Pullaparts',
      supersetColor: null,
      sets: [
        { type: 'working', number: 1, reps: '6' },
      ],
      columns: ['SET', 'REPS'],
    },
    {
      id: 4,
      name: 'Ball Slams',
      supersetColor: null,
      sets: [
        { type: 'working', number: 1, weight: '10kg', reps: '8' },
      ],
      columns: ['SET', 'KG', 'REPS'],
    },
  ],
};

const SUPERSET_COLORS = {
  purple: { badge: 'bg-purple-500/20 text-purple-400 border border-purple-500/30', bar: 'bg-purple-500' },
  green: { badge: 'bg-green-500/20 text-green-400 border border-green-500/30', bar: 'bg-green-500' },
  red: { badge: 'bg-red-500/20 text-red-400 border border-red-500/30', bar: 'bg-red-500' },
  yellow: { badge: 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30', bar: 'bg-yellow-500' },
};

function AvatarPlaceholder({ name, size = 'md' }) {
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
  const sizeClass = size === 'sm' ? 'w-12 h-12 text-base' : 'w-14 h-14 text-lg';
  return (
    <div className={`${sizeClass} rounded-xl bg-primary-low flex items-center justify-center shrink-0`}>
      <span className="font-bold text-primary">{initials}</span>
    </div>
  );
}

function SetRow({ set, index, colCount }) {
  const isEven = index % 2 === 0;
  const bg = isEven ? 'bg-surface-bg/30' : 'bg-transparent';

  return (
    <div 
      className={`grid divide-x divide-border/40 border-b border-border/40 last:border-b-0 ${bg}`}
      style={{ gridTemplateColumns: `repeat(${colCount}, minmax(0, 1fr))` }}
    >
      <div className="py-3 px-4 text-center text-sm font-semibold text-surface-secondary">
        {set.type === 'warmup' ? 'W' : set.number}
      </div>
      {set.weight && (
        <div className="py-3 px-4 text-center text-sm font-bold text-surface-text">
          {set.weight.replace('lbs', '').replace('kg', '')}
        </div>
      )}
      <div className="py-3 px-4 text-center text-sm font-semibold text-surface-text">
        {(set.reps || set.detail).replace(' reps', '')}
      </div>
    </div>
  );
}

function MuscleGroupsCard({ groups }) {
  if (!groups) return null;

  return (
    <div className="bg-surface-card rounded-2xl border border-border px-5 py-4 mb-6">
      <h2 className="text-xl font-bold text-white mb-6">Muscle Groups</h2>
      <div className="space-y-4">
        {groups.map((group) => (
          <div key={group.label} className="relative flex items-center justify-between">
            {/* Background Bar */}
            <div className="absolute inset-0 h-8 bg-surface-bg/50 rounded-lg overflow-hidden" />
            
            {/* Progress Bar (Olive color) */}
            <div 
              className="absolute inset-y-0 left-0 h-8 bg-[#4D5D2D] rounded-lg transition-all duration-700 ease-out" 
              style={{ width: `${group.percentage}%` }}
            />
            
            {/* Overlay Label & Percentage */}
            <div className="relative z-10 w-full flex items-center justify-between px-3 h-8">
              <span className="text-sm font-medium text-white">{group.label}</span>
              <span className="text-sm font-semibold text-surface-secondary">{group.percentage}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ExerciseBlock({ exercise }) {
  const superset = exercise.supersetColor ? SUPERSET_COLORS[exercise.supersetColor] : null;

  // Determine headers based on columns
  const headers = exercise.columns;
  const colCount = headers.length;

  return (
    <div className="mb-10 last:mb-0">
      {/* Exercise header */}
      <div className="flex items-center gap-4 mb-5">
        {/* Thumbnail - placeholder image */}
        <div className="w-14 h-14 rounded-xl overflow-hidden bg-surface-bg border border-border/50 shrink-0 flex items-center justify-center">
          <img 
            src={`https://api.dicebear.com/7.x/shapes/svg?seed=${exercise.name}&backgroundColor=333333`} 
            alt={exercise.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          {superset && (
            <span className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider mb-1.5 ${superset.badge}`}>
              Superset
            </span>
          )}
          <h3 className="text-lg font-bold text-white tracking-tight border-b-2 border-white/90 inline-block pb-0.5">
            {exercise.name}
          </h3>
        </div>
      </div>

      {/* Table Container */}
      <div className="border border-border/40 rounded-xl overflow-hidden bg-surface-bg/20">
        {/* Table Header */}
        <div 
          className="grid divide-x divide-border/40 border-b border-border/40 bg-surface-card/40"
          style={{ gridTemplateColumns: `repeat(${colCount}, minmax(0, 1fr))` }}
        >
          {headers.map((header) => (
            <div key={header} className="py-2.5 px-4 text-center text-[10px] font-bold text-surface-secondary uppercase tracking-widest">
              {header.includes('WEIGHT') ? (MOCK_WORKOUT.volume.includes('kg') ? 'KG' : 'LBS') : header}
            </div>
          ))}
        </div>

        {/* Set Row Data */}
        <div className="flex flex-col">
          {exercise.sets.map((set, i) => (
            <SetRow key={i} set={set} index={i} colCount={colCount} />
          ))}
        </div>
      </div>
    </div>
  );
}

function ProfileSidebar({ user }) {
  return (
    <div className="bg-surface-card rounded-2xl border border-border p-5 space-y-4">
      {/* User info */}
      <div className="flex items-center gap-3">
        {user.avatar ? (
          <img src={user.avatar} alt={user.displayName} className="w-12 h-12 rounded-xl object-cover" />
        ) : (
          <AvatarPlaceholder name={user.displayName} />
        )}
        <div>
          <p className="font-bold text-surface-text leading-tight">{user.displayName}</p>
        </div>
      </div>

      {/* Stats */}
      <div className="flex items-center justify-between text-center">
        {[
          { label: 'Activities', value: user.activities },
          { label: 'Followers', value: user.followers },
          { label: 'Following', value: user.following },
        ].map(({ label, value }, i, arr) => (
          <div key={label} className="flex items-center gap-4">
            <div className="flex flex-col items-center">
              <span className="text-lg font-bold text-surface-text">{value.toLocaleString()}</span>
              <span className="text-[10px] text-surface-secondary uppercase tracking-wide">{label}</span>
            </div>
            {i < arr.length - 1 && <div className="w-px h-8 bg-border" />}
          </div>
        ))}
      </div>

      {/* Download CTA */}
      <p className="text-xs text-surface-secondary leading-relaxed">
        To follow <span className="text-surface-text font-medium">{user.username}</span> and track your own workouts, download Yaaro for free.
      </p>

      <div className="flex flex-col gap-2">
        {/* App Store */}
        <motion.a
          href="#"
          whileTap={{ scale: 0.97 }}
          className="flex items-center gap-2.5 bg-black border border-[#333] rounded-xl px-4 py-2.5 hover:border-primary/40 transition-colors"
        >
          <svg width="18" height="22" viewBox="0 0 20 24" fill="white">
            <path d="M16.462 12.482c-.028-3.21 2.618-4.76 2.738-4.835-1.493-2.183-3.815-2.482-4.641-2.513-1.974-.2-3.862 1.17-4.865 1.17-.999 0-2.541-1.143-4.181-1.112-2.147.033-4.133 1.252-5.237 3.167C-1.873 12.12.713 18.4 2.83 21.81c1.056 1.524 2.31 3.232 3.956 3.17 1.594-.065 2.193-1.024 4.117-1.024 1.924 0 2.473 1.024 4.15.99 1.714-.028 2.798-1.545 3.843-3.073a16.4 16.4 0 0 0 1.749-3.558c-.04-.016-3.35-1.283-3.383-5.833ZM13.23 3.387C14.1 2.327 14.69.938 14.524-.5c-1.193.05-2.64.797-3.491 1.835-.77.9-1.444 2.337-1.263 3.715 1.329.102 2.688-.67 3.46-1.663Z" />
          </svg>
          <div className="text-left">
            <p className="text-[10px] text-gray-400 leading-none">Download on the</p>
            <p className="text-sm font-semibold text-white leading-tight">App Store</p>
          </div>
        </motion.a>

        {/* Google Play */}
        <motion.a
          href="#"
          whileTap={{ scale: 0.97 }}
          className="flex items-center gap-2.5 bg-black border border-[#333] rounded-xl px-4 py-2.5 hover:border-primary/40 transition-colors"
        >
          <svg width="18" height="20" viewBox="0 0 20 22" fill="none">
            <path d="M1.07.65C.67.87.4 1.3.4 1.85v18.3c0 .55.27.98.67 1.2l.1.06 10.25-10.25v-.24L1.17.59l-.1.06Z" fill="url(#gp-a2)" />
            <path d="m14.83 14.57-3.41-3.42v-.24l3.41-3.42.08.04 4.04 2.3c1.15.65 1.15 1.72 0 2.38l-4.04 2.3-.08.06Z" fill="url(#gp-b2)" />
            <path d="M14.91 14.51 11.42 11 1.07 21.35c.38.4.99.45 1.69.05l12.15-6.89" fill="url(#gp-c2)" />
            <path d="M14.91 7.49 2.76.6C2.06.19 1.45.25 1.07.65L11.42 11l3.49-3.51Z" fill="url(#gp-d2)" />
            <defs>
              <linearGradient id="gp-a2" x1="10.64" y1="1.77" x2="-3.73" y2="16.14" gradientUnits="userSpaceOnUse">
                <stop stopColor="#00A0FF" /><stop offset="1" stopColor="#00F" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="gp-b2" x1="20.3" y1="11" x2="9.76" y2="11" gradientUnits="userSpaceOnUse">
                <stop stopColor="#FFD900" /><stop offset="1" stopColor="#FF9100" />
              </linearGradient>
              <linearGradient id="gp-c2" x1="12.67" y1="12.83" x2="-2.83" y2="28.33" gradientUnits="userSpaceOnUse">
                <stop stopColor="#FF3A44" /><stop offset="1" stopColor="#C31162" />
              </linearGradient>
              <linearGradient id="gp-d2" x1="-1.07" y1="-3.82" x2="6.62" y2="3.87" gradientUnits="userSpaceOnUse">
                <stop stopColor="#32A071" /><stop offset="1" stopColor="#2DA771" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
          <div className="text-left">
            <p className="text-[10px] text-gray-400 leading-none">GET IT ON</p>
            <p className="text-sm font-semibold text-white leading-tight">Google Play</p>
          </div>
        </motion.a>
      </div>

    </div>
  );
}

export default function WorkoutPage() {
  const { workoutId } = useParams();
  const workout = MOCK_WORKOUT;
  const { user } = workout;

  return (
    <div className="min-h-screen bg-surface-bg flex flex-col">
      <main className="flex-1 max-w-5xl mx-auto w-full px-4 py-8">
        {/* Logo link consistent with Profile Page */}
        <div className="mb-10">
          <a href="/" className="inline-block hover:opacity-80 transition-opacity">
            <img src="/Yaaro-Logo.png" alt="Yaaro" width={84} />
          </a>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 items-start">
        {/* Left — workout content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          className="flex-1 w-full"
        >
          {/* Workout header */}
          <div className="bg-surface-card rounded-2xl border border-border px-5 py-4 mb-6">
            {/* User row */}
            <div className="flex items-start gap-3 mb-4">
              {user.avatar ? (
                <img src={user.avatar} alt={user.displayName} className="w-12 h-12 rounded-xl object-cover" />
              ) : (
                <AvatarPlaceholder name={user.displayName} size="sm" />
              )}
              <div className="pt-0.5">
                <p className="text-base font-bold text-surface-text mb-0.5 leading-tight">{user.displayName}</p>
                <div className="flex items-center gap-1.5 text-surface-secondary">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" className="shrink-0 opacity-80">
                    <path d="M6 6l12 12" />
                    <path d="M4 10l6-6" />
                    <path d="M14 20l6-6" />
                  </svg>
                  <span className="text-xs font-medium tracking-tight">
                    {workout.createdAt} <span className="mx-1">•</span> {workout.location}
                  </span>
                </div>
              </div>
            </div>

            {/* Title & Description */}
            <div className="mb-6">
              <h1 className="text-xl font-bold text-surface-text mb-1.5 tracking-tight">{workout.title}</h1>
              {workout.description && (
                <p className="text-sm text-surface-secondary leading-relaxed">{workout.description}</p>
              )}
            </div>

            {/* Meta Stats Grid */}
            <div className="grid grid-cols-3 gap-4 border-t border-border/40 pt-4">
              <div>
                <p className="text-[10px] text-surface-secondary font-semibold mb-0.5 opacity-70 uppercase tracking-wider">Time</p>
                <p className="text-lg font-bold text-surface-text tracking-tight">{workout.duration}</p>
              </div>
              <div>
                <p className="text-[10px] text-surface-secondary font-semibold mb-0.5 opacity-70 uppercase tracking-wider">Volume</p>
                <p className="text-lg font-bold text-surface-text tracking-tight">{workout.volume}</p>
              </div>
              <div>
                <p className="text-[10px] text-surface-secondary font-semibold mb-0.5 opacity-70 uppercase tracking-wider">Set</p>
                <p className="text-lg font-bold text-surface-text tracking-tight">{workout.setsCount}</p>
              </div>
            </div>
          </div>

          <MuscleGroupsCard groups={workout.muscleGroups} />

          {/* Exercises */}
          <div className="bg-surface-card rounded-2xl border border-border p-5">
            {workout.exercises.map((exercise) => (
              <ExerciseBlock key={exercise.id} exercise={exercise} />
            ))}
          </div>
        </motion.div>

        {/* Right — sticky profile sidebar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: 'easeOut', delay: 0.1 }}
          className="w-full lg:w-72 lg:sticky lg:top-6"
        >
          <ProfileSidebar user={user} />
        </motion.div>
      </div>
    </main>

      <footer className="w-full px-4 py-4 border-t border-border text-center">
        <p className="text-xs text-surface-secondary">
          &copy; {new Date().getFullYear()} Yaaro. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
