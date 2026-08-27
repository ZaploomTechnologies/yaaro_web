'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useLenis } from '../components/SmoothScrollProvider';
import { acquireScrollLock, releaseScrollLock, getScrollLockOwner } from '../components/scrollLock';
import { WalkIcon, RunIcon, CycleIcon, DumbbellIcon, DanceIcon } from '../components/Icons';

const IMAGE_MASK = 'radial-gradient(ellipse 58% 62% at 50% 40%, black 40%, transparent 100%)';

const SLIDES = [
  {
    title: ['Move to Maintain', 'Your Health'],
    text: 'Energize your lifestyle, embrace movement for a healthier you. Get motivated, stay active, and reap the benefits of a vibrant, well-nurtured body.',
    image: '/walking.jpg',
    alt: 'Person walking outdoors',
    Icon: WalkIcon,
  },
  {
    title: ['Chase Your Next', 'Personal Best'],
    text: 'Track pace, distance, and elevation on every run. Push past yesterday’s time and watch your progress climb.',
    image: '/running.jpg',
    alt: 'Runner mid-stride on an open road',
    Icon: RunIcon,
  },
  {
    title: ['Conquer Every', 'Mile You Ride'],
    text: 'Map your routes, clock your speed, and turn every ride into measurable progress toward your goals.',
    image: '/cycling.jpg',
    alt: 'Cyclist riding at speed',
    Icon: CycleIcon,
  },
  {
    title: ['Build Strength,', 'Rep By Rep'],
    text: 'Log sets, reps, and weight for every session. Watch your strength curve climb week over week.',
    image: '/workout.jpg',
    alt: 'Athlete mid-workout with weights',
    Icon: DumbbellIcon,
  },
  {
    title: ['Move To The Beat,', 'Track The Burn'],
    text: 'Turn every dance session into calories tracked and moves counted. Fitness that never feels like a workout.',
    image: '/dance.jpg',
    alt: 'Dancer mid-move at night',
    Icon: DanceIcon,
  },
];

const STEP_DURATION = 1;
const STEP_EASE = 'power3.out';

