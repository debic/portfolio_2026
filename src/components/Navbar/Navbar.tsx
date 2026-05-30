import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Navbar.css";

const DARK_BG_COLORS = ["#3b1672", "#4c1d95", "#7c3aed", "#0f0f0f", "#383838"];

function isDarkBackground(): boolean {
  const navbar = document.querySelector(".navbar") as HTMLElement | null;
  if (navbar) navbar.style.visibility = "hidden";
  const el = document.elementFromPoint(
    window.innerWidth / 2,
    40,
  ) as HTMLElement | null;
  if (navbar) navbar.style.visibility = "";
  if (!el) return false;

  let current: HTMLElement | null = el;
  while (current && current !== document.body) {
    const bg = window.getComputedStyle(current).backgroundColor;
    const match = bg.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
    if (match) {
      const [, r, g, b] = match.map(Number);
      if (r === 0 && g === 0 && b === 0) {
        current = current.parentElement;
        continue;
      }
      const hex =
        "#" + [r, g, b].map((n) => n.toString(16).padStart(2, "0")).join("");
      if (DARK_BG_COLORS.includes(hex)) return true;
      const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
      return luminance < 0.5;
    }
    current = current.parentElement;
  }
  return false;
}

const LINKS = [
  { hash: "#projects", label: "Projects" },
  { hash: "#tools", label: "Tools" },
  { hash: "#about", label: "About" },
  { hash: "#contact", label: "Contact" },
];

const SOCIAL_LINKS = [
  {
    href: "https://www.linkedin.com/in/debi-codriansky-834655179/",
    label: "LinkedIn",
  },
  {
    href: "https://github.com/debic",
    label: "GitHub",
  },
];

interface NavbarProps {
  splashDone?: boolean;
}

