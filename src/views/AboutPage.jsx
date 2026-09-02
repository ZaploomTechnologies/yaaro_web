'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
// import { useEffect, useRef, useState } from 'react';
// import { useInView } from 'framer-motion';
import PageShell from '../components/PageShell';
import { BoltIcon, UsersIcon, TargetIcon, HeartIcon } from '../components/Icons';

/* -------------------------------------------------------------------------- */
/*  Shared reveal — matches the easing / distance used across the site        */
/* -------------------------------------------------------------------------- */
const reveal = (i = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.6, ease: 'easeOut', delay: i * 0.08 },
});

/* -------------------------------------------------------------------------- */
/*  Count-up stat — eases from 0 the first time it scrolls into view.          */
/*  Commented out for now: the numbers below are placeholders. Restore this    */
/*  block, the `<react>` / `useInView` imports, and the stats <section> in     */
/*  the page body once we have real figures.                                   */
/* -------------------------------------------------------------------------- */
/*
function Stat({ value, suffix = '', label }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const reduce = useReducedMotion();
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setN(value);
      return;
    }
    let raf;
    const start = performance.now();
    const duration = 1200;
    const step = (now) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(value * eased);
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, reduce]);

  const isDecimal = value % 1 !== 0;
  const shown = isDecimal ? n.toFixed(1) : Math.round(n).toLocaleString('en-IN');

  return (
    <div ref={ref} className="text-center sm:text-left">
      <p className="text-3xl sm:text-4xl font-extrabold text-[#14140F] leading-none tracking-tight">
        {shown}
        <span className="text-primary-low">{suffix}</span>
      </p>
      <p className="text-[13px] text-[#8A8574] mt-2">{label}</p>
    </div>
  );
}

const STATS = [
  { value: 50, suffix: 'K+', label: 'Active members' },
  { value: 5, suffix: 'M+', label: 'Activities logged' },
  { value: 500, suffix: '+', label: 'Coaches & gyms' },
  { value: 4.8, suffix: '', label: 'Average app rating' },
];
*/

const VALUES = [
  {
    Icon: HeartIcon,
    title: 'Habits over hype',
    copy: 'Lasting fitness is built on small, repeatable wins. We design for the ordinary training day — not just the personal best.',
  },
  {
    Icon: UsersIcon,
    title: 'People, coaches and gyms together',
    copy: 'Progress sticks when someone has your back. Yaaro puts members, coaches and gyms on one platform, so guidance and accountability are always close.',
  },
  {
    Icon: TargetIcon,
    title: 'Built for how India trains',
    copy: 'From gym floors to morning walks and neighbourhood runs — the features, plans and rewards are shaped around Indian routines, not copied from elsewhere.',
  },
];

