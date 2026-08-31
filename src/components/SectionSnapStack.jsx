'use client';

import { Children, cloneElement, isValidElement, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useLenis } from './SmoothScrollProvider';

const useIsoLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

/* -------------------------------------------------------------------------- */
/*  Tuning — the same proven constants the original MoveHealth scroll-lock     */
/*  controller used, generalized from "one section, N scenes" to "the whole   */
/*  page, N sections."                                                        */
/* -------------------------------------------------------------------------- */
const SNAP_DURATION = 0.75;
const ENTRANCE_DURATION = 0.85;
const WHEEL_STEP = 50;
const WHEEL_DECAY = 180;
const STEP_COOLDOWN = 260;
const TOUCH_THRESHOLD = 30;

// Panel 0 (Hero) stays `position: sticky` instead of scrolling away like
// every other panel, so panel 1 visibly slides up and covers it — the
// signature "next section comes over the hero" look — while Hero itself
// recedes (shrinks + dims) underneath. Values match the site's original
// HeroSnapStack treatment.
const HERO_RECEDE_SCALE = 0.92;
const HERO_RECEDE_DIM = 0.5;

/**
 * Site-wide scroll-locked section stack.
 *
 * Every direct child becomes one `100svh` panel. Panel 0 (Hero) stays
 * `position: sticky` while every other panel is normal document flow, so
 * panel 1 visibly slides up and covers Hero as it recedes (shrinks + dims)
 * underneath — the rest of the stack has no such covering illusion, each
 * panel just replaces the last. The page starts locked on panel 0; each
 * wheel/touch/keyboard gesture snaps exactly one panel forward or backward
 * (never a partial scroll), with a cinematic blur-free scale/opacity/rise
 * entrance settling in as each non-Hero panel arrives. Past the last panel,
 * one more forward gesture releases the lock and normal scrolling continues
 * into whatever follows (the footer) — scrolling back up from there
 * re-engages the lock at the last panel.
 *
 * A panel whose own content is taller than the viewport scrolls that content
 * internally first; only once it's at the top/bottom edge does a gesture
 * advance to the next/previous panel.
 *
 * Each child is cloned with an `active` boolean prop (true only for the
 * currently on-stage panel) so a section can gate its own internal reveal
 * animation (staggered cards, autoplay) on it instead of native
 * scroll-into-view. `prefers-reduced-motion` bypasses all of it — a plain,
 * normally-scrolling stack of sections, no pin/lock/autoplay.
 */
