'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function LegalLayout({ title, subtitle, children }) {
  return (
    <div className="relative min-h-screen bg-[#F7F6F2] flex flex-col font-inter overflow-hidden">
      {/* dotted texture — matches every other section on the site */}
      <div
        className="absolute inset-0 opacity-[0.35] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#14140F 0.6px, transparent 0.6px)',
          backgroundSize: '14px 14px',
        }}
      />

      <main className="relative flex-1 flex flex-col px-4 pt-10 pb-16 md:pt-14">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          className="w-full max-w-2xl mx-auto space-y-8"
        >
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <Link href="/" className="inline-block hover:opacity-80 transition-opacity shrink-0">
              <img src="/Yaaro-Logo.png" alt="Yaaro" width={92} />
            </Link>
            {subtitle && (
              <p className="text-xs text-[#8A8574] max-w-xs sm:text-right leading-relaxed">
                {subtitle}
              </p>
            )}
          </div>

          <div className="space-y-1">
            <h1 className="text-2xl md:text-3xl font-extrabold text-[#14140F] tracking-tight">
              {title}
            </h1>
            <p className="text-[#6E6A5D] text-sm md:text-base">
              Last updated on {new Date('2026-04-19').toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}
            </p>
          </div>

          <div className="h-px bg-gradient-to-r from-transparent via-[#14140F]/15 to-transparent" />

          {/* Content */}
          <div className="space-y-6">
            {children}
          </div>

          <div className="h-px bg-gradient-to-r from-transparent via-[#14140F]/15 to-transparent" />

          <p className="text-xs text-[#8A8574] text-center">
            Questions? Contact us at{' '}
            <a href="mailto:singhkapil708@gmail.com" className="text-[#14140F] font-semibold hover:underline">
              singhkapil708@gmail.com
            </a>
          </p>
        </motion.div>
      </main>

      <footer className="relative w-full px-4 py-6 border-t border-[#14140F]/10 text-center">
        <p className="text-xs text-[#8A8574]">
          &copy; {new Date().getFullYear()} Yaaro. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

export function LegalSection({ title, step, children }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="rounded-[1.75rem] border border-[#14140F]/[0.06] bg-white/70 p-6 md:p-8 space-y-4 shadow-[0_20px_40px_-30px_rgba(20,20,15,0.25)]"
    >
      <div className="flex items-center gap-3">
        {step && (
          <span className="inline-flex items-center justify-center rounded-lg bg-primary/20 text-[#14140F] text-[10px] font-bold uppercase tracking-widest px-2.5 py-1">
            {step}
          </span>
        )}
        <h2 className="text-lg md:text-xl font-bold text-[#14140F]">{title}</h2>
      </div>
      <div className="text-[#6E6A5D] text-sm md:text-base leading-relaxed space-y-4">
        {children}
      </div>
    </motion.section>
  );
}