export default function AboutPage() {
  const reduce = useReducedMotion();

  return (
    <PageShell active="/about">
      {/* ── Hero ── */}
      <section className="max-w-6xl mx-auto px-5 sm:px-6 pt-12 sm:pt-16 lg:pt-20 pb-4">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="max-w-2xl"
        >
          <span className="inline-flex items-center gap-2 bg-white rounded-full px-3.5 py-1.5 mb-6 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            <span className="text-[#3C3A30] text-xs font-semibold tracking-wide">
              About Yaaro
            </span>
          </span>

          <h1 className="text-[2.5rem] sm:text-5xl lg:text-6xl font-extrabold leading-[1.02] tracking-tight text-[#14140F] mb-6">
            One fitness journey.
            <br />
            Everyone on it.
          </h1>

          <p className="text-[#6E6A5D] text-base sm:text-lg leading-relaxed">
            Yaaro brings everyday people, coaches and gyms onto a single
            platform — activity tracking, community and real client oversight,
            built for how India actually trains.
          </p>
        </motion.div>
      </section>

      {/* ── Stats strip ── commented out until we have real figures
      <section className="max-w-6xl mx-auto px-5 sm:px-6 py-10">
        <motion.div
          {...reveal()}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-6 rounded-[1.75rem] bg-white/70 border border-[#14140F]/[0.06] shadow-[0_20px_40px_-30px_rgba(20,20,15,0.25)] px-6 sm:px-8 py-8"
        >
          {STATS.map((s) => (
            <Stat key={s.label} {...s} />
          ))}
        </motion.div>
      </section>
      */}

      {/* ── Vision + Mission ── */}
      <section className="max-w-6xl mx-auto px-5 sm:px-6 py-10 space-y-5">
        <motion.div
          {...reveal()}
          className="relative overflow-hidden rounded-[2rem] bg-[#14140F] px-7 sm:px-12 py-12 sm:py-16 shadow-[0_40px_80px_-45px_rgba(20,20,15,0.35)]"
        >
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-primary/70 mb-4">
            Our vision
          </p>
          <p className="text-2xl sm:text-3xl lg:text-[2.4rem] font-extrabold leading-[1.15] tracking-tight text-white max-w-3xl">
            To become India&apos;s leading health and fitness platform — the app
            that connects everyday people, coaches and gyms on one shared
            fitness journey.
          </p>
        </motion.div>

        <motion.div
          {...reveal(1)}
          className="relative overflow-hidden rounded-[2rem] bg-primary px-7 sm:px-12 py-12 sm:py-16 shadow-[0_40px_80px_-45px_rgba(20,20,15,0.35)]"
        >
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#14140F]/55 mb-4">
            Our mission
          </p>
          <p className="text-2xl sm:text-3xl lg:text-[2.4rem] font-extrabold leading-[1.15] tracking-tight text-[#14140F] max-w-3xl">
            Yaaro helps Indians build lasting fitness habits and gives coaches
            and gyms the tools to guide them — by combining activity tracking,
            community and real client oversight, all built for how India trains.
          </p>
        </motion.div>
      </section>

      {/* ── Values ── */}
      <section className="max-w-6xl mx-auto px-5 sm:px-6 py-10">
        <motion.h2
          {...reveal()}
          className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#14140F] mb-3"
        >
          What we believe
        </motion.h2>
        <motion.p
          {...reveal(1)}
          className="text-[#6E6A5D] text-base leading-relaxed max-w-xl mb-10"
        >
          Three ideas shape every feature we build.
        </motion.p>

        <div className="grid md:grid-cols-3 gap-5">
          {VALUES.map((v, i) => (
            <motion.div
              key={v.title}
              {...reveal(i)}
              className="bg-white/70 border border-[#14140F]/[0.06] rounded-[1.75rem] p-6 sm:p-7 shadow-[0_20px_40px_-32px_rgba(20,20,15,0.25)]"
            >
              <div className="w-11 h-11 rounded-full bg-primary/20 flex items-center justify-center mb-5">
                <v.Icon className="w-5 h-5 text-[#14140F]" />
              </div>
              <h3 className="text-lg font-bold text-[#14140F] mb-2">{v.title}</h3>
              <p className="text-[#6E6A5D] text-sm leading-relaxed">{v.copy}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Makers ── */}
      <section className="max-w-6xl mx-auto px-5 sm:px-6 py-10">
        <motion.div
          {...reveal()}
          className="rounded-[1.75rem] border border-[#14140F]/[0.06] bg-white/70 shadow-[0_20px_40px_-32px_rgba(20,20,15,0.25)] p-7 sm:p-9 flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-8"
        >
          <div className="w-12 h-12 rounded-2xl bg-[#14140F] flex items-center justify-center shrink-0">
            <BoltIcon className="w-6 h-6 text-primary" />
          </div>
          <div>
            <p className="text-lg font-bold text-[#14140F] mb-1">
              Built by Zaploom Technologies
            </p>
            <p className="text-[#6E6A5D] text-sm leading-relaxed max-w-xl">
              Yaaro is designed and operated by Zaploom Technologies. Have an
              idea, a partnership, or a bug to report?{' '}
              <Link
                href="/contact"
                className="text-[#14140F] font-semibold underline underline-offset-2 hover:text-primary-low"
              >
                Get in touch
              </Link>
              .
            </p>
          </div>
        </motion.div>
      </section>

      {/* ── CTA band ── */}
      <section className="max-w-6xl mx-auto px-5 sm:px-6 pt-10">
        <motion.div
          {...reveal()}
          className="rounded-[2rem] bg-[#14140F] px-7 sm:px-12 py-12 sm:py-14 text-center sm:text-left flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6"
        >
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-2">
              Train solo or coach a hundred.
            </h2>
            <p className="text-white/60 text-sm sm:text-base max-w-md">
              Yaaro works for members, coaches and gyms alike. Download free on
              iOS and Android.
            </p>
          </div>
          <a
            href="https://apps.apple.com/in/app/yaaro-fit-run-cycle-workout/id6763996078"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center bg-primary text-[#14140F] font-semibold text-base px-8 py-3.5 rounded-full shadow-[0_10px_30px_-10px_rgba(208,234,89,0.6)] hover:-translate-y-0.5 transition-transform duration-200 shrink-0"
          >
            Get the App
          </a>
        </motion.div>
      </section>
    </PageShell>
  );
}
