import { motion } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import { ICONS } from '../components/Icons';

import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

export default function ClubPage() {
  const { clubId } = useParams();
  const [club, setClub] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClub = async () => {
      try {
        setLoading(true);
        const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:3100/api/frontend';
        const response = await fetch(`${baseUrl}/clubs/${clubId}`);

        if (!response.ok) {
          throw new Error('Club not found');
        }

        const result = await response.json();
        setClub(result);
      } catch (err) {
        console.error('Error fetching club:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (clubId) {
      fetchClub();
    }
  }, [clubId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
          <p className="text-surface-secondary text-sm animate-pulse">Loading club details...</p>
        </div>
      </div>
    );
  }

  if (error || !club) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6 text-center">
        <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mb-6">
          <ICONS.alert className="w-10 h-10 text-red-500" />
        </div>
        <h1 className="text-2xl font-bold text-white mb-2">Oops! Club Not Found</h1>
        <p className="text-surface-secondary mb-8 max-w-xs">
          The club you're looking for might have been removed or the link is incorrect.
        </p>
        <Link to="/" className="bg-primary text-black font-bold px-8 py-3 rounded-full hover:scale-105 transition-transform">
          Back to Home
        </Link>
      </div>
    );
  }

  const SportsIcon = ICONS[club.sportType] || ICONS.run;
  const bannerImage = club.coverImageUrl || club.imageUrl || 'https://images.unsplash.com/photo-1594737625785-a6cbdabd333c?w=1200&q=80';
  const logoUrl = club.imageUrl || null;

  return (
    <div className="min-h-screen bg-black flex flex-col">
      <Helmet>
        <title>{club.title} | {club.location.city || club.location.state || club.location.country}</title>
        <meta name="description" content={club.description || `Join ${club.title} on Yaaro - The fitness app that rewards your hustle.`} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={`${club.title} | ${club.location.city || club.location.state || club.location.country}`} />
        <meta property="og:description" content={club.description || `Join ${club.title} on Yaaro.`} />
        <meta property="og:image" content={bannerImage} />
        <meta property="og:url" content={window.location.href} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${club.title} | ${club.location.city || club.location.state || club.location.country}`} />
        <meta name="twitter:description" content={club.description || `Join ${club.title} on Yaaro.`} />
        <meta name="twitter:image" content={bannerImage} />
      </Helmet>

      {/* Banner Section Wrapper - No overflow-hidden here so logo can peak out */}
      <div className="relative w-full h-80 md:h-[420px]">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src={bannerImage}
            alt={club.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>

        {/* Logo - Positioned at bottom left, overlapping. Now inside a centered container to match content alignment. */}
        <div className="absolute -bottom-14 inset-x-0 z-10 pointer-events-none">
          <div className="max-w-4xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="w-28 h-28 md:w-36 md:h-36 rounded-3xl border-[6px] border-black overflow-hidden bg-surface-card shadow-2xl flex items-center justify-center pointer-events-auto"
            >
              {logoUrl ? (
                <img src={logoUrl} alt={club.title} className="w-full h-full object-cover" />
              ) : (
                <div className="flex flex-col items-center justify-center">
                  <span className="text-4xl md:text-5xl font-black text-primary tracking-tighter">
                    {club.title.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
                  </span>
                  <div className="w-8 h-1 bg-primary/30 rounded-full mt-1" />
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-4xl mx-auto px-6 pt-16 md:pt-20 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          {/* Logo link to home */}
          <div className="mb-8">
            <Link to="/" className="inline-block hover:opacity-80 transition-opacity">
              <img src="/Yaaro-Logo.png" alt="Yaaro" width={84} />
            </Link>
          </div>

          {/* Club Info */}
          <div className="space-y-6">
            <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
              {club.title}
            </h1>

            {/* Icon + Location Row */}
            <div className="flex items-center gap-4 text-surface-secondary">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20 shadow-[0_0_15px_rgba(163,230,53,0.1)]">
                <SportsIcon className="w-7 h-7" />
              </div>
              <div className="flex items-center gap-1.5">
                <ICONS.pin className="w-4 h-4 text-gray-500" />
                <span className="text-base text-gray-400 font-medium">
                  {club.location?.city ? `${club.location.city}, ${club.location.state}` : 'Global Community'}
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="max-w-2xl">
              <p className="text-lg text-gray-300 leading-relaxed">
                {club.description}
              </p>
            </div>
          </div>

          {/* Download CTA Section */}
          <div className="mt-16 bg-surface-card/40 backdrop-blur-sm rounded-3xl p-8 border border-white/5 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-3">
              <h2 className="text-2xl font-bold text-gradient">
                Join {club.title}!
              </h2>
              <p className="text-surface-secondary text-sm max-w-sm">
                Download Yaaro to join this club, participate in challenges, and connect with other members.
              </p>
            </div>

            <div className="flex items-center gap-3 flex-wrap justify-center">
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
                  <path d="M1.07.65C.67.87.4 1.3.4 1.85v18.3c0 .55.27.98.67 1.2l.1.06 10.25-10.25v-.24L1.17.59l-.1.06Z" fill="url(#gp-a-club)" />
                  <path d="m14.83 14.57-3.41-3.42v-.24l3.41-3.42.08.04 4.04 2.3c1.15.65 1.15 1.72 0 2.38l-4.04 2.3-.08.06Z" fill="url(#gp-b-club)" />
                  <path d="M14.91 14.51 11.42 11 1.07 21.35c.38.4.99.45 1.69.05l12.15-6.89" fill="url(#gp-c-club)" />
                  <path d="M14.91 7.49 2.76.6C2.06.19 1.45.25 1.07.65L11.42 11l3.49-3.51Z" fill="url(#gp-d-club)" />
                  <defs>
                    <linearGradient id="gp-a-club" x1="10.64" y1="1.77" x2="-3.73" y2="16.14" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#00A0FF" />
                      <stop offset="1" stopColor="#00F" stopOpacity="0" />
                    </linearGradient>
                    <linearGradient id="gp-b-club" x1="20.3" y1="11" x2="9.76" y2="11" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#FFD900" />
                      <stop offset="1" stopColor="#FF9100" />
                    </linearGradient>
                    <linearGradient id="gp-c-club" x1="12.67" y1="12.83" x2="-2.83" y2="28.33" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#FF3A44" />
                      <stop offset="1" stopColor="#C31162" />
                    </linearGradient>
                    <linearGradient id="gp-d-club" x1="-1.07" y1="-3.82" x2="6.62" y2="3.87" gradientUnits="userSpaceOnUse">
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
      <footer className="w-full px-4 py-6 border-t border-border/40 text-center mt-auto">
        <p className="text-xs text-surface-secondary">
          &copy; {new Date().getFullYear()} Yaaro. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
