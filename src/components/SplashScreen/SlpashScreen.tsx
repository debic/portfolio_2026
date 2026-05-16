import { useEffect, useRef } from "react";
import gsap from "gsap";
import "./SplashScreen.css";

interface SplashScreenProps {
  onComplete: () => void;
}

// ═══════════════════════════════════════════════
// DESKTOP — 11 columnas
// ═══════════════════════════════════════════════
const SPLASH_COLUMNS = [
  {
    color: "rgba(240,140,90, 0.95)",
    width: "130%",
    height: "55%",
    originY: 0,
    spread: "140%",
  }, // 1
  {
    color: "rgba(240,140,90, 0.95)",
    width: "130%",
    height: "48%",
    originY: 0,
    spread: "140%",
  }, // 2
  {
    color: "rgba(240,140,90, 0.95)",
    width: "130%",
    height: "41%",
    originY: 0,
    spread: "140%",
  }, // 3
  {
    color: "rgba(240,140,90, 0.95)",
    width: "130%",
    height: "34%",
    originY: 0,
    spread: "140%",
  }, // 4
  {
    color: "rgba(240,140,90, 0.95)",
    width: "130%",
    height: "27%",
    originY: 0,
    spread: "140%",
  }, // 5
  {
    color: "rgba(240,140,90, 0.95)",
    width: "130%",
    height: "25%",
    originY: 0,
    spread: "140%",
  }, // 6 centro
  {
    color: "rgba(240,140,90, 0.95)",
    width: "130%",
    height: "27%",
    originY: 0,
    spread: "140%",
  }, // 7
  {
    color: "rgba(240,140,90, 0.95)",
    width: "130%",
    height: "34%",
    originY: 0,
    spread: "140%",
  }, // 8
  {
    color: "rgba(240,140,90, 0.95)",
    width: "130%",
    height: "41%",
    originY: 0,
    spread: "140%",
  }, // 9
  {
    color: "rgba(240,140,90, 0.95)",
    width: "130%",
    height: "48%",
    originY: 0,
    spread: "140%",
  }, // 10
  {
    color: "rgba(240,140,90, 0.95)",
    width: "130%",
    height: "55%",
    originY: 0,
    spread: "140%",
  }, // 11
];

// ═══════════════════════════════════════════════
// MOBILE — 4 columnas
// ═══════════════════════════════════════════════
const SPLASH_COLUMNS_MOBILE = [
  {
    color: "rgba(240,140,90, 0.95)",
    width: "180%",
    height: "55%",
    originY: 0,
    spread: "140%",
  }, // 1
  {
    color: "rgba(240,140,90, 0.95)",
    width: "180%",
    height: "45%",
    originY: 0,
    spread: "140%",
  }, // 2
  {
    color: "rgba(240,140,90, 0.95)",
    width: "180%",
    height: "45%",
    originY: 0,
    spread: "140%",
  }, // 3
  {
    color: "rgba(240,140,90, 0.95)",
    width: "180%",
    height: "55%",
    originY: 0,
    spread: "140%",
  }, // 4
];

function SplashScreen({ onComplete }: SplashScreenProps): JSX.Element {
  const splashRef = useRef<HTMLDivElement>(null);
  const colsRef = useRef<(HTMLDivElement | null)[]>([]);
  const logoRef = useRef<SVGSVGElement>(null);
  const dRef = useRef<SVGPathElement>(null);
  const pRef = useRef<SVGPathElement>(null);
  const arcRef = useRef<SVGPathElement>(null);

  const isMobile = window.innerWidth <= 768;
  const activeCols = isMobile ? SPLASH_COLUMNS_MOBILE : SPLASH_COLUMNS;

  useEffect(() => {
    const splash = splashRef.current;
    const pathD = dRef.current;
    const pathP = pRef.current;
    const pathArc = arcRef.current;
    const logoEl = logoRef.current;
    const cols = colsRef.current.filter(Boolean) as HTMLDivElement[];
    if (!splash || !pathD || !pathP || !pathArc || !logoEl || cols.length === 0)
      return;

    const lenD = pathD.getTotalLength();
    const lenP = pathP.getTotalLength();
    const lenArc = pathArc.getTotalLength();

    gsap.set(pathD, { strokeDasharray: lenD, strokeDashoffset: -lenD });
    gsap.set(pathP, { strokeDasharray: lenP, strokeDashoffset: -lenP });
    gsap.set(pathArc, { strokeDasharray: lenArc, strokeDashoffset: lenArc });
    gsap.set([pathD, pathP, pathArc], { visibility: "visible" });
    gsap.set(cols, { yPercent: 0 });

    const tl = gsap.timeline({ onComplete });

    tl.to(
      pathD,
      { strokeDashoffset: 0, duration: 1.4, ease: "power3.inOut" },
      0,
    )
      .to(
        pathP,
        { strokeDashoffset: 0, duration: 1.4, ease: "power3.inOut" },
        0,
      )
      .to(
        pathArc,
        { strokeDashoffset: 0, duration: 0.65, ease: "power3.inOut" },
        1.1,
      )
      .to({}, { duration: 0.3 })
      .to(logoEl, { scale: 0.7, opacity: 0, duration: 0.45, ease: "power2.in" })
      .to(
        cols,
        {
          yPercent: 100,
          duration: 0.75,
          ease: "power4.inOut",
          stagger: { each: 0.06, from: "center" },
        },
        "-=0.1",
      );

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div ref={splashRef} className="splash">
      <div className="splash__columns" aria-hidden="true">
        {activeCols.map((col, i) => {
          const colW = 100 / activeCols.length;
          return (
            <div
              key={i}
              ref={(el) => {
                colsRef.current[i] = el;
              }}
              className="splash__column"
              style={{
                left: `${i * colW}%`,
                width: `calc(${colW}% + 2px)`,
                backgroundImage: `radial-gradient(ellipse ${col.width} ${col.height} at 50% ${col.originY}%, ${col.color} 0%, rgba(240,140,90,0) ${col.spread})`,
              }}
            />
          );
        })}
      </div>

      <svg
        ref={logoRef}
        className="splash__logo"
        viewBox="0 0 299 241.9"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          ref={dRef}
          className="splash__path"
          style={{ visibility: "hidden" }}
          d="M129.3,110.7c-1.6-23.2-20.9-41.5-44.5-41.5c-24.6,0-44.6,20-44.6,44.6s20,44.6,44.6,44.6c24.4,0,44.2-19.5,44.6-43.8l0-8.7V17.6"
        />
        <path
          ref={pRef}
          className="splash__path"
          style={{ visibility: "hidden" }}
          d="M175.1,116.9c1.6,23.2,20.9,41.5,44.5,41.5c24.6,0,44.6-20,44.6-44.6s-20-44.6-44.6-44.6c-24.4,0-44.2,19.5-44.6,43.8l0,8.7V210"
        />
        <path
          ref={arcRef}
          className="splash__path"
          style={{ visibility: "hidden" }}
          d="M174,158.4c-24.6,0-44.6-20-44.6-44.6s20-44.6,44.6-44.6l43.7,0"
        />
      </svg>
    </div>
  );
}

export default SplashScreen;
