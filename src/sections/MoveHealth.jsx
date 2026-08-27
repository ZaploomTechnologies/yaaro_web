'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLenis } from '../components/SmoothScrollProvider';
import { WalkIcon, RunIcon, CycleIcon, DumbbellIcon, DanceIcon } from '../components/Icons';

gsap.registerPlugin(ScrollTrigger);

const useIsoLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

/* -------------------------------------------------------------------------- */
/*  Tuning                                                                     */
/* -------------------------------------------------------------------------- */

// Length of one scene→scene transition, in seconds. Higher = slower / calmer.
const STEP_DURATION = 1.7;
const STEP_EASE = 'power2.inOut';

// The section slides up to cover the viewport (SNAP_DURATION) while the
// content settles in (ENTRANCE_DURATION) — the two run together so the
// section and its animation arrive as one motion, not one after the other.
const SNAP_DURATION = 0.75;
const ENTRANCE_DURATION = 0.85;

// Wheel/trackpad: deltaY accumulates while the section is idle; once it
// passes WHEEL_STEP one step fires and the accumulator resets. All wheel
// input is dropped outright while a step is animating or cooling down, so a
// flick's long inertia tail can never queue a phantom step or wedge the
// controller. A pause of WHEEL_DECAY ms also zeroes the accumulator.
const WHEEL_STEP = 50;
const WHEEL_DECAY = 180;
const STEP_COOLDOWN = 260;
const RELEASE_COOLDOWN = 260;
const TOUCH_THRESHOLD = 30;

// Outgoing scenes recede — the whole composition zooms down toward this scale
// while it drifts left and fades, so it reads as pulling away.
const EXIT_SCALE = 0.68;

// Soft CSS alpha mask for the photography (see css-alpha-masking skill): a
// gentle radial vignette whose edges ease toward the surface colour but never
// hit zero, so every photo still reads as a framed card.
const IMAGE_MASK =
  'radial-gradient(ellipse 90% 92% at 50% 44%, #000 60%, rgba(0,0,0,0.12) 100%)';
const MASK_STYLE = { maskImage: IMAGE_MASK, WebkitMaskImage: IMAGE_MASK };

// Support photo sits flush under the solid label block — keep its top opaque,
// fade only the bottom.
const SUPPORT_MASK = 'linear-gradient(to bottom, #000 68%, rgba(0,0,0,0.05) 100%)';
const SUPPORT_MASK_STYLE = { maskImage: SUPPORT_MASK, WebkitMaskImage: SUPPORT_MASK };

/* -------------------------------------------------------------------------- */
/*  Scene content — edit copy / swap images here                               */
/* -------------------------------------------------------------------------- */

const SCENES = [
  {
    name: 'Walking',
    image: '/walking.jpg',
    alt: 'Person walking outdoors on a tree-lined path',
    support: '/running.jpg',
    supportAlt: 'Warming up before a walk',
    label: ['Move More', 'Feel Better'],
    caption: 'Every step counts. Turn a simple walk into momentum for a healthier, more energized you.',
    Icon: WalkIcon,
  },
  {
    name: 'Running',
    image: '/running.jpg',
    alt: 'Runner mid-stride on an open road',
    support: '/cycling.jpg',
    supportAlt: 'Athlete checking pace on a run',
    label: ['Chase Pace', 'Build Endurance'],
    caption: 'Track pace, distance and elevation on every run, and watch yesterday’s limit become today’s warm-up.',
    Icon: RunIcon,
  },
  {
    name: 'Cycling',
    image: '/cycling.jpg',
    alt: 'Cyclist riding at speed on an open road',
    support: '/yoga.jpg',
    supportAlt: 'Stretching after a ride',
    label: ['Ride Far', 'Stay Strong'],
    caption: 'Map your routes, clock your speed and turn every ride into measurable progress toward your goals.',
    Icon: CycleIcon,
  },
  {
    name: 'Workout',
    image: '/workout.jpg',
    alt: 'Athlete mid-workout with weights',
    support: '/walking.jpg',
    supportAlt: 'Recovering between sets',
    label: ['Think Less', 'Lift More'],
    caption: 'Log sets, reps and load for every session and see your strength curve climb week over week.',
    Icon: DumbbellIcon,
  },
  {
    name: 'Dance',
    image: '/dance.jpg',
    alt: 'Dancer mid-move under warm light',
    support: '/yoga.jpg',
    supportAlt: 'Cooling down after dancing',
    label: ['Move Free', 'Feel Alive'],
    caption: 'Turn every session into calories tracked and moves counted — fitness that never feels like a workout.',
    Icon: DanceIcon,
  },
];

