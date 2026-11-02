import type { CSSProperties } from "react";
import Reveal from "../Reveal";
import BasketballIcon from "../BasketballIcon";
import BouncingBall from "./BouncingBall";
import { useParallax } from "../../hooks/useParallax";
import { BRAND, content } from "../../data/content";
import { images } from "../../data/images";
import spectraLogo from "../../assets/spectra-logo.jpg";
import crestLogo from "../../assets/black-fortress-logo.png";

/** Depth (px) a .parallax-layer moves at the hero's pointer-parallax edges. */
const depth = (value: number) => ({ "--depth": value }) as CSSProperties;

const CourtLines = () => (
  <svg
    aria-hidden="true"
    className="court-draw absolute inset-x-0 bottom-0 h-64 w-full text-white/5 sm:h-80"
    viewBox="0 0 1200 320"
    fill="none"
    preserveAspectRatio="xMidYMax slice"
  >
    <path pathLength={1} d="M0 318h1200" stroke="currentColor" strokeWidth="2" />
    <circle pathLength={1} cx="600" cy="318" r="150" stroke="currentColor" strokeWidth="2" />
    <circle pathLength={1} cx="600" cy="318" r="56" stroke="currentColor" strokeWidth="2" />
    <path pathLength={1} d="M150 318a450 450 0 0 1 900 0" stroke="currentColor" strokeWidth="2" />
  </svg>
);

const Hero = () => {
  const sectionRef = useParallax<HTMLElement>();

  return (
    <section
      ref={sectionRef}
      id="hero"
      aria-labelledby="hero-heading"
      className="relative overflow-hidden"
    >
      {/* Atmospheric background layers */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div
          className="parallax-layer absolute -right-40 -top-40 h-[34rem] w-[34rem] rounded-full bg-court-500/15 blur-3xl"
          style={depth(22)}
        />
        <div
          className="parallax-layer absolute -bottom-52 -left-32 h-[30rem] w-[30rem] rounded-full bg-court-600/10 blur-3xl"
          style={depth(-16)}
        />
        <CourtLines />
        <div className="parallax-layer absolute inset-x-0 -bottom-6" style={depth(8)}>
          <span className="block select-none whitespace-nowrap text-center font-display text-[20vw] leading-none text-white/[0.03] animate-[watermarkPan_26s_ease-in-out_infinite_alternate]">
            FORTRESS
          </span>
        </div>
        <BouncingBall
          className="absolute bottom-8 right-[13%] hidden lg:block"
          size="3.25rem"
          height="-7rem"
          duration={1.15}
        />
        <BouncingBall
          className="absolute bottom-8 left-[8%] hidden opacity-70 xl:block"
          size="2.25rem"
          height="-4.25rem"
          duration={0.95}
          delay={0.4}
        />
      </div>

      <div className="relative mx-auto flex min-h-svh w-full max-w-6xl flex-col justify-center px-4 pb-24 pt-28 sm:px-6 lg:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-[1.25fr_1fr]">
          <div>
            <Reveal>
              <div className="flex items-center gap-3">
                <img
                  src={spectraLogo}
                  alt={content.partners.spectraAlt}
                  className="h-11 w-11 rounded-xl mix-blend-screen"
                />
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/50">
                  {content.partners.spectraName} {content.partners.presents}
                </p>
              </div>
              <p className="mt-6 flex items-center gap-2.5 font-display text-sm tracking-[0.25em] text-court-500 sm:text-base">
                <BasketballIcon className="animate-spin-slow h-5 w-5 shrink-0" />
                {BRAND}
              </p>
            </Reveal>
            <Reveal delay={100}>
              <h1
                id="hero-heading"
                className="text-gradient-hero mt-5 text-4xl font-black leading-[1.12] sm:text-5xl lg:text-6xl"
              >
                {content.hero.headline}
              </h1>
            </Reveal>
            <Reveal delay={200}>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/70">
                {content.hero.lead}
              </p>
            </Reveal>
            <Reveal delay={300}>
              <div className="mt-10">
                <p className="max-w-xl font-semibold text-court-300">{content.hero.ctaLine}</p>
                <a
                  href="#register"
                  className="btn-sheen glow-cta group mt-5 inline-flex items-center gap-2.5 rounded-full bg-court-500 px-8 py-4 text-base font-bold text-charcoal-950 transition-all duration-300 hover:scale-[1.04] hover:bg-court-400 active:scale-95"
                >
                  {content.hero.ctaButton}
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    className="h-5 w-5 transition-transform duration-300 group-hover:translate-y-1"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 4v16m0 0l-6-6m6 6l6-6" />
                  </svg>
                </a>
              </div>
            </Reveal>
            <Reveal delay={400}>
              <div className="mt-12 flex items-center gap-3">
                <img src={crestLogo} alt={content.partners.blackFortressAlt} className="h-11 w-11" />
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/40">
                    {content.partners.supporterLabel}
                  </p>
                  <p className="text-sm font-bold">{content.partners.blackFortressName}</p>
                </div>
              </div>
            </Reveal>
          </div>

          {/* ფოტოს შესაცვლელად იხილეთ src/data/images.ts (images.hero). */}
          <Reveal delay={250}>
            <div className="parallax-layer group relative" style={depth(-10)}>
              <BasketballIcon
                mono
                strokeWidth={0.8}
                className="animate-spin-slow absolute -right-10 -top-10 h-28 w-28 text-court-500/25"
              />
              <BasketballIcon
                mono
                strokeWidth={0.8}
                className="animate-spin-slow absolute -bottom-8 -left-8 h-20 w-20 text-white/10 [animation-direction:reverse]"
              />
              {images.hero ? (
                <div className="relative rounded-[calc(1.5rem+2px)] bg-gradient-to-br from-court-500/60 via-white/10 to-transparent p-[2px] shadow-2xl shadow-black/50">
                  <div className="relative overflow-hidden rounded-3xl">
                    <img
                      src={images.hero}
                      alt="დუაიტ ჰოვარდი გულშემატკივრების წინაშე FORTRESS TBILISI-ის მაისურით"
                      className="aspect-[4/5] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    />
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-gradient-to-t from-charcoal-950/70 via-transparent to-transparent"
                    />
                    <div className="animate-float absolute bottom-4 left-4 flex items-center gap-2 rounded-full border border-court-500/40 bg-charcoal-950/80 px-4 py-2 backdrop-blur">
                      <BasketballIcon className="h-4 w-4 shrink-0" />
                      <span className="text-xs font-bold tracking-wider text-white">
                        {content.hero.photoBadge}
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-charcoal-800 via-charcoal-900 to-charcoal-950 shadow-2xl">
                  <div
                    aria-hidden="true"
                    className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-court-500/20 blur-2xl"
                  />
                  <div className="absolute inset-x-12 bottom-24 top-14 text-court-500/60">
                    <BasketballIcon mono strokeWidth={0.8} className="animate-spin-slow h-full w-full" />
                  </div>
                  <p className="absolute bottom-8 left-10 right-10 font-display text-2xl leading-snug tracking-wide text-white/85">
                    BLACK FORTRESS
                    <span className="block text-court-500">× DWIGHT HOWARD</span>
                  </p>
                </div>
              )}
            </div>
          </Reveal>
        </div>
      </div>

      <div aria-hidden="true" className="absolute bottom-5 left-1/2 hidden -translate-x-1/2 md:block">
        <BouncingBall size="1.4rem" height="-1.2rem" duration={0.85} />
      </div>
    </section>
  );
};

export default Hero;
