import { useEffect, useRef } from "react";
import "./Footer.css";

/* Monogram + icons use stroke/fill="currentColor" so they inherit
   color from CSS (and react to :hover). */
function Monogram(): JSX.Element {
  return (
    <svg
      className="footer__mono"
      width={34}
      height={34}
      viewBox="0 0 299 241.9"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        fill="currentColor"
        d="M259.5,89.8c-8.6-15-24.7-24.4-42-24.4c0,0,0,0,0,0l-44.3,0c-16.1,0-31.1,8.1-40.1,21.3l-0.1-69.1h-8.2L125,87
        c-6.4-9.7-16-16.6-27.3-19.8c-12.4-3.5-25.5-1.9-36.8,4.4C49.8,78,41.7,88.4,38.2,100.8s-1.9,25.5,4.4,36.8
        c13.1,23.2,42.7,31.5,65.9,18.4c9.1-5.1,16.3-13.1,20.5-22.7c7.1,16.1,22.6,27.2,40.2,28.7l0.1,55.5h8.2l-0.1-76.7
        c14,20.8,42,27.6,64.1,15c11.2-6.4,19.3-16.8,22.7-29.2S265.9,101,259.5,89.8z M124.9,113.8c0,10.7-4.2,20.8-11.7,28.4
        s-17.7,11.8-28.4,11.8h0c-22.2,0-40.2-18-40.2-40.2c0-22.2,18-40.2,40.2-40.2S124.9,91.6,124.9,113.8z M169.2,153.8
        c-19.9-2-35.5-18.8-36.1-38.7h0.1l0-4.3c1.7-20.7,19.2-37,40-37h17.4c-13.3,8.9-21.4,24-21.4,40.2L169.2,153.8z M188.6,85.6
        c7.5-7.6,17.6-11.9,28.3-12l0.7,0c0.1,0,0.2,0,0.3,0c22,0,40,17.8,40.2,39.9c0.1,10.7-4,20.8-11.5,28.5
        c-7.5,7.6-17.6,11.9-28.3,12c-0.2,0-0.4,0-0.6,0h0h0c-10.8,0.1-20.8-4-28.5-11.5c-7.6-7.5-11.9-17.6-12-28.3
        S181.1,93.3,188.6,85.6z"
      />
    </svg>
  );
}

function IconLinkedIn(): JSX.Element {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M4.98 3.5A2.5 2.5 0 1 0 5 8.5a2.5 2.5 0 0 0 0-5zM3 9h4v12H3zM10 9h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.3c0-1.27-.02-2.9-1.77-2.9-1.77 0-2.04 1.38-2.04 2.8V21h-4z"
      />
    </svg>
  );
}

function IconGitHub(): JSX.Element {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.49v-1.7c-2.78.62-3.37-1.21-3.37-1.21-.45-1.18-1.11-1.49-1.11-1.49-.91-.64.07-.62.07-.62 1 .07 1.53 1.06 1.53 1.06.9 1.57 2.36 1.12 2.94.86.09-.67.35-1.12.63-1.38-2.22-.26-4.55-1.14-4.55-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05a9.4 9.4 0 0 1 5 0c1.91-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.81-4.57 5.06.36.32.68.94.68 1.9v2.82c0 .27.18.6.69.49A10.26 10.26 0 0 0 22 12.25C22 6.58 17.52 2 12 2z"
      />
    </svg>
  );
}

function ArrowUpRight(): JSX.Element {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 18 L18 6 M9 6 H18 V15"
      />
    </svg>
  );
}

function Footer(): JSX.Element {
  const year = new Date().getFullYear();
  const wrapRef = useRef<HTMLElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const glow2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    const state = { tx: 0.5, ty: 0.55, cx: 0.5, cy: 0.55, scroll: 0 };

    const onMove = (e: MouseEvent) => {
      const r = wrap.getBoundingClientRect();
      state.tx = (e.clientX - r.left) / r.width;
      state.ty = (e.clientY - r.top) / r.height;
    };
    const onScroll = () => {
      const r = wrap.getBoundingClientRect();
      const vh = window.innerHeight;
      state.scroll = Math.min(1, Math.max(0, (vh - r.top) / (vh * 0.85)));
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    let raf = 0;
    let t = 0;
    const tick = () => {
      t += 0.016;
      state.cx += (state.tx - state.cx) * 0.05;
      state.cy += (state.ty - state.cy) * 0.05;
      const gx = (state.cx + Math.sin(t * 0.45) * 0.05) * 100;
      const gy = (state.cy + Math.cos(t * 0.37) * 0.05) * 100;
      const op = 0.3 + 0.7 * state.scroll;

      if (glowRef.current) {
        glowRef.current.style.left = `${gx}%`;
        glowRef.current.style.top = `${gy}%`;
        glowRef.current.style.opacity = `${op}`;
      }
      if (glow2Ref.current) {
        glow2Ref.current.style.left = `${100 - gx * 0.7}%`;
        glow2Ref.current.style.top = `${90 - gy * 0.3}%`;
        glow2Ref.current.style.opacity = `${0.22 + 0.45 * state.scroll}`;
      }
      raf = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <footer className="footer" ref={wrapRef} id="footer">
      {/* interactive coral glows (positioned by JS) */}
      <div className="footer__glow" ref={glowRef} />
      <div className="footer__glow footer__glow--2" ref={glow2Ref} />
      <div className="footer__bands" />
      <div className="footer__vignette" />

      <div className="footer__inner">
        {/* top bar */}
        <div className="footer__top">
          <a className="footer__brand" href="#top">
            <Monogram />
            <span className="footer__brandtxt">
              Debi — Front-End&nbsp;&amp;&nbsp;UX/UI
            </span>
          </a>
          <div className="footer__socials">
            <a
              className="footer__pill"
              href="https://linkedin.com/in/tu-usuario"
              target="_blank"
              rel="noreferrer"
            >
              <IconLinkedIn />
              LinkedIn
            </a>
            <a
              className="footer__pill"
              href="https://github.com/tu-usuario"
              target="_blank"
              rel="noreferrer"
            >
              <IconGitHub />
              GitHub
            </a>
          </div>
        </div>

        {/* CTA */}
        <div className="footer__cta">
          <p className="footer__eyebrow">Got a project in mind?</p>
          <h2 className="footer__headline">
            Let’s work <em>together</em>
          </h2>

          <div className="footer__contact">
            <a className="footer__link" href="mailto:debicps@gmail.com">
              debicps@gmail.com
              <ArrowUpRight />
            </a>
            <a className="footer__link" href="tel:+56958515380">
              +56 9 5851 5380
              <ArrowUpRight />
            </a>
          </div>
        </div>

        {/* bottom bar */}
        <div className="footer__bottom">
          <p className="footer__copy">© {year} DEBI</p>
          <span className="footer__status">
            <i className="footer__dot" />
            Available for work
          </span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
