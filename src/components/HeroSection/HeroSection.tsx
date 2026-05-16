import { useRef, useLayoutEffect, useState, useEffect } from "react";
import useHeroReveal from "../../hooks/useHeroReveal";
import "./HeroSection.css";

interface HeroSectionProps {
  splashDone: boolean;
}

// ═══════════════════════════════════════════════
// COLUMNAS DESKTOP — no tocar
// ═══════════════════════════════════════════════
const COLUMNS = [
  {
    color: "rgba(240, 140, 90, 0.95)",
    color2: "rgba(235, 234, 222, 0.8)",
    mid: "90%",
    width: "180%",
    height: "75%",
    originY: 100,
    spread: "150%",
  }, // 1
  {
    color: "rgba(240,140,90, 0.95)",
    color2: "rgba(235, 234, 222, 0.8)",
    mid: "90%",
    width: "180%",
    height: "70%",
    originY: 100,
    spread: "150%",
  }, // 2
  {
    color: "rgba(240,140,90, 0.95)",
    color2: "rgba(235, 234, 222, 0.8)",
    mid: "90%",
    width: "180%",
    height: "65%",
    originY: 100,
    spread: "150%",
  }, // 3
  {
    color: "rgba(240,140,90, 0.95)",
    color2: "rgba(235, 234, 222, 0.8)",
    mid: "90%",
    width: "180%",
    height: "60%",
    originY: 100,
    spread: "150%",
  }, // 4
  {
    color: "rgba(240,140,90, 0.95)",
    color2: "rgba(235, 234, 222, 0.8)",
    mid: "90%",
    width: "180%",
    height: "55%",
    originY: 100,
    spread: "150%",
  }, // 5
  {
    color: "rgba(240,140,90, 0.95)",
    color2: "rgba(235, 234, 222, 0.8)",
    mid: "90%",
    width: "180%",
    height: "52%",
    originY: 100,
    spread: "150%",
  }, // 6 centro
  {
    color: "rgba(240,140,90, 0.95)",
    color2: "rgba(235, 234, 222, 0.8)",
    mid: "90%",
    width: "180%",
    height: "55%",
    originY: 100,
    spread: "150%",
  }, // 7
  {
    color: "rgba(240,140,90, 0.95)",
    color2: "rgba(235, 234, 222, 0.8)",
    mid: "90%",
    width: "180%",
    height: "60%",
    originY: 100,
    spread: "150%",
  }, // 8
  {
    color: "rgba(240,140,90, 0.95)",
    color2: "rgba(235, 234, 222, 0.8)",
    mid: "90%",
    width: "180%",
    height: "65%",
    originY: 100,
    spread: "150%",
  }, // 9
  {
    color: "rgba(240,140,90, 0.95)",
    color2: "rgba(235, 234, 222, 0.8)",
    mid: "90%",
    width: "180%",
    height: "70%",
    originY: 100,
    spread: "150%",
  }, // 10
  {
    color: "rgba(240,140,90, 0.95)",
    color2: "rgba(235, 234, 222, 0.8)",
    mid: "90%",
    width: "180%",
    height: "75%",
    originY: 100,
    spread: "150%",
  }, // 11
];

// ═══════════════════════════════════════════════
// COLUMNAS MOBILE — 4 columnas, editar aquí
// mismos parámetros que COLUMNS
// ═══════════════════════════════════════════════
const MOBILE_COLUMNS = [
  {
    color: "rgba(240,140,90, 0.95)",
    color2: "rgba(235, 234, 222, 0.8)",
    mid: "40%",
    width: "500%",
    height: "75%",
    originY: 10,
    spread: "150%",
  }, // 1
  {
    color: "rgba(240,140,90, 0.95)",
    color2: "rgba(235, 234, 222, 0.8)",
    mid: "60%",
    width: "500%",
    height: "75%",
    originY: 10,
    spread: "150%",
  }, // 2
  {
    color: "rgba(240,140,90, 0.95)",
    color2: "rgba(235, 234, 222, 0.8)",
    mid: "70%",
    width: "500%",
    height: "75%",
    originY: 10,
    spread: "150%",
  }, // 3
  {
    color: "rgba(240,140,90, 0.95)",
    color2: "rgba(235, 234, 222, 0.8)",
    mid: "80%",
    width: "500%",
    height: "75%",
    originY: 10,
    spread: "150%",
  }, // 4
];

