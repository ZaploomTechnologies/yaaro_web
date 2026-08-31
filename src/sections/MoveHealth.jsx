'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { WalkIcon, RunIcon, CycleIcon, DumbbellIcon, DanceIcon } from '../components/Icons';

const useIsoLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

/* -------------------------------------------------------------------------- */
/*  Tuning                                                                     */
/* -------------------------------------------------------------------------- */

// One scene→scene crossfade, in seconds — hold + crossfade ≈ 1.4s per scene.
const CROSSFADE_DURATION = 0.5;
const AUTOPLAY_HOLD = 0.9;
const STEP_EASE = 'power2.inOut';

// Cinematic settle timing — the scene the section arrives on eases in from a
// soft, slightly enlarged, out-of-focus state; the left copy rises in behind
// it. Replays every time this section becomes the active panel.
const ENTRANCE_DURATION = 0.85;

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
 * Autoplaying scene carousel.
 *
 * A paused GSAP timeline crossfades between five scenes; a `playhead` proxy
 * is tweened and written to the timeline's `progress()` every frame — one
 * ~0.5s crossfade per step (holding ~0.9s between), looping forever with a
 * genuine forward wrap from the last scene back to the first (not a
 * backward jump). Autoplay only runs while this
 * section is the active panel in the surrounding `SectionSnapStack` (see
 * `active` prop) — it starts the moment the section comes on-stage and stops
 * the instant it's scrolled away, so it never advances off-screen. Clicking a
 * progress-rail segment jumps straight to that scene and the loop continues
 * from there.
 *
 * `prefers-reduced-motion` bypasses all of it: a static vertical list.
 */
