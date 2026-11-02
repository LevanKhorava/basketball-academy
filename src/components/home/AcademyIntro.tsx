import Reveal from "../Reveal";
import { content } from "../../data/content";
import { images } from "../../data/images";

const AcademyIntro = () => (
  <section id="about" aria-labelledby="about-heading" className="scroll-mt-24">
    <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
      <div className="grid items-start gap-12 lg:grid-cols-[1.2fr_1fr]">
        <div>
          <Reveal>
            <h2 id="about-heading" className="heading-accent text-3xl font-black sm:text-4xl">
              {content.about.heading}
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="mt-6 text-lg leading-relaxed text-white/75">{content.about.p1}</p>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-4 leading-relaxed text-white/60">{content.about.p2}</p>
          </Reveal>
          <Reveal delay={300}>
            <ul aria-label={content.about.pillarsLabel} className="mt-8 flex flex-wrap gap-2">
              {content.about.pillars.map((pillar) => (
                <li
                  key={pillar}
                  className="group flex items-center gap-2 rounded-full border border-white/10 bg-charcoal-900 px-4 py-1.5 text-sm text-white/70 transition-all duration-300 hover:-translate-y-0.5 hover:border-court-500/50 hover:bg-court-500/10 hover:text-white"
                >
                  <span
                    aria-hidden="true"
                    className="h-1.5 w-1.5 rounded-full bg-court-500 transition-transform duration-300 group-hover:scale-150"
                  />
                  {pillar}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={200} className="lg:mt-10">
          {images.about && (
            <div className="group mb-6 rounded-[calc(1.5rem+2px)] bg-gradient-to-br from-white/15 via-transparent to-court-500/40 p-[2px] shadow-2xl">
              <div className="overflow-hidden rounded-3xl">
                <img
                  src={images.about}
                  alt="დუაიტ ჰოვარდი ვარჯიშზე მოთამაშესთან ერთად"
                  loading="lazy"
                  className="aspect-[4/5] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                />
              </div>
            </div>
          )}
          <div className="group rounded-3xl border border-court-500/25 bg-gradient-to-br from-court-500/10 to-transparent p-8 transition-all duration-300 hover:-translate-y-1 hover:border-court-500/45 hover:shadow-[0_16px_44px_rgba(255,107,26,0.12)]">
            <h3 className="text-xl font-bold text-court-400">{content.about.highlight.title}</h3>
            <p className="mt-3 leading-relaxed text-white/70">{content.about.highlight.body}</p>
            <a
              href="#register"
              className="mt-6 inline-flex items-center gap-2 font-semibold text-court-400 transition-colors hover:text-court-300"
            >
              {content.nav.register}
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14m0 0l-6-6m6 6l-6 6" />
              </svg>
            </a>
          </div>
        </Reveal>
      </div>
    </div>
  </section>
);

export default AcademyIntro;
