import Link from 'next/link';

export const metadata = {
  title: '404 — Page Not Found | Yaaro',
  description: 'The page you are looking for does not exist.',
};

export default function NotFound() {
  return (
    <div className="relative min-h-screen bg-[#F7F6F2] flex flex-col items-center justify-center px-6 text-center overflow-hidden">
      {/* dotted texture — matches every other page on the site */}
      <div
        className="absolute inset-0 opacity-[0.35] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#14140F 0.6px, transparent 0.6px)',
          backgroundSize: '14px 14px',
        }}
      />

      {/* Logo */}
      <Link href="/" className="relative mb-14 inline-block hover:opacity-75 transition-opacity">
        <img src="/Yaaro-Logo.png" alt="Yaaro" width={92} />
      </Link>

      {/* 404 number */}
      <h1
        className="relative text-[110px] sm:text-[140px] font-extrabold text-[#14140F] leading-none tracking-tighter select-none"
        style={{ textShadow: '0 0 80px rgba(208, 234, 89, 0.45)' }}
      >
        404
      </h1>

      {/* Divider line */}
      <div className="relative mt-6 mb-6 w-16 h-px bg-[#14140F]/15" />

      {/* Heading */}
      <h2 className="relative text-2xl sm:text-3xl font-bold text-[#14140F]">
        Page not found
      </h2>

      {/* Sub-text */}
      <p className="relative mt-3 text-[#6E6A5D] text-sm sm:text-base max-w-sm leading-relaxed">
        The link you followed may be broken, expired, or the page may have
        been removed.
      </p>

      {/* CTA */}
      <Link
        href="/"
        className="relative mt-10 inline-flex items-center gap-2 bg-primary text-[#14140F] font-bold px-8 py-3 rounded-full shadow-[0_10px_30px_-10px_rgba(208,234,89,0.6)] hover:shadow-[0_14px_36px_-10px_rgba(208,234,89,0.75)] hover:scale-105 active:scale-95 transition-transform"
      >
        {/* Arrow icon */}
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 12H5M12 5l-7 7 7 7" />
        </svg>
        Back to Home
      </Link>

      {/* Footer note */}
      <p className="relative mt-16 text-xs text-[#8A8574]">
        &copy; {new Date().getFullYear()} Yaaro. All rights reserved.
      </p>
    </div>
  );
}
