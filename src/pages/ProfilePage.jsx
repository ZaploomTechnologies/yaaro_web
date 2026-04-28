import { motion } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ICONS } from '../components/Icons';

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
  const safeName = typeof name === 'string' ? name : 'Y';
  const initials = safeName
    .trim()
    .split(' ')
    .filter(Boolean)
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2) || 'Y';

  return (
    <div className="w-full h-full bg-primary-low flex items-center justify-center">
      <span className="text-3xl font-bold text-primary">{initials}</span>
    </div>
  );
}


export default function ProfilePage() {
  const { userId } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:3100/api/frontend';
        const response = await fetch(`${baseUrl}/users/${userId}`);
        
        if (!response.ok) {
          throw new Error('Profile not found');
        }
        
        const result = await response.json();
        setProfile(result);
      } catch (err) {
        console.error('Error fetching profile:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchProfile();
    }
  }, [userId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
          <p className="text-surface-secondary text-sm animate-pulse">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6 text-center">
        <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mb-6">
          <AlertIcon className="w-10 h-10 text-red-500" />
        </div>
        <h1 className="text-2xl font-bold text-white mb-2">Profile Not Found</h1>
        <p className="text-surface-secondary mb-8 max-w-xs">
          The user profile you're looking for might have been removed or the link is incorrect.
        </p>
        <Link to="/" className="bg-primary text-black font-bold px-8 py-3 rounded-full hover:scale-105 transition-transform">
          Back to Home
        </Link>
      </div>
    );
  }

  const locationStr = profile.city ? `${profile.city}, ${profile.state || ''}, ${profile.country || ''}`.replace(/, ,/g, ',').replace(/^, |, $/g, '') : null;

  return (
    <div className="min-h-screen bg-black flex flex-col">
      {/* Main Content */}
      <main className="flex-1 flex flex-col px-4 pt-12 md:pt-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="w-full max-w-xl mx-auto"
        >
          {/* Logo link at section level */}
          <div className="mb-12">
            <Link to="/" className="inline-block hover:opacity-80 transition-opacity">
              <img src="/Yaaro-Logo.png" alt="Yaaro" width={84} />
            </Link>
          </div>

          {/* Name Display */}
          <div className="mb-10">
             <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
              {profile.fullName}
            </h1>
          </div>

          {/* Square Image + Stats Row */}
          <div className="flex flex-col sm:flex-row items-start gap-8 mb-10">
            {/* Square Avatar */}
            <div className="w-28 h-28 rounded-3xl overflow-hidden bg-surface-card shrink-0 border border-white/5">
              {profile.profileImage && !imgError ? (
                <img
                  src={profile.profileImage}
                  alt={profile.fullName}
                  className="w-full h-full object-cover"
                  onError={() => setImgError(true)}
                />
              ) : (
                <AvatarPlaceholder name={profile.fullName} />
              )}
            </div>

            {/* Stats */}
            <div className="flex gap-10 pt-2">
              <StatItem label="Activities" value={profile.activityCount || 0} />
              <StatItem label="Followers" value={profile.followers || 0} />
              <StatItem label="Following" value={profile.following || 0} />
            </div>
          </div>

          {/* Location & Bio */}
          <div className="space-y-4 mb-10">
            {locationStr && (
              <div className="flex items-center gap-2 text-surface-secondary">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-gray-500">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
                  <circle cx="12" cy="9" r="2.5"/>
                </svg>
                <span className="text-base text-gray-400">{locationStr}</span>
              </div>
            )}
            {profile.bio && (
              <p className="text-base text-gray-300 leading-relaxed max-w-sm">
                {profile.bio}
              </p>
            )}
          </div>

          {/* Download CTA - Moved to bottom area */}
          <div className="bg-surface-card/40 backdrop-blur-sm rounded-3xl px-6 py-8 border border-white/5 text-center space-y-5">
            <h2 className="text-xl font-bold text-gradient leading-tight">
              Explore more of {profile.userName}&apos;s workouts!
            </h2>
            <p className="text-sm text-surface-secondary leading-relaxed max-w-xs mx-auto">
              To view {profile.userName}&apos;s full profile and track your journey, download Yaaro for free.
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
