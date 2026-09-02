'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { NAV_LINKS } from '../constants';

// Real routes (not in-page anchors) — navigated with the router, not snapjump.
const PAGE_LINKS = [
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];


export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('#home');
  const pathname = usePathname();
  // The home page is light-themed end to end (hero through footer), so the
  // navbar stays in its dark-on-light styling and stays transparent the
  // whole way down — not just during the unscrolled hero moment.
  const isHome = pathname === '/';
  const onLightHero = isHome;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setActiveLink(href);
    setMenuOpen(false);
    window.dispatchEvent(new CustomEvent('yaaro:snapjump', { detail: { id: href.replace('#', '') } }));
  };

  // Home first, then the standalone routes, then the remaining in-page anchors.
  const [homeLink, ...anchorLinks] = NAV_LINKS;
  const navItems = [homeLink, ...PAGE_LINKS, ...anchorLinks];

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        !isHome && scrolled
          ? 'bg-surface-bg border-b border-border'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`relative flex items-center justify-between transition-all duration-300 ${
            scrolled ? 'h-14' : 'h-16 md:h-18'
          }`}
        >
          {/* Logo — shown only in the full (unscrolled) header */}
          {!scrolled && (
            <a
              href="#home"
              onClick={(e) => handleNavClick(e, '#home')}
              className="flex items-center gap-2 group"
            >
              <img
                src="/Yaaro-Logo.png"
                alt=""
                width={92}
                className="transition-all duration-300"
              />
            </a>
          )}

          {/* Desktop Nav — hidden once the header goes flat */}
          <div className={`items-center gap-1 ${scrolled ? 'hidden' : 'hidden md:flex'}`}>
            {navItems.map((link) => {
              const cls = `px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeLink === link.href
                  ? onLightHero
                    ? 'text-[#14140F] bg-white shadow-sm'
                    : 'text-primary bg-primary/10'
                  : onLightHero
                    ? 'text-[#6E6A5D] hover:text-[#14140F] hover:bg-black/5'
                    : 'text-surface-secondary hover:text-surface-text hover:bg-surface-card'
              }`;
              return link.href.startsWith('/') ? (
                <Link key={link.href} href={link.href} className={cls}>
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={cls}
                >
                  {link.label}
                </a>
              );
            })}
          </div>
          {/* Menu button — on the home page it's mobile-only at every scroll
              position (desktop never gets a hamburger there); other pages
              keep the desktop fallback once the header goes flat. */}
          <button
            className={`flex-col gap-1.5 p-2 rounded-lg transition-colors ${
              isHome
                ? `flex md:hidden ${scrolled ? 'absolute right-4' : ''} hover:bg-black/5`
                : scrolled
                  ? 'flex absolute right-4 hover:bg-surface-card'
                  : 'flex md:hidden hover:bg-surface-card'
            }`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <motion.span
              animate={menuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
              className={`block w-6 h-0.5 transition-transform origin-center ${onLightHero ? 'bg-[#14140F]' : 'bg-surface-text'}`}
            />
            <motion.span
              animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
              className={`block w-6 h-0.5 ${onLightHero ? 'bg-[#14140F]' : 'bg-surface-text'}`}
            />
            <motion.span
              animate={menuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
              className={`block w-6 h-0.5 transition-transform origin-center ${onLightHero ? 'bg-[#14140F]' : 'bg-surface-text'}`}
            />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className={`overflow-hidden ${isHome || !scrolled ? 'md:hidden' : ''} ${
              isHome
                ? 'bg-[#EDEDE8]/95 backdrop-blur-xl border-t border-[#14140F]/10'
                : 'bg-surface-bg/95 backdrop-blur-xl border-t border-border'
            }`}
          >
            <div className="px-4 py-4 space-y-1">
              {navItems.map((link) => {
                const cls = `block px-4 py-3 rounded-xl transition-all font-medium ${
                  isHome
                    ? 'text-[#6E6A5D] hover:text-[#14140F] hover:bg-black/5'
                    : 'text-surface-secondary hover:text-surface-text hover:bg-surface-card'
                }`;
                return link.href.startsWith('/') ? (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className={cls}
                  >
                    {link.label}
                  </Link>
                ) : (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={cls}
                  >
                    {link.label}
                  </a>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
