import { useEffect, useRef, MouseEvent, useCallback } from "react";
import Button from "../Button/Button";
import "./HeroSection.css";

const DEFAULT_COLOR = "167,139,250"; // morado

function HeroSection(): JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const cursorRef = useRef<HTMLDivElement>(null);

  /* ── Canvas setup ── */
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

    /* Fade loop:
       Cada frame usamos 'destination-out' para RESTAR alpha del canvas.
       Esto garantiza que el contenido llega a 100% transparente.
       A diferencia de pintar blanco (que solo funciona en fondo blanco),
       destination-out elimina el canal alpha de verdad. */
    const loop = () => {
      ctx.globalCompositeOperation = "destination-out";
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)"; // resta 5% de alpha por frame
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = "source-over"; // restaurar modo normal

      animRef.current = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  /* ── Mouse move: pintar en el canvas en tiempo real ── */
  const handleMouseMove = useCallback((e: MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Mover cursor via ref
    if (cursorRef.current) {
      cursorRef.current.style.left = `${x}px`;
      cursorRef.current.style.top = `${y}px`;
      cursorRef.current.style.opacity = "1";
    }

    const ctx = ctxRef.current;
    if (!ctx) return;

    const rgb = DEFAULT_COLOR;
    const r = 140; // radio del glow

    // Pintar gradiente radial en la posición del cursor
    ctx.globalCompositeOperation = "source-over";
    const grad = ctx.createRadialGradient(x, y, 0, x, y, r);
    grad.addColorStop(0, `rgba(${rgb}, 0.55)`);
    grad.addColorStop(0.4, `rgba(${rgb}, 0.25)`);
    grad.addColorStop(1, `rgba(${rgb}, 0)`);

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
      {/* Canvas — detrás de todo el contenido */}
      <canvas ref={canvasRef} className="hero__canvas" aria-hidden="true" />

      {/* Cursor personalizado */}
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

      {/* Contenido — siempre encima del canvas */}
      <div className="hero__content">
        <div className="hero__content-top">
          <p className="hero__greeting">Hi, I am Debi</p>
          <h1 className="hero__title">
            <span className="hero__title--purple">
              Front End
              <br />
              Developer
            </span>{" "}
            &amp; <br />
            UX/UI Designer
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