// Desktop-only per-scene composition (lg). Below lg every scene shares the
// MOBILE_* layout; under reduced motion positioning is dropped entirely.
const MOBILE_BIG =
  'motion-safe:max-lg:absolute motion-safe:max-lg:inset-x-0 motion-safe:max-lg:top-0 motion-safe:max-lg:h-[60%]';
const MOBILE_SUPPORT =
  'motion-safe:max-lg:absolute motion-safe:max-lg:right-0 motion-safe:max-lg:bottom-[2%] motion-safe:max-lg:w-[58%] motion-safe:max-lg:mt-0';

const LAYOUTS = [
  {
    big: 'motion-safe:lg:absolute motion-safe:lg:left-0 motion-safe:lg:top-[4%] motion-safe:lg:w-[70%] motion-safe:lg:h-[84%]',
    support: 'motion-safe:lg:absolute motion-safe:lg:right-0 motion-safe:lg:bottom-0 motion-safe:lg:w-[42%] motion-safe:lg:mt-0',
  },
  {
    big: 'motion-safe:lg:absolute motion-safe:lg:right-0 motion-safe:lg:top-0 motion-safe:lg:w-[68%] motion-safe:lg:h-[82%]',
    support: 'motion-safe:lg:absolute motion-safe:lg:left-0 motion-safe:lg:bottom-[3%] motion-safe:lg:w-[40%] motion-safe:lg:mt-0',
  },
  {
    big: 'motion-safe:lg:absolute motion-safe:lg:right-0 motion-safe:lg:bottom-0 motion-safe:lg:w-[66%] motion-safe:lg:h-[80%]',
    support: 'motion-safe:lg:absolute motion-safe:lg:left-0 motion-safe:lg:top-0 motion-safe:lg:w-[42%] motion-safe:lg:mt-0',
  },
  {
    big: 'motion-safe:lg:absolute motion-safe:lg:left-[3%] motion-safe:lg:top-[8%] motion-safe:lg:w-[68%] motion-safe:lg:h-[84%]',
    support: 'motion-safe:lg:absolute motion-safe:lg:right-[1%] motion-safe:lg:bottom-[2%] motion-safe:lg:w-[44%] motion-safe:lg:mt-0',
  },
  {
    big: 'motion-safe:lg:absolute motion-safe:lg:right-[2%] motion-safe:lg:top-0 motion-safe:lg:w-[64%] motion-safe:lg:h-[86%]',
    support: 'motion-safe:lg:absolute motion-safe:lg:left-0 motion-safe:lg:top-[24%] motion-safe:lg:w-[40%] motion-safe:lg:mt-0',
  },
];

/* -------------------------------------------------------------------------- */
/*  Component                                                                  */
/* -------------------------------------------------------------------------- */

/**
 * Scroll-locked step slider.
 *
 * One `100svh` section that consumes scroll *events*, not scroll *distance*.
 * The first downward gesture from the hero snaps the section up to cover the
 * viewport, freezes the page (`lenis.stop()`), and plays a cinematic settle.
 * From there each discrete gesture drives a `playhead` proxy that is written
 * to a paused GSAP timeline's `progress()` — one full ~2s scene transition
 * every time, reversible one scene per scroll. Past the last scene (or before
 * the first) one more gesture releases the lock and normal scrolling resumes.
 *
 * `prefers-reduced-motion` bypasses all of it: a static vertical list.
 */
