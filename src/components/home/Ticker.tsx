import type { CSSProperties } from "react";
import BasketballIcon from "../BasketballIcon";
import { BRAND, content } from "../../data/content";

const sequence = [...content.about.pillars, BRAND];

/**
 * Angled marquee band between the hero and the academy intro. Decorative:
 * every word it shows already appears elsewhere on the page.
 */
const Ticker = () => (
  <div aria-hidden="true" className="relative z-10 overflow-x-clip py-6">
    <div className="-rotate-[1.2deg] scale-x-[1.03] border-y-4 border-charcoal-950 bg-gradient-to-r from-court-600 via-court-500 to-court-600 py-3 shadow-[0_14px_44px_rgba(255,107,26,0.22)]">
      <div className="marquee-track" style={{ "--marquee-speed": "26s" } as CSSProperties}>
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0 items-center">
            {sequence.map((word, index) => (
              <span
                key={index}
                className="flex items-center gap-5 pr-5 font-display text-lg uppercase tracking-[0.15em] text-charcoal-950 sm:text-xl"
              >
                <BasketballIcon mono className="h-5 w-5 shrink-0 opacity-70" />
                <span className="whitespace-nowrap">{word}</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default Ticker;
