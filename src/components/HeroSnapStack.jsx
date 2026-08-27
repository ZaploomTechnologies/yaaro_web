'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Hero from '../sections/Hero';

gsap.registerPlugin(ScrollTrigger);

const HERO_RECEDE_SCALE = 0.92;
const HERO_RECEDE_DIM = 0.5;

/**
 * The hero sits in a full-viewport `sticky` box; everything after it is a
 * normal block that scrolls up and covers it. Because the cover is pure
 * layout (a sibling sliding past a stuck element), it's always in exact
 * lockstep with the scroll position — smooth, reversible, and repeatable.
 * The only thing scripted is the hero's recede (scale + dim), scrubbed to
 * the same scroll range so it tracks the cover perfectly in both directions.
 */
export default function HeroSnapStack({ children }) {
  const heroRef = useRef(null);
  const contentRef = useRef(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;
    const hero = heroRef.current;
    const content = contentRef.current;
    if (!hero || !content) return;

    const ctx = gsap.context(() => {
      // Recede the hero across the one-viewport range where `content` slides
      // from just-below-the-fold to fully covering it.
      gsap.to(hero, {
        scale: HERO_RECEDE_SCALE,
        opacity: HERO_RECEDE_DIM,
        ease: 'none',
        scrollTrigger: {
          trigger: content,
          start: 'top bottom',
          end: 'top top',
          scrub: true,
        },
      });

      // Once covered, drop the hero out of the paint entirely (it's a stuck
      // element that would otherwise stay composited behind every section).
      ScrollTrigger.create({
        trigger: content,
        start: 'top top',
        end: 'max',
        onToggle: ({ isActive }) => {
          gsap.set(hero.parentElement, { visibility: isActive ? 'hidden' : 'visible' });
        },
      });
    });

    // Hero height is fixed (100svh), but fonts/images settling can still
    // nudge trigger positions — recompute once things are stable.
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener('load', refresh);

    return () => {
      window.removeEventListener('load', refresh);
      ctx.revert();
    };
  }, [reducedMotion]);

  if (reducedMotion) {
    return (
      <>
        <Hero />
        <div className="bg-surface-bg">{children}</div>
      </>
    );
  }

  return (
    <>
      <div className="sticky top-0 z-0 h-[100svh] overflow-hidden bg-[#EDEDE8]">
        <div
          ref={heroRef}
          className="h-full"
          style={{ transformOrigin: 'center center', willChange: 'transform, opacity' }}
        >
          <Hero />
        </div>
      </div>
      <div ref={contentRef} className="relative z-10 bg-surface-bg">
        {children}
      </div>
    </>
  );
}
