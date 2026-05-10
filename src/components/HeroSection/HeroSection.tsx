import { useEffect, useRef, MouseEvent, useCallback } from "react";
import Button from "../Button/Button";
import useHeroReveal from "../../hooks/useHeroReveal";
import "./HeroSection.css";

const DEFAULT_COLOR = "167,139,250";

interface HeroSectionProps {
  splashDone: boolean;
}

function HeroSection({ splashDone }: HeroSectionProps): JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const cursorRef = useRef<HTMLDivElement>(null);

  useHeroReveal(splashDone);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;

    const resize = () => {
      canvas.width = parent.offsetWidth;
      canvas.height = parent.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctxRef.current = ctx;

    const loop = () => {
      ctx.globalCompositeOperation = "destination-out";
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = "source-over";
      animRef.current = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (cursorRef.current) {
      cursorRef.current.style.left = `${x}px`;
      cursorRef.current.style.top = `${y}px`;
      cursorRef.current.style.opacity = "1";
    }

    const ctx = ctxRef.current;
    if (!ctx) return;

    const r = 140;
    const grad = ctx.createRadialGradient(x, y, 0, x, y, r);
    grad.addColorStop(0, `rgba(${DEFAULT_COLOR}, 0.55)`);
    grad.addColorStop(0.4, `rgba(${DEFAULT_COLOR}, 0.25)`);
    grad.addColorStop(1, `rgba(${DEFAULT_COLOR}, 0)`);

    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fillStyle = grad;
    ctx.fill();
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (cursorRef.current) cursorRef.current.style.opacity = "0";
  }, []);

  return (
    <section
      className="hero"
      id="hero"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <canvas ref={canvasRef} className="hero__canvas" aria-hidden="true" />

      <div ref={cursorRef} className="hero__custom-cursor" aria-hidden="true">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <path
            d="M4 2L20 10L12 13L9 21L4 2Z"
            fill="#111"
            stroke="#111"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <div className="hero__content">
        <div className="hero__content-top">
          <p className="hero__greeting">Hi, I am Debi</p>
          <h1 className="hero__title">
            {/* Cada línea es un span separado para animarlas individualmente */}
            <span className="hero__title-line-1 hero__title--purple">
              Front End
            </span>
            <span className="hero__title-line-2 hero__title--purple">
              Developer
            </span>
            <span className="hero__title-line-3">&amp; UX/UI Designer</span>
          </h1>
          <Button
            variant="outline"
            size="md"
            href="#contact"
            className="hero__cta"
          >
            Let's work together →
          </Button>
        </div>
        <div className="hero__content-bottom">
          <p className="hero__subtext">
            I specialize in turning designs into fast, responsive web
            experiences — bridging the gap between design and development.
          </p>
          <a href="#projects" className="hero__scroll-link">
            Latest work ▼
          </a>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
