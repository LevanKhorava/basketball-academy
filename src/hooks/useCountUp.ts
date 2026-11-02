import { useEffect, useState } from "react";
import { prefersReducedMotion } from "../lib/motion";
import { useReveal } from "./useReveal";

/**
 * Counts from 0 to `target` (ease-out) once the element scrolls into view.
 * Under reduced motion the final value is shown immediately.
 */
export function useCountUp(target: number, duration = 1600) {
  const { ref, visible } = useReveal<HTMLSpanElement>();
  // Under reduced motion useReveal is visible from the start — show the final
  // value immediately instead of animating towards it.
  const [display, setDisplay] = useState(() => (prefersReducedMotion() ? target : 0));

  useEffect(() => {
    if (!visible || prefersReducedMotion()) return;

    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(target * eased));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [visible, target, duration]);

  return { ref, display };
}