export default function SectionSnapStack({ children }) {
  const panelRefs = useRef([]);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const lenis = useLenis();
  const kids = Children.toArray(children).filter(isValidElement);
  const N = kids.length;

  useEffect(() => {
    setReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  // Hide the window scrollbar while this stack drives real document scroll —
  // scrolling still works exactly the same, it's just not shown as a bar.
  // Reduced-motion mode leaves it in place since that's the only nav cue.
  useEffect(() => {
    if (reducedMotion) return;
    document.documentElement.classList.add('scrollbar-hide');
    return () => document.documentElement.classList.remove('scrollbar-hide');
  }, [reducedMotion]);

  useIsoLayoutEffect(() => {
    if (reducedMotion || !lenis) return;

    const ctx = gsap.context(() => {
      const panels = panelRefs.current.slice(0, N).filter(Boolean);
      if (panels.length !== N) return;

      let stepIndex = 0;
      let phase = 'locked'; // 'locked' | 'released'
      let transitioning = false;
      let cooldownUntil = 0;
      let lastWheelTs = 0;
      let wheelAccum = 0;
      let touchUsed = false;

      const now = () => performance.now();
      const canStep = () => !transitioning && now() >= cooldownUntil;

      const rectTop = (idx) => panels[idx].getBoundingClientRect().top;
      // Panel 0 is `position: sticky` once stuck, so its own bounding rect
      // always reads ~0 (viewport-relative) regardless of real scroll
      // position — it's always the very first panel, so its true document
      // position is trivially always 0 anyway.
      const panelTopY = (idx) => (idx === 0 ? 0 : rectTop(idx) + window.scrollY);

      const setStep = (idx) => {
        stepIndex = idx;
        setActiveIndex(idx);
      };

      // Cinematic settle: the arriving panel eases in from a slightly
      // enlarged, faded, dropped-in state — the visual signature reused
      // across every section, mirrored from MoveHealth's own scene entrance.
      // Deliberately transform + opacity only (no `filter: blur`, which
      // forces an expensive per-frame repaint across a full-viewport panel
      // of photos and cards) — the GPU can composite this cheaply instead.
      const playEntrance = (idx) => {
        const panel = panels[idx];
        if (!panel) return;
        gsap.fromTo(
          panel,
          { scale: 1.04, opacity: 0.7, y: 18 },
          {
            scale: 1,
            opacity: 1,
            y: 0,
            duration: ENTRANCE_DURATION,
            ease: 'power2.out',
            overwrite: 'auto',
            onStart: () => gsap.set(panel, { willChange: 'transform, opacity' }),
            onComplete: () => gsap.set(panel, { clearProps: 'willChange' }),
          }
        );
      };

      // Hero (panel 0) never gets the normal blur-free scale/opacity
      // "arriving" entrance — it's not really arriving, it's the sticky
      // backdrop the next panel slides over. Its own visual is exclusively
      // this recede/restore tween instead.
      const heroRecede = () => {
        gsap.set(panels[0], { visibility: 'visible' });
        gsap.to(panels[0], {
          scale: HERO_RECEDE_SCALE,
          opacity: HERO_RECEDE_DIM,
          duration: SNAP_DURATION,
          ease: 'none',
          overwrite: 'auto',
          onComplete: () => gsap.set(panels[0], { visibility: 'hidden' }),
        });
      };
      const heroRestore = () => {
        gsap.set(panels[0], { visibility: 'visible' });
        gsap.to(panels[0], {
          scale: 1,
          opacity: 1,
          duration: SNAP_DURATION,
          ease: 'none',
          overwrite: 'auto',
        });
      };

      const animateToStep = (idx) => {
        const leavingHero = stepIndex === 0 && idx !== 0;
        const enteringHero = idx === 0 && stepIndex !== 0;
        setStep(idx);
        transitioning = true;
        if (enteringHero) {
          heroRestore();
        } else {
          playEntrance(idx);
          if (leavingHero) heroRecede();
        }
        lenis.scrollTo(panelTopY(idx), {
          duration: SNAP_DURATION,
          lock: true,
          force: true,
          onComplete: () => {
            transitioning = false;
            cooldownUntil = now() + STEP_COOLDOWN;
          },
        });
      };

      const activeContent = () => panels[stepIndex];
      const atContentBottom = () => {
        const el = activeContent();
        if (!el) return true;
        return el.scrollHeight - el.scrollTop - el.clientHeight <= 1;
      };
      const atContentTop = () => {
        const el = activeContent();
        if (!el) return true;
        return el.scrollTop <= 1;
      };

      const releaseForward = () => {
        phase = 'released';
        wheelAccum = 0;
        lenis.start();
      };

      const forward = () => {
        if (!canStep()) return;
        if (stepIndex < N - 1) animateToStep(stepIndex + 1);
        else releaseForward();
      };
      const backward = () => {
        if (!canStep() || stepIndex === 0) return;
        animateToStep(stepIndex - 1);
      };

      // Backstop: re-engage the lock only when the user scrolls back UP past
      // the last panel's own top — comparing real scrollY against a fixed
      // anchor (not a moving bounding-rect distance) so continuing to scroll
      // further DOWN into the footer after release never falsely re-locks.
      const checkReengage = () => {
        if (phase !== 'released') return;
        if (now() < cooldownUntil) return;
        const boundary = panelTopY(N - 1);
        if (window.scrollY < boundary - 2) {
          phase = 'locked';
          stepIndex = N - 1;
          setActiveIndex(N - 1);
          lenis.stop();
          window.scrollTo(0, boundary);
          cooldownUntil = now() + STEP_COOLDOWN;
        }
      };

      // While locked, keep real scroll pinned to the active panel — guards
      // against elastic bounce, resize nudges, or anything else that isn't
      // one of our own gesture handlers moving the page.
      const onScroll = () => {
        if (phase === 'locked') {
          if (!transitioning) {
            const rt = rectTop(stepIndex);
            if (Math.abs(rt) > 1) window.scrollTo(0, window.scrollY + rt);
          }
        } else {
          checkReengage();
        }
      };

      // Drive a taller panel's own overflow manually rather than falling
      // through to native scroll — Lenis owns wheel input globally while
      // `lenis.stop()` is in effect, so a pass-through native scroll never
      // actually happens and the gesture would otherwise be silently eaten.
      const scrollContentBy = (dy) => {
        const el = activeContent();
        if (!el) return;
        el.scrollTop = gsap.utils.clamp(0, el.scrollHeight - el.clientHeight, el.scrollTop + dy);
      };

      const onWheel = (e) => {
        const t = now();
        const gap = t - lastWheelTs;
        lastWheelTs = t;

        if (phase === 'released') return; // free scroll into the footer

        e.preventDefault();
        if (!canStep()) return;

        if (e.deltaY > 0 && !atContentBottom()) {
          scrollContentBy(e.deltaY);
          return;
        }
        if (e.deltaY < 0 && !atContentTop()) {
          scrollContentBy(e.deltaY);
          return;
        }

        if (gap > WHEEL_DECAY) wheelAccum = 0;
        wheelAccum += e.deltaY;
        if (wheelAccum >= WHEEL_STEP) {
          wheelAccum = 0;
          forward();
        } else if (wheelAccum <= -WHEEL_STEP) {
          wheelAccum = 0;
          backward();
        }
      };

      const KEY_SCROLL_STEP = 80;
      const FWD_KEYS = ['ArrowDown', 'PageDown', ' ', 'Spacebar', 'End'];
      const BACK_KEYS = ['ArrowUp', 'PageUp', 'Home'];
      const onKeyDown = (e) => {
        if (phase !== 'locked') return;
        if (e.target instanceof HTMLElement && /^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName)) return;
        if (FWD_KEYS.includes(e.key)) {
          e.preventDefault();
          if (!canStep()) return;
          if (!atContentBottom()) {
            scrollContentBy(KEY_SCROLL_STEP);
            return;
          }
          forward();
        } else if (BACK_KEYS.includes(e.key)) {
          e.preventDefault();
          if (!canStep()) return;
          if (!atContentTop()) {
            scrollContentBy(-KEY_SCROLL_STEP);
            return;
          }
          backward();
        }
      };

      let touchY = null;
      let lastTouchY = null;
      const onTouchStart = (e) => {
        touchY = e.touches[0].clientY;
        lastTouchY = touchY;
        touchUsed = false;
      };
      const onTouchMove = (e) => {
        if (phase === 'released' || touchY == null) return;
        e.preventDefault();
        if (!canStep()) return;
        if (touchUsed) return;

        const y = e.touches[0].clientY;
        const frameDy = lastTouchY - y; // this frame's delta, for content scroll
        lastTouchY = y;
        const dy = touchY - y; // total delta since touch start, for the step gesture

        if (dy > TOUCH_THRESHOLD) {
          if (!atContentBottom()) {
            scrollContentBy(frameDy);
            return;
          }
          touchUsed = true;
          forward();
        } else if (dy < -TOUCH_THRESHOLD) {
          if (!atContentTop()) {
            scrollContentBy(frameDy);
            return;
          }
          touchUsed = true;
          backward();
        } else {
          scrollContentBy(frameDy);
        }
      };
      const onTouchEnd = () => {
        touchY = null;
        lastTouchY = null;
        touchUsed = false;
      };

      // Jump-to-id, wired to Navbar's nav-link clicks and in-page CTA anchors.
      const onSnapJump = (e) => {
        const id = e.detail?.id;
        if (!id) return;
        const idx = panels.findIndex((el) => el.firstElementChild?.id === id);
        if (idx === -1) return;
        if (phase === 'released') {
          phase = 'locked';
          lenis.stop();
        }
        if (!canStep()) return;
        animateToStep(idx);
      };

      // Initial lock: start pinned to panel 0, settled instantly (no
      // animated entrance — protects first paint).
      lenis.stop();
      window.scrollTo(0, panelTopY(0));
      gsap.set(panels[0], { scale: 1, opacity: 1, y: 0 });

      window.addEventListener('wheel', onWheel, { passive: false });
      window.addEventListener('keydown', onKeyDown);
      window.addEventListener('touchstart', onTouchStart, { passive: true });
      window.addEventListener('touchmove', onTouchMove, { passive: false });
      window.addEventListener('touchend', onTouchEnd, { passive: true });
      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('yaaro:snapjump', onSnapJump);

      return () => {
        window.removeEventListener('wheel', onWheel);
        window.removeEventListener('keydown', onKeyDown);
        window.removeEventListener('touchstart', onTouchStart);
        window.removeEventListener('touchmove', onTouchMove);
        window.removeEventListener('touchend', onTouchEnd);
        window.removeEventListener('scroll', onScroll);
        window.removeEventListener('yaaro:snapjump', onSnapJump);
        lenis.start();
      };
    });

    return () => ctx.revert();
  }, [reducedMotion, lenis, N]);

  if (reducedMotion) {
    return <>{kids}</>;
  }

  return (
    <>
      {kids.map((child, i) => (
        <div
          key={child.key ?? i}
          ref={(el) => (panelRefs.current[i] = el)}
          className={`h-[100svh] overflow-y-auto overscroll-contain scrollbar-hide snap-panel ${
            i === 0 ? 'sticky top-0 z-0' : 'relative z-10'
          }`}
        >
          {cloneElement(child, { active: i === activeIndex })}
        </div>
      ))}
    </>
  );
}
