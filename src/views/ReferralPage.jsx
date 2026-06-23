'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { apiUrl } from '../lib/api';

// Referral code format: exactly 3 uppercase letters + 4 digits (e.g. AAA0000)
const REFERRAL_CODE_REGEX = /^[A-Z]{3}\d{4}$/;

function normalizeCode(raw) {
  if (!raw) return null;
  const clean = String(raw).trim().toUpperCase().replace(/[^A-Z0-9]/g, '');
  return REFERRAL_CODE_REGEX.test(clean) ? clean : null;
}

/* ---------- Avatar fallback ---------- */
function AvatarPlaceholder({ name }) {
  const initials = (typeof name === 'string' ? name : 'Y')
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

/* ---------- App Store buttons (reused from ProfilePage) ---------- */
function AppStoreButtons() {
  return (
    <div className="flex items-center justify-center gap-3 flex-wrap">
      {/* App Store */}
      <motion.a
        href="https://apps.apple.com/in/app/yaaro-fit-run-cycle-workout/id6763996078"
        target="_blank"
        rel="noopener noreferrer"
        whileTap={{ scale: 0.96 }}
        className="flex items-center gap-2.5 bg-black border border-[#333] rounded-xl px-5 py-3 hover:border-primary/40 transition-colors"
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
        href="https://play.google.com/store/apps/details?id=com.yaaro.fit"
        target="_blank"
        rel="noopener noreferrer"
        whileTap={{ scale: 0.96 }}
        className="flex items-center gap-2.5 bg-black border border-[#333] rounded-xl px-5 py-3 hover:border-primary/40 transition-colors"
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
  );
}

/* ---------- Main component ---------- */
export default function ReferralPage({ referralCode: rawCode, initialData }) {
  const code = normalizeCode(rawCode ?? initialData?.referralCode);

  // When the server already fetched and passed data, start in success state immediately
  const [state, setState] = useState(
    initialData ? 'success' : (code ? 'loading' : 'invalid')
  );
  const [referrer, setReferrer] = useState(initialData || null);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    // Skip fetch when the server already passed data
    if (initialData) return;

    // Client-side format validation — avoids a pointless network round-trip
    if (!code) {
      setState('invalid');
      return;
    }

    const controller = new AbortController();

    const fetchReferrer = async () => {
      try {
        setState('loading');
        const res = await fetch(apiUrl(`/referral/${code}`), {
          signal: controller.signal,
        });

        if (res.status === 404) {
          setState('notfound');
          return;
        }
        if (!res.ok) {
          setState('invalid');
          return;
        }

        const data = await res.json();
        setReferrer(data);
        setState('success');
      } catch (err) {
        if (err.name !== 'AbortError') {
          setState('notfound');
        }
      }
    };

    fetchReferrer();
    return () => controller.abort();
  }, [code, initialData]);

  /* ---- Loading ---- */
  if (state === 'loading') {
    return (
      <div className="min-h-screen bg-surface-bg flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
          <p className="text-surface-secondary text-sm animate-pulse">Loading referral…</p>
        </div>
      </div>
    );
  }

  /* ---- Invalid format ---- */
  if (state === 'invalid') {
    return (
      <div className="min-h-screen bg-surface-bg flex flex-col items-center justify-center p-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-sm"
        >
          <div className="w-20 h-20 bg-danger/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#FF4D4D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Invalid Referral Code</h1>
          <p className="text-surface-secondary mb-8 max-w-xs mx-auto">
            The referral code <strong className="text-white">{rawCode || '(none)'}</strong> is not
            a valid Yaaro referral code. Please check the link and try again.
          </p>
          <Link
            href="/"
            className="inline-block bg-primary text-black font-bold px-8 py-3 rounded-full hover:scale-105 transition-transform"
          >
            Back to Home
          </Link>
        </motion.div>
      </div>
    );
  }

  /* ---- Not found ---- */
  if (state === 'notfound') {
    return (
      <div className="min-h-screen bg-surface-bg flex flex-col items-center justify-center p-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-sm"
        >
          <div className="w-20 h-20 bg-danger/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#FF4D4D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
              <line x1="12" y1="9" x2="12" y2="13" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Code Not Found</h1>
          <p className="text-surface-secondary mb-8 max-w-xs mx-auto">
            Referral code <strong className="text-white">{rawCode}</strong> doesn&apos;t exist or
            may have been deactivated. Double-check the code with the person who sent it.
          </p>
          <Link
            href="/"
            className="inline-block bg-primary text-black font-bold px-8 py-3 rounded-full hover:scale-105 transition-transform"
          >
            Back to Home
          </Link>
        </motion.div>
      </div>
    );
  }

  /* ---- Success ---- */
  const steps = [
    { n: 1, text: 'Download Yaaro from the App Store or Google Play' },
    { n: 2, text: 'Sign up and create your account' },
    { n: 3, text: 'Tap your profile in the top right of the screen' },
    { n: 4, text: 'Click "Enter Referral Code" and type in' },
    { n: 5, text: 'Once you have applied the referral code, you will receive 500 bonus points!' },
  ];

  return (
    <div className="min-h-screen bg-surface-bg flex flex-col">
      {/* ── Header ── */}
      <header className="w-full px-6 py-4 flex items-center justify-between border-b border-border">
        <Link href="/" className="inline-block hover:opacity-80 transition-opacity">
          <img src="/Yaaro-Logo.png" alt="Yaaro" width={80} />
        </Link>
        <motion.a
          href="#"
          whileTap={{ scale: 0.96 }}
          className="text-sm font-semibold bg-primary text-black px-4 py-2 rounded-full hover:opacity-90 transition-opacity"
        >
          Download App
        </motion.a>
      </header>

      {/* ── Main ── */}
      <main className="flex-1 flex flex-col items-center px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          className="w-full max-w-md flex flex-col items-center text-center gap-6"
        >
          {/* Profile photo */}
          <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-primary/30 shrink-0">
            {referrer.profileImage && !imgError ? (
              <img
                src={referrer.profileImage}
                alt={referrer.fullName}
                className="w-full h-full object-cover"
                onError={() => setImgError(true)}
              />
            ) : (
              <AvatarPlaceholder name={referrer.fullName} />
            )}
          </div>

          {/* Name + invite text */}
          <div className="space-y-1">
            <p className="text-xl font-bold text-white">{referrer.fullName}</p>
            <p className="text-surface-secondary text-base">invites you to join Yaaro</p>
          </div>

          {/* Download buttons */}
          <AppStoreButtons />

          {/* Divider */}
          <div className="w-full h-px bg-border" />

          {/* How to join */}
          <div className="w-full text-left space-y-4">
            <h2 className="text-center text-lg font-bold text-primary tracking-wide">
              How to join Yaaro
            </h2>

            <ol className="space-y-3">
              {steps.map((step) => (
                <li key={step.n} className="flex items-start gap-3">
                  <span className="mt-0.5 w-6 h-6 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center shrink-0 text-xs font-bold text-primary">
                    {step.n}
                  </span>
                  <span className="text-surface-secondary text-sm leading-relaxed">
                    {step.text}
                  </span>
                </li>
              ))}
            </ol>

            {/* Referral code callout — sits between step 4 and step 5 */}
            <div className="bg-surface-card border border-primary/20 rounded-2xl px-6 py-5 text-center space-y-1">
              <p className="text-xs text-surface-secondary uppercase tracking-widest">
                Your referral code
              </p>
              <p className="text-4xl font-extrabold text-primary tracking-widest">
                {referrer.referralCode}
              </p>
            </div>
          </div>
        </motion.div>
      </main>

      {/* ── Footer ── */}
      <footer className="w-full px-4 py-4 border-t border-border text-center">
        <p className="text-xs text-surface-secondary">
          &copy; {new Date().getFullYear()} Yaaro. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
