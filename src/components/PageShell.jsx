'use client';

import Link from 'next/link';

const APP_STORE_URL =
  'https://apps.apple.com/in/app/yaaro-fit-run-cycle-workout/id6763996078';

const NAV = [
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

const FOOT_LINKS = [
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
  { label: 'Privacy', href: '/privacy-policy' },
  { label: 'Terms', href: '/terms' },
];

/**
 * Shared chrome for the standalone marketing sub-pages (About, Contact).
 * Mirrors the light "cream + dotted texture" system used across the site's
 * other standalone routes (legal pages, referral, 404): #F7F6F2 ground,
 * #14140F ink, lime `primary` accent, soft white cards.
 *
 * `active` is the current route's href — highlights the matching nav pill.
 */
export default function PageShell({ active, children }) {
  return (
    <div className="relative min-h-screen bg-[#F7F6F2] text-[#14140F] flex flex-col overflow-hidden">
      {/* dotted texture — matches every other section on the site */}
      <div
        className="absolute inset-0 opacity-[0.35] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#14140F 0.6px, transparent 0.6px)',
          backgroundSize: '14px 14px',
        }}
      />

      {/* ── Header ── */}
      <header className="relative z-10 w-full">
        <div className="max-w-6xl mx-auto px-5 sm:px-6 py-4 flex items-center justify-between gap-4">
          <Link href="/" className="inline-block hover:opacity-80 transition-opacity shrink-0">
            <img src="/Yaaro-Logo.png" alt="Yaaro" width={84} />
          </Link>

          <nav className="flex items-center gap-1 sm:gap-1.5">
            {NAV.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active === link.href ? 'page' : undefined}
                className={`hidden sm:inline-flex px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                  active === link.href
                    ? 'bg-white text-[#14140F] shadow-sm'
                    : 'text-[#6E6A5D] hover:text-[#14140F] hover:bg-black/5'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <a
              href={APP_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-1 sm:ml-2 inline-flex items-center bg-primary text-[#14140F] text-sm font-semibold px-4 py-2 rounded-full shadow-[0_10px_30px_-12px_rgba(208,234,89,0.7)] hover:-translate-y-0.5 transition-transform duration-200"
            >
              Get the App
            </a>
          </nav>
        </div>
      </header>

      {/* ── Page body ── */}
      <main className="relative z-10 flex-1 w-full">{children}</main>

      {/* ── Footer ── */}
      <footer className="relative z-10 w-full border-t border-[#14140F]/10 mt-20">
        <div className="max-w-6xl mx-auto px-5 sm:px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#8A8574]">
            &copy; {new Date().getFullYear()} Yaaro. All rights reserved.
          </p>
          <div className="flex items-center gap-5 sm:gap-6">
            {FOOT_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs text-[#8A8574] hover:text-[#14140F] transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
