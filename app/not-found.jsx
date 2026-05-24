import Link from 'next/link';

export const metadata = {
  title: '404 — Page Not Found | Yaaro',
  description: 'The page you are looking for does not exist.',
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-surface-bg flex flex-col items-center justify-center px-6 text-center">

      {/* Logo */}
      <Link href="/" className="mb-14 inline-block hover:opacity-75 transition-opacity">
        <img src="/Yaaro-Logo.png" alt="Yaaro" width={88} />
      </Link>

      {/* 404 number */}
      <h1
        className="text-[110px] sm:text-[140px] font-extrabold text-primary leading-none tracking-tighter select-none"
        style={{ textShadow: '0 0 80px rgba(208, 234, 89, 0.20)' }}
      >
        404
      </h1>

      {/* Divider line */}
      <div className="mt-6 mb-6 w-16 h-px bg-primary/30" />

      {/* Heading */}
      <h2 className="text-2xl sm:text-3xl font-bold text-white">
        Page not found
      </h2>

      {/* Sub-text */}
      <p className="mt-3 text-surface-secondary text-sm sm:text-base max-w-sm leading-relaxed">
        The link you followed may be broken, expired, or the page may have
        been removed.
      </p>

      {/* CTA */}
      <Link
        href="/"
        className="mt-10 inline-flex items-center gap-2 bg-primary text-black font-bold px-8 py-3 rounded-full hover:scale-105 active:scale-95 transition-transform"
      >
        {/* Arrow icon */}
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 12H5M12 5l-7 7 7 7" />
        </svg>
        Back to Home
      </Link>

      {/* Footer note */}
      <p className="mt-16 text-xs text-surface-secondary/50">
        &copy; {new Date().getFullYear()} Yaaro. All rights reserved.
      </p>
    </div>
  );
}
