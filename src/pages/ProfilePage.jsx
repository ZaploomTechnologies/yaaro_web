import { motion } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';

// Mock data — replace with API call later
const MOCK_PROFILE = {
  username: 'Kapil',
  displayName: 'Kapil Ramkhiladi Singh ',
  avatar: null, // null = show initials placeholder
  activities: 453,
  followers: 757,
  following: 1154,
  location: 'Azamgarh, Uttar Pradesh, India',
  description: 'Founder of Yaaro. Love to connect with people.',
};

function StatItem({ label, value }) {
  return (
    <div className="flex flex-col items-start gap-0.5">
      <span className="text-[13px] text-surface-secondary font-medium">
        {label}
      </span>
      <span className="text-xl font-bold text-surface-text">
        {value.toLocaleString()}
      </span>
    </div>
  );
}


function AvatarPlaceholder({ name }) {
  const initials = name
    .trim()
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="w-full h-full bg-primary-low flex items-center justify-center">
      <span className="text-3xl font-bold text-primary">{initials}</span>
    </div>
  );
}


export default function ProfilePage() {
  const { username } = useParams();

  // In the future, fetch profile by username from backend
  const profile = MOCK_PROFILE;

  return (
    <div className="min-h-screen bg-black flex flex-col">
      {/* Main Content */}
      <main className="flex-1 flex flex-col px-4 pt-12 md:pt-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="w-full max-w-xl mx-auto"
        >
          {/* Logo link at section level */}
          <div className="mb-10">
            <Link to="/" className="inline-block hover:opacity-80 transition-opacity">
              <img src="/Yaaro-Logo.png" alt="Yaaro" width={84} />
            </Link>
          </div>

          {/* Name Display */}
          <h1 className="text-3xl font-bold text-white mb-8 tracking-tight">
            {profile.displayName}
          </h1>

          {/* Square Image + Stats Row */}
          <div className="flex items-start gap-8 mb-8">
            {/* Square Avatar */}
            <div className="w-28 h-28 rounded-2xl overflow-hidden bg-surface-card shrink-0">
              {profile.avatar ? (
                <img
                  src={profile.avatar}
                  alt={profile.displayName}
                  className="w-full h-full object-cover"
                />
              ) : (
                <AvatarPlaceholder name={profile.displayName} />
              )}
            </div>

            {/* Stats */}
            <div className="flex gap-10 pt-2">
              <StatItem label="Activities" value={profile.activities} />
              <StatItem label="Followers" value={profile.followers} />
              <StatItem label="Following" value={profile.following} />
            </div>
          </div>

          {/* Location & Bio */}
          <div className="space-y-4 mb-10">
            {profile.location && (
              <div className="flex items-center gap-2 text-surface-secondary">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-gray-500">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
                  <circle cx="12" cy="9" r="2.5"/>
                </svg>
                <span className="text-base text-gray-400">{profile.location}</span>
              </div>
            )}
            {profile.description && (
              <p className="text-base text-gray-300 leading-relaxed max-w-sm">
                {profile.description}
              </p>
            )}
          </div>

          {/* Download CTA - Moved to bottom area */}
          <div className="bg-surface-card/40 backdrop-blur-sm rounded-3xl px-6 py-8 border border-white/5 text-center space-y-5">
            <h2 className="text-xl font-bold text-gradient leading-tight">
              Explore more of {profile.username}&apos;s workouts!
            </h2>
            <p className="text-sm text-surface-secondary leading-relaxed max-w-xs mx-auto">
              To view {profile.username}&apos;s full profile and track your journey, download Yaaro for free.
            </p>


            <div className="flex items-center justify-center gap-3 flex-wrap pt-1">
              {/* App Store */}
              <motion.a
                href="#"
                whileTap={{ scale: 0.96 }}
                className="flex items-center gap-2.5 bg-black border border-[#333] rounded-xl px-4 py-2.5 hover:border-primary/40 transition-colors"
              >
                <svg width="20" height="24" viewBox="0 0 20 24" fill="white">
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
                whileTap={{ scale: 0.96 }}
                className="flex items-center gap-2.5 bg-black border border-[#333] rounded-xl px-4 py-2.5 hover:border-primary/40 transition-colors"
              >
                <svg width="20" height="22" viewBox="0 0 20 22" fill="none">
                  <path d="M1.07.65C.67.87.4 1.3.4 1.85v18.3c0 .55.27.98.67 1.2l.1.06 10.25-10.25v-.24L1.17.59l-.1.06Z" fill="url(#gp-a)" />
                  <path d="m14.83 14.57-3.41-3.42v-.24l3.41-3.42.08.04 4.04 2.3c1.15.65 1.15 1.72 0 2.38l-4.04 2.3-.08.06Z" fill="url(#gp-b)" />
                  <path d="M14.91 14.51 11.42 11 1.07 21.35c.38.4.99.45 1.69.05l12.15-6.89" fill="url(#gp-c)" />
                  <path d="M14.91 7.49 2.76.6C2.06.19 1.45.25 1.07.65L11.42 11l3.49-3.51Z" fill="url(#gp-d)" />
                  <defs>
                    <linearGradient id="gp-a" x1="10.64" y1="1.77" x2="-3.73" y2="16.14" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#00A0FF" />
                      <stop offset="1" stopColor="#00F" stopOpacity="0" />
                    </linearGradient>
                    <linearGradient id="gp-b" x1="20.3" y1="11" x2="9.76" y2="11" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#FFD900" />
                      <stop offset="1" stopColor="#FF9100" />
                    </linearGradient>
                    <linearGradient id="gp-c" x1="12.67" y1="12.83" x2="-2.83" y2="28.33" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#FF3A44" />
                      <stop offset="1" stopColor="#C31162" />
                    </linearGradient>
                    <linearGradient id="gp-d" x1="-1.07" y1="-3.82" x2="6.62" y2="3.87" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#32A071" />
                      <stop offset="1" stopColor="#2DA771" stopOpacity="0" />
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
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="w-full px-4 py-4 border-t border-border text-center">
        <p className="text-xs text-surface-secondary">
          &copy; {new Date().getFullYear()} Yaaro. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
