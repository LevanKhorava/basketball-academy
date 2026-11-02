import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "../lib/motion";

/**
 * Pointer-follow parallax. Attach the ref to a container: it receives
 * --mx/--my custom properties in the -1..1 range (eased), which children
 * with `.parallax-layer` translate by their own --depth (see index.css).
 * No-op under reduced motion and on coarse (touch) pointers.
 */
export function useParallax<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (prefersReducedMotion()) return;
    if (typeof window.matchMedia !== "function" || !window.matchMedia("(pointer: fine)").matches) {
      return;
    }

    let raf = 0;
    let targetX = 0;
    let targetY = 0;
    let x = 0;
    let y = 0;

    const step = () => {
      x += (targetX - x) * 0.07;
      y += (targetY - y) * 0.07;
      element.style.setProperty("--mx", x.toFixed(4));
      element.style.setProperty("--my", y.toFixed(4));
      if (Math.abs(targetX - x) > 0.002 || Math.abs(targetY - y) > 0.002) {
        raf = requestAnimationFrame(step);
      } else {
        raf = 0;
      }
    };

    const onPointerMove = (event: PointerEvent) => {
      const rect = element.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      targetX = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      targetY = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
      if (!raf) raf = requestAnimationFrame(step);
    };

    element.addEventListener("pointermove", onPointerMove);
    return () => {
      element.removeEventListener("pointermove", onPointerMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return ref;
}
