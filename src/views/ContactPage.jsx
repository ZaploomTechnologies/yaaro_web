'use client';

import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import PageShell from '../components/PageShell';

const SUPPORT_EMAIL = 'singhkapil708@gmail.com';
const INSTAGRAM_URL = 'https://www.instagram.com/yaaro.fit/';
const LINKEDIN_URL = 'https://www.linkedin.com/company/yaaro-fit';
// Submitting the form opens WhatsApp to this number with the details pre-filled;
// the visitor taps send. International format, no "+" / spaces / dashes.
const WHATSAPP_NUMBER = '919033608708';

const reveal = (i = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.6, ease: 'easeOut', delay: i * 0.08 },
});

const TOPICS = ['General question', 'Support / bug report', 'Partnership', 'Press', 'Something else'];

const FAQS = [
  {
    q: 'How do I earn and redeem points?',
    a: 'You earn points automatically on every tracked activity, with bonuses for streaks and challenges. Redeem them in the Rewards tab of the app for vouchers and gear.',
  },
  {
    q: 'Which activities does Yaaro track?',
    a: 'Running, walking, cycling, gym workouts, dance and yoga today — with more added regularly. You can also log sessions manually.',
  },
  {
    q: 'Is Yaaro free?',
    a: 'Yes. The core app is free on iOS and Android. Optional subscription plans add extra analytics and perks.',
  },
  {
    q: 'How do I delete my account?',
    a: 'Open the account deletion request page from the app or website and follow the emailed steps. Deletion is permanent.',
  },
];

