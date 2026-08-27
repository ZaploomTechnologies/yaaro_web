'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowLeftIcon, ArrowRightIcon } from '../components/Icons';

gsap.registerPlugin(ScrollTrigger);

const useIsoLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

/* -------------------------------------------------------------------------- */
/*  Content — one flat entry per gallery image. Add / remove freely; the loop  */
/*  and the three-slot collage adapt to the count.                             */
/* -------------------------------------------------------------------------- */
const INSIGHTS = [
  {
    image: '/workout.jpg',
    alt: 'Athlete performing a focused strength exercise with weights',
    caption: 'Exercises Focused on Specific Muscle',
  },
  {
    image: '/running.jpg',
    alt: 'Runner on an open road holding an easy, sustainable pace',
    caption: 'Build Endurance Without Burning Out',
  },
  {
    image: '/cycling.jpg',
    alt: 'Cyclist riding a route matched to their current fitness level',
    caption: 'Routes Matched to Your Fitness Level',
  },
  {
    image: '/yoga.jpg',
    alt: 'Person moving through a guided mobility and stretch flow',
    caption: 'Mobility Work for Your Tight Spots',
  },
  {
    image: '/walking.jpg',
    alt: 'Person walking outdoors to hit an adaptive daily movement goal',
    caption: 'Daily Goals That Adapt to You',
  },
  {
    image: '/dance.jpg',
    alt: 'Dancer mid-move during a high-energy session',
    caption: 'Sessions That Keep Training Fun',
  },
];

const N = INSIGHTS.length;

/* -------------------------------------------------------------------------- */
/*  Transition tuning                                                          */
/* -------------------------------------------------------------------------- */
// One full slide, in seconds. 0.8–1.1 reads well; start at 0.9 and tune.
const DURATION = 0.9;
// Premium easing, no bounce. 'power2.inOut' is a softer alternative.
const EASE = 'power3.inOut';

