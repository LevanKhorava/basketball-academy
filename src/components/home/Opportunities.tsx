import type { ReactNode } from "react";
import Reveal from "../Reveal";
import { content } from "../../data/content";

const iconProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  className: "h-6 w-6",
  "aria-hidden": true,
} as const;

// Order matches content.opportunities.items.
const icons: ReactNode[] = [
  // Basketball
  <svg {...iconProps} key="ball">
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18M12 3v18M5.6 5.6C8 7.7 9.4 9.7 9.4 12s-1.4 4.3-3.8 6.4M18.4 5.6C16 7.7 14.6 9.7 14.6 12s1.4 4.3 3.8 6.4" />
  </svg>,
  // Personal plan / trending up
  <svg {...iconProps} key="plan">
    <path d="M3 17l6-6 4 4 7-8" />
    <path d="M14 7h6v6" />
  </svg>,
  // Video analysis
  <svg {...iconProps} key="video">
    <rect x="3" y="6" width="13" height="12" rx="2" />
    <path d="M16 10.5l5-3v9l-5-3" />
  </svg>,
  // Graduation cap
  <svg {...iconProps} key="cap">
    <path d="M2.5 9.5L12 5l9.5 4.5L12 14 2.5 9.5z" />
    <path d="M6.5 11.5V16c0 1.2 2.5 2.5 5.5 2.5s5.5-1.3 5.5-2.5v-4.5" />
    <path d="M21.5 9.5V15" />
  </svg>,
];

const Opportunities = () => (
  <section
    id="opportunities"
    aria-labelledby="opportunities-heading"
    className="scroll-mt-24 border-y border-white/5 bg-charcoal-900/40"
  >
    <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
      <Reveal className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-court-500">
          {content.opportunities.lead}
        </p>
        <h2 id="opportunities-heading" className="mt-3 text-3xl font-black sm:text-4xl">
          {content.opportunities.heading}
        </h2>
      </Reveal>

      <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {content.opportunities.items.map((item, index) => (
          <li key={item.title}>
            <Reveal delay={index * 100} className="h-full">
              <div className="flex h-full flex-col gap-4 rounded-2xl border border-white/8 bg-charcoal-900 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-court-500/40 hover:shadow-[0_12px_40px_rgba(0,0,0,0.45)]">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-court-500/15 text-court-400">
                  {icons[index]}
                </span>
                <h3 className="text-lg font-bold leading-snug">{item.title}</h3>
                <p className="text-sm leading-relaxed text-white/60">{item.body}</p>
              </div>
            </Reveal>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

export default Opportunities;
