import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "../lib/motion";

/**
 * Reveal-once-on-scroll. Returns a ref to attach and a `visible` flag.
 * Under reduced motion (or without IntersectionObserver) content is visible
 * immediately.
 */
export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  // Under reduced motion (or without IntersectionObserver) start visible.
  const [visible, setVisible] = useState(
    () => prefersReducedMotion() || typeof IntersectionObserver === "undefined",
  );

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (prefersReducedMotion() || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}
