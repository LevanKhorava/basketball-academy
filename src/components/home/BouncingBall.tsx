import type { CSSProperties } from "react";
import BasketballIcon from "../BasketballIcon";

interface BouncingBallProps {
  className?: string;
  /** Ball diameter (CSS length). */
  size?: string;
  /** Bounce apex as a negative translateY (CSS length). */
  height?: string;
  /** One full bounce, in seconds. */
  duration?: number;
  /** Phase offset, in seconds. */
  delay?: number;
}

/**
 * Decorative dribbling basketball: gravity-timed bounce, squash & stretch on
 * contact and a synced ground shadow (keyframes live in index.css).
 */
const BouncingBall = ({
  className = "",
  size = "3rem",
  height = "-4.5rem",
  duration = 1,
  delay = 0,
}: BouncingBallProps) => {
  const timing: CSSProperties = {
    animationDuration: `${duration}s`,
    animationDelay: `${delay}s`,
  };

  return (
    <div aria-hidden="true" className={`pointer-events-none select-none ${className}`.trim()} style={{ width: size }}>
      <div className="ball-bounce" style={{ ...timing, "--bounce-h": height } as CSSProperties}>
        <div className="ball-squash" style={timing}>
          <BasketballIcon className="w-full drop-shadow-[0_6px_14px_rgba(0,0,0,0.45)]" />
        </div>
      </div>
      <div
        className="ball-shadow mx-auto mt-1 h-1.5 w-4/5 rounded-full bg-black blur-[3px]"
        style={timing}
      />
    </div>
  );
};

export default BouncingBall;
