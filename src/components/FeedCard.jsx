'use client';

import Link from 'next/link';
import { useState } from 'react';

/* ---------- formatting helpers ---------- */

const formatDuration = (seconds) => {
  const s = Number(seconds);
  if (!s || Number.isNaN(s)) return '0min';
  const mins = Math.floor(s / 60);
  if (mins < 60) return `${mins}min`;
  const hrs = Math.floor(mins / 60);
  return `${hrs}h ${mins % 60}m`;
};

const formatStat = (activity, data) => {
  const num = Number(data);
  const hasNum = data !== '' && data != null && !Number.isNaN(num);
  switch (activity) {
    case 'Time':
      return formatDuration(data);
    case 'Volume':
      return hasNum ? `${num.toLocaleString()}kg` : `${data}`;
    case 'Calories':
      return hasNum ? `${Math.round(num).toLocaleString()} kcal` : `${data}`;
    case 'Distance':
      return hasNum ? `${(num / 1000).toFixed(2)} km` : `${data}`;
    case 'Steps':
      return hasNum ? num.toLocaleString() : `${data}`;
    case 'Elevation Gain':
      return hasNum ? `${Math.round(num)} m` : `${data}`;
    case 'Set':
      return hasNum ? `${num}` : `${data}`;
    default:
      return `${data}`;
  }
};

const formatWhen = (date) => {
  if (!date) return '';
  const d = new Date(typeof date === 'number' ? date : date);
  if (Number.isNaN(d.getTime())) return '';
  const day = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  const time = d
    .toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })
    .replace(' ', '');
  return `${day} at ${time}`;
};

/* ---------- sub components ---------- */

function AvatarPlaceholder({ name, className }) {
  const safe = typeof name === 'string' && name.trim() ? name : 'Y';
  const initials =
    safe
      .trim()
      .split(' ')
      .filter(Boolean)
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2) || 'Y';
  return (
    <div className={`${className} bg-primary/20 flex items-center justify-center`}>
      <span className="font-bold text-primary text-sm">{initials}</span>
    </div>
  );
}

function DumbbellIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <path d="M6 6l12 12M4.5 9.5l-1 1M14.5 19.5l-1 1M9.5 4.5l-1 1M19.5 14.5l-1 1" />
    </svg>
  );
}

function ExerciseRow({ exercise }) {
  const [broken, setBroken] = useState(false);
  return (
    <div className="flex items-center gap-3 min-w-0">
      <div className="w-11 h-11 rounded-xl bg-white shrink-0 overflow-hidden flex items-center justify-center">
        {exercise.thumbnailUrl && !broken ? (
          <img
            src={exercise.thumbnailUrl}
            alt={exercise.title}
            className="w-full h-full object-cover"
            onError={() => setBroken(true)}
          />
        ) : (
          <span className="text-[#14140F] text-xs font-bold">
            {(exercise.title || '?').slice(0, 2)}
          </span>
        )}
      </div>
      <div className="min-w-0">
        <p className="text-[15px] font-medium text-surface-text truncate">{exercise.title}</p>
        <p className="text-[13px] text-surface-secondary">
          {exercise.totalSet} {exercise.totalSet === 1 ? 'set' : 'sets'}
        </p>
      </div>
    </div>
  );
}

/* ---------- card ---------- */

