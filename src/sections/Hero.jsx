'use client';

import { motion } from 'framer-motion';
import { RunnerLightningIcon } from '../components/Icons';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.15, ease: 'easeOut' },
  }),
};

function SwooshBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <svg
        className="absolute -top-1/3 -left-1/4 w-[160%] h-[160%] text-white"
        viewBox="0 0 800 800"
        fill="none"
        aria-hidden="true"
      >
        <circle cx="400" cy="400" r="380" stroke="currentColor" strokeOpacity="0.5" strokeWidth="1" />
        <circle cx="360" cy="440" r="300" stroke="currentColor" strokeOpacity="0.6" strokeWidth="1" />
      </svg>
      <svg
        className="absolute -bottom-1/3 -right-1/4 w-[140%] h-[140%] text-[#14140F]"
        viewBox="0 0 800 800"
        fill="none"
        aria-hidden="true"
      >
        <circle cx="400" cy="400" r="380" stroke="currentColor" strokeOpacity="0.04" strokeWidth="1" />
        <circle cx="440" cy="360" r="300" stroke="currentColor" strokeOpacity="0.05" strokeWidth="1" />
      </svg>
    </div>
  );
}

export default function Hero() {
  return (
    <section
      id="home"
      className="relative bg-[#EDEDE8] h-full overflow-hidden"
      aria-label="Hero section"
    >
      <SwooshBackground />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 pt-28 sm:pt-32 lg:pt-36 pb-16 sm:pb-20">
        <div className="relative lg:min-h-[30rem]">
          {/* Text column */}
          <div className="relative z-10 max-w-xl">
            <motion.div
              custom={0}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="inline-flex items-center gap-2 bg-white rounded-full px-3.5 py-1.5 mb-6 shadow-sm"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse-slow" />
              <span className="text-[#3C3A30] text-xs font-semibold tracking-wide">
                Now available on iOS &amp; Android
              </span>
            </motion.div>

            <motion.h1
              custom={1}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="text-[3.25rem] sm:text-6xl lg:text-[4.25rem] font-extrabold leading-[0.98] tracking-tight mb-6 text-[#14140F]"
            >
              Track. Share.
              <br />
              Earn. Repeat.
            </motion.h1>

            <motion.p
              custom={2}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="text-[#6E6A5D] text-base sm:text-lg leading-relaxed mb-8 max-w-sm"
            >
              Yaaro turns every workout into a rewarding experience — track activities,
              share your journey with friends, and earn real rewards.
            </motion.p>

            <motion.div
              custom={3}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="mb-10 sm:mb-14"
            >
              <a
                href="#download"
                onClick={(e) => {
                  e.preventDefault();
                  window.dispatchEvent(new CustomEvent('yaaro:snapjump', { detail: { id: 'download' } }));
                }}
                className="inline-flex items-center justify-center bg-primary text-[#14140F] font-semibold text-base px-8 py-4 rounded-full shadow-[0_10px_30px_-10px_rgba(208,234,89,0.6)] hover:shadow-[0_14px_36px_-10px_rgba(208,234,89,0.75)] hover:-translate-y-0.5 transition-all duration-200"
              >
                Get Started
              </a>
            </motion.div>
          </div>

          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
            className="relative mt-10 lg:mt-0 lg:absolute lg:-top-10 lg:right-[-4rem] lg:left-[29%] z-20"
          >
            <div className="relative mx-auto max-w-sm lg:max-w-none lg:h-[34rem]">
              <img
                src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1000&q=80&auto=format&fit=crop"
                alt="Person mid-workout, tracking their session with Yaaro"
                className="w-full h-full object-cover"
                loading="eager"
                style={{
                  maskImage:
                    'radial-gradient(ellipse 58% 62% at 50% 40%, black 40%, transparent 100%)',
                  WebkitMaskImage:
                    'radial-gradient(ellipse 58% 62% at 50% 40%, black 40%, transparent 100%)',
                }}
              />

              {/* Decorative ring badge */}
              <div className="hidden sm:flex absolute top-2 right-2 lg:right-10 w-14 h-14 rounded-full border border-[#14140F]/15 items-center justify-center bg-white/70 backdrop-blur-sm">
                <RunnerLightningIcon className="w-6 h-6 text-primary-low" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