/* -------------------------------------------------------------------------- */
/*  Component                                                                  */
/*                                                                            */
/*  Layout is the original collage: one large image + caption on the left, the */
/*  heading / arrows / paragraph plus a two-image grid on the right. Three      */
/*  empty placeholder <div>s hold that geometry in normal document flow; the   */
/*  photos themselves are absolutely-positioned cards on an overlay stage that  */
/*  animate between the placeholder rects (position-based roles), so the images */
/*  rotate through the composition instead of just crossfading in place.       */
/* -------------------------------------------------------------------------- */
export default function PersonalizedInsights() {
  const sectionRef = useRef(null);
  const stageRef = useRef(null);
  const slot0Ref = useRef(null); // large left image
  const slot1Ref = useRef(null); // right-top image
  const slot2Ref = useRef(null); // right-bottom image (sits lower)
  const cardRefs = useRef([]);
  const captionRef = useRef(null);
  const headRef = useRef(null);
  const controlsRef = useRef(null);

  const activeRef = useRef(0);   // current active index (source of truth)
  const lockRef = useRef(false); // ignores input while a slide is running
  const reducedRef = useRef(false);
  const swipeX = useRef(null);

  const [caption, setCaption] = useState(0);

  /* Write every card to the geometry for its role relative to `active`.
     `slot` = how far a card sits ahead of the active card:
       0 large-left · 1 right-top · 2 right-bottom
       3 entering (off the right edge) · N-1 leaving (off the left edge)
       anything else = parked off-stage right (recycled silently).            */
  const place = (active, animated) => {
    const stage = stageRef.current;
    const s0el = slot0Ref.current;
    if (!stage || !s0el) return;

    const reduced = reducedRef.current;
    const sb = stage.getBoundingClientRect();
    const mobile = sb.width < 768;

    const rectOf = (el) => {
      if (!el || el.offsetParent === null) return null;
      const b = el.getBoundingClientRect();
      return { x: b.left - sb.left, y: b.top - sb.top, w: b.width, h: b.height };
    };
    const s0 = rectOf(s0el);
    const s1 = rectOf(slot1Ref.current);
    const s2 = rectOf(slot2Ref.current);
    if (!s0) return;

    // Geometry per role. On mobile (or before the right grid exists) collapse
    // to a single active image with a slice of the next peeking in.
    const geom = (slot) => {
      if (mobile || !s1 || !s2) {
        if (slot === 0) return { ...s0, o: 1, z: 30, img: 1 };
        if (slot === 1)
          return { x: s0.x + s0.w * 1.04, y: s0.y, w: s0.w, h: s0.h, o: mobile ? 1 : 0, z: 20, img: 1.03 };
        if (slot === N - 1)
          return {
            x: s0.x - s0.w * 0.66,
            y: s0.y + s0.h * 0.15,
            w: s0.w * 0.7,
            h: s0.h * 0.7,
            o: 0, z: 5, img: 1.06,
          };
        return { x: s0.x + s0.w * 1.35, y: s0.y, w: s0.w, h: s0.h, o: 0, z: 1, img: 1.04 };
      }
      const offRight = { x: sb.width + s2.w * 0.15, y: s2.y, w: s2.w, h: s2.h };
      // Leaving-left: shrink toward LEAVE_SCALE about its own centre while it
      // drifts left and fades, so the outgoing image reads as pulling away.
      const LEAVE_SCALE = 0.6;
      const leaving = {
        x: s0.x - s0.w * 0.72 + (s0.w * (1 - LEAVE_SCALE)) / 2,
        y: s0.y + (s0.h * (1 - LEAVE_SCALE)) / 2,
        w: s0.w * LEAVE_SCALE,
        h: s0.h * LEAVE_SCALE,
      };
      switch (slot) {
        case 0:     return { ...s0, o: 1, z: 30, img: 1 };
        case 1:     return { ...s1, o: 1, z: 20, img: 1.04 };
        case 2:     return { ...s2, o: 1, z: 10, img: 1.05 };
        case 3:     return { ...offRight, o: 0, z: 5, img: 1.06 };
        case N - 1: return { ...leaving, o: 0, z: 5, img: 1.08 };
        default:    return { ...offRight, o: 0, z: 1, img: 1.06 };
      }
    };

    const dur = reduced ? 0.25 : DURATION;
    const ease = reduced ? 'power1.out' : EASE;

    cardRefs.current.forEach((card, i) => {
      if (!card) return;
      const slot = (i - active + N) % N;
      const g = geom(slot);
      const img = card.querySelector('img');
      const onStage = g.o === 1 || slot === N - 1 || slot === 3;

      if (animated && reduced) {
        // Reduced motion: no travel — snap the box, crossfade the opacity.
        gsap.set(card, { x: g.x, y: g.y, width: g.w, height: g.h, zIndex: g.z });
        gsap.to(card, { autoAlpha: g.o, duration: 0.25, ease, overwrite: 'auto' });
        if (img) gsap.set(img, { scale: g.img });
      } else if (animated && onStage) {
        gsap.to(card, {
          x: g.x, y: g.y, width: g.w, height: g.h, autoAlpha: g.o, zIndex: g.z,
          duration: dur, ease, overwrite: 'auto',
        });
        if (img) gsap.to(img, { scale: g.img, duration: dur, ease, overwrite: 'auto' });
      } else {
        // Off-stage / initial: jump instantly (never seen).
        gsap.set(card, { x: g.x, y: g.y, width: g.w, height: g.h, autoAlpha: g.o, zIndex: g.z });
        if (img) gsap.set(img, { scale: g.img });
      }
    });
  };

  const go = (dir) => {
    if (lockRef.current) return;
    lockRef.current = true;

    const reduced = reducedRef.current;
    const next = (activeRef.current + dir + N) % N;
    activeRef.current = next;

    place(next, true);

    // Caption: fade the old line out, swap it near the midpoint, ease it back in.
    const cap = captionRef.current;
    const d = reduced ? 0.25 : DURATION;
    gsap
      .timeline({ onComplete: () => { lockRef.current = false; } })
      .to(cap, { autoAlpha: 0, y: -8, duration: d * 0.24, ease: 'power1.in' }, 0)
      .add(() => setCaption(next), d * 0.44)
      .set(cap, { y: 8 }, d * 0.46)
      .to(cap, { autoAlpha: 1, y: 0, duration: d * 0.4, ease: 'power2.out' }, d * 0.5);
  };

  /* ---- initial placement + one-time scroll entrance -------------------- */
  useIsoLayoutEffect(() => {
    reducedRef.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const reduced = reducedRef.current;

    const ctx = gsap.context(() => {
      place(0, false);

      if (!reduced) {
        const revealables = [
          ...headRef.current.querySelectorAll('[data-reveal]'),
          controlsRef.current,
          stageRef.current,
          captionRef.current,
        ];
        gsap.from(revealables, {
          y: 32,
          autoAlpha: 0,
          duration: 0.9,
          ease: 'power3.out',
          stagger: 0.08,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true },
        });
      }
    }, sectionRef);

    // Re-measure the placeholder rects whenever the section reflows.
    let raf = 0;
    const replace = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => place(activeRef.current, false));
    };
    const ro = new ResizeObserver(replace);
    ro.observe(sectionRef.current);
    window.addEventListener('resize', replace);
    if (document.fonts?.ready) document.fonts.ready.then(replace);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener('resize', replace);
      ctx.revert();
    };
  }, []);

  /* ---- pointer / touch swipe (desktop still uses the arrows) ----------- */
  const onPointerDown = (e) => { swipeX.current = e.clientX; };
  const onPointerUp = (e) => {
    if (swipeX.current == null) return;
    const dx = e.clientX - swipeX.current;
    swipeX.current = null;
    if (dx <= -44) go(1);
    else if (dx >= 44) go(-1);
  };
  const onPointerLeave = () => { swipeX.current = null; };

  return (
    <section
      ref={sectionRef}
      id="insights"
      className="relative bg-[#F7F6F2] py-16 md:py-24 overflow-hidden"
      aria-label="Personalized insights and recommendations"
    >
      {/* dotted texture — matches the neighbouring light sections */}
      <div
        className="absolute inset-0 opacity-[0.35] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#14140F 0.6px, transparent 0.6px)',
          backgroundSize: '14px 14px',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ---------- Animated image stage (overlay) ---------- */}
        <div
          ref={stageRef}
          className="absolute inset-0 z-10 overflow-hidden pointer-events-none"
          aria-hidden="true"
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
          onPointerLeave={onPointerLeave}
        >
          {INSIGHTS.map((item, i) => (
            <article
              key={item.image}
              ref={(el) => (cardRefs.current[i] = el)}
              className="absolute top-0 left-0 rounded-[1.75rem] overflow-hidden shadow-[0_30px_60px_-25px_rgba(20,20,15,0.35)] pointer-events-auto select-none"
              style={{ willChange: 'transform, width, height', backfaceVisibility: 'hidden' }}
            >
              <img
                src={item.image}
                alt={item.alt}
                draggable="false"
                loading={i === 0 ? 'eager' : 'lazy'}
                className="absolute inset-0 w-full h-full object-cover"
                style={{ willChange: 'transform' }}
              />
            </article>
          ))}
        </div>

        {/* ---------- Original collage layout (placeholders hold geometry) ---------- */}
        <div className="relative grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.7fr)] gap-10 lg:gap-16 items-start">
          {/* Left: large image slot + caption */}
          <div>
            <div
              ref={slot0Ref}
              className="rounded-[1.75rem] bg-[#14140F]/[0.04] h-[22rem] sm:h-[26rem] lg:h-[29rem]"
            />
            <p
              ref={captionRef}
              aria-live="polite"
              className="relative z-20 mt-6 text-xl sm:text-2xl font-bold text-[#14140F] leading-snug"
            >
              {INSIGHTS[caption].caption}
            </p>
          </div>

          {/* Right: heading, arrow nav + copy, supporting image pair */}
          <div ref={headRef}>
            <span data-reveal className="relative z-20 block text-sm font-medium text-[#8A8574] mb-3">
              Achieve your Goals
            </span>
            <h2
              data-reveal
              className="relative z-20 text-4xl sm:text-5xl font-extrabold text-[#14140F] leading-[1.05] tracking-tight mb-8 max-w-lg"
            >
              Personalized Insights and Recommendations
            </h2>

            <div className="relative z-20 flex items-start gap-6 mb-10">
              <div ref={controlsRef} className="flex items-center gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => go(-1)}
                  aria-label="Previous insight"
                  className="group w-11 h-11 rounded-full bg-[#14140F]/[0.06] hover:bg-[#14140F]/10 flex items-center justify-center transition-transform duration-200 hover:scale-[1.06]"
                >
                  <ArrowLeftIcon className="w-4 h-4 text-[#14140F] transition-transform duration-200 group-hover:-translate-x-0.5" />
                </button>
                <button
                  type="button"
                  onClick={() => go(1)}
                  aria-label="Next insight"
                  className="group w-11 h-11 rounded-full bg-primary hover:brightness-[0.97] flex items-center justify-center transition-transform duration-200 hover:scale-[1.06]"
                >
                  <ArrowRightIcon className="w-4 h-4 text-[#14140F] transition-transform duration-200 group-hover:translate-x-0.5" />
                </button>
              </div>

              <p className="text-[#6E6A5D] text-sm sm:text-base leading-relaxed max-w-xs pt-2">
                Based on your body composition data, Yaaro can offer personalized
                insights and recommendations tailored to your specific goals and needs.
              </p>
            </div>

            <div className="hidden md:grid grid-cols-2 gap-5">
              <div ref={slot1Ref} className="rounded-[1.75rem] bg-[#14140F]/[0.04] h-[18rem] sm:h-[22rem]" />
              <div
                ref={slot2Ref}
                className="rounded-[1.75rem] bg-[#14140F]/[0.04] h-[14rem] sm:h-[17rem] self-end"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