function HeroSection({ splashDone }: HeroSectionProps): JSX.Element {
  const sectionRef = useRef<HTMLElement>(null);
  const colsRef = useRef<(HTMLDivElement | null)[]>([]);
  const rafRef = useRef<number>(0);
  const mouse = useRef({ nx: 0.5, ny: 0.5 });
  const smoothMouse = useRef({ nx: 0.5, ny: 0.5 });
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 768);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const activeCols = isMobile ? MOBILE_COLUMNS : COLUMNS;

  useHeroReveal(splashDone);

  useLayoutEffect(() => {
    const sec = sectionRef.current;
    if (!sec) return;

    const onMove = (e: globalThis.MouseEvent) => {
      const r = sec.getBoundingClientRect();
      const inside =
        e.clientX >= r.left &&
        e.clientX <= r.right &&
        e.clientY >= r.top &&
        e.clientY <= r.bottom;
      if (!inside) return;
      mouse.current = {
        nx: (e.clientX - r.left) / r.width,
        ny: (e.clientY - r.top) / r.height,
      };
    };
    window.addEventListener("mousemove", onMove);

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const tick = () => {
      smoothMouse.current.nx = lerp(
        smoothMouse.current.nx,
        mouse.current.nx,
        0.06,
      );
      smoothMouse.current.ny = lerp(
        smoothMouse.current.ny,
        mouse.current.ny,
        0.06,
      );

      const dx = smoothMouse.current.nx - 0.5;
      const dy = smoothMouse.current.ny - 0.5;
      const cols = isMobile ? MOBILE_COLUMNS : COLUMNS;

      colsRef.current.forEach((col, i) => {
        if (!col || !cols[i]) return;
        const centerFactor = 1 - Math.abs(i / (cols.length - 1) - 0.5) * 2;
        const cx = 50 + dx * centerFactor * 100;
        const cy = cols[i].originY + dy * centerFactor * 30;
        col.style.backgroundImage = `radial-gradient(ellipse ${cols[i].width} ${cols[i].height} at ${cx}% ${cy}%, ${cols[i].color} 0%, ${cols[i].color2} ${cols[i].mid}, rgba(240,140,90,0) ${cols[i].spread})`;
      });

      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("mousemove", onMove);
    };
  }, [isMobile]);

  return (
    <section ref={sectionRef} className="hero" id="hero">
      <div className="hero__columns" aria-hidden="true">
        {activeCols.map((col, i) => {
          const colW = 100 / activeCols.length;
          const left = i * colW;
          return (
            <div
              key={i}
              ref={(el) => {
                colsRef.current[i] = el;
              }}
              className="hero__column"
              style={{
                left: `${left}%`,
                width: `calc(${colW}% + 2px)`,
                backgroundImage: `radial-gradient(ellipse ${col.width} ${col.height} at 50% ${col.originY}%, ${col.color} 0%, ${col.color2} ${col.mid}, rgba(240,140,90,0) ${col.spread})`,
              }}
            />
          );
        })}
      </div>

      <div className="hero__content">
        <p className="hero__greeting">Hi I am Debi</p>
        <h1 className="hero__title">
          <span className="hero__title-line-1">Front End Developer</span>
          <span className="hero__title-line-2 hero__title-line-3">
            &amp; UX/UI Designer
          </span>
        </h1>
        <p className="hero__subtext">
          I specialize in turning designs into fast, responsive web experiences
          — bridging the gap between design and development.
        </p>
        <a href="#projects" className="hero__scroll-link">
          Latest work ▼
        </a>
      </div>
    </section>
  );
}

export default HeroSection;
