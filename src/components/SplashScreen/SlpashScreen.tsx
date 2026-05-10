import { useEffect, useRef } from "react";
import gsap from "gsap";
import "./SplashScreen.css";

interface SplashScreenProps {
  onComplete: () => void;
}

function SplashScreen({ onComplete }: SplashScreenProps): JSX.Element {
  const splashRef = useRef<HTMLDivElement>(null);
  const dRef = useRef<SVGPathElement>(null);
  const pRef = useRef<SVGPathElement>(null);
  const arcRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const splash = splashRef.current;
    const pathD = dRef.current;
    const pathP = pRef.current;
    const pathArc = arcRef.current;
    if (!splash || !pathD || !pathP || !pathArc) return;

    const lenD = pathD.getTotalLength();
    const lenP = pathP.getTotalLength();
    const lenArc = pathArc.getTotalLength();

    gsap.set(pathD, {
      visibility: "hidden",
      strokeDasharray: lenD,
      strokeDashoffset: -lenD,
    });
    gsap.set(pathP, {
      visibility: "hidden",
      strokeDasharray: lenP,
      strokeDashoffset: -lenP,
    });
    gsap.set(pathArc, {
      visibility: "hidden",
      strokeDasharray: lenArc,
      strokeDashoffset: lenArc,
    });

    const tl = gsap.timeline({ onComplete });

    // 1. d y p al mismo tiempo
    tl.set([pathD, pathP], { visibility: "visible" }, 0)
      .to(
        pathD,
        { strokeDashoffset: 0, duration: 1.4, ease: "power3.inOut" },
        0,
      )
      .to(
        pathP,
        { strokeDashoffset: 0, duration: 1.4, ease: "power3.inOut" },
        0,
      )

      // 2. arco
      .set(pathArc, { visibility: "visible" }, "-=0.3")
      .to(
        pathArc,
        { strokeDashoffset: 0, duration: 0.65, ease: "power3.inOut" },
        "<",
      )

      // 3. pausa
      .to({}, { duration: 0.5 })

      // 4. Cortina baja — logo va con ella
      .to(splash, {
        yPercent: 100,
        duration: 0.85,
        ease: "power4.inOut",
      });

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div ref={splashRef} className="splash">
      <svg
        className="splash__logo"
        viewBox="0 0 299 241.9"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          ref={dRef}
          className="splash__path"
          d="M129.3,110.7c-1.6-23.2-20.9-41.5-44.5-41.5c-24.6,0-44.6,20-44.6,44.6s20,44.6,44.6,44.6c24.4,0,44.2-19.5,44.6-43.8l0-8.7V17.6"
        />
        <path
          ref={pRef}
          className="splash__path"
          d="M175.1,116.9c1.6,23.2,20.9,41.5,44.5,41.5c24.6,0,44.6-20,44.6-44.6s-20-44.6-44.6-44.6c-24.4,0-44.2,19.5-44.6,43.8l0,8.7V210"
        />
        <path
          ref={arcRef}
          className="splash__path"
          d="M174,158.4c-24.6,0-44.6-20-44.6-44.6s20-44.6,44.6-44.6l43.7,0"
        />
      </svg>
    </div>
  );
}

export default SplashScreen;
