import { useId } from "react";

interface BasketballIconProps {
  className?: string;
  /** Stroke-only variant in currentColor — for bands, rings and chips. */
  mono?: boolean;
  /** Stroke width for the mono variant (viewBox is 48). */
  strokeWidth?: number;
}

const Seams = () => (
  <>
    <path d="M1 24h46" />
    <path d="M24 1v46" />
    <path d="M8.2 8.2C13.6 12.9 16.4 18.2 16.4 24s-2.8 11.1-8.2 15.8" />
    <path d="M39.8 8.2C34.4 12.9 31.6 18.2 31.6 24s2.8 11.1 8.2 15.8" />
  </>
);

/** Basketball mark: gradient-filled by default, seam-only outline with `mono`. */
const BasketballIcon = ({ className = "", mono = false, strokeWidth = 2.5 }: BasketballIconProps) => {
  const gradientId = `ball-grad-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;

  if (mono) {
    return (
      <svg viewBox="0 0 48 48" aria-hidden="true" fill="none" className={className}>
        <g stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round">
          <circle cx="24" cy="24" r="23" />
          <Seams />
        </g>
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" className={className}>
      <defs>
        <radialGradient id={gradientId} cx="35%" cy="28%" r="80%">
          <stop offset="0%" stopColor="#ffb27a" />
          <stop offset="45%" stopColor="#ff6b1a" />
          <stop offset="100%" stopColor="#b64106" />
        </radialGradient>
      </defs>
      <circle cx="24" cy="24" r="23" fill={`url(#${gradientId})`} />
      <g stroke="#30170a" strokeWidth="1.7" strokeLinecap="round" fill="none" opacity="0.85">
        <Seams />
      </g>
    </svg>
  );
};

export default BasketballIcon;