function Navbar({ splashDone = false }: NavbarProps): JSX.Element {
  const [pillVisible, setPillVisible] = useState<boolean>(false);
  const [isDark, setIsDark] = useState<boolean>(false);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [atFooter, setAtFooter] = useState<boolean>(false);
  const glowRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    if (!splashDone) return;
    const timer = setTimeout(() => setPillVisible(true), 800);
    return () => clearTimeout(timer);
  }, [splashDone]);

  useEffect(() => {
    const update = (): void => {
      setIsDark(isDarkBackground());
      const footer = document.querySelector(".footer") as HTMLElement | null;
      if (footer) {
        setAtFooter(footer.getBoundingClientRect().top < window.innerHeight);
      }
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  // Animated coral glow inside the mobile overlay (only while open)
  useEffect(() => {
    if (!menuOpen) return;
    let raf = 0;
    let t = 0;
    const tick = (): void => {
      t += 0.016;
      const x = 50 + Math.sin(t * 0.5) * 16;
      const y = 32 + Math.cos(t * 0.38) * 12;
      if (glowRef.current) {
        glowRef.current.style.left = `${x}%`;
        glowRef.current.style.top = `${y}%`;
      }
      raf = requestAnimationFrame(tick);
    };
    tick();
    return () => cancelAnimationFrame(raf);
  }, [menuOpen]);

  // Si estamos en home hace scroll al anchor, si no navega al home con el anchor
  const handleNavClick = (hash: string) => {
    setMenuOpen(false);
    if (isHome) {
      const el = document.querySelector(hash);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/" + hash);
    }
  };

  const handleLogoClick = () => {
    setMenuOpen(false);
    if (isHome) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate("/");
    }
  };

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const handleContactClick = () => {
    setMenuOpen(false);
    if (isHome) {
      const el = document.querySelector("#contact");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/#contact");
    }
  };

  // "Let's work together" → cierra el menú y baja al footer
  const handleWorkClick = () => {
    setMenuOpen(false);
    if (isHome) {
      const el = document.querySelector(".footer");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/#contact");
    }
  };

  // Cuando llegamos al home con un hash en la URL, hacer scroll al anchor
  useEffect(() => {
    if (isHome && location.hash) {
      const el = document.querySelector(location.hash);
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 100);
      }
    }
  }, [isHome, location.hash]);

  return (
    <>
      <header
        className={`navbar ${isDark ? "navbar--on-dark" : "navbar--on-light"} ${menuOpen ? "navbar--open" : ""} ${atFooter ? "navbar--at-footer" : ""}`}
      >
        <nav className="navbar__inner">
          <button
            className={`navbar__logo ${pillVisible ? "navbar__logo--visible" : ""}`}
            onClick={handleLogoClick}
            aria-label="Debi Perez logo — ir al inicio"
          >
            <svg
              className="navbar__logo-svg"
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
          </button>

          <div
            className={`navbar__pill ${pillVisible ? "navbar__pill--visible" : ""}`}
          >
            <ul className="navbar__links">
              {LINKS.map((l) => (
                <li key={l.hash}>
                  <button onClick={() => handleNavClick(l.hash)}>
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div
            className={`navbar__actions ${pillVisible ? "navbar__actions--visible" : ""}`}
          >
            {SOCIAL_LINKS.map((link) => (
              <a
                key={link.label}
                className="navbar__social-link"
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
              >
                {link.label === "LinkedIn" ? (
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M19 0h-14C2.24 0 0 2.24 0 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5V5c0-2.76-2.24-5-5-5zM7 19H4V10h3v9zM5.5 8.5C4.12 8.5 3 7.38 3 6s1.12-2.5 2.5-2.5S8 4.62 8 6 6.88 8.5 5.5 8.5zM20 19h-3v-4.5c0-1.08-.02-2.47-1.5-2.47-1.5 0-1.73 1.17-1.73 2.4V19h-3v-9h2.88v1.23h.04c.4-.75 1.38-1.54 2.84-1.54 3.04 0 3.6 2 3.6 4.59V19z" />
                  </svg>
                ) : (
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.38 7.86 10.9.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.87-1.54-3.87-1.54-.53-1.36-1.3-1.72-1.3-1.72-1.06-.72.08-.7.08-.7 1.17.08 1.79 1.2 1.79 1.2 1.04 1.78 2.73 1.27 3.4.97.11-.75.41-1.27.74-1.56-2.56-.29-5.26-1.28-5.26-5.7 0-1.26.45-2.29 1.2-3.1-.12-.3-.52-1.52.11-3.16 0 0 .98-.31 3.2 1.18a11.07 11.07 0 0 1 5.82 0c2.22-1.49 3.2-1.18 3.2-1.18.63 1.64.23 2.86.11 3.16.75.81 1.2 1.84 1.2 3.1 0 4.43-2.71 5.41-5.29 5.69.42.36.8 1.08.8 2.18 0 1.57-.01 2.83-.01 3.22 0 .31.21.68.8.56C20.71 21.38 24 17.08 24 12 24 5.73 18.27.5 12 .5z" />
                  </svg>
                )}
              </a>
            ))}
            <button
              className="navbar__contact-button"
              onClick={handleContactClick}
            >
              Contact
              <span className="navbar__contact-icon" aria-hidden="true">
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

          <button
            className="navbar__hamburger"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={menuOpen}
          >
            <span
              className={`navbar__bar ${menuOpen ? "navbar__bar--1-open" : ""}`}
            />
            <span
              className={`navbar__bar ${menuOpen ? "navbar__bar--2-open" : ""}`}
            />
            <span
              className={`navbar__bar ${menuOpen ? "navbar__bar--3-open" : ""}`}
            />
          </button>
        </nav>
      </header>

      {/* ───────── Mobile menu — overlay grafito + glow coral ───────── */}
      <div
        className={`navbar__mobile-menu ${menuOpen ? "navbar__mobile-menu--open" : ""}`}
        aria-hidden={!menuOpen}
      >
        <div className="navbar__mobile-glow" ref={glowRef} aria-hidden="true" />
        <div className="navbar__mobile-bands" aria-hidden="true" />

        <button
          className="navbar__mobile-close"
          onClick={() => setMenuOpen(false)}
          aria-label="Cerrar menú"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <line x1="4" y1="4" x2="20" y2="20" />
            <line x1="20" y1="4" x2="4" y2="20" />
          </svg>
        </button>

        <div className="navbar__mobile-content">
          <ul className="navbar__mobile-links">
            {LINKS.map((l, i) => (
              <li key={l.hash} style={{ "--i": i } as React.CSSProperties}>
                <button onClick={() => handleNavClick(l.hash)}>
                  <span className="navbar__mobile-link-label">{l.label}</span>
                  <span className="navbar__mobile-link-num">0{i + 1}</span>
                </button>
              </li>
            ))}
          </ul>

          <button className="navbar__mobile-cta" onClick={handleWorkClick}>
            Let&rsquo;s work together
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path
                fill="none"
                stroke="currentColor"
                strokeWidth="1.9"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 L18 6 M9 6 H18 V15"
              />
            </svg>
          </button>

          <div className="navbar__mobile-footer">
            <div className="navbar__mobile-socials">
              {SOCIAL_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                >
                  {link.label === "LinkedIn" ? (
                    <svg
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M19 0h-14C2.24 0 0 2.24 0 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5V5c0-2.76-2.24-5-5-5zM7 19H4V10h3v9zM5.5 8.5C4.12 8.5 3 7.38 3 6s1.12-2.5 2.5-2.5S8 4.62 8 6 6.88 8.5 5.5 8.5zM20 19h-3v-4.5c0-1.08-.02-2.47-1.5-2.47-1.5 0-1.73 1.17-1.73 2.4V19h-3v-9h2.88v1.23h.04c.4-.75 1.38-1.54 2.84-1.54 3.04 0 3.6 2 3.6 4.59V19z" />
                    </svg>
                  ) : (
                    <svg
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.38 7.86 10.9.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.87-1.54-3.87-1.54-.53-1.36-1.3-1.72-1.3-1.72-1.06-.72.08-.7.08-.7 1.17.08 1.79 1.2 1.79 1.2 1.04 1.78 2.73 1.27 3.4.97.11-.75.41-1.27.74-1.56-2.56-.29-5.26-1.28-5.26-5.7 0-1.26.45-2.29 1.2-3.1-.12-.3-.52-1.52.11-3.16 0 0 .98-.31 3.2 1.18a11.07 11.07 0 0 1 5.82 0c2.22-1.49 3.2-1.18 3.2-1.18.63 1.64.23 2.86.11 3.16.75.81 1.2 1.84 1.2 3.1 0 4.43-2.71 5.41-5.29 5.69.42.36.8 1.08.8 2.18 0 1.57-.01 2.83-.01 3.22 0 .31.21.68.8.56C20.71 21.38 24 17.08 24 12 24 5.73 18.27.5 12 .5z" />
                    </svg>
                  )}
                </a>
              ))}
            </div>
            <span className="navbar__mobile-status">
              <i className="navbar__mobile-dot" />
              Available for work
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
