import { motion } from 'framer-motion';
import { StarIcon, RocketIcon } from '../components/Icons';

function AppStoreButton() {
  return (
    <motion.a
      href="#"
      whileHover={{ scale: 1.04, y: -2 }}
      whileTap={{ scale: 0.97 }}
      className="flex items-center gap-3 bg-black border border-[#333] px-5 py-3.5 rounded-2xl min-w-44 shadow-lg hover:border-primary/40 transition-all duration-200"
    >
      <svg width="22" height="26" viewBox="0 0 20 24" fill="white" className="flex-shrink-0">
        <path d="M16.462 12.482c-.028-3.21 2.618-4.76 2.738-4.835-1.493-2.183-3.815-2.482-4.641-2.513-1.974-.2-3.862 1.17-4.865 1.17-.999 0-2.541-1.143-4.181-1.112-2.147.033-4.133 1.252-5.237 3.167C-1.873 12.12.713 18.4 2.83 21.81c1.056 1.524 2.31 3.232 3.956 3.17 1.594-.065 2.193-1.024 4.117-1.024 1.924 0 2.473 1.024 4.15.99 1.714-.028 2.798-1.545 3.843-3.073a16.4 16.4 0 0 0 1.749-3.558c-.04-.016-3.35-1.283-3.383-5.833ZM13.23 3.387C14.1 2.327 14.69.938 14.524-.5c-1.193.05-2.64.797-3.491 1.835-.77.9-1.444 2.337-1.263 3.715 1.329.102 2.688-.67 3.46-1.663Z" />
      </svg>
      <div className="text-left">
        <p className="text-[10px] text-gray-400 leading-none">Download on the</p>
        <p className="text-sm font-bold text-white leading-tight">App Store</p>
      </div>
    </motion.a>
  );
}

function GooglePlayButton() {
  return (
    <motion.a
      href="#"
      whileHover={{ scale: 1.04, y: -2 }}
      whileTap={{ scale: 0.97 }}
      className="flex items-center gap-3 bg-black border border-[#333] px-5 py-3.5 rounded-2xl min-w-44 shadow-lg hover:border-primary/40 transition-all duration-200"
    >
      <svg width="22" height="24" viewBox="0 0 20 22" fill="none" className="flex-shrink-0">
        <path d="M1.07.65C.67.87.4 1.3.4 1.85v18.3c0 .55.27.98.67 1.2l.1.06 10.25-10.25v-.24L1.17.59l-.1.06Z" fill="url(#cta-gp-a)" />
        <path d="m14.83 14.57-3.41-3.42v-.24l3.41-3.42.08.04 4.04 2.3c1.15.65 1.15 1.72 0 2.38l-4.04 2.3-.08.06Z" fill="url(#cta-gp-b)" />
        <path d="M14.91 14.51 11.42 11 1.07 21.35c.38.4.99.45 1.69.05l12.15-6.89" fill="url(#cta-gp-c)" />
        <path d="M14.91 7.49 2.76.6C2.06.19 1.45.25 1.07.65L11.42 11l3.49-3.51Z" fill="url(#cta-gp-d)" />
        <defs>
          <linearGradient id="cta-gp-a" x1="10.64" y1="1.77" x2="-3.73" y2="16.14" gradientUnits="userSpaceOnUse">
            <stop stopColor="#00A0FF" /><stop offset="1" stopColor="#00F" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="cta-gp-b" x1="20.3" y1="11" x2="9.76" y2="11" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FFD900" /><stop offset="1" stopColor="#FF9100" />
          </linearGradient>
          <linearGradient id="cta-gp-c" x1="12.67" y1="12.83" x2="-2.83" y2="28.33" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FF3A44" /><stop offset="1" stopColor="#C31162" />
          </linearGradient>
          <linearGradient id="cta-gp-d" x1="-1.07" y1="-3.82" x2="6.62" y2="3.87" gradientUnits="userSpaceOnUse">
            <stop stopColor="#32A071" /><stop offset="1" stopColor="#2DA771" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
      <div className="text-left">
        <p className="text-[10px] text-gray-400 leading-none">GET IT ON</p>
        <p className="text-sm font-bold text-white leading-tight">Google Play</p>
      </div>
    </motion.a>
  );
}

export default function CTASection() {
  return (
    <section
      id="download"
      className="py-24 relative overflow-hidden"
      aria-label="Download section"
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-primary/10 rounded-full blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              'linear-gradient(#D0EA59 1px, transparent 1px), linear-gradient(90deg, #D0EA59 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 bg-primary/10 border border-primary/30 rounded-full px-4 py-2 mb-8"
        >
          <RocketIcon className="w-4 h-4 text-primary" />
          <span className="text-primary text-xs font-semibold tracking-wide">
            Free to download — no credit card needed
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-5xl sm:text-6xl font-bold text-surface-text mb-6 leading-tight"
        >
          Start Your{' '}
          <span className="text-gradient">Fitness Journey</span>
          <br />
          Today
        </motion.h2>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-surface-secondary text-xl leading-relaxed mb-10 max-w-2xl mx-auto"
        >
          Join 50,000+ fitness enthusiasts who track smarter, share louder, and earn more
          with every workout. Your first reward is waiting.
        </motion.p>

        {/* Download Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
        >
          <AppStoreButton />
          <GooglePlayButton />
        </motion.div>

        {/* Social Proof */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          {/* Avatars */}
          <div className="flex -space-x-2">
            {['AK', 'RS', 'PM', 'DV', 'SK'].map((initials, i) => (
              <div
                key={i}
                className="w-10 h-10 rounded-full border-2 border-surface-bg flex items-center justify-center text-white text-xs font-bold"
                style={{
                  background: ['#6366f1', '#ec4899', '#f59e0b', '#10b981', '#3b82f6'][i],
                }}
              >
                {initials[0]}
              </div>
            ))}
          </div>
          <div className="text-left">
            <div className="flex items-center gap-0.5 mb-0.5">
              {[1, 2, 3, 4, 5].map((star) => (
                <StarIcon key={star} className="w-4 h-4 text-primary" />
              ))}
            </div>
            <p className="text-surface-secondary text-sm">
              <span className="text-surface-text font-semibold">4.8/5</span> from 10,000+ reviews
            </p>
          </div>
        </motion.div>

        {/* Decorative line */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent"
        />
      </div>
    </section>
  );
}