export default function MoveHealth() {
  const sectionRef = useRef(null);
  const imgARef = useRef(null);
  const imgBRef = useRef(null);
  const textWrapRef = useRef(null);
  const iconWrapRef = useRef(null);
  const activeLayerRef = useRef('A');
  const indexRef = useRef(0);
  const phaseRef = useRef('before'); // 'before' | 'locked' | 'after'
  const transitioningRef = useRef(false);
  const [displayIndex, setDisplayIndex] = useState(0);
  const lenis = useLenis();
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  const enabled = !reducedMotion && !!lenis;

  useEffect(() => {
    if (!enabled) return;
    const section = sectionRef.current;
    const imgA = imgARef.current;
    const imgB = imgBRef.current;
    if (!section || !imgA || !imgB) return;

    gsap.set(imgA, { opacity: 1, scale: 1, zIndex: 2 });
    gsap.set(imgB, { opacity: 0, scale: 0.85, zIndex: 1 });

    const setPhase = (next) => {
      phaseRef.current = next;
    };

    const stepTo = (nextIndex) => {
      transitioningRef.current = true;
      const outgoing = activeLayerRef.current === 'A' ? imgA : imgB;
      const incoming = activeLayerRef.current === 'A' ? imgB : imgA;

      incoming.src = SLIDES[nextIndex].image;
      gsap.set(incoming, { opacity: 0, scale: 0.85, zIndex: 2 });
      gsap.set(outgoing, { zIndex: 1 });

      const tl = gsap.timeline({
        onComplete: () => {
          activeLayerRef.current = activeLayerRef.current === 'A' ? 'B' : 'A';
          transitioningRef.current = false;
        },
      });
      tl.to(outgoing, { opacity: 0, scale: 1.18, duration: STEP_DURATION, ease: STEP_EASE }, 0);
      tl.to(incoming, { opacity: 1, scale: 1, duration: STEP_DURATION, ease: STEP_EASE }, 0);

      if (iconWrapRef.current) {
        gsap.fromTo(
          iconWrapRef.current,
          { opacity: 0, scale: 0.6, rotate: -30 },
          { opacity: 1, scale: 1, rotate: 0, duration: 0.6, ease: 'back.out(1.7)', delay: 0.15 }
        );
      }

      if (textWrapRef.current) {
        gsap.to(textWrapRef.current, {
          opacity: 0,
          y: -10,
          duration: 0.25,
          onComplete: () => {
            indexRef.current = nextIndex;
            setDisplayIndex(nextIndex);
            gsap.fromTo(textWrapRef.current, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' });
          },
        });
      } else {
        indexRef.current = nextIndex;
        setDisplayIndex(nextIndex);
      }
    };

    const engageLock = (startIndex) => {
      // Don't grab the scroll while the hero hand-off still owns it —
      // otherwise the two controllers fight (double lenis.stop()/scrollTo).
      if (getScrollLockOwner() && getScrollLockOwner() !== 'move') return;
      acquireScrollLock('move');
      const rect = section.getBoundingClientRect();
      if (Math.abs(rect.top) > 1) {
        window.scrollTo(0, window.scrollY + rect.top);
      }
      lenis.stop();
      indexRef.current = startIndex;
      setDisplayIndex(startIndex);
      setPhase('locked');
    };

    const releaseForward = () => {
      releaseScrollLock('move');
      lenis.start();
      setPhase('after');
    };

    const releaseBackward = () => {
      releaseScrollLock('move');
      lenis.start();
      setPhase('before');
    };

    const handleForward = () => {
      if (transitioningRef.current) return;
      if (indexRef.current < SLIDES.length - 1) {
        stepTo(indexRef.current + 1);
      } else {
        releaseForward();
      }
    };

    const handleBackward = () => {
      if (transitioningRef.current) return;
      if (indexRef.current > 0) {
        stepTo(indexRef.current - 1);
      } else {
        releaseBackward();
      }
    };

    // Buffer around the release point: right when we release, the section's
    // top is still at ~0 (nothing has actually scrolled yet), so a bare
    // ">= 0" / "<= 0" check would re-engage the lock instantly, before the
    // user ever gets to scroll away. Require real distance first.
    const REENGAGE_BUFFER = 40;

    const checkEngage = () => {
      // While the hero hand-off owns the scroll (its transition or re-armed
      // at the top), stay dormant — engaging now would fight it.
      if (getScrollLockOwner() === 'hero') return;
      if (phaseRef.current === 'before') {
        const rect = section.getBoundingClientRect();
        if (rect.top <= -REENGAGE_BUFFER) engageLock(0);
      } else if (phaseRef.current === 'after') {
        const rect = section.getBoundingClientRect();
        if (rect.top >= REENGAGE_BUFFER) engageLock(SLIDES.length - 1);
      }
    };

    const onWheel = (e) => {
      if (phaseRef.current === 'before' || phaseRef.current === 'after') {
        checkEngage();
      }
      if (phaseRef.current !== 'locked') return;
      e.preventDefault();
      if (e.deltaY > 0) handleForward();
      else if (e.deltaY < 0) handleBackward();
    };

    const onKeyDown = (e) => {
      if (phaseRef.current !== 'locked') return;
      if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ') {
        e.preventDefault();
        handleForward();
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        handleBackward();
      }
    };

    let touchStartY = null;
    const TOUCH_THRESHOLD = 24;
    const onTouchStart = (e) => {
      if (phaseRef.current === 'before' || phaseRef.current === 'after') checkEngage();
      touchStartY = e.touches[0].clientY;
    };
    const onTouchMove = (e) => {
      if (phaseRef.current !== 'locked') return;
      e.preventDefault();
      if (touchStartY == null) return;
      const dy = touchStartY - e.touches[0].clientY;
      if (dy > TOUCH_THRESHOLD) {
        handleForward();
        touchStartY = null;
      } else if (dy < -TOUCH_THRESHOLD) {
        handleBackward();
        touchStartY = null;
      }
    };

    const onNativeScroll = () => {
      checkEngage();
      if (phaseRef.current === 'locked') {
        const rect = section.getBoundingClientRect();
        if (Math.abs(rect.top) > 1) {
          window.scrollTo(0, window.scrollY + rect.top);
        }
      }
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: false });
    window.addEventListener('scroll', onNativeScroll, { passive: true });
    lenis.on('scroll', checkEngage);

    return () => {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('scroll', onNativeScroll);
      lenis.off('scroll', checkEngage);
      releaseScrollLock('move');
      gsap.killTweensOf([imgA, imgB, textWrapRef.current, iconWrapRef.current]);
    };
  }, [enabled, lenis]);

  const slide = SLIDES[displayIndex];
  const ActiveIcon = slide.Icon;

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      className="relative bg-[#F7F6F2] py-16 md:py-24 min-h-[90vh] md:min-h-screen flex items-center overflow-hidden"
      aria-label="Move to maintain your health"
    >
      <div
        className="absolute inset-0 opacity-[0.35] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#14140F 0.6px, transparent 0.6px)',
          backgroundSize: '14px 14px',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: copy */}
          <div ref={textWrapRef}>
            <h2 className="text-4xl sm:text-5xl font-extrabold leading-[1.05] tracking-tight text-[#14140F] mb-5">
              {slide.title[0]}
              <br />
              {slide.title[1]}
            </h2>

            <p className="text-[#6E6A5D] text-base leading-relaxed mb-8 max-w-md">
              {slide.text}
            </p>

            <a
              href="#download"
              className="inline-flex items-center justify-center bg-primary text-[#14140F] font-semibold text-base px-8 py-3.5 rounded-full shadow-[0_10px_30px_-10px_rgba(208,234,89,0.6)] hover:shadow-[0_14px_36px_-10px_rgba(208,234,89,0.75)] hover:-translate-y-0.5 transition-all duration-200 mb-10"
            >
              Get Started
            </a>

            {/* Progress dashes */}
            <div className="flex items-center gap-2">
              {SLIDES.map((_, i) => (
                <span
                  key={i}
                  aria-hidden="true"
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    i === displayIndex ? 'w-10 bg-[#14140F]' : 'w-6 bg-[#14140F]/15'
                  }`}
                />
              ))}
            </div>
            <p className="mt-3 text-xs text-[#8A8574] tracking-wide uppercase">Scroll to explore &middot; {displayIndex + 1} / {SLIDES.length}</p>
          </div>

          {/* Right: slideshow image */}
          <div className="relative h-[26rem] sm:h-[32rem] lg:h-[36rem]">
            <img
              ref={imgARef}
              src={SLIDES[0].image}
              alt={SLIDES[0].alt}
              className="absolute inset-0 w-full h-full object-cover"
              style={{ maskImage: IMAGE_MASK, WebkitMaskImage: IMAGE_MASK }}
              loading="eager"
            />
            <img
              ref={imgBRef}
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
              style={{ maskImage: IMAGE_MASK, WebkitMaskImage: IMAGE_MASK }}
            />

            <div
              ref={iconWrapRef}
              className="absolute top-2 right-2 lg:right-6 w-14 h-14 rounded-full border border-[#14140F]/15 flex items-center justify-center bg-white/80 backdrop-blur-sm shadow-lg"
            >
              <ActiveIcon className="w-6 h-6 text-primary-low" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