export default function FeedCard({ feed }) {
  const [avatarBroken, setAvatarBroken] = useState(false);
  const [mediaBroken, setMediaBroken] = useState(false);

  if (!feed) return null;

  const user = feed.user || {};
  const location =
    user.city && user.state
      ? `${user.city} - ${user.state}`
      : user.city || user.state || '';

  // Stats — keep the meaningful ones, in the app's order
  const preferredOrder = ['Time', 'Volume', 'Set', 'Calories', 'Distance', 'Avg Pace', 'Steps'];
  const stats = (feed.activityData || [])
    .filter((s) => s && s.data !== '' && s.data != null)
    .sort((a, b) => {
      const ia = preferredOrder.indexOf(a.activity);
      const ib = preferredOrder.indexOf(b.activity);
      return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib);
    })
    .slice(0, 4);

  const exercises = feed.exercises || [];
  const visibleExercises = exercises.slice(0, 4);
  const moreExercises = Math.max(0, (feed.exerciseCount ?? exercises.length) - visibleExercises.length);

  const mediaUrl = feed.media?.[0]?.url || (typeof feed.media?.[0] === 'string' ? feed.media[0] : '');
  const showMedia = mediaUrl && !mediaBroken;
  const hasExercises = exercises.length > 0;
  const title = feed.title || `${feed.activityType || 'Activity'}`.replace(/^\w/, (c) => c.toUpperCase());

  const kudos = feed.kudosCount || 0;
  const kudosAvatars = feed.kudosAvatars || [];

  return (
    <div>
      <Link
        href={feed.id ? `/activities/${feed.id}` : '#'}
        className="block rounded-3xl bg-[#171717] border border-white/[0.06] p-5 shadow-[0_30px_60px_-40px_rgba(0,0,0,0.6)] hover:border-white/10 transition-colors"
      >
        {/* Header */}
        <div className="flex items-start gap-3 mb-4">
          <div className="w-11 h-11 rounded-xl overflow-hidden shrink-0">
            {user.profileImage && !avatarBroken ? (
              <img
                src={user.profileImage}
                alt={user.userName}
                className="w-full h-full object-cover"
                onError={() => setAvatarBroken(true)}
              />
            ) : (
              <AvatarPlaceholder name={user.fullName || user.userName} className="w-full h-full rounded-xl" />
            )}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[15px] font-semibold text-surface-text leading-tight">
              {user.userName || user.fullName}
            </p>
            <div className="flex items-center gap-1.5 text-surface-secondary mt-0.5">
              <DumbbellIcon className="w-3.5 h-3.5 shrink-0 opacity-80" />
              <span className="text-[13px] truncate">
                {formatWhen(feed.date || feed.createdAt)}
                {location && <span className="mx-1.5">•</span>}
                {location}
              </span>
            </div>
          </div>
        </div>

        {/* Title + description */}
        <h3 className="text-xl font-bold text-surface-text tracking-tight">{title}</h3>
        {feed.description && (
          <p className="text-[15px] text-surface-secondary mt-1 leading-relaxed">{feed.description}</p>
        )}

        {/* Stats */}
        {stats.length > 0 && (
          <div className="flex flex-wrap gap-x-8 gap-y-3 mt-4">
            {stats.map((s) => (
              <div key={s.activity}>
                <p className="text-[13px] text-surface-secondary mb-0.5">{s.activity}</p>
                <p className="text-lg font-bold text-surface-text tracking-tight">
                  {formatStat(s.activity, s.data)}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Media + exercises */}
        {(showMedia || hasExercises) && (
          <div className="flex gap-3 mt-4">
            {showMedia && (
              <div
                className={`${hasExercises ? 'w-[42%] aspect-square' : 'w-full aspect-video'} shrink-0 rounded-2xl overflow-hidden bg-white/5`}
              >
                <img
                  src={mediaUrl}
                  alt={title}
                  className="w-full h-full object-cover"
                  onError={() => setMediaBroken(true)}
                />
              </div>
            )}

            {hasExercises && (
              <div className="relative flex-1 min-w-0 rounded-2xl border border-primary/15 p-4 overflow-hidden">
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      'radial-gradient(120% 80% at 100% 100%, rgba(208,234,89,0.14), transparent 60%)',
                  }}
                />
                <div className="relative space-y-3.5">
                  {visibleExercises.map((ex, i) => (
                    <ExerciseRow key={ex.id || i} exercise={ex} />
                  ))}
                  {moreExercises > 0 && (
                    <p className="text-[15px] text-surface-secondary pt-0.5">
                      +{moreExercises} more {moreExercises === 1 ? 'exercise' : 'exercises'}
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/[0.06]">
          <div className="flex items-center gap-2 min-w-0">
            {kudosAvatars.length > 0 ? (
              <div className="flex -space-x-2">
                {kudosAvatars.slice(0, 3).map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt=""
                    className="w-6 h-6 rounded-full object-cover border border-[#171717]"
                  />
                ))}
              </div>
            ) : null}
            <span className="text-[13px] text-surface-secondary truncate">
              {kudos > 0
                ? `${kudos.toLocaleString()} gave kudos`
                : 'Be the first to give kudos'}
            </span>
          </div>
          <div className="flex items-center gap-4 text-primary shrink-0">
            {/* thumbs up */}
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 10v11M2 13v6a2 2 0 0 0 2 2h13.5a2 2 0 0 0 1.97-1.64l1.36-7A2 2 0 0 0 19.86 10H14V5a3 3 0 0 0-3-3l-4 8" />
            </svg>
            {/* share */}
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 3v13M8 7l4-4 4 4M4 14v5a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5" />
            </svg>
          </div>
        </div>
      </Link>
    </div>
  );
}
