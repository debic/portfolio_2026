import { useEffect, useRef } from "react";
import gsap from "gsap";
import "./AboutSection.css";

function AboutSection(): JSX.Element {
  const sectionRef = useRef<HTMLElement>(null);
  const circleOuterRef = useRef<HTMLDivElement>(null);
  const circleMiddleRef = useRef<HTMLDivElement>(null);
  const circleInnerRef = useRef<HTMLDivElement>(null);
  const photoWrapRef = useRef<HTMLDivElement>(null);

  // ── Scroll: circles grow as section enters viewport ──────────────────
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    gsap.set(
      [circleOuterRef.current, circleMiddleRef.current, circleInnerRef.current],
      {
        scale: 0.15,
        opacity: 0,
      },
    );

    const onScroll = () => {
      const rect = section.getBoundingClientRect();
      const windowH = window.innerHeight;
      const progress = Math.min(
        Math.max((windowH - rect.top) / (windowH * 0.9), 0),
        1,
      );

      gsap.to(circleOuterRef.current, {
        scale: 0.15 + progress * 0.85,
        opacity: progress * 0.25,
        duration: 0.15,
        ease: "none",
        overwrite: "auto",
      });
      gsap.to(circleMiddleRef.current, {
        scale: 0.15 + progress * 0.85,
        opacity: progress * 0.35,
        duration: 0.15,
        ease: "none",
        overwrite: "auto",
        delay: 0.02,
      });
      gsap.to(circleInnerRef.current, {
        scale: 0.15 + progress * 0.85,
        opacity: progress * 0.5,
        duration: 0.15,
        ease: "none",
        overwrite: "auto",
        delay: 0.04,
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ── Mouse parallax ────────────────────────────────────────────────────
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const onMouseMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width - 0.5;
      const ny = (e.clientY - rect.top) / rect.height - 0.5;

      gsap.to(circleOuterRef.current, {
        x: nx * 500,
        y: ny * 300,
        duration: 1.2,
        ease: "power2.out",
      });
      gsap.to(circleMiddleRef.current, {
        x: nx * -200,
        y: ny * -100,
        duration: 1.0,
        ease: "power2.out",
      });
      gsap.to(circleInnerRef.current, {
        x: nx * 100,
        y: ny * 90,
        duration: 0.8,
        ease: "power2.out",
      });
      gsap.to(photoWrapRef.current, {
        x: nx * 6,
        y: ny * 6,
        duration: 0.8,
        ease: "power2.out",
      });
    };

    const onMouseLeave = () => {
      gsap.to(
        [
          circleOuterRef.current,
          circleMiddleRef.current,
          circleInnerRef.current,
          photoWrapRef.current,
        ],
        { x: 0, y: 0, duration: 1.2, ease: "power3.out" },
      );
    };

    section.addEventListener("mousemove", onMouseMove);
    section.addEventListener("mouseleave", onMouseLeave);
    return () => {
      section.removeEventListener("mousemove", onMouseMove);
      section.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  return (
    <section className="about-section" id="about" ref={sectionRef}>
      <div className="about-section__bottom">
        <div className="about-section__photo-col">
          <div className="about-section__circles">
            <div
              className="about-circle about-circle--outer"
              ref={circleOuterRef}
            />
            <div
              className="about-circle about-circle--middle"
              ref={circleMiddleRef}
            />
            <div
              className="about-circle about-circle--inner"
              ref={circleInnerRef}
            />
          </div>
          <div className="about-section__photo-wrap" ref={photoWrapRef}>
            <img
              src={`${import.meta.env.BASE_URL}debi2.jpg`}
              alt="Debi Perez"
              className="about-section__photo"
            />
          </div>
        </div>

        <div className="about-section__bio-wrap">
          <p className="about-section__label">About me</p>
          <h2 className="about-section__title">
            I Help People Find Their Identity Through a Website.
          </h2>
          <p className="about-section__bio">
            I started in UX/UI design, obsessing over how things look and feel.
            Then I got curious about how they're actually built — and never
            looked back. Today I bridge both worlds, designing and developing
            experiences that feel intentional from the first pixel to the last
            line of code.
          </p>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
