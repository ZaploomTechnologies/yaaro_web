'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { NAV_LINKS } from '../constants';


export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('#home');
  // A pinned section (e.g. MoveHealth) can ask the navbar to go transparent
  // and drop its menu icon while it owns the viewport.
  const [navOverlay, setNavOverlay] = useState(false);
  const pathname = usePathname();
  const onLightHero = pathname === '/' && !scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onOverlay = (e) => {
      setNavOverlay(!!e.detail);
      if (e.detail) setMenuOpen(false);
    };
    window.addEventListener('yaaro:navoverlay', onOverlay);
    return () => window.removeEventListener('yaaro:navoverlay', onOverlay);
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setActiveLink(href);
    setMenuOpen(false);
    setTimeout(() => {
      window.location.hash = href;
    }, 300);
  };

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled && !navOverlay
          ? 'bg-surface-bg border-b border-border'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`relative flex items-center transition-all duration-300 ${
            scrolled ? 'h-14 justify-center' : 'h-16 md:h-18 justify-between'
          }`}
        >
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, '#home')}
            className="flex items-center gap-2 group"
          >
            <img
              src="/Yaaro-Logo.png"
              alt=""
              width={scrolled ? 64 : 80}
              className="transition-all duration-300"
            />
          </a>

          {/* Desktop Nav — hidden once the header goes flat */}
          <div className={`items-center gap-1 ${scrolled ? 'hidden' : 'hidden md:flex'}`}>
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeLink === link.href
                    ? onLightHero
                      ? 'text-[#14140F] bg-white shadow-sm'
                      : 'text-primary bg-primary/10'
                    : onLightHero
                      ? 'text-[#6E6A5D] hover:text-[#14140F] hover:bg-black/5'
                      : 'text-surface-secondary hover:text-surface-text hover:bg-surface-card'
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>
          {/* Menu button — mobile always, or any width once flat; hidden
              while a pinned section owns the viewport */}
          <button
            className={`flex-col gap-1.5 p-2 rounded-lg transition-colors ${
              navOverlay
                ? 'hidden'
                : scrolled
                  ? 'flex absolute right-4 hover:bg-surface-card'
                  : `flex md:hidden ${onLightHero ? 'hover:bg-black/5' : 'hover:bg-surface-card'}`
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
            className={`${scrolled ? '' : 'md:hidden'} bg-surface-bg/95 backdrop-blur-xl border-t border-border overflow-hidden`}
          >
            <div className="px-4 py-4 space-y-1">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="block px-4 py-3 rounded-xl text-surface-secondary hover:text-surface-text hover:bg-surface-card transition-all font-medium"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
