import Reveal from "../Reveal";
import { BRAND, content } from "../../data/content";
import { images } from "../../data/images";
import spectraLogo from "../../assets/spectra-logo.jpg";
import crestLogo from "../../assets/black-fortress-logo.png";

const CourtLines = () => (
  <svg
    aria-hidden="true"
    className="absolute inset-x-0 bottom-0 h-64 w-full text-white/5 sm:h-80"
    viewBox="0 0 1200 320"
    fill="none"
    preserveAspectRatio="xMidYMax slice"
  >
    <path d="M0 318h1200" stroke="currentColor" strokeWidth="2" />
    <circle cx="600" cy="318" r="150" stroke="currentColor" strokeWidth="2" />
    <circle cx="600" cy="318" r="56" stroke="currentColor" strokeWidth="2" />
    <path d="M150 318a450 450 0 0 1 900 0" stroke="currentColor" strokeWidth="2" />
  </svg>
);

const BasketballMark = () => (
  <svg aria-hidden="true" viewBox="0 0 200 200" fill="none" className="h-full w-full">
    <circle cx="100" cy="100" r="95" stroke="currentColor" strokeWidth="3" />
    <path d="M5 100h190" stroke="currentColor" strokeWidth="3" />
    <path d="M100 5v190" stroke="currentColor" strokeWidth="3" />
    <path d="M33 33c22 19 35 42 35 67s-13 48-35 67" stroke="currentColor" strokeWidth="3" />
    <path d="M167 33c-22 19-35 42-35 67s13 48 35 67" stroke="currentColor" strokeWidth="3" />
  </svg>
);

const Hero = () => (
  <section id="hero" aria-labelledby="hero-heading" className="relative overflow-hidden">
    {/* Atmospheric background layers */}
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      <div className="absolute -right-40 -top-40 h-[34rem] w-[34rem] rounded-full bg-court-500/15 blur-3xl" />
      <div className="absolute -bottom-52 -left-32 h-[30rem] w-[30rem] rounded-full bg-court-600/10 blur-3xl" />
      <CourtLines />
      <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 select-none whitespace-nowrap font-display text-[20vw] leading-none text-white/[0.025]">
        FORTRESS
      </span>
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
            <p className="mt-6 font-display text-sm tracking-[0.25em] text-court-500 sm:text-base">
              {BRAND}
            </p>
          </Reveal>
          <Reveal delay={100}>
            <h1
              id="hero-heading"
              className="mt-5 text-4xl font-black leading-[1.12] sm:text-5xl lg:text-6xl"
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
                className="mt-5 inline-flex items-center gap-2.5 rounded-full bg-court-500 px-8 py-4 text-base font-bold text-charcoal-950 transition-all duration-300 hover:scale-[1.03] hover:bg-court-400 hover:shadow-[0_8px_30px_rgba(255,107,26,0.35)] active:scale-95"
              >
                {content.hero.ctaButton}
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
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
          {images.hero ? (
            <img
              src={images.hero}
              alt="დუაიტ ჰოვარდი გულშემატკივრების წინაშე FORTRESS TBILISI-ის მაისურით"
              className="aspect-[4/5] w-full rounded-3xl border border-white/10 object-cover shadow-2xl"
            />
          ) : (
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-charcoal-800 via-charcoal-900 to-charcoal-950 shadow-2xl">
              <div
                aria-hidden="true"
                className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-court-500/20 blur-2xl"
              />
              <div className="absolute inset-x-12 bottom-24 top-14 text-court-500/60">
                <BasketballMark />
              </div>
              <p className="absolute bottom-8 left-10 right-10 font-display text-2xl leading-snug tracking-wide text-white/85">
                BLACK FORTRESS
                <span className="block text-court-500">× DWIGHT HOWARD</span>
              </p>
            </div>
          )}
        </Reveal>
      </div>
    </div>

    <div aria-hidden="true" className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 md:block">
      <svg
        className="h-6 w-6 animate-bounce text-white/30"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M6 9l6 6 6-6" />
      </svg>
    </div>
  </section>
);

export default Hero;
