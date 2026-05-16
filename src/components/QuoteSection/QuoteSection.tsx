import { useEffect, useRef, useState } from "react";
import "./QuoteSection.css";

const QUOTE = `"Design is not just what it looks like. Design is how it works."`;
const AUTHOR = "— Steve Jobs";
const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%&";

function scramble(target: string, progress: number): string {
  return target
    .split("")
    .map((char, i) => {
      if (char === " ") return " ";
      const revealAt = i / target.length;
      if (progress >= revealAt + 0.05) return char; // revelada — fija
      return CHARS[Math.floor(Math.random() * CHARS.length)]; // scrambled
    })
    .join("");
}

function QuoteSection(): JSX.Element {
  const sectionRef = useRef<HTMLElement>(null);
  const rafRef = useRef<number>(0);
  const progressRef = useRef<number>(0);
  const doneRef = useRef<boolean>(false);
  const [display, setDisplay] = useState<string>(() =>
    QUOTE.replace(/[^ "]/g, "·"),
  );
  const [started, setStarted] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = (): void => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowH = window.innerHeight;
      const progress = Math.max(
        0,
        Math.min(1, (windowH * 0.75 - rect.top) / (windowH * 0.55)),
      );
      progressRef.current = progress;
      if (progress > 0 && !started) setStarted(true);

      // Si progress llegó a 1, mostrar texto final y parar
      if (progress >= 1 && !doneRef.current) {
        doneRef.current = true;
        setDisplay(QUOTE);
        cancelAnimationFrame(rafRef.current);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [started]);

  useEffect(() => {
    if (!started || doneRef.current) return;

    let frame = 0;
    const SPEED = 6; // cambia caracteres cada N frames — más alto = más lento

    const tick = () => {
      if (doneRef.current) return;
      frame++;
      if (frame % SPEED === 0) {
        setDisplay(scramble(QUOTE, progressRef.current));
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(rafRef.current);
  }, [started]);

  return (
    <section className="quote-section" ref={sectionRef}>
      <blockquote className="quote-section__text">
        {display}
        <br />
        <span className="quote-section__author">{AUTHOR}</span>
      </blockquote>
    </section>
  );
}

export default QuoteSection;
