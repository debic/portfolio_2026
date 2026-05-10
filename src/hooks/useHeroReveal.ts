import { useEffect } from "react";
import gsap from "gsap";

function useHeroReveal(ready: boolean): void {
  useEffect(() => {
    if (!ready) return;

    // Orden: greeting → cada línea del título → cta → subtext → scroll link
    const elements = [
      ".hero__greeting",
      ".hero__title-line-1",
      ".hero__title-line-2",
      ".hero__title-line-3",
      ".hero__cta",
      ".hero__subtext",
      ".hero__scroll-link",
    ];

    gsap.to(elements, {
      y: 0,
      opacity: 1,
      duration: 0.7,
      ease: "power3.out",
      stagger: 0.1,
      delay: 0.1,
    });
  }, [ready]);
}

export default useHeroReveal;