export default function MoveHealth({ active }) {
  const sectionRef = useRef(null);
  const introRef = useRef(null);
  const progressRef = useRef(null);
  const sceneRefs = useRef([]);

  const [activeIndex, setActiveIndex] = useState(0);
  const [storyActive, setStoryActive] = useState(false);

  const activeRef = useRef(active);
  const startAutoplayRef = useRef(() => {});
  const stopAutoplayRef = useRef(() => {});
  const jumpToSceneRef = useRef(() => {});

  const N = SCENES.length;

  useIsoLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
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
          const pos = p * N;
          for (let i = 0; i < N; i++) {
            const local = gsap.utils.clamp(0, 1, pos - (i - 1));
            if (segFills[i]) segFills[i].style.transform = `scaleX(${local})`;
          }
        };

        // --- The paused master timeline (1 unit per transition) ---------
        // N transitions, not N-1: the last one is a genuine Dance→Walking
        // crossfade, giving the loop a real forward wrap instead of ending
        // and needing to jump backward through every other scene to get
        // back to the start.
        const TR = 1;
        const tl = gsap.timeline({
          paused: true,
          defaults: { ease: 'power2.inOut' },
        });
        tl.addLabel('s0', 0);

        for (let i = 0; i < N; i++) {
          const start = i * TR;
          const end = start + TR;
          const cur = parts[i];
          const nxt = parts[(i + 1) % N];
          const isWrap = i === N - 1;

          // The wrap segment's incoming scene (Walking) was already tweened
          // "exited" once, back in segment 0 (as that segment's own
          // outgoing scene) — reset it to the same off-stage-right pose
          // every other scene enters from, so it comes in consistently
          // instead of sliding in from the wrong side.
          if (isWrap) {
            tl.set(nxt.big, { xPercent: 28, opacity: 0, scale: 0.96 }, start);
            tl.set(nxt.bigImg, { scale: 1.12 }, start);
            tl.set(nxt.support, { xPercent: 46, yPercent: 10, opacity: 0, scale: 0.9 }, start);
            tl.set(nxt.cap, { x: 40, opacity: 0 }, start);
          }

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

          if (!isWrap) tl.addLabel('s' + (i + 1), end);
        }

        const TOTAL = tl.totalDuration();
        const progressOf = (idx) => tl.labels['s' + idx] / TOTAL;

        let stepIndex = 0;
        const now = () => performance.now();

        const playhead = { p: 0 };
        let stepTween = null;
        let entranceTl = null;
        let autoplayTimer = null;

        const render = () => {
          tl.progress(playhead.p);
          updateProgress(playhead.p);
        };

        const setStep = (idx) => {
          stepIndex = idx;
          setActiveIndex(idx);
        };

        // Cinematic settle once a scene arrives: it eases in from a soft,
        // slightly enlarged, out-of-focus state and the left copy rises in
        // behind it. Replays every time this section becomes active again.
        const playEntrance = (idx) => {
          const p = parts[idx];
          entranceTl?.progress(1).kill();
          entranceTl = gsap.timeline();
          entranceTl
            // Promote the blurred image to its own compositor layer for the
            // duration of the tween — blur is the one non-transform property
            // left in this system, and only ever touches this single image.
            .set(p.bigImg, { willChange: 'transform, filter' }, 0)
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
            .set(p.bigImg, { clearProps: 'filter,willChange' });
          if (introRef.current) {
            entranceTl.fromTo(
              introRef.current.querySelectorAll('[data-intro]'),
              { y: 18, opacity: 0 },
              { y: 0, opacity: 1, duration: ENTRANCE_DURATION * 0.75, ease: 'power2.out', stagger: 0.08 },
              0
            );
          }
        };

        const stopAutoplay = () => {
          autoplayTimer?.kill();
          autoplayTimer = null;
        };

        const queueNext = () => {
          stopAutoplay();
          autoplayTimer = gsap.delayedCall(AUTOPLAY_HOLD, () => {
            if (stepIndex < N - 1) animateToStep(stepIndex + 1);
            else animateToStep(0, { wrap: true });
          });
        };

        // `wrap: true` drives the playhead through the dedicated wrap
        // segment (Dance → Walking, forward) to raw progress 1 instead of
        // jumping back to progressOf(0)=0, which would scrub the timeline
        // backward through every other scene. Progress 1 and 0 render
        // identically (both = Walking settled), so snapping back to 0 right
        // after is an invisible reset, ready for the next lap.
        const animateToStep = (idx, { wrap = false } = {}) => {
          setStep(idx);
          stepTween?.kill();
          stopAutoplay();
          stepTween = gsap.to(playhead, {
            p: wrap ? 1 : progressOf(idx),
            duration: CROSSFADE_DURATION,
            ease: STEP_EASE,
            overwrite: true,
            onUpdate: render,
            onComplete: () => {
              stepTween = null;
              if (wrap) {
                playhead.p = 0;
                render();
              }
              if (activeRef.current) queueNext();
            },
          });
        };

        const startAutoplay = () => {
          // Replay the arrival settle every time this section comes
          // on-stage, then start (or resume) the loop from here.
          playEntrance(stepIndex);
          queueNext();
        };

        startAutoplayRef.current = startAutoplay;
        stopAutoplayRef.current = () => {
          // Kill everything mid-flight the moment this section goes
          // inactive — including the entrance settle, which still touches
          // `filter: blur()` on the big image. Left running, it kept
          // animating for up to ENTRANCE_DURATION after the user had
          // already scrolled away, overlapping with (and janking) the
          // outer panel transition.
          stopAutoplay();
          stepTween?.kill();
          stepTween = null;
          entranceTl?.kill();
          entranceTl = null;
        };
        // Manual override: clicking a progress segment jumps straight there
        // and the loop continues (queued fresh) from that scene.
        jumpToSceneRef.current = (idx) => animateToStep(idx);

        updateProgress(0);

        return () => {
          stopAutoplay();
          stepTween?.kill();
          entranceTl?.kill();
          tl.kill();
          setStoryActive(false);
        };
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [N]);

  // Mirror the `active` prop into a ref for the imperative closures above,
  // and start/stop the autoplay loop as this section enters/leaves the
  // active panel in the site-wide snap stack.
  useEffect(() => {
    activeRef.current = active;
    if (active) startAutoplayRef.current();
    else stopAutoplayRef.current();
  }, [active]);

  const eyebrow = storyActive
    ? `0${activeIndex + 1} — ${SCENES[activeIndex].name}`
    : 'Every way to move';

  const handleDownloadClick = (e) => {
    e.preventDefault();
    window.dispatchEvent(new CustomEvent('yaaro:snapjump', { detail: { id: 'download' } }));
  };

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      className="relative bg-[#F7F6F2]"
      aria-label="Move to maintain your health"
    >
      <div
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
                  it into points, progress and a community that keeps you coming back.
                </p>

                <a
                  data-intro
                  href="#download"
                  onClick={handleDownloadClick}
                  className="inline-flex items-center justify-center bg-primary text-[#14140F] font-semibold text-base px-8 py-3.5 rounded-full shadow-[0_10px_30px_-10px_rgba(208,234,89,0.6)] hover:shadow-[0_14px_36px_-10px_rgba(208,234,89,0.75)] hover:-translate-y-0.5 transition-all duration-200 motion-safe:max-lg:hidden"
                >
                  Get Started
                </a>
              </div>

              {/* progress rail — click a segment to jump to that scene */}
              <div
                ref={progressRef}
                className="mt-6 lg:mt-10 hidden motion-safe:flex items-center gap-2 lg:gap-2.5"
              >
                {SCENES.map((s, i) => (
                  <button
                    key={s.name}
                    type="button"
                    onClick={() => jumpToSceneRef.current(i)}
                    aria-label={`Show ${s.name}`}
                    className="relative h-1 w-10 lg:w-14 rounded-full bg-[#14140F]/15 overflow-hidden cursor-pointer"
                  >
                    <span
                      data-seg-fill
                      className="absolute inset-0 origin-left rounded-full bg-[#14140F]"
                      style={{ transform: 'scaleX(0)' }}
                    />
                  </button>
                ))}
              </div>
              <p
                className="mt-3 text-xs text-[#8A8574] tracking-wide uppercase hidden motion-safe:lg:block"
                aria-live="polite"
              >
                {activeIndex + 1} / {N} · {SCENES[activeIndex].name}
              </p>
            </div>

            {/* ---------- Right: the scene stage ---------- */}
            <div
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
                          <Image
                            data-big-img
                            src={scene.image}
                            alt={scene.alt}
                            fill
                            sizes="(max-width: 1024px) 100vw, 60vw"
                            priority={i === 0}
                            className="object-cover"
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
                          <Image
                            src={scene.support}
                            alt={scene.supportAlt}
                            fill
                            sizes="(max-width: 1024px) 50vw, 25vw"
                            className="object-cover"
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
