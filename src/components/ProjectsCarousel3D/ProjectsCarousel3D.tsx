import { useCallback, useEffect, useLayoutEffect, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { PROJECTS } from "../../projects";
import "./ProjectsCarousel3D.css";

const FRICTION = 0.94;
const CLICK_THRESHOLD = 6;
const MIN_VELOCITY = 0.0004;
// How strongly page scroll nudges the carousel, relative to an equivalent drag.
// The stage is pinned for an extra stretch of scroll (see .c3d__pin-spacer), so
// this needs to be strong enough that dwell time visibly spins the carousel.
const SCROLL_DRIFT_STRENGTH = 0.35;
// Concave arc: the center card sits flattest and furthest back on the depth axis;
// side cards rotate AND push forward toward the viewer (positive translateZ) as
// they move outward, like an open fan pointed at the camera — not a dome that
// recedes into the background.
const ANGLE_STEP = 22;
const RADIUS_VW_FACTOR = 0.55;
const MIN_RADIUS = 600;
const MAX_RADIUS = 3000;

function shortestOffset(index: number, trackPos: number, count: number): number {
  const raw = index - trackPos;
  return raw - count * Math.round(raw / count);
}

function ProjectsCarousel3D(): JSX.Element {
  const navigate = useNavigate();
  const items = useMemo(() => PROJECTS.slice(0, 5), []);
  const count = items.length;

  const stageRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  const trackRef = useRef(0);
  const spacingRef = useRef(300);
  const radiusRef = useRef(700);
  const velocityRef = useRef(0);
  const draggingRef = useRef(false);
  const lastXRef = useRef(0);
  const lastTimeRef = useRef(0);
  const movedRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const stepRafRef = useRef<number | null>(null);
  const lastScrollYRef = useRef(0);

  const applyPositions = useCallback(() => {
    const radius = radiusRef.current;

    itemRefs.current.forEach((el, i) => {
      if (!el) return;
      const offset = shortestOffset(i, trackRef.current, count);
      const angleDeg = offset * ANGLE_STEP;
      const rad = (angleDeg * Math.PI) / 180;
      const x = radius * Math.sin(rad);
      // Positive z: cards bow toward the viewer at the edges (concave), instead of
      // receding into the background (which is what a negative z would do).
      const z = radius * (1 - Math.cos(rad));
      // The rotation direction is independent of position: for the fan to open
      // TOWARD the viewer, each card's outer edge (the one nearer the screen
      // boundary) must swing forward, not its inner edge — that means the rotateY
      // sign has to be the OPPOSITE of the offset's sign, not the same.
      const rotateDeg = -angleDeg;

      el.style.transform = `translateX(${x}px) translateZ(${z}px) rotateY(${rotateDeg}deg)`;
    });
  }, [count]);

  useLayoutEffect(() => {
    const el = stageRef.current;
    if (!el) return;

    const measure = (stageWidth: number) => {
      if (stageWidth <= 0) return;
      const radius = Math.max(MIN_RADIUS, Math.min(stageWidth * RADIUS_VW_FACTOR, MAX_RADIUS));
      radiusRef.current = radius;
      spacingRef.current = radius * Math.sin((ANGLE_STEP * Math.PI) / 180);
      applyPositions();
    };

    measure(el.getBoundingClientRect().width);

    const observer = new ResizeObserver(([entry]) => {
      measure(entry.contentRect.width);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [applyPositions]);

  useEffect(() => {
    lastScrollYRef.current = window.scrollY;

    const onScroll = () => {
      const y = window.scrollY;
      const dy = y - lastScrollYRef.current;
      lastScrollYRef.current = y;
      if (draggingRef.current) return;

      const dPos = (dy / spacingRef.current) * SCROLL_DRIFT_STRENGTH;
      trackRef.current -= dPos;
      applyPositions();
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [applyPositions]);

  const stopInertia = () => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  };

  const stopStepAnim = () => {
    if (stepRafRef.current !== null) {
      cancelAnimationFrame(stepRafRef.current);
      stepRafRef.current = null;
    }
  };

  // Eases the track to the nearest whole card in the given direction, for the
  // prev/next arrows — a tween rather than the drag physics above, since there's
  // no velocity to carry and we want it to land exactly on a card every time.
  const animateStep = (direction: 1 | -1) => {
    stopInertia();
    stopStepAnim();
    velocityRef.current = 0;

    const start = trackRef.current;
    const target = Math.round(start) + direction;
    const distance = target - start;
    const duration = 420;
    const startTime = performance.now();

    const frame = (now: number) => {
      const t = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      trackRef.current = start + distance * eased;
      applyPositions();

      if (t < 1) {
        stepRafRef.current = requestAnimationFrame(frame);
      } else {
        stepRafRef.current = null;
      }
    };
    stepRafRef.current = requestAnimationFrame(frame);
  };

  const goPrev = () => animateStep(-1);
  const goNext = () => animateStep(1);

  const tick = useCallback(
    (time: number) => {
      const last = lastTimeRef.current || time;
      const dt = Math.min(time - last, 48);
      lastTimeRef.current = time;

      trackRef.current += velocityRef.current * dt;
      velocityRef.current *= Math.pow(FRICTION, dt / 16.6667);
      applyPositions();

      if (Math.abs(velocityRef.current) > MIN_VELOCITY) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        velocityRef.current = 0;
        rafRef.current = null;
      }
    },
    [applyPositions],
  );

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    draggingRef.current = true;
    movedRef.current = 0;
    lastXRef.current = e.clientX;
    lastTimeRef.current = performance.now();
    velocityRef.current = 0;
    stopInertia();
    stopStepAnim();
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return;
    const now = performance.now();
    const dx = e.clientX - lastXRef.current;
    const dt = Math.max(now - lastTimeRef.current, 1);
    movedRef.current += Math.abs(dx);

    const dPos = dx / spacingRef.current;
    trackRef.current -= dPos;
    velocityRef.current = -dPos / dt;
    applyPositions();

    lastXRef.current = e.clientX;
    lastTimeRef.current = now;
  };

  const stopDrag = () => {
    if (!draggingRef.current) return;
    draggingRef.current = false;
    if (Math.abs(velocityRef.current) > MIN_VELOCITY) {
      lastTimeRef.current = 0;
      rafRef.current = requestAnimationFrame(tick);
    }
  };

  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    // setPointerCapture (in onPointerDown) redirects the browser's synthetic
    // click to the stage instead of the card actually under the pointer, so a
    // plain click never reaches the card's own onClick. Resolve it here from
    // the real cursor position instead of relying on click bubbling.
    if (draggingRef.current && movedRef.current <= CLICK_THRESHOLD) {
      const target = document.elementFromPoint(e.clientX, e.clientY);
      const card = target?.closest<HTMLElement>(".c3d__card");
      if (card?.dataset.slug) goTo(card.dataset.slug);
    }
    stopDrag();
  };

  useLayoutEffect(() => {
    return () => {
      stopInertia();
      stopStepAnim();
    };
  }, []);

  const goTo = (slug?: string) => {
    if (!slug || movedRef.current > CLICK_THRESHOLD) return;
    navigate(`/projects/${slug}`, { state: { from: "/" } });
  };

  return (
    <section className="c3d" id="projects-carousel">
      <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
        <filter id="c3d-water" x="-30%" y="-30%" width="160%" height="160%">
          <feTurbulence type="fractalNoise" baseFrequency="0.012 0.06" numOctaves="2" seed="6" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="40" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>

      <div className="c3d__pin-wrapper">
        <div className="c3d__pin-sticky">
          <div className="c3d__header">
            <h2 className="c3d__title">Spin Through What I've Been Working On</h2>
     
          </div>

          <div
            className="c3d__stage"
            ref={stageRef}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={stopDrag}
            onPointerLeave={stopDrag}
          >
          <div className="c3d__scene">
            <div className="c3d__row">
              {items.map((project, i) => {
                const imgSrc =
                  project.images.length > 0
                    ? `${import.meta.env.BASE_URL}${project.images[0].replace(/^\//, "")}`
                    : null;

                return (
                  <div
                    key={project.id}
                    className="c3d__item"
                    ref={(el) => {
                      itemRefs.current[i] = el;
                    }}
                  >
                    <div className="c3d__stack">
                      <span className="c3d__item-title">{project.title}</span>
                      <div
                        className="c3d__card"
                        data-slug={project.slug}
                        role="button"
                        tabIndex={0}
                        onClick={() => goTo(project.slug)}
                        onKeyDown={(e) => e.key === "Enter" && goTo(project.slug)}
                        aria-label={`View project: ${project.title}`}
                      >
                        {imgSrc ? (
                          <img
                            className="c3d__card-image"
                            src={imgSrc}
                            alt={project.title}
                            draggable={false}
                            loading="lazy"
                          />
                        ) : (
                          <div className="c3d__card-placeholder" />
                        )}
                        <span className="c3d__card-sheen" aria-hidden="true" />
                      </div>
                    </div>

                    <div className="c3d__reflection" aria-hidden="true">
                      {imgSrc && <img src={imgSrc} alt="" draggable={false} />}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="c3d__ctas">

        <div className="c3d__nav">
          <button
            type="button"
            className="c3d__nav-btn"
            onClick={goPrev}
            aria-label="Previous project"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 6 9 12 15 18" />
            </svg>
          </button>
          <button
            type="button"
            className="c3d__nav-btn"
            onClick={goNext}
            aria-label="Next project"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 6 15 12 9 18" />
            </svg>
          </button>
        </div>

        <button
          type="button"
          className="c3d__view-all"
          onClick={() => navigate("/projects")}
        >
          
          See All Projects
          <span className="c3d__view-all-icon" aria-hidden="true">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="7" y1="17" x2="17" y2="7" />
              <polyline points="7 7 17 7 17 17" />
            </svg>
          </span>
        </button>
            </div>
        </div>

        <div className="c3d__pin-spacer" aria-hidden="true" />
      </div>
    </section>
  );
}

export default ProjectsCarousel3D;
