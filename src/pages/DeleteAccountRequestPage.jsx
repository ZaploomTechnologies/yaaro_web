import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../components/Button';

function StepCard({ step, title, children }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="rounded-2xl border border-border bg-surface-card p-6 md:p-8 space-y-4"
    >
      <div className="flex items-center gap-3">
        <span className="inline-flex items-center justify-center rounded-lg bg-primary/15 text-primary text-xs font-bold uppercase tracking-wider px-3 py-1">
          {step}
        </span>
        <h2 className="text-lg md:text-xl font-bold text-surface-text">{title}</h2>
      </div>
      <div className="text-surface-secondary text-sm md:text-base leading-relaxed space-y-3">
        {children}
      </div>
    </motion.section>
  );
}

export default function DeleteAccountRequestPage() {
  const [email, setEmail] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [pending, setPending] = useState(false);

  useEffect(() => {
    const prev = document.title;
    document.title = 'Request account deletion - Yaaro';
    return () => {
      document.title = prev;
    };
  }, []);

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    if (!emailValid) {
      setError('Please enter a valid email address.');
      return;
    }
    if (!agreed) {
      setError('Please confirm that you agree to remove your data.');
      return;
    }

    // Optional: set in .env — POST JSON { email } to trigger your confirmation email flow
    const endpoint = import.meta.env.VITE_ACCOUNT_DELETION_REQUEST_URL;
    if (endpoint) {
      setPending(true);
      try {
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: email.trim() }),
        });
        if (!res.ok) {
          const text = await res.text();
          throw new Error(text || res.statusText);
        }
        setSubmitted(true);
      } catch {
        setError('We could not submit your request. Please try again later.');
      } finally {
        setPending(false);
      }
      return;
    }

    setSubmitted(true);
  }

  return (
    <div className="min-h-screen bg-surface-bg flex flex-col">
      <main className="flex-1 flex flex-col px-4 pt-10 pb-16 md:pt-14">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          className="w-full max-w-2xl mx-auto space-y-8"
        >
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <Link to="/" className="inline-block hover:opacity-80 transition-opacity shrink-0">
              <img src="/Yaaro-Logo.png" alt="Yaaro" width={84} />
            </Link>
            <p className="text-xs text-surface-secondary max-w-xs sm:text-right leading-relaxed">
              Account deletion is initiated here. Final confirmation happens by email.
            </p>
          </div>

          <div className="space-y-1">
            <h1 className="text-2xl md:text-3xl font-bold text-surface-text tracking-tight">
              Request account deletion
            </h1>
            <p className="text-surface-secondary text-sm md:text-base">
              Follow the steps below. Your account is only removed after you complete the instructions
              we send to your email.
            </p>
          </div>

          <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />

          <div className="space-y-6">
            <StepCard step="Step 1" title="What this means">
              <p>
                <strong className="text-surface-text">Account deletion is irreversible.</strong> Your
                account and data will be permanently deleted, and you will be removed from all clubs,
                heatmaps, challenges and leaderboards. Any API applications associated with your
                account will also be deleted. Some data you created for the community, like public
                segments, may remain on Yaaro.
              </p>
            </StepCard>

            <StepCard step="Step 2" title="Deletion request">
              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label
                      htmlFor="delete-account-email"
                      className="block text-sm font-semibold text-surface-text mb-2"
                    >
                      Email
                    </label>
                    <input
                      id="delete-account-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      value={email}
                      onChange={(ev) => setEmail(ev.target.value)}
                      placeholder="you@example.com"
                      className="w-full rounded-xl bg-surface-bg border border-border px-4 py-3 text-surface-text placeholder:text-surface-secondary/80 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                    />
                  </div>

                  <p>
                    To prevent your account from being deleted accidentally or by another person,
                    you&apos;ll need to confirm your request via email. We&apos;ll send the final
                    steps to the provided email address.
                  </p>
                  <p>
                    Your account will not be deleted until you follow the instructions in that
                    email. If you want to keep your Yaaro data, please be sure you have requested
                    your archive above and have downloaded the file to your hard drive.
                  </p>

                  <div
                    className="rounded-xl border border-danger/35 bg-danger/10 px-4 py-3 text-sm text-surface-text"
                    role="alert"
                  >
                    <p className="font-semibold text-danger mb-1">Warning</p>
                    <p className="text-surface-secondary">
                      After deletion, your account and data cannot be downloaded or recovered.
                    </p>
                  </div>

                  <label className="flex items-start gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={agreed}
                      onChange={(ev) => setAgreed(ev.target.checked)}
                      className="mt-1 h-4 w-4 rounded border-border bg-surface-bg text-primary focus:ring-primary focus:ring-offset-0 focus:ring-offset-surface-card shrink-0"
                    />
                    <span className="text-sm text-surface-secondary group-hover:text-surface-text transition-colors">
                      I agree to remove all my data.
                    </span>
                  </label>

                  {error ? (
                    <p className="text-sm text-danger" role="status">
                      {error}
                    </p>
                  ) : null}

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-full sm:w-auto disabled:opacity-50 disabled:pointer-events-none"
                    disabled={pending}
                  >
                    {pending ? 'Submitting…' : 'Request account deletion'}
                  </Button>
                </form>
              ) : (
                <div className="space-y-4">
                  <div className="rounded-xl border border-primary/30 bg-primary/5 px-4 py-3 text-sm">
                    <p className="font-semibold text-primary mb-1">Check your email</p>
                    <p className="text-surface-secondary">
                      We sent next steps to <strong className="text-surface-text">{email}</strong>.
                      Your account will not be deleted until you complete the confirmation in that
                      message.
                    </p>
                  </div>
                  <Link
                    to="/"
                    className="inline-flex text-sm font-medium text-primary hover:text-primary-container underline underline-offset-2"
                  >
                    Back to home
                  </Link>
                </div>
              )}
            </StepCard>
          </div>

          <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />

          <p className="text-xs text-surface-secondary text-center">
            Questions? See our{' '}
            <Link to="/privacy-policy" className="text-primary hover:underline">
              Privacy Policy
            </Link>{' '}
            or{' '}
            <Link to="/terms" className="text-primary hover:underline">
              Terms
            </Link>
            .
          </p>
        </motion.div>
      </main>

      <footer className="w-full px-4 py-4 border-t border-border text-center">
        <p className="text-xs text-surface-secondary">
          &copy; {new Date().getFullYear()} Yaaro. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