/* -------------------------------------------------------------------------- */
/*  Contact form                                                              */
/* -------------------------------------------------------------------------- */
function buildWhatsappUrl({ name, email, topic, message }) {
  const text = [
    'New enquiry via yaaro.fit',
    '',
    `Name: ${name}`,
    `Email: ${email}`,
    `Topic: ${topic}`,
    '',
    'Message:',
    message,
  ].join('\n');
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', topic: TOPICS[0], message: '' });
  const [status, setStatus] = useState('idle'); // idle | done
  const [waUrl, setWaUrl] = useState('');
  const [error, setError] = useState('');

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim());
  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  function handleSubmit(e) {
    e.preventDefault();
    setError('');

    if (!form.name.trim()) return setError('Please tell us your name.');
    if (!emailValid) return setError('Please enter a valid email address.');
    if (form.message.trim().length < 10) return setError('Please add a little more detail to your message.');

    const url = buildWhatsappUrl({
      name: form.name.trim(),
      email: form.email.trim(),
      topic: form.topic,
      message: form.message.trim(),
    });
    setWaUrl(url);
    // Opened synchronously from the submit gesture so it isn't popup-blocked.
    window.open(url, '_blank', 'noopener,noreferrer');
    setStatus('done');
  }

  const fieldClass =
    'w-full rounded-xl bg-white border border-[#14140F]/10 px-4 py-3 text-sm text-[#14140F] placeholder:text-[#8A8574] focus:border-primary focus:ring-2 focus:ring-primary/30 outline-none transition-colors';

  if (status === 'done') {
    return (
      <div className="rounded-[1.75rem] bg-white/80 border border-primary/30 shadow-[0_20px_40px_-32px_rgba(20,20,15,0.25)] p-7 sm:p-9">
        <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#14140F" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </div>
        <h3 className="text-lg font-bold text-[#14140F] mb-1">WhatsApp is open</h3>
        <p className="text-[#6E6A5D] text-sm leading-relaxed mb-4">
          Thanks, {form.name.trim().split(' ')[0] || 'there'} — we&apos;ve pre‑filled your
          message in WhatsApp. Just tap <span className="font-semibold text-[#14140F]">send</span> there to
          reach the team.
        </p>
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#14140F] underline underline-offset-2 hover:text-primary-low"
        >
          WhatsApp didn&apos;t open? Tap here
        </a>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-[1.75rem] bg-white/80 border border-[#14140F]/[0.06] shadow-[0_20px_40px_-32px_rgba(20,20,15,0.25)] p-6 sm:p-8 space-y-5"
    >
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="c-name" className="block text-sm font-semibold text-[#14140F] mb-2">
            Name
          </label>
          <input id="c-name" name="name" value={form.name} onChange={update('name')} placeholder="Your name" className={fieldClass} />
        </div>
        <div>
          <label htmlFor="c-email" className="block text-sm font-semibold text-[#14140F] mb-2">
            Email
          </label>
          <input id="c-email" name="email" type="email" autoComplete="email" value={form.email} onChange={update('email')} placeholder="you@example.com" className={fieldClass} />
        </div>
      </div>

      <div>
        <label htmlFor="c-topic" className="block text-sm font-semibold text-[#14140F] mb-2">
          Topic
        </label>
        <select id="c-topic" name="topic" value={form.topic} onChange={update('topic')} className={fieldClass}>
          {TOPICS.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="c-message" className="block text-sm font-semibold text-[#14140F] mb-2">
          Message
        </label>
        <textarea id="c-message" name="message" rows={5} value={form.message} onChange={update('message')} placeholder="How can we help?" className={`${fieldClass} resize-y`} />
      </div>

      {error ? (
        <p className="text-sm text-danger" role="status">
          {error}
        </p>
      ) : null}

      <div className="space-y-2">
        <button
          type="submit"
          className="inline-flex items-center gap-2 justify-center bg-primary text-[#14140F] font-semibold text-sm px-7 py-3 rounded-full shadow-[0_10px_30px_-12px_rgba(208,234,89,0.7)] hover:-translate-y-0.5 transition-transform duration-200"
        >
          <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38c1.45.79 3.08 1.21 4.79 1.21 5.46 0 9.91-4.45 9.91-9.91C21.95 6.45 17.5 2 12.04 2zm0 18.02c-1.53 0-3.03-.41-4.34-1.19l-.31-.18-3.12.82.83-3.04-.2-.32a8.16 8.16 0 0 1-1.26-4.36c0-4.54 3.7-8.23 8.24-8.23 2.2 0 4.27.86 5.82 2.42a8.16 8.16 0 0 1 2.41 5.82c0 4.54-3.7 8.23-8.24 8.23zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.12-.16.25-.64.81-.79.98-.15.16-.29.18-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.13-.15.17-.25.25-.41.08-.16.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.43l-.48-.01c-.16 0-.43.06-.65.31-.22.25-.85.83-.85 2.03 0 1.2.87 2.35.99 2.51.12.16 1.71 2.61 4.15 3.66.58.25 1.03.4 1.38.51.58.19 1.11.16 1.53.1.47-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.11-.22-.17-.47-.29z" />
          </svg>
          Send
        </button>
        <p className="text-xs text-[#8A8574]">
          Opens WhatsApp with your details filled in — just tap send.
        </p>
      </div>
    </form>
  );
}

/* -------------------------------------------------------------------------- */
/*  FAQ accordion                                                             */
/* -------------------------------------------------------------------------- */
function Faq() {
  const [open, setOpen] = useState(0);
  const reduce = useReducedMotion();

  return (
    <div className="divide-y divide-[#14140F]/10 rounded-[1.75rem] bg-white/70 border border-[#14140F]/[0.06] shadow-[0_20px_40px_-32px_rgba(20,20,15,0.25)] overflow-hidden">
      {FAQS.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.q}>
            <button
              type="button"
              onClick={() => setOpen(isOpen ? -1 : i)}
              aria-expanded={isOpen}
              className="w-full flex items-center justify-between gap-4 text-left px-6 py-5 hover:bg-black/[0.02] transition-colors"
            >
              <span className="text-sm sm:text-base font-semibold text-[#14140F]">{item.q}</span>
              <span
                className={`shrink-0 text-[#8A8574] transition-transform duration-200 ${isOpen ? 'rotate-45' : ''}`}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
                  <path d="M12 5v14M5 12h14" />
                </svg>
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="content"
                  initial={reduce ? false : { height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                  className="overflow-hidden"
                >
                  <p className="px-6 pb-5 -mt-1 text-sm text-[#6E6A5D] leading-relaxed">{item.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Page                                                                      */
/* -------------------------------------------------------------------------- */
export default function ContactPage() {
  const reduce = useReducedMotion();

  return (
    <PageShell active="/contact">
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
            <span className="text-[#3C3A30] text-xs font-semibold tracking-wide">Contact</span>
          </span>

          <h1 className="text-[2.5rem] sm:text-5xl lg:text-6xl font-extrabold leading-[1.02] tracking-tight text-[#14140F] mb-6">
            Let&apos;s talk.
          </h1>

          <p className="text-[#6E6A5D] text-base sm:text-lg leading-relaxed">
            Questions, feedback, partnership ideas or a bug to report — send it
            our way. A real person on the Yaaro team reads every message.
          </p>
        </motion.div>
      </section>

      {/* ── Form + info ── */}
      <section className="max-w-6xl mx-auto px-5 sm:px-6 py-10">
        <div className="grid lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] gap-6 lg:gap-8 items-start">
          <motion.div {...reveal()}>
            <ContactForm />
          </motion.div>

          <motion.div {...reveal(1)} className="space-y-4">
            <div className="rounded-[1.75rem] bg-white/70 border border-[#14140F]/[0.06] shadow-[0_20px_40px_-32px_rgba(20,20,15,0.25)] p-6 sm:p-7">
              <div className="w-11 h-11 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#14140F" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="m3 7 9 6 9-6" />
                </svg>
              </div>
              <h3 className="text-base font-bold text-[#14140F] mb-1">Email us</h3>
              <p className="text-[#6E6A5D] text-sm leading-relaxed mb-3">
                Prefer email? Reach the team directly.
              </p>
              <a
                href={`mailto:${SUPPORT_EMAIL}`}
                className="text-sm font-semibold text-[#14140F] underline underline-offset-2 hover:text-primary-low break-all"
              >
                {SUPPORT_EMAIL}
              </a>
            </div>

            <div className="rounded-[1.75rem] bg-white/70 border border-[#14140F]/[0.06] shadow-[0_20px_40px_-32px_rgba(20,20,15,0.25)] p-6 sm:p-7">
              <h3 className="text-base font-bold text-[#14140F] mb-1">Follow along</h3>
              <p className="text-[#6E6A5D] text-sm leading-relaxed mb-4">
                Updates, community stories and rewards drops.
              </p>
              <div className="flex gap-3">
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-10 h-10 rounded-full border border-[#14140F]/15 flex items-center justify-center text-[#14140F] hover:bg-[#14140F] hover:text-white transition-colors duration-200"
                >
                  <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                  </svg>
                </a>
                <a
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="w-10 h-10 rounded-full border border-[#14140F]/15 flex items-center justify-center text-[#14140F] hover:bg-[#14140F] hover:text-white transition-colors duration-200"
                >
                  <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
              </div>
            </div>

            <div className="rounded-[1.75rem] bg-[#14140F] p-6 sm:p-7">
              <h3 className="text-base font-bold text-white mb-1">Response time</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                We typically reply within 1&ndash;2 business days. Support and
                bug reports are prioritised.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="max-w-6xl mx-auto px-5 sm:px-6 py-10">
        <motion.h2
          {...reveal()}
          className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#14140F] mb-3"
        >
          Before you write&hellip;
        </motion.h2>
        <motion.p {...reveal(1)} className="text-[#6E6A5D] text-base leading-relaxed max-w-xl mb-8">
          A few things people ask most often.
        </motion.p>
        <motion.div {...reveal(2)}>
          <Faq />
        </motion.div>
      </section>
    </PageShell>
  );
}
