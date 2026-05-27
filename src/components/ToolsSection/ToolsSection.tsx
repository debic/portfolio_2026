import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ToolCard from "../ToolCard/ToolCard";
import "./ToolsSection.css";

gsap.registerPlugin(ScrollTrigger);

interface ToolGroup {
  id: number;
  category: string;
  tools: string[];
  colorLeft: string;
  colorRight: string;
}

const TOOLS: ToolGroup[] = [
  {
    id: 1,
    category: "Frontend",
    tools: ["JavaScript", "TypeScript", "React", "HTML, CSS, Sass"],
    colorLeft: "#DF783A",
    colorRight: "#E3874E",
  },
  {
    id: 2,
    category: "Backend",
    tools: ["Node.js", "Express"],
    colorLeft: "#E3874E",
    colorRight: "#E89C6C",
  },
  {
    id: 3,
    category: "CMS / Website Builders",
    tools: ["Shopify", "WordPress", "Wix (Velo, and JavaScript)"],
    colorLeft: "#E89C6C",
    colorRight: "#ECAB81",
  },
  {
    id: 4,
    category: "Design Tools",
    tools: ["Figma", "Adobe XD", "Illustrator"],
    colorLeft: "#ECAB81",
    colorRight: "#F2C1A0",
  },
];

function ToolsSection(): JSX.Element {
  const outerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  const initGsap = () => {
    if (!outerRef.current || !stageRef.current) return;

    const cards = gsap.utils.toArray<HTMLElement>(".tcard-wrap");
    if (cards.length < 4) return;

    const gap = 24;
    const numCards = 4;
    const stageWidth = stageRef.current.offsetWidth;
    const cardWidth = (stageWidth - gap * (numCards - 1)) / numCards;

    // Resetear altura para que el DOM recalcule
    cards.forEach((card) => {
      card.style.width = `${cardWidth}px`;
      card.style.height = "auto";
    });

    // Equalizar alturas: tomar la máxima
    const maxHeight = Math.max(...cards.map((card) => card.offsetHeight));
    cards.forEach((card) => {
      card.style.height = `${maxHeight}px`;
    });

    // Actualizar stage height para que quepa
    stageRef.current.style.height = `${maxHeight}px`;

    const unit = cardWidth + gap;
    const finalX = [-1.5 * unit, -0.5 * unit, 0.5 * unit, 1.5 * unit];

    cards.forEach((card, i) => {
      gsap.fromTo(
        card,
        { x: 0 },
        {
          x: finalX[i],
          ease: "none",
          scrollTrigger: {
            trigger: outerRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.5,
          },
        },
      );
    });
  };

  useEffect(() => {
    // En mobile no aplicar GSAP
    if (window.innerWidth <= 768) return;

    const timer = setTimeout(initGsap, 200);

    const handleResize = () => {
      if (window.innerWidth <= 768) return;
      ScrollTrigger.getAll().forEach((t) => t.kill());
      initGsap();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", handleResize);
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section className="tools-section" id="tools">
      <div className="tools-section__outer" ref={outerRef}>
        <div className="tools-section__sticky">
          <div className="tools-section__header">
            <h2 className="tools-section__title">Tools I Manage</h2>
            <p className="tools-section__subtitle">
              From building responsive interfaces with React and TypeScript to
              crafting custom Wix and Shopify experiences — these are the
              technologies I work with daily.
            </p>
          </div>

          <div className="tools-section__stage" ref={stageRef}>
            {TOOLS.map((t, i) => (
              <div
                key={t.id}
                className="tcard-wrap"
                style={{ zIndex: i === 1 || i === 2 ? 10 : 5 }}
              >
                <ToolCard
                  category={t.category}
                  tools={t.tools}
                  colorLeft={t.colorLeft}
                  colorRight={t.colorRight}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ToolsSection;