export default function MoveHealth() {
  const sectionRef = useRef(null);
  const stageRef = useRef(null);
  const introRef = useRef(null);
  const stageColRef = useRef(null);
  const progressRef = useRef(null);
  const sceneRefs = useRef([]);

  const [activeIndex, setActiveIndex] = useState(0);
  const [storyActive, setStoryActive] = useState(false);

  const lenis = useLenis();
  const N = SCENES.length;

  useIsoLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      /* ---------- Motion path: scroll-locked step slider ---------------- */
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        if (!lenis) return; // effect re-runs once Lenis is ready (dep below)

        const scenes = sceneRefs.current.filter(Boolean);
        if (scenes.length !== N) return;

        setStoryActive(true);

        const parts = scenes.map((scene) => ({
          scene,
          big: scene.querySelector('[data-big]'),
          bigImg: scene.querySelector('[data-big-img]'),
          support: scene.querySelector('[data-support]'),
          cap: scene.querySelector('[data-caption]'),
        }));

        // --- Initial states: scene 0 settled, the rest waiting stage-right
        parts.forEach((p, i) => {
          gsap.set(p.scene, { zIndex: i + 1 });
          if (i === 0) {
            gsap.set(p.big, { xPercent: 0, opacity: 1, scale: 1 });
            gsap.set(p.bigImg, { scale: 1 });
            gsap.set(p.support, { xPercent: 0, yPercent: 0, opacity: 1, scale: 1 });
            gsap.set(p.cap, { x: 0, opacity: 1 });
          } else {
            gsap.set(p.big, { xPercent: 28, opacity: 0, scale: 0.96 });
            gsap.set(p.bigImg, { scale: 1.12 });
            gsap.set(p.support, { xPercent: 46, yPercent: 10, opacity: 0, scale: 0.9 });
            gsap.set(p.cap, { x: 40, opacity: 0 });
          }
        });

        // --- Progress rail: cumulative fill from the timeline playhead ---
        const segFills = progressRef.current
          ? Array.from(progressRef.current.querySelectorAll('[data-seg-fill]'))
          : [];
        const updateProgress = (p) => {
          const pos = p * (N - 1);
          for (let i = 0; i < N; i++) {
            const local = gsap.utils.clamp(0, 1, pos - (i - 1));
            if (segFills[i]) segFills[i].style.transform = `scaleX(${local})`;
          }
        };

        // --- The paused master timeline (1 unit per transition) ---------
        const TR = 1;
        const tl = gsap.timeline({
          paused: true,
          defaults: { ease: 'power2.inOut' },
        });
        tl.addLabel('s0', 0);

        for (let i = 0; i < N - 1; i++) {
          const start = i * TR;
          const end = start + TR;
          const cur = parts[i];
          const nxt = parts[i + 1];

          // Outgoing → zooms out small, drifts left, fades. Layers differ.
          tl.to(cur.big, { xPercent: -16, scale: EXIT_SCALE, opacity: 0, ease: 'power1.in', duration: TR * 0.92 }, start)
            .to(cur.bigImg, { scale: 1.06, ease: 'power1.in', duration: TR * 0.92 }, start)
            .to(cur.support, { xPercent: -10, yPercent: -8, scale: EXIT_SCALE - 0.06, opacity: 0, ease: 'power1.in', duration: TR * 0.92 }, start)
            .to(cur.cap, { x: -24, opacity: 0, ease: 'power1.in', duration: TR * 0.6 }, start);

          // Incoming ← from the right, overlapping the exit generously so the
          // two scenes cross-dissolve. Every layer lands exactly on the
          // segment boundary so the scene is fully settled at label `s(i+1)`.
          const io = start + TR * 0.08;
          tl.to(nxt.big, { xPercent: 0, opacity: 1, scale: 1, ease: 'power3.out', duration: end - io }, io)
            .to(nxt.bigImg, { scale: 1, ease: 'power2.out', duration: end - io }, io)
            .to(nxt.support, { xPercent: 0, yPercent: 0, opacity: 1, scale: 1, ease: 'power3.out', duration: end - (io + TR * 0.06) }, io + TR * 0.06)
            .to(nxt.cap, { x: 0, opacity: 1, ease: 'power2.out', duration: end - (io + TR * 0.12) }, io + TR * 0.12);

          tl.addLabel('s' + (i + 1), end);
        }

        /* ---------- Step + lock controller ---------------------------- */
        const TOTAL = tl.totalDuration();
        const progressOf = (idx) => tl.labels['s' + idx] / TOTAL;

        let stepIndex = 0;
        let phase = 'before'; // 'before' | 'snapping' | 'locked' | 'after'
        let cooldownUntil = 0;
        let lastWheelTs = 0;
        let wheelAccum = 0;
        let touchUsed = false;
        let engageArmed = true;
        let lastScrollY = window.scrollY;

        // The timeline is never played directly — this proxy is tweened and
        // its value is written to tl.progress() every frame. Deterministic in
        // both directions, no reliance on tweenTo internals.
        const playhead = { p: 0 };
        let stepTween = null;
        let entranceTl = null;

        const rectTop = () => sectionRef.current.getBoundingClientRect().top;
        const sectionTopY = () => rectTop() + window.scrollY;
        const now = () => performance.now();
        const busy = () => stepTween && stepTween.isActive();
        const canStep = () => !busy() && now() >= cooldownUntil;

        const render = () => {
          tl.progress(playhead.p);
          updateProgress(playhead.p);
        };

        const setStep = (idx) => {
          stepIndex = idx;
          setActiveIndex(idx);
        };

        const jumpTo = (idx) => {
          stepTween?.kill();
          stepTween = null;
          entranceTl?.progress(1).kill();
          entranceTl = null;
          playhead.p = progressOf(idx);
          render();
          setStep(idx);
        };

        const animateToStep = (idx) => {
          setStep(idx);
          stepTween?.kill();
          entranceTl?.progress(1).kill();
          entranceTl = null;
          stepTween = gsap.to(playhead, {
            p: progressOf(idx),
            duration: STEP_DURATION,
            ease: STEP_EASE,
            overwrite: true,
            onUpdate: render,
            onComplete: () => {
              stepTween = null;
              cooldownUntil = now() + STEP_COOLDOWN;
            },
          });
        };

        // Cinematic settle once the section has locked: the scene eases in
        // from a soft, slightly enlarged, out-of-focus state and the left
        // copy rises in behind it. Built as its own timeline so a step can
        // cancel it cleanly without touching the master timeline.
        const playEntrance = (idx) => {
          const p = parts[idx];
          entranceTl?.progress(1).kill();
          entranceTl = gsap.timeline();
          entranceTl
            .fromTo(
              p.bigImg,
              { scale: 1.1, filter: 'blur(9px)' },
              { scale: 1, filter: 'blur(0px)', duration: ENTRANCE_DURATION, ease: 'power2.out' },
              0
            )
            .fromTo(
              p.big,
              { opacity: 0, scale: 1.04, xPercent: 0 },
              { opacity: 1, scale: 1, duration: ENTRANCE_DURATION * 0.75, ease: 'power2.out' },
              0
            )
            .fromTo(
              p.support,
              { xPercent: 0, yPercent: 16, opacity: 0, scale: 0.96 },
              { yPercent: 0, opacity: 1, scale: 1, duration: ENTRANCE_DURATION * 0.8, ease: 'power2.out' },
              0.1
            )
            .fromTo(
              p.cap,
              { x: 0, y: 12, opacity: 0 },
              { y: 0, opacity: 1, duration: ENTRANCE_DURATION * 0.7, ease: 'power2.out' },
              0.2
            )
            .set(p.bigImg, { clearProps: 'filter' });
          if (introRef.current) {
            entranceTl.fromTo(
              introRef.current.querySelectorAll('[data-intro]'),
              { y: 18, opacity: 0 },
              { y: 0, opacity: 1, duration: ENTRANCE_DURATION * 0.75, ease: 'power2.out', stagger: 0.08 },
              0
            );
          }
        };

        const lockAt = (idx) => {
          phase = 'locked';
          engageArmed = false;
          wheelAccum = 0;
          lenis.stop();
          window.scrollTo(0, sectionTopY());
          if (!entranceTl) playEntrance(idx);
          // Small breather after the settle; a step that arrives sooner just
          // snaps the entrance to its end (see animateToStep).
          cooldownUntil = now() + STEP_COOLDOWN;
        };

        // Tell the fixed navbar to go transparent + drop its menu icon while
        // this section owns the viewport.
        const setNavOverlay = (on) =>
          window.dispatchEvent(new CustomEvent('yaaro:navoverlay', { detail: on }));

        const snapIn = (idx) => {
          if (phase !== 'before' && phase !== 'after') return;
          phase = 'snapping';
          wheelAccum = 0;
          setNavOverlay(true);
          // Seed the target scene and start its settle NOW, so it animates in
          // while the section is still sliding up — not after it lands.
          jumpTo(idx);
          playEntrance(idx);
          lenis.scrollTo(sectionTopY(), {
            duration: SNAP_DURATION,
            lock: true,
            force: true,
            onComplete: () => lockAt(idx),
          });
        };

        // Releases go through a guarded 'releasing' phase: input is frozen
        // (like 'snapping') until the page has settled at a known spot — the
        // hero top, or one viewport past the section — so it can never be
        // left half-scrolled with the lock disengaged.
        const finishRelease = (nextPhase) => {
          phase = nextPhase;
          engageArmed = false;
          lastScrollY = window.scrollY;
          cooldownUntil = now() + RELEASE_COOLDOWN;
          setNavOverlay(false);
        };
        const releaseDown = () => {
          phase = 'releasing';
          wheelAccum = 0;
          lenis.start();
          lenis.scrollTo(sectionTopY() + window.innerHeight, {
            duration: 0.6,
            lock: true,
            force: true,
            onComplete: () => finishRelease('after'),
          });
        };
        const releaseUp = () => {
          phase = 'releasing';
          wheelAccum = 0;
          lenis.start();
          lenis.scrollTo(0, {
            duration: 0.7,
            lock: true,
            force: true,
            onComplete: () => finishRelease('before'),
          });
        };

        const forward = () => {
          if (!canStep()) return;
          if (stepIndex < N - 1) animateToStep(stepIndex + 1);
          else releaseDown();
        };
        const backward = () => {
          if (!canStep()) return;
          if (stepIndex > 0) animateToStep(stepIndex - 1);
          else releaseUp();
        };

        // Backstop for when the section is brought to a covering position by
        // means our gesture handlers didn't see (scrollbar drag, an uncaught
        // wheel, an anchor jump). Disarmed right after a release so a release
        // can't immediately re-lock; re-armed once the section has clearly
        // moved away again.
        const checkEngage = () => {
          const y = window.scrollY;
          const dir = Math.sign(y - lastScrollY);
          lastScrollY = y;
          if (phase !== 'before' && phase !== 'after') return;
          if (now() < cooldownUntil) return;
          const rt = rectTop();
          const vh = window.innerHeight;
          // Invariant: the section covering the viewport while unlocked is
          // never a valid resting state — grab it no matter the arm/direction.
          if (Math.abs(rt) <= 10) {
            snapIn(phase === 'after' ? N - 1 : 0);
            return;
          }
          // After a release the section is disarmed — it must leave the
          // viewport zone before it can grab the lock again.
          if (!engageArmed) {
            if (Math.abs(rt) > vh * 0.7) engageArmed = true;
            return;
          }
          if (Math.abs(rt) > vh * 0.5) return;
          if (phase === 'before' && dir >= 0) snapIn(0);
          else if (phase === 'after' && dir <= 0) snapIn(N - 1);
        };

        const onWheel = (e) => {
          const t = now();
          const gap = t - lastWheelTs;
          lastWheelTs = t;

          if (phase === 'snapping' || phase === 'releasing') {
            e.preventDefault();
            return;
          }

          if (phase === 'locked') {
            e.preventDefault();
            // Drop every wheel event while a step is running or cooling down —
            // the inertia tail of the flick that triggered the step lands here
            // and must not accumulate.
            if (!canStep()) {
              wheelAccum = 0;
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
            return;
          }

          // phase 'before' | 'after': one push toward the section engages it
          // as soon as the section overlaps the viewport.
          const rt = rectTop();
          const vh = window.innerHeight;
          if (t < cooldownUntil) return;
          if (phase === 'before' && e.deltaY > 0 && rt > 2 && rt <= vh) {
            e.preventDefault();
            snapIn(0);
          } else if (phase === 'after' && e.deltaY < 0 && rt < -2 && rt >= -vh) {
            e.preventDefault();
            snapIn(N - 1);
          }
        };

        const FWD_KEYS = ['ArrowDown', 'PageDown', ' ', 'Spacebar', 'End'];
        const BACK_KEYS = ['ArrowUp', 'PageUp', 'Home'];
        const onKeyDown = (e) => {
          if (phase !== 'locked') return;
          if (e.target instanceof HTMLElement && /^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName)) return;
          if (FWD_KEYS.includes(e.key)) {
            e.preventDefault();
            forward();
          } else if (BACK_KEYS.includes(e.key)) {
            e.preventDefault();
            backward();
          }
        };

        let touchY = null;
        const onTouchStart = (e) => {
          touchY = e.touches[0].clientY;
          touchUsed = false;
          if (phase === 'before' || phase === 'after') checkEngage();
        };
        const onTouchMove = (e) => {
          if (phase === 'snapping' || phase === 'releasing') {
            e.preventDefault();
            return;
          }
          if (touchY == null) return;
          const dy = touchY - e.touches[0].clientY;

          if (phase === 'locked') {
            e.preventDefault();
            if (touchUsed || !canStep()) return;
            if (dy > TOUCH_THRESHOLD) {
              touchUsed = true;
              forward();
            } else if (dy < -TOUCH_THRESHOLD) {
              touchUsed = true;
              backward();
            }
            return;
          }

          const rt = rectTop();
          const vh = window.innerHeight;
          if (now() < cooldownUntil || touchUsed) return;
          if (phase === 'before' && dy > 8 && rt > 2 && rt <= vh) {
            e.preventDefault();
            touchUsed = true;
            snapIn(0);
          } else if (phase === 'after' && dy < -8 && rt < -2 && rt >= -vh) {
            e.preventDefault();
            touchUsed = true;
            snapIn(N - 1);
          }
        };
        const onTouchEnd = () => {
          touchY = null;
          touchUsed = false;
        };

        const onScroll = () => {
          if (phase === 'locked') {
            const rt = rectTop();
            if (Math.abs(rt) > 1) window.scrollTo(0, window.scrollY + rt);
          } else {
            checkEngage();
          }
        };

        window.addEventListener('wheel', onWheel, { passive: false });
        window.addEventListener('keydown', onKeyDown);
        window.addEventListener('touchstart', onTouchStart, { passive: true });
        window.addEventListener('touchmove', onTouchMove, { passive: false });
        window.addEventListener('scroll', onScroll, { passive: true });
        lenis.on('scroll', checkEngage);

        updateProgress(0);
        // In case the page loaded already scrolled onto the section.
        const initCheck = gsap.delayedCall(0.1, checkEngage);

        return () => {
          window.removeEventListener('wheel', onWheel);
          window.removeEventListener('keydown', onKeyDown);
          window.removeEventListener('touchstart', onTouchStart);
          window.removeEventListener('touchmove', onTouchMove);
          window.removeEventListener('scroll', onScroll);
          lenis.off('scroll', checkEngage);
          initCheck.kill();
          stepTween?.kill();
          entranceTl?.kill();
          tl.kill();
          lenis.start();
          setNavOverlay(false);
          setStoryActive(false);
        };
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [lenis, N]);

  // Recompute the intro trigger once imagery / fonts settle.
  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return;
    const imgs = Array.from(root.querySelectorAll('img'));
    let pending = imgs.length;
    const done = () => {
      if (--pending <= 0) ScrollTrigger.refresh();
    };
    if (pending) {
      imgs.forEach((img) => {
        if (img.complete) done();
        else {
          img.addEventListener('load', done, { once: true });
          img.addEventListener('error', done, { once: true });
        }
      });
    }
    if (document.fonts?.ready) document.fonts.ready.then(() => ScrollTrigger.refresh());
  }, []);

  const eyebrow = storyActive
    ? `0${activeIndex + 1} — ${SCENES[activeIndex].name}`
    : 'Every way to move';

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      className="relative bg-[#F7F6F2]"
      aria-label="Move to maintain your health"
    >
      <div
        ref={stageRef}
        className="relative overflow-hidden bg-[#F7F6F2] motion-reduce:py-16 motion-reduce:sm:py-20 motion-safe:h-[100svh] motion-safe:flex motion-safe:items-center motion-safe:pt-16 motion-safe:pb-10 motion-safe:lg:pt-24 motion-safe:lg:pb-12"
      >
        {/* dotted texture */}
        <div
          className="absolute inset-0 opacity-[0.35] pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(#14140F 0.6px, transparent 0.6px)',
            backgroundSize: '14px 14px',
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] gap-6 lg:gap-16 lg:items-center">
            {/* ---------- Left: stable anchor ---------- */}
            <div>
              <div ref={introRef}>
                <span
                  data-intro
                  className="block text-xs font-semibold tracking-[0.2em] uppercase text-[#8A8574] mb-3 lg:mb-4"
                >
                  {eyebrow}
                </span>

                <h2
                  data-intro
                  className="text-2xl sm:text-4xl lg:text-5xl font-extrabold leading-[1.05] tracking-tight text-[#14140F] mb-4 lg:mb-5"
                >
                  Move to Maintain
                  <br />
                  Your Health
                </h2>

                <p
                  data-intro
                  className="text-[#6E6A5D] text-base leading-relaxed mb-8 max-w-md motion-safe:max-lg:hidden"
                >
                  Energize your lifestyle and embrace movement for a healthier you. Whatever
                  gets you going — walking, running, riding, lifting or dancing — Yaaro turns
                  it into progress you can see.
                </p>

                <a
                  data-intro
                  href="#download"
                  className="inline-flex items-center justify-center bg-primary text-[#14140F] font-semibold text-base px-8 py-3.5 rounded-full shadow-[0_10px_30px_-10px_rgba(208,234,89,0.6)] hover:shadow-[0_14px_36px_-10px_rgba(208,234,89,0.75)] hover:-translate-y-0.5 transition-all duration-200 motion-safe:max-lg:hidden"
                >
                  Get Started
                </a>
              </div>

              {/* progress rail — motion path only */}
              <div
                ref={progressRef}
                className="mt-6 lg:mt-10 hidden motion-safe:flex items-center gap-2 lg:gap-2.5"
                aria-hidden="true"
              >
                {SCENES.map((s) => (
                  <span
                    key={s.name}
                    className="relative h-1 w-10 lg:w-14 rounded-full bg-[#14140F]/15 overflow-hidden"
                  >
                    <span
                      data-seg-fill
                      className="absolute inset-0 origin-left rounded-full bg-[#14140F]"
                      style={{ transform: 'scaleX(0)' }}
                    />
                  </span>
                ))}
              </div>
              <p
                className="mt-3 text-xs text-[#8A8574] tracking-wide uppercase hidden motion-safe:lg:block"
                aria-live="polite"
              >
                {activeIndex + 1} / {N} · Scroll to explore
              </p>
            </div>

            {/* ---------- Right: the scene stage ---------- */}
            <div
              ref={stageColRef}
              className="relative motion-safe:max-lg:h-[52svh] motion-safe:lg:h-[min(38rem,calc(100vh_-_11rem))]"
            >
              <div className="space-y-16 motion-safe:contents">
                {SCENES.map((scene, i) => {
                  const layout = LAYOUTS[i];
                  const Icon = scene.Icon;
                  return (
                    <div
                      key={scene.name}
                      ref={(el) => (sceneRefs.current[i] = el)}
                      className="relative motion-safe:absolute motion-safe:inset-0"
                    >
                      {/* dominant image card */}
                      <div
                        data-big
                        className={`relative w-full overflow-hidden rounded-[1.75rem] shadow-[0_30px_60px_-25px_rgba(20,20,15,0.35)] ${MOBILE_BIG} ${layout.big}`}
                      >
                        <div className="relative w-full aspect-[4/3] motion-safe:h-full motion-safe:aspect-auto overflow-hidden">
                          <img
                            data-big-img
                            src={scene.image}
                            alt={scene.alt}
                            loading={i === 0 ? 'eager' : 'lazy'}
                            className="absolute inset-0 w-full h-full object-cover"
                            style={MASK_STYLE}
                          />
                          <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/55 to-transparent" />
                          <p
                            data-caption
                            className="absolute left-5 right-5 bottom-4 text-white text-sm sm:text-[0.95rem] font-medium leading-snug"
                          >
                            {scene.caption}
                          </p>
                          <div className="absolute top-4 right-4 w-12 h-12 rounded-full border border-white/30 bg-white/15 backdrop-blur-md flex items-center justify-center">
                            <Icon className="w-5 h-5 text-white" />
                          </div>
                        </div>
                      </div>

                      {/* supporting label + image card */}
                      <div
                        data-support
                        className={`mt-5 w-2/3 sm:w-1/2 ${MOBILE_SUPPORT} ${layout.support}`}
                      >
                        <div className="rounded-t-[1.5rem] bg-primary px-5 py-4">
                          <p className="text-[#14140F] font-extrabold leading-[1.05] tracking-tight text-lg sm:text-xl uppercase">
                            {scene.label[0]}
                            <br />
                            {scene.label[1]}
                          </p>
                        </div>
                        <div className="relative w-full aspect-[4/3] overflow-hidden rounded-b-[1.5rem]">
                          <img
                            src={scene.support}
                            alt={scene.supportAlt}
                            loading="lazy"
                            className="absolute inset-0 w-full h-full object-cover"
                            style={SUPPORT_MASK_STYLE}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
