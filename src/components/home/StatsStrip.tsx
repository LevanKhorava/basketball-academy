import Reveal from "../Reveal";
import BasketballIcon from "../BasketballIcon";
import { content } from "../../data/content";
import { useCountUp } from "../../hooks/useCountUp";

const StatValue = ({ value, suffix }: { value: number; suffix: string }) => {
  const { ref, display } = useCountUp(value);
  return (
    <span ref={ref} className="text-gradient-court font-display text-5xl leading-none tabular-nums sm:text-6xl">
      {display}
      {suffix}
    </span>
  );
};

/** Dwight Howard career achievements with count-up numbers. */
const StatsStrip = () => (
  <section
    aria-labelledby="stats-heading"
    className="relative overflow-hidden border-y border-white/5 bg-charcoal-900/60"
  >
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      <div className="absolute left-1/2 top-1/2 h-72 w-[46rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-court-500/10 blur-3xl" />
      <BasketballIcon
        mono
        strokeWidth={0.8}
        className="animate-spin-slow absolute -left-16 -top-20 h-56 w-56 text-white/5"
      />
      <BasketballIcon
        mono
        strokeWidth={0.8}
        className="animate-spin-slow absolute -bottom-24 -right-14 h-64 w-64 text-court-500/10 [animation-direction:reverse]"
      />
    </div>

    <div className="relative mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <Reveal className="text-center">
        <p className="text-sm font-bold uppercase tracking-[0.25em] text-court-500">
          {content.stats.lead}
        </p>
        <h2 id="stats-heading" className="mt-2 font-display text-2xl tracking-wide text-white/90 sm:text-3xl">
          {content.stats.heading}
        </h2>
      </Reveal>

      <ul className="mt-12 grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4">
        {content.stats.items.map((item, index) => (
          <li key={item.label}>
            <Reveal delay={index * 120}>
              <div className="flex flex-col items-center gap-3 text-center">
                <StatValue value={item.value} suffix={item.suffix} />
                <span aria-hidden="true" className="h-1 w-10 rounded-full bg-court-500/40" />
                <p className="max-w-[12rem] text-sm font-semibold leading-snug text-white/65">
                  {item.label}
                </p>
              </div>
            </Reveal>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

export default StatsStrip;
