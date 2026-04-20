import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function LegalLayout({ title, subtitle, children }) {
  return (
    <div className="min-h-screen bg-surface-bg flex flex-col font-inter">
      <main className="flex-1 flex flex-col px-4 pt-10 pb-16 md:pt-14">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          className="w-full max-w-2xl mx-auto space-y-8"
        >
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <Link to="/" className="inline-block hover:opacity-80 transition-opacity shrink-0">
              <img src="/Yaaro-Logo.png" alt="Yaaro" width={84} />
            </Link>
            {subtitle && (
              <p className="text-xs text-surface-secondary max-w-xs sm:text-right leading-relaxed">
                {subtitle}
              </p>
            )}
          </div>

          <div className="space-y-1">
            <h1 className="text-2xl md:text-3xl font-bold text-surface-text tracking-tight">
              {title}
            </h1>
            <p className="text-surface-secondary text-sm md:text-base">
              Last updated on {new Date('2026-04-19').toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}
            </p>
          </div>

          <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />

          {/* Content */}
          <div className="space-y-6">
            {children}
          </div>

          <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />

          <p className="text-xs text-surface-secondary text-center">
            Questions? Contact us at{' '}
            <a href="mailto:singhkapil708@gmail.com" className="text-primary hover:underline">
              singhkapil708@gmail.com
            </a>
          </p>
        </motion.div>
      </main>

      <footer className="w-full px-4 py-6 border-t border-border text-center">
        <p className="text-xs text-surface-secondary">
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
      className="rounded-2xl border border-border bg-surface-card p-6 md:p-8 space-y-4 shadow-sm"
    >
      <div className="flex items-center gap-3">
        {step && (
          <span className="inline-flex items-center justify-center rounded-lg bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest px-2.5 py-1">
            {step}
          </span>
        )}
        <h2 className="text-lg md:text-xl font-bold text-surface-text">{title}</h2>
      </div>
      <div className="text-surface-secondary text-sm md:text-base leading-relaxed space-y-4">
        {children}
      </div>
    </motion.section>
  );
}
