'use client';

import { motion } from 'framer-motion';
import { StarIcon } from '../components/Icons';

const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.6, ease: 'easeOut', delay },
});

function YaaroMark({ className = 'w-7 h-7' }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M11 12 L16 7 L21 12"
        stroke="#D0EA59"
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="16" cy="21" r="6.5" stroke="#D0EA59" strokeWidth="4" />
    </svg>
  );
}

function Phone({ children, className = '' }) {
  return (
    <div className={`relative w-[210px] ${className}`}>
      <div className="rounded-[2.4rem] bg-[#14140F] p-2.5 shadow-[0_30px_60px_-28px_rgba(20,20,15,0.5)]">
        <div className="relative rounded-[1.9rem] bg-white overflow-hidden" style={{ height: 430 }}>
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-[18px] bg-[#14140F] rounded-full z-20" />
          <div className="absolute inset-0 flex flex-col pt-9">{children}</div>
        </div>
      </div>
    </div>
  );
}

/* ---- Screen 1: App Store listing ---------------------------------------- */
function DownloadScreen() {
  return (
    <div className="flex-1 px-4">
      <div className="flex items-center gap-1.5 text-[11px] text-[#8A8574] mb-4">
        <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
          <path d="M15 18l-6-6 6-6" />
        </svg>
        Search
      </div>

      <div className="flex items-start gap-3 mb-4">
        <div className="w-16 h-16 rounded-2xl bg-[#14140F] flex items-center justify-center flex-shrink-0">
          <YaaroMark className="w-9 h-9" />
        </div>
        <div className="flex-1 min-w-0 pt-1">
          <p className="text-[15px] font-extrabold text-[#14140F] leading-tight">Yaaro</p>
          <p className="text-[11px] text-[#8A8574] mb-2">Fitness Tracker</p>
          <button className="text-[12px] font-bold text-[#14140F] bg-primary rounded-full px-5 py-1">
            Get
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 divide-x divide-[#14140F]/10 border-y border-[#14140F]/10 py-3 mb-4">
        {[
          ['4.8', <StarIcon key="s" className="w-3 h-3 text-[#8A8574]" />],
          ['12+', 'Age'],
          ['#3', 'Health'],
        ].map(([v, sub], i) => (
          <div key={i} className="text-center px-1">
            <p className="text-[13px] font-extrabold text-[#14140F] leading-none flex items-center justify-center gap-0.5">
              {v}
            </p>
            <p className="text-[9px] text-[#8A8574] mt-1 flex items-center justify-center">{sub}</p>
          </div>
        ))}
      </div>

      <div className="space-y-2">
        <div className="h-20 rounded-xl bg-[#F1F0EA]" />
        <div className="flex gap-2">
          <div className="h-16 flex-1 rounded-xl bg-[#F1F0EA]" />
          <div className="h-16 flex-1 rounded-xl bg-[#F1F0EA]" />
        </div>
      </div>
    </div>
  );
}

/* ---- Screen 2: Onboarding --------------------------------------------- */
function PersonalizeScreen() {
  return (
    <div className="flex-1 px-5">
      <div className="w-12 h-12 rounded-2xl bg-[#14140F] flex items-center justify-center mb-5">
        <YaaroMark className="w-7 h-7" />
      </div>
      <p className="text-[19px] font-extrabold text-[#14140F] leading-tight">Hello, Welcome</p>
      <p className="text-[11px] text-[#8A8574] mb-6">Let&apos;s set up your fitness profile.</p>

      <div className="space-y-3 mb-6">
        {['Your name', 'Primary goal', 'Weekly activity target'].map((label) => (
          <div key={label}>
            <p className="text-[10px] text-[#8A8574] mb-1">{label}</p>
            <div className="h-9 rounded-xl bg-[#F1F0EA] border border-[#14140F]/[0.06]" />
          </div>
        ))}
      </div>

      <button className="w-full text-[13px] font-bold text-[#14140F] bg-primary rounded-full py-2.5">
        Create account
      </button>
      <p className="text-[10px] text-[#8A8574] text-center mt-3">Takes less than a minute</p>
    </div>
  );
}

/* ---- Screen 3: Track & Move --------------------------------------------- */
function TrackScreen() {
  return (
    <div className="flex-1 px-5">
      <div className="flex items-center justify-between mb-5">
        <div>
          <p className="text-[10px] text-[#8A8574]">Today</p>
          <p className="text-[15px] font-extrabold text-[#14140F] leading-tight">Your Progress</p>
        </div>
        <div className="w-9 h-9 rounded-full bg-[#14140F] flex items-center justify-center">
          <YaaroMark className="w-5 h-5" />
        </div>
      </div>

      <div className="relative mx-auto w-28 h-28 mb-5">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
          <circle cx="18" cy="18" r="15.5" fill="none" stroke="#F1F0EA" strokeWidth="4" />
          <circle
            cx="18"
            cy="18"
            r="15.5"
            fill="none"
            stroke="#D0EA59"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray="97.4"
            strokeDashoffset="26"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <p className="text-[18px] font-extrabold text-[#14140F] leading-none">73%</p>
          <p className="text-[9px] text-[#8A8574] mt-0.5">of goal</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 mb-3">
        {[
          ['8,240', 'Steps'],
          ['412', 'Kcal'],
          ['32', 'Active min'],
          ['5.1', 'Km'],
        ].map(([v, sub]) => (
          <div key={sub} className="rounded-xl bg-[#F1F0EA] p-2.5">
            <p className="text-[13px] font-extrabold text-[#14140F] leading-none">{v}</p>
            <p className="text-[9px] text-[#8A8574] mt-1">{sub}</p>
          </div>
        ))}
      </div>

      <div className="flex items-end gap-1.5 h-10">
        {[40, 65, 50, 80, 55, 90, 70].map((h, i) => (
          <div key={i} className="flex-1 rounded-t bg-[#14140F]/80" style={{ height: `${h}%` }} />
        ))}
      </div>
    </div>
  );
}

const STEPS = [
  {
    n: '01',
    title: 'Download the App',
    copy: 'Grab Yaaro free from the App Store or Google Play — no card, no catch.',
    screen: <DownloadScreen />,
  },
  {
    n: '02',
    title: 'Create & Personalize',
    copy: 'Answer a few quick questions and Yaaro tailors goals and plans to you.',
    screen: <PersonalizeScreen />,
  },
  {
    n: '03',
    title: 'Track & Move',
    copy: 'Log activity, watch your rings close, and build streaks that stick.',
    screen: <TrackScreen />,
  },
];

export default function GettingStarted() {
  return (
    <section
      id="getting-started"
      className="relative bg-[#F7F6F2] py-16 md:py-24 overflow-hidden"
      aria-label="Getting started with Yaaro"
    >
      <div
        className="absolute inset-0 opacity-[0.35] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#14140F 0.6px, transparent 0.6px)',
          backgroundSize: '14px 14px',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-10 items-center">
          {/* Left: title + steps */}
          <div>
            <motion.h2
              {...reveal()}
              className="text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold leading-tight tracking-tight text-[#14140F] mb-8"
            >
              Getting Started
              <br />
              is Simple
            </motion.h2>

            <div className="space-y-6 max-w-md">
              {STEPS.map((step, i) => (
                <motion.div key={step.n} {...reveal(0.1 + i * 0.1)} className="flex gap-4">
                  <span className="text-sm font-semibold tracking-[0.2em] text-[#8A8574] pt-1">
                    {step.n}
                  </span>
                  <div>
                    <h3 className="text-lg font-bold text-[#14140F] mb-1">{step.title}</h3>
                    <p className="text-[#6E6A5D] text-sm leading-relaxed">{step.copy}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right: 3 phones */}
          <motion.div
            {...reveal(0.2)}
            className="flex justify-center lg:justify-end items-center overflow-x-auto lg:overflow-visible pb-4 lg:pb-0"
          >
            <div className="flex flex-shrink-0 -space-x-14 sm:-space-x-16">
              {STEPS.map((step, i) => (
                <Phone
                  key={step.n}
                  className={
                    i === 1
                      ? 'z-20 -translate-y-6 scale-[1.04]'
                      : 'z-10 translate-y-4 opacity-95'
                  }
                >
                  {step.screen}
                </Phone>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
